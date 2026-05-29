package com.chordsapp.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String bio;

    @OneToMany(mappedBy = "artist")
    private List<Song> songs = new ArrayList<>();

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getBio() { return bio; }
    public List<Song> getSongs() { return songs; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setBio(String bio) { this.bio = bio; }
    public void setSongs(List<Song> songs) { this.songs = songs; }
}