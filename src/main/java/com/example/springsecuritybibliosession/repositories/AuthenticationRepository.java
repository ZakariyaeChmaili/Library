package com.example.springsecuritybibliosession.repositories;

import com.example.springsecuritybibliosession.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepository extends JpaRepository<UserEntity,String> {
}
