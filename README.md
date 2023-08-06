<img src="https://capsule-render.vercel.app/api?type=rounded&color=auto&height=200&section=header&text=Pearling&fontSize=90" />

## 프로젝트 소개
일정관리와 SNS를 접목하여 성향에 따라 자신만의 공간을 꾸려갈 수 있는 웹 프로그램입니다.

## 프로그램 이용 방안
- 📆 내 일정을 관리하며, 함께하는 약속에 친구를 태그해보세요.
- ✅ 오늘 해야 할 일이 있다면, 할일에 등록하여 관리해보세요.
- 👩🏻‍💻 오늘 하루의 느낀점을 다이어리로 남겨보세요. 나만 간직하고 싶다면, 비밀글을 이용해보세요.
- 👯‍♀️ 친구의 방명록을 방문하여 기록을 남겨보세요.
- 🔍 검색 기능을 통해 친구의 공간(shell)을 방문해보세요. 친구의 일정 검색또한 가능합니다.
- 🫂 친구를 팔로우 하면, 모두의 공간인 our shell에서 친구의 일정을 확인할 수 있습니다.
- 🔔 내 다이어리에 댓글이 등록되고, 누군가 나를 팔로우 하고, 방명록에 글을 남기면 전송되는 알림을 경험해보세요.

## 개발 기간
- 2023.04.19 ~ 2023.07.19

## Team Pearling 구성
- 팀장: 서채원
- 팀원: 김도원
- 팀원: 장연주
- 팀원: 최예린

## 개발 환경
- Java
- JavaScript
- HTML/CSS
- Visual Studio Code
- Spring-Boot
- Mybatis
- MySql
- Maven
- Apache Tomcat

## 주요 기능

### 로그인 - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EB%A1%9C%EA%B7%B8%EC%9D%B8))
- spring security 로그인 구현
- 아이디, 비밀번호 유효성 검사
- 소셜 로그인 API

### 회원가입 - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85))
- 이메일 중복 검사
- 이메일 인증번호 전송
- 비밀번호 유효성 검사
- 닉네임 중복 검사

### 마이페이지 - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80))
- 프로필 변경
- 프로필 변경 내 이미지 파일업로드 구현
- 비밀번호 변경
- 회원 탈퇴
- 문의 조회, 추가, 변경, 삭제

### 알림 - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EC%95%8C%EB%A6%BC))
- 다이어리 댓글 등록 시 알림
- 팔로우 신청 시 알림
- 방명록 등록 시 알림
- 일정 등록 시, 태그 등록하면 알림

### 친구 일정 함께보기(Our Shell) - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EC%B9%9C%EA%B5%AC-%EC%9D%BC%EC%A0%95-%ED%95%A8%EA%BB%98%EB%B3%B4%EA%B8%B0))
- 친구 목록 보기
- 친구 일정 보기

### 나의 일정 관리(My Shell) - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EB%82%98%EC%9D%98-%EC%9D%BC%EC%A0%95-%EA%B4%80%EB%A6%AC))
- 캘린더 구현
- 할일 조회, 추가, 변경, 삭제
- 일정 조회, 추가, 변경, 삭제
- 일정 내 장소 카카오맵 지도 API 구현
- 일정 내 친구 태그 구현

### 다이어리 - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EB%8B%A4%EC%9D%B4%EC%96%B4%EB%A6%AC))
- 캘린더 구현
- 다이어리 조회, 추가, 변경 삭제
- 다이어리 좋아요
- 다이어리 댓글
- 다이어리 공개범위

### 방명록 - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EB%B0%A9%EB%AA%85%EB%A1%9D))
- 방명록 조회, 추가, 수정, 삭제
- 방명록 조회 시, 모달 기능

### 검색 - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EA%B2%80%EC%83%89))
- 회원 검색
- 친구 일정 검색

### 팔로우 - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%ED%8C%94%EB%A1%9C%EC%9A%B0))
- 회원 팔로우
- 회원 언팔로우
- 회원 팔로잉, 팔로우 리스트 조회

### 관리자 페이지 - [상세보기 - 위키 페이지](https://github.com/dnjseo/WEBpearling/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EA%B4%80%EB%A6%AC%EC%9E%90-%ED%8E%98%EC%9D%B4%EC%A7%80))
- 공지사항 관리
- 문의 관리

