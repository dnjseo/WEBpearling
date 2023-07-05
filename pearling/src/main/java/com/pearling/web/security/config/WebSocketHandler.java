// package com.pearling.web.security.config;

// import java.util.Map;
// import java.util.concurrent.ConcurrentHashMap;

// import org.springframework.web.socket.CloseStatus;
// import org.springframework.web.socket.TextMessage;
// import org.springframework.web.socket.WebSocketSession;
// import org.springframework.web.socket.handler.TextWebSocketHandler;

// import lombok.extern.slf4j.Slf4j;

// @Slf4j
// public class WebSocketHandler extends TextWebSocketHandler {
    
//     // 접속한 사용자들에 대한 정보를 저장하는 전역변수, key:세션 ID, value:세션
// 	private Map<String, WebSocketSession> 
//     users = new ConcurrentHashMap<String, WebSocketSession>();

//     // 웹소켓 연결
//     public void afterConnectionEstablished(WebSocketSession session) {
//         // 최초 연결 시, MAP 자료 구조에 세션 저장. -> 접속중인 모든 세션에 새로운 메시지 전송.
//         super.afterConnectionEstablished(session);

//         String sessionId = session.getId();
//         users.put(sessionId, session);

//         Message message = Message.builder().sender(sessionId).receiver("all").build();
//         message.newConnect();

//         users.values().forEach(s -> {
//             try {
//                 if(!s.getId().equals(sessionId)) {
//                     s.sendMessage(new TextMessage(Utils.getString(message)));
//                 }
//             }
//             catch (Exception e)  {

//             }
//         });


//     }

//     // 양방향 데이터 통신
//     protected void handleTextMessage(WebSocketSession session, TextMessage message) {

//     }
    
//     // 웹소켓 연결 종료
//     public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        
//     }

//     // 웹소켓 통신 에러
//     public void handleTransportError(WebSocketSession session, Throwable exception) {

//     }
// }
