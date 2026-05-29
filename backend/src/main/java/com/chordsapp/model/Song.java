package com.chordsapp.model;

import jakarta.persistence.*;

@Entity
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String lyrics;

    @Lob
    private String chords;

    @ManyToOne
    private Artist artist;

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getLyrics() { return lyrics; }
    public String getChords() { return chords; }
    public Artist getArtist() { return artist; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setLyrics(String lyrics) { this.lyrics = lyrics; }
    public void setChords(String chords) { this.chords = chords; }
    public void setArtist(Artist artist) { this.artist = artist; }
}