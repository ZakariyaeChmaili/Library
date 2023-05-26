package com.example.springsecuritybibliosession.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springsecuritybibliosession.entities.Livre;
public interface LivreRepository extends JpaRepository<Livre,Long> {

}
