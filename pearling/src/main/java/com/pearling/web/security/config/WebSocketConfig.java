// package com.pearling.web.security.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.socket.config.annotation.EnableWebSocket;
// import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
// import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

// @Configuration // 빈에 담아주기
// @EnableWebSocket // 웹소켓 서버를 사용하도록 정의
// public class WebSocketConfig implements WebSocketConfigurer  {

//     @Override
//     public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

//         registry
//         .addHandler(signalingSocketHandler(), "/alert") // 웹소켓 서버의 엔드포인트
//         .setAllowedOrigins("*"); // 클라이언트에서 웹소켓 서버에 요청 시 모든 요청 수용. (CORS)
//     }

//     @Bean
//     public WebSocketHandler signalingSocketHandler() {
//         return new WebSocketHandler(); // 해당 클래스를 웹소켓 핸들러로 정의.
//     }
    
// }
