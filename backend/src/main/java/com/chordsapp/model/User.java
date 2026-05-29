package com.chordsapp.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String role; // "USER" or "ADMIN"

    @ManyToMany
    @JoinTable(name = "user_fav_songs",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "song_id"))
    private Set<Song> favoriteSongs = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_fav_artists",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "artist_id"))
    private Set<Artist> favoriteArtists = new HashSet<>();

    // Getters
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
    public Set<Song> getFavoriteSongs() { return favoriteSongs; }
    public Set<Artist> getFavoriteArtists() { return favoriteArtists; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; }
    public void setFavoriteSongs(Set<Song> favoriteSongs) { this.favoriteSongs = favoriteSongs; }
    public void setFavoriteArtists(Set<Artist> favoriteArtists) { this.favoriteArtists = favoriteArtists; }
}