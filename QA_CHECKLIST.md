# Mystic Tarot QA Checklist

## QA 1차

* 이슈명: 운세 항목 선택 전 시작 가능 여부
* 재현 단계: 로비 진입 후 아무 항목도 선택하지 않고 카드 뽑기 시작 버튼 확인
* 기대 결과: 버튼 비활성화
* 실제 결과: `disabled={!selectedCategory}`로 비활성화
* 심각도: Blocker 예방
* 수정 담당: Dev Agent A
* 재검증 결과: TypeScript 검사 통과

* 이슈명: 카드 3장 제한
* 재현 단계: 카드 선택 화면에서 4장 이상 터치 시도
* 기대 결과: 3장 이후 추가 선택 불가
* 실제 결과: `selectedCards.length >= 3` 조건으로 추가 입력 차단
* 심각도: Critical 예방
* 수정 담당: Dev Agent A
* 재검증 결과: `createRandomCardSelections` 테스트 통과

* 이슈명: 결과 보기 버튼 활성화 조건
* 재현 단계: 0장, 1장, 2장, 3장 선택 상태에서 버튼 확인
* 기대 결과: 3장 선택 완료 시에만 활성화
* 실제 결과: `selectedCards.length !== 3` 조건으로 제어
* 심각도: Major 예방
* 수정 담당: Dev Agent A
* 재검증 결과: TypeScript 검사 통과

## QA 2차

* 이슈명: 카드 중복 배정
* 재현 단계: 결과 세션용 카드 3장을 생성
* 기대 결과: 같은 세션 내 동일 카드 없음
* 실제 결과: 셔플 후 3장 추출, 중복 resolve 시 에러
* 심각도: Critical 예방
* 수정 담당: Dev Agent B
* 재검증 결과: `draws three unique cards` 테스트 통과

* 이슈명: 정방향/역방향 랜덤 배정
* 재현 단계: 카드 선택 세션 생성
* 기대 결과: 각 카드에 `upright` 또는 `reversed` 포함
* 실제 결과: `randomDirection()`으로 방향 배정
* 심각도: Major 예방
* 수정 담당: Dev Agent B
* 재검증 결과: `draws three unique cards` 테스트 통과

* 이슈명: mock 광고 보상 흐름
* 재현 단계: 상세 해석 버튼 클릭 후 1초 대기
* 기대 결과: 성공 보상 후 상세 영역 공개
* 실제 결과: `mockRewardAd()`가 1000ms 후 `{ success: true }` 반환
* 심각도: Major 예방
* 수정 담당: Dev Agent B
* 재검증 결과: `mockRewardAd` fake timer 테스트 통과

## QA 3차

* 이슈명: 내부 데이터 완전성
* 재현 단계: 타로 데이터 로드
* 기대 결과: 샘플 10장, 6개 카테고리, 정/역방향 문장 존재
* 실제 결과: `tarotCards` 10장과 모든 meaning 배열 제공
* 심각도: Major 예방
* 수정 담당: Content Agent
* 재검증 결과: 데이터 완전성 테스트 통과

* 이슈명: 문장 반복감
* 재현 단계: 같은 카드 조합에 다른 랜덤 소스 적용
* 기대 결과: 무료 총평/조언/종합 흐름 중 일부가 달라짐
* 실제 결과: summary/detail/advice 배열과 lucky 요소를 랜덤 선택
* 심각도: Minor
* 수정 담당: Content Lead
* 재검증 결과: `varies wording` 테스트 통과

* 이슈명: 실행 가능성
* 재현 단계: 의존성 검사, 타입 검사, 테스트 실행
* 기대 결과: Expo SDK 호환성, TypeScript, 테스트 모두 통과
* 실제 결과: `expo-doctor`, `expo install --check`, `tsc`, `vitest` 통과
* 심각도: Critical 예방
* 수정 담당: Dev Lead
* 재검증 결과: 통과
