# TMDB Movie Search Web Application

## 목차

- [개요](##개요)
- [데모 바로가기](##데모-바로가기)
- [설치 및 실행](##설치-및-실행)
- [환경변수 설정](##환경변수-설정)
- [구현 기능](##구현기능)
- [기술 스택](##기술-스택)
- [파일 구조](##파일구조)

## 개요

- Typescript를 활용한 React 프로젝트로 정적타입언어 숙련도 향상
- firebase를 이용한 서버 및 DB 사용
- lazy loading을 통한 서비스 품질 개선 확인
- axios interceptor를 활용해 request,response에 대한 캐싱
- Github Actions를 통해 빌드/배포 자동화
- 반응형 디자인 패턴 숙련도 향상

## 데모 바로가기

<a href="https://fir-chat-app-b793f.web.app/" target="_blank">데모 바로가기</a>

<img width="1414" alt="스크린샷 2023-03-21 오전 11 31 34" src="https://user-images.githubusercontent.com/85508157/227699235-d328adc2-d0d4-45fd-ac37-ac3d35103b83.png">

## 설치 및 실행

```bash
# Clone repository
$ git clone https://github.com/sacultang/MovieSearch-with-firebase

# Access Directory
$ cd MovieSearch-with-firebase

# Install dependencies
$ npm install

or

$ yarn

# Start Application
$ npm start

or

$ yarn start
```

## 환경변수 설정

TMDB API KEY와 FIREBASE KEY를 `.env`파일을 생성하여 작성해주세요.

[👉 firebase 키 발급 방법 ](https://sacultang.github.io/2022/08/01/React-firebase/)

```env
// your key

REACT_APP_TMDB_API="YOUR KEY"


REACT_APP_APIKEY="YOUR KEY"
REACT_APP_AUTH_DOMAIN="YOUR KEY"
REACT_APP_PROJECT_ID="YOUR KEY"
REACT_APP_STORAGE_BUCKET="YOUR KEY"
REACT_APP_MESSAGING_SENDER_ID="YOUR KEY"
REACT_APP_APP_ID="YOUR KEY"
REACT_APP_MEASURE_MENT_ID="YOUR KEY"

```

## 구현기능

### ☑️ firebase

- Login & Join  
  firebase의 `Authentication method`를 이용해 로그인과 회원가입을 구현하였습니다.

  [참고 파일\_register/Login](./src/pages/register/Login.tsx)  
  [참고 파일\_register/Join](./src/pages/register/Join.tsx)

- 즐겨찾기 추가 및 삭제  
  firebase의 firebasestore Database를 이용해 user의 ID로 DB가 생성되도록 하고, 영화를 즐겨찾기 목록에 추가 및 삭제를 할 수 있도록 하였습니다.

  [참고 파일\_hooks/useFavorite](./src/pages/movies/hooks/useFavorite.ts)

- list목록 추가 및 삭제
  user의 영화목록을 생성하고 컨텐츠를 추가 할 수 있는 기능입니다.  
  list목록의 path가 직접 생성한 이름으로 설정되기 때문에 한글,특수문자가 포함되어도
  path가 제대로 인식될 수 있도록 `encodeURLComponent()`를 사용하여 정상적으로 동작하도록 하였습니다.

  [참고 파일\_hooks/useAddList](./src/components/listModal/hooks/useAddList.ts)

![스크린샷 2023-03-21 오후 3 33 05](https://user-images.githubusercontent.com/85508157/227698412-56386be6-5be6-4f4f-a8ca-9d9215ea001c.png)

### ☑️ LazyLoadImage

- `IntersectionObserver` 를 사용하여 이미지를 화면에 보이는 부분만 렌더링 하여 초기 렌더링 성능 수치 약 20%정도 상승하였습니다.

  [참고 파일\_hooks/useIsImageLoad](./src/pages/hooks/useIsImageLoad.ts)

  ![스크린샷 2022-09-01 오후 4 42 44](https://user-images.githubusercontent.com/85508157/227698822-04b6955a-1918-42f7-a8dc-59a8c5e6a01f.png)
  ![스크린샷 2023-03-26 오전 12 35 04](https://user-images.githubusercontent.com/85508157/227733244-3c423364-fa34-4bbe-ba6f-7495daa774ea.png)

- Image resize
  화면 사이즈 조절시 포스터이미지의 사이즈를 조절하여 2:3비율에 맞게 출력하도록 하였습니다.

  [참고 파일\_hooks/useIsVisibleGetCardWidth](./src/pages/movies/hooks/useIsVisibleGetCardWidth.tsx)  
  [참고 파일\_movies/MoviePosterImg](./src/pages/movies/MoviePosterImg.tsx)

### ☑️ Axios Interceptor를 이용한 API 캐시

- axis interceptor를 이용해 동일한 resquest와 response에 대한 API 캐시를 구현하였습니다.  
  [참고 파일\_TMDB/baseURL](./src/api/TMDB/baseUrl.ts)

```js
const cache: { [key: string]: any } = {};

TMDBServer.interceptors.request.use(
  async (request) => {
    if (request.url) {
      if (cache[request.url]) {
        return Promise.resolve(cache[request.url]);
      }
      cache[request.url] = request;
      return Promise.resolve(request);
    }
    return Promise.resolve(request);
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

- request에서의 문제점 인식 `cache key`로 `request.url`을 사용할 경우 `page param`이 변경 되어도 요청 URL이 변경 되지 않아 계속 1페이지의 데이터만 불러와지는 이슈.
- 이를 해결하기 위해서 `params`를 문자열로 변환하여 `request.url`과 함께 `cache key`로 사용하였습니다.

```js
TMDBServer.interceptors.request.use(
  async (request) => {
    if (request.url) {
      const queryString = Object.entries(request.params)
        .map(
          ([key, value]) =>
            (typeof value === 'string' ||
              typeof value === 'number' ||
              typeof value === 'boolean') &&
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&');
      const cacheKey = `${request.url}?${queryString}`;
      if (cache[cacheKey]) {
        return Promise.resolve(cache[cacheKey]);
      }
      cache[cacheKey] = request;
      return Promise.resolve(request);
    }
    return Promise.resolve(request);
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### ☑️ Route

- react-router-dom의 중첩라우팅 기능을 통해  
  록인이 필요한 페이지와 아닌 페이지를 `Outlet` 컴포넌트로 따로 렌더링 하게 하였습니다.  
  [참고 파일\_router/index](./src/router/index.tsx)

## 기술 스택

![React](https://img.shields.io/badge/react-%2320232a?style=flat&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white)
![firebase](https://img.shields.io/badge/firebase-FFCA28?style=flat&logo=firebase&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=flat&logo=TheMovieDatabase&logoColor=white)
![MUI](https://img.shields.io/badge/mui-007FFF?style=flat&logo=mui&logoColor=white)

## 파일구조

```
- src
    ├─ api
    │   └─ TMDB
    ├─ components
    │   ├─ common
    │   ├─ listModal
    │   │   └─ hooks
    │   ├─ loginAlertModal
    │   ├─ scrollGrid
    │   └─ skeleton
    ├─ constants
    ├─ firebase
    ├─ pages
    │   ├─ detials
    │   ├─ Error
    │   ├─ favorite
    │   ├─ home
    │   │   ├─ common
    │   │   ├─ popular
    │   │   └─ trending
    │   ├─ hooks
    │   ├─ movies
    │   │   └─ hooks
    │   ├─ register
    │   ├─ search
    │   └─ tv
    ├─ router
    │   └─ hooks
    ├─ store
    ├─ theme
    ├─ types
    ├─ utils
    ├─ App.tsx
    └─ index.tsx
```

## Commit prefix

- `ADD`: When you add new functional codes (기능 추가)
- `FIX`: When you fix some errors (오류 수정)
- `DEL`: When you remove functional codes (기능 코드 제거)
- `RFT`: When you refactor codes (코드 리팩토링)
- `CHO`: When you do chore such as moving some files (파일 옮기거나, 이미지 교체하거나 잡일)
- `DOC`: When you write docs (문서 작성 ex. readme)
- `SET`: 세팅
- `TEST`: Test
