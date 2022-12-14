# 소개

Next.js로 만든 개인 블로그입니다. 실제로 사용하고 운영하기 위해 개발되었습니다.

데이터는 별도의 백엔드 서버 [blog-api-server](https://github.com/biud436/blog-api-server)에서 MariaDB를 통해 관리됩니다.

블로그는 [blog.biud436.com](https://blog.biud436.com)에서 확인할 수 있습니다.

## 🛠️ 기술 스택

사용한 기술은 다음 몇 가지로 추려집니다.

-   Typescript
-   Next.js
-   Material-UI
-   Mobx
-   Recoil
-   Styled-Components
-   SWR

## 개발 기간

전반적인 기능은 한달 정도 걸렸습니다 (계속 개선중...)

2022.10.10 ~ 2022.11.15 (약 1개월)

### 투두리스트

-   [x] 공통 레이아웃 만들기
-   [x] 공통 훅 만들기
-   [x] 공통 서비스 프로바이더 만들기
-   [x] 상태 관리 라이브러리 추가
-   [x] 중첩 트리 모델을 사용한 카테고리 자동 생성 시스템
-   [x] 관리자 페이지 구현
-   [x] 포스트 기능 (페이지네이션, 검색, 작성, 읽기, 삭제)
-   [x] AWS S3를 이용한 이미지 업로드 및 삭제 기능 구현
-   [x] 외부 댓글 라이브러리 연동
-   [x] 마크다운 에디터에 코드 하이라이팅 추가
-   [x] Apply SWR to certain pages such as a page named `posts/[id].tsx`
-   [x] 서버 사이드 렌더링 프레임워크로 이전
-   [x] 오픈그래프와 메타 태그를 추가하여 구글 SEO 향상
-   [x] AWS 코드 디플로이와 깃허브 패키지를 이용한 도커 배포 자동화

## 폴더 구조

폴더 구조는 크게, `app`, `common`, `hooks`, `layouts`, `pages`, `services`, `store`, `styles`, `types`, `utils`로 구성되어 있습니다.

-   `app/components`에는 공통 컴포넌트가 위치합니다.
-   `app/api`에는 axios와 fetch에 대한 추상화 레이어가 존재합니다.
-   `hooks`에는 커스텀 훅이 있습니다.
-   `services`에는 API 서버와 통신하는 로직이 있습니다.
-   `layouts`에는 공통 레이아웃 파일이 있습니다.
-   `store`에서는 상태 관리 로직을 관리합니다.

```txt
├── _contents
├── app
│   ├── api
│   ├── common
│   ├── components
│   ├── pages
│   └── providers
├── common
├── hooks
│   └── api
├── layouts
├── pages
│   ├── career
│   ├── edit
│   ├── login
│   ├── manage
│   ├── posts
│   └── profile
├── services
│   └── types
├── store
│   ├── common
│   ├── github
│   ├── login
│   ├── menu
│   ├── post
│   ├── posts
│   ├── types
│   └── user
├── styles
│   └── __tests__
├── types
└── utils
```

## 중첩 카테고리 에디터

`react-dnd`를 사용하여 카테고리 편집기를 완성하였습니다. 중첩 모델에 맞게 새로운 카테고리를 생성하거나 기존의 카테고리를 수정할 수 있습니다.

![code-13](https://user-images.githubusercontent.com/13586185/205221912-1b0640ae-96c9-4367-8e2e-85c742a07e8a.gif)

# 설치 및 실행 방법

전반적인 Node.js LTS v16 이상의 개발 환경이 구축되어있어야 합니다. 서버 실행 관련 명령어는 `package.json`에서 참조하실 수 있는데, `yarn next:dev` 명령으로 실행할 수 있습니다.

자세한 내용은 [설치 방법](https://github.com/biud436/blog-front#installation) 문서를 참고하십시오.

백엔드 서버는 별도의 저장소에서 관리하고 있고 레디스 의존성으로 인해, 다소 환경 설정이 프론트에 비해 복잡합니다.

따라서 본 문서의 범위를 벗어나므로 백엔드 서버 구동 방법은 이 문서에서는 생략하겠습니다.
