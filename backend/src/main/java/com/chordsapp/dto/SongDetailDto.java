package com.chordsapp.dto;

public record SongDetailDto(
        Long id,
        String title,
        Long artistId,
        String artistName,
        String chords,
        String lyrics
) {}
