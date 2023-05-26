package com.example.springsecuritybibliosession.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Livre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long code;
    private String auteur;
    private String titre;
    private int nb_exemplaire;
    private String url;

}
