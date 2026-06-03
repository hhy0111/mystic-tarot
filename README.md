# Mystic Tarot

개인정보 입력, 로그인, 서버, 실제 AI API 없이 동작하는 React Native + TypeScript + Expo 기반 타로 운세 앱입니다.

## 주요 기능

* 3개 화면: LobbyScreen, CardSelectScreen, ResultScreen
* 7개 운세 항목: 오늘의 운세, 연애운, 금전운, 직장운, 인간관계, 선택의 고민, 로또 번호
* 78장 전체 타로 덱 데이터와 카드 이미지 적용
* 78장 전체 덱을 3개 부채꼴 묶음으로 펼쳐 3장 선택
* 같은 리딩 세션 내 카드 중복 방지
* 정방향/역방향 랜덤 배정
* 카드 선택 슬롯, 결과 카드 flip, glow, 결과 공개 애니메이션
* 내부 데이터 기반 무료 결과 및 상세 결과 생성
* `mockRewardAd()` 1초 성공 흐름 후 상세 해석 공개
* 로또 번호 카테고리는 카드 기반 재미용 번호 추천으로 동작

## 설치/실행

```bash
npm install
npm start
```

웹에서 확인하려면:

```bash
npm run web
```

## 검증

```bash
npm test
npm run typecheck
npx expo export --platform web --output-dir dist
```

## 개인정보 처리방침

개인정보 처리방침 HTML은 [privacy.html](privacy.html)에 있습니다.

현재 버전은 개인정보 수집, 로그인, 서버 저장, 실제 AI API 호출, 실제 광고 SDK 연동을 하지 않습니다.

## 프로젝트 구조

```text
src/
  assets/
  components/
  data/
  navigation/
  screens/
  types/
  utils/
assets/
  backgrounds/
  cards/
  categories/
```

## 추후 확장 포인트

* `mockRewardAd()`를 AdMob 보상형 광고 어댑터로 교체
* 카드 히스토리 저장 기능 추가
* 카드 도감 기능 추가
* 인앱결제 기반 프리미엄 리딩 추가
* 앱스토어/플레이스토어 배포용 개인정보 처리방침 URL 연결
