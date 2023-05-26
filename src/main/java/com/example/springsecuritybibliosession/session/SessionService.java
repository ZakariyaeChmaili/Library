package com.example.springsecuritybibliosession.session;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
@Component("SessionServiceBean")
public class SessionService {


    private Map<String,String> sessionList = new HashMap<>();

    public String generateSessionId(String username){

        String sessionId = UUID.randomUUID().toString();
        sessionList.put(sessionId,username);
        System.out.println("sessionList inside sessionService");
        return sessionId;
    }

    public String getUsernameBySessionId(String sessionId){
        String username = sessionList.get(sessionId);
        return username;
    }

    public void deleteSessionBySessionId(String sessionId){
    sessionList.remove(sessionId);
    }
}
