FROM nginx:stable-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html/build
EXPOSE 8084
CMD ["nginx", "-g", "daemon off;"]