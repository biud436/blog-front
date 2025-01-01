# 소개

Next.js로 만든 개인 잡담 블로그입니다. 실제로 사용하기 위해 개발되었으나 잡다한 이야기, 일기 같은 내용만 기록 하고 있으며, 이외의 기술적인 내용은 오랫동안 운영해온 개인 네이버 블로그에 하고 있습니다. 데이터는 별도의 백엔드 서버 [blog-api-server](https://github.com/biud436/blog-api-server)에서 `MariaDB`를 통해 관리되고 있으며 블로그는 [blog.biud436.com](https://blog.biud436.com)에서 확인할 수 있습니다.

## 🛠️ 기술 스택

사용한 기술은 다음 몇 가지로 추려집니다.

-   Typescript
-   Next.js
-   Material-UI
-   Zustand
-   Styled-Components
-   Tanstack Query
-   Zod

## 구조

<p align="cetner">
<img src="https://user-images.githubusercontent.com/13586185/273450938-a7b59064-3e50-4951-a07a-452335ead3d5.png" />
</p>

### 투두리스트

블로그는 최소한의 기능만 탑재하고 있습니다.

-   [x] 공통 레이아웃 만들기
-   [x] 공통 훅 만들기
-   [x] 공통 서비스 프로바이더 만들기
-   [x] Mobx를 통한 상태 관리
-   [x] 중첩 트리 모델을 사용한 카테고리 자동 생성 시스템
-   [x] 관리자 페이지 구현
-   [x] 포스트 기능 (페이지네이션, 검색, 작성, 읽기, 삭제)
-   [x] AWS S3를 이용한 이미지 업로드 및 삭제 기능 구현
-   [x] TOC 기능 구현
-   [x] 외부 댓글 라이브러리 연동
-   [x] 마크다운 에디터에 코드 하이라이팅 추가
-   [x] 서버 사이드 렌더링
-   [x] 오픈그래프와 메타 태그를 추가하여 구글 검색 최적화
-   [x] AWS 코드 디플로이와 깃허브 패키지를 이용한 도커 배포 자동화
-   [x] RSS 피드 구현
-   [x] OAuth 2.0 로그인 지원 (깃허브)

# 설치 및 실행 방법

전반적인 Node.js LTS v22 이상의 개발 환경이 구축되어있어야 합니다. 서버 실행 관련 명령어는 `package.json`에서 참조하실 수 있는데, `yarn next:dev` 명령으로 실행할 수 있습니다.

자세한 내용은 [설치 방법](https://github.com/biud436/blog-front/blob/main/README.en.md#installation) 문서를 참고하십시오.

백엔드 서버는 별도의 저장소에서 관리하고 있고 레디스 의존성으로 인해, 다소 환경 설정이 프론트에 비해 복잡합니다.

따라서 본 문서의 범위를 벗어나므로 백엔드 서버 구동 방법은 이 문서에서는 생략하겠습니다.
