## BeanTalk-server
BeanTalk 프로젝트의 RESTful-api 서버

## 개발 인원
1인 개발

## 기술 스택
- typescript
- express
- mongoose
- @vercel/node

## 배포
Vercel기반 serverless function

## 설치
```
npm install
```

### 개발환경 실행
```
npm run dev
```

## 폴더 구조

```
bean-talk-server
├─ api
│  └─ index.ts
├─ dev-api
│  └─ index.ts
├─ package-lock.json
├─ package.json
├─ request.http
├─ src
│  ├─ controller
│  ├─ error-handler
│  ├─ middleware
│  ├─ mongoose-model
│  ├─ mongoose-schema
│  ├─ routers
│  ├─ types
│  ├─ utils
│  └─ variables
├─ tsconfig.json
└─ vercel.json
```

## 특징
- expressAsnycHandler와 전역에러핸들링을 통해 mongoose 검증, 캐스팅, 커스텀 에러 등, 다양한 예외처리를 쉽게 관리 하도록 했습니다.
- express의 비즈니스 로직에 따라 미들웨어, 컨트롤러를 나누어 단일 책임 원칙을 지켰습니다.
- mongoose의 스키마와 모델에서 pre 검증 메서드를 적용하여 express의 미들웨어에서 불필요한 검증로직을 생략하였습니다.
