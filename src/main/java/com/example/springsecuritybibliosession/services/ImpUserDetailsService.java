package com.example.springsecuritybibliosession.services;

import com.example.springsecuritybibliosession.entities.UserEntity;
import com.example.springsecuritybibliosession.repositories.AuthenticationRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("ImpUserDetailsServiceBean")
public class ImpUserDetailsService implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationRepository authenticationRepository;

    public ImpUserDetailsService(PasswordEncoder passwordEncoder, AuthenticationRepository authenticationRepository) {
        this.passwordEncoder = passwordEncoder;
        this.authenticationRepository = authenticationRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("inside impUsreDetails " + username);
        UserEntity user = this.authenticationRepository.findById(username).orElse(null);
        System.out.println("user:");
        System.out.println(user);
        return user;
    }


    public boolean CheckUsernameIfExist(String username) {
        UserEntity user = this.authenticationRepository.findById(username).orElse(null);
        return user != null;

    }

    public void saveUser(UserEntity user){
        String password = user.getPassword();
        password = this.passwordEncoder.encode(password);
        user.setPassword(password);
        this.authenticationRepository.save(user);
    }
}
