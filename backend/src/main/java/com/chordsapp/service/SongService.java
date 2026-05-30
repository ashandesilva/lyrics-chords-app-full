package com.chordsapp.service;

import com.chordsapp.dto.SongDetailDto;
import com.chordsapp.dto.SongSummaryDto;
import com.chordsapp.exception.ApiException;
import com.chordsapp.model.Song;
import com.chordsapp.repository.SongRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {

    private final SongRepository songRepository;

    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    public List<SongSummaryDto> findAll(String search) {
        List<Song> songs = (search == null || search.isBlank())
                ? songRepository.findAll()
                : songRepository.findByTitleContainingIgnoreCaseOrArtist_NameContainingIgnoreCase(search.trim(), search.trim());

        return songs.stream()
                .map(this::toSummary)
                .toList();
    }

    public SongDetailDto findById(Long id) {
        Song song = songRepository.findById(id)
                .orElseThrow(() -> new ApiException("Song not found", HttpStatus.NOT_FOUND));
        return toDetail(song);
    }

    private SongSummaryDto toSummary(Song song) {
        return new SongSummaryDto(
                song.getId(),
                song.getTitle(),
                song.getArtist().getName(),
                song.getChords()
        );
    }

    private SongDetailDto toDetail(Song song) {
        return new SongDetailDto(
                song.getId(),
                song.getTitle(),
                song.getArtist().getId(),
                song.getArtist().getName(),
                song.getChords(),
                song.getLyrics()
        );
    }
}
