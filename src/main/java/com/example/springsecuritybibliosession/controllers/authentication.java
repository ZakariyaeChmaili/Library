package com.example.springsecuritybibliosession.controllers;

import com.example.springsecuritybibliosession.entities.UserEntity;
import com.example.springsecuritybibliosession.services.ImpUserDetailsService;
import com.example.springsecuritybibliosession.session.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController

@RequestMapping("authentication/")
public class authentication {
    private final SessionService sessionService;
    private final AuthenticationManager authenticationManager;
    private final ImpUserDetailsService userService;

    authentication(SessionService sessionService, AuthenticationManager authenticationManager, ImpUserDetailsService userService) {
        this.sessionService = sessionService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }
    @PostMapping("login")
    public ResponseEntity<Map> login(@RequestBody UserEntity user) {
        Authentication auth = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        this.authenticationManager.authenticate(auth);//
        String sessionId = this.sessionService.generateSessionId(user.getUsername());
        return ResponseEntity.ok(Map.of("user", user, "sessionId", sessionId));
    }

    @PostMapping("logout")
    public ResponseEntity<Map> logout(@RequestHeader("sessionId") String sessionId) {
        this.sessionService.deleteSessionBySessionId(sessionId);
        return ResponseEntity.ok(Map.of("msg", "logout successfully"));
    }


    @PostMapping("signup")
    public ResponseEntity<Map> signup(@RequestBody UserEntity user){
        if(this.userService.CheckUsernameIfExist(user.getUsername())){
            return ResponseEntity.badRequest().body(Map.of("msg","username already exist"));
        }
        this.userService.saveUser(user);
        return ResponseEntity.ok(Map.of("msg","account has been created"));
    }
}
