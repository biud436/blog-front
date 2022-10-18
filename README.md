# Introduction

This project is the blog that is made with the javascript library called React, this is still in the works 😂

---

노드 블로그 서버 [blog-api-server](https://github.com/biud436/blog-api-server)와 연동되는 블로그 프론트 페이지로 토이 프로젝트로 진행하고 있으며 아직 작업 중입니다.

# Todo List

-   [x] 블로그 메인 페이지 만들기
-   [x] 상태 관리 라이브러리 적용하기 (mobx)
-   [x] 관리자 로그인 기능 만들기
-   [x] 중첩 모델을 사용하여 계층적 카테고리 만들기
-   [x] 포스트 목록 (페이징, 포스트 검색)
-   [x] 포스트 상세 페이지
-   [x] 포스트 작성 페이지
-   [ ] AWS S3로 이미지 업로드 기능 만들기
-   [ ] 파일 업로드 기능 만들기
-   [x] 포스트 내용을 Helmet을 이용한 SEO 처리하기
-   [ ] Helmet에서 meta 태그를 이용하여 이미지 미리보기 처리하기
-   [ ] 블로그 링크 기능 복사 기능 만들기
-   [ ] 최근 작성한 댓글 목록 보여주기
-   [ ] 포스트 수정 기능
-   [ ] 포스트 삭제 기능
-   [ ] 댓글 작성 기능
-   [ ] 댓글 수정 기능
-   [ ] 댓글 삭제 기능
-   [ ] 외부 댓글 플러그인 연동
-   [ ] RSS 피드 기능

## 설치 방법

이 프로젝트를 시작하려면 `Visual Studio Code` 와 `Node.js LTS v14` 이상이 설치되어있어야 합니다. 노드 패키지 관리자는 `yarn`을 사용합니다. yarn berry가 더 빠르지만, 순수한 yarn을 사용하고 있습니다. 프로젝트를 시작하기 전에 의존성 노드 패키지를 내려 받아야 합니다.

터미널 또는 텍스트 에디터(VS Code를 의미합니다)를 열어서 Ctrl + ` 버튼을 눌러누르거나 통합 터미널 열기 기능을 이용하여 하단에 터미널을 띄우세요.

다음 명령으로 프로젝트 의존성 패키지들을 모두 설치할 수 있습니다.

```bash
yarn install
```

위 명령이 실행되면 의존성 패키지들이 다운로드되기 시작합니다. 수십초 또는 1분 이상의 시간이 소요될 수 있으니 잠시 기다리십시오. 패키지 다운로드가 완료되면 터미널에 `yarn start` 를 입력하여 개발 서버를 구동하시고 이 개발 서버는 웹팩 HMR (핫 모듈 리로드)를 지원하므로 웹소켓을 통해 프로젝트 저장 시, CSS나 태그(V-DOM) 변경 내용이 브라우저에 바로 적용되는 기능을 갖추고 있습니다.

브라우저는 `http://localhost:8080`으로 접속을 하시면 됩니다.

## 도커에서의 구동

보통의 빌드 프로세스는 자동 배포가 아닌 수동 배포를 해야 하며, `Dockerfile`을 통해 의존성 패키지를 내려 받고, `yarn build` 명령을 수행하여 압축된 청크 파일이 만들어지면 해당 파일들을 NGINX 도커 컨테이너에 리버스 프록시를 통해 로드시킵니다.

그러나 도커에서 의존성 패키지를 내려 받게 할 경우, 수 많은 이미지 레이어가 생성될 수 있고 상당한 빌드 시간이 걸리게 됩니다. 이러한 단점을 커버하기 위해 `yarn build` 명령을 수행한 후, `build` 폴더에 있는 파일을 업로드하는 방법이 있을 수 있습니다. `build` 폴더는 `.gitignore`에 의하여 깃허브에 저장되지 않게 조치가 되어있습니다.

이러한 노드 모듈에 대한 이미지 레이어들은 패키지 변동이 없다면, 두번째 빌드부터는 노드 패키지 설치 작업이 진행되지 않기 때문에 상당한 속도 향상이 있습니다.

## 자동 배포

자동으로 배포를 하려면 보통은 Github Action을 이용합니다. 깃헙 액션의 워크플로우 기능을 사용하여 `yarn install`과 `yarn build`를 수행하고, `build` 폴더에 생성된 파일들을 `AWS S3 버킷`에 업로드합니다. AWS S3는 IAM 인증을 통해 파일을 내려받거나 업로드할 수 있으므로 서버 연동에 좋은 효과를 발휘합니다. 그러나 AWS 환경이 아닌 서버 환경에서 `aws-cli`를 사용할 경우 트래픽 비용이 청구될 수 있습니다.

---
