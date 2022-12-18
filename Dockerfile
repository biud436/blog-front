FROM node:16-alpine as builder
RUN apk --no-cache add --virtual .builds-deps build-base python3
WORKDIR /usr/src/app

# 의존성 패키지 설치
COPY package*.json ./
RUN yarn install
COPY . .

# 타임존을 UTC로 설정
RUN apk add --no-cache tzdata
RUN echo 'Etc/UTC' > /etc/timezone

# 빌드 및 시작
RUN yarn next:build
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8084
ENV NODE_ENV production

# 배포용 이미지 (테스트)
FROM node:16-alpine as distribution
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8084
ENV NODE_ENV production

CMD ["node_modules/.bin/next", "start", "-p", "8084"]