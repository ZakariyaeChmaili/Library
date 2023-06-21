package com.example.springsecuritybibliosession.session;

import com.example.springsecuritybibliosession.entities.UserEntity;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Enumeration;

@Component
public class SessionFilter extends OncePerRequestFilter {
    public SessionService sessionService;
    SessionFilter(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String sessionId = request.getHeader("sessionId");
        if (sessionId != null && !sessionId.equals("")) {
            String username = this.sessionService.getUsernameBySessionId(sessionId);
            if (username != null && !username.equals("")) {
                UserEntity user = new UserEntity();
                user.setUsername(username);
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), user.getAuthorities())
                );
            }
        }
        filterChain.doFilter(request, response);
    }
}
