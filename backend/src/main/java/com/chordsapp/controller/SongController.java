package com.chordsapp.controller;

import com.chordsapp.dto.SongDetailDto;
import com.chordsapp.dto.SongSummaryDto;
import com.chordsapp.service.SongService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping
    public List<SongSummaryDto> listSongs(@RequestParam(required = false) String search) {
        return songService.findAll(search);
    }

    @GetMapping("/{id}")
    public SongDetailDto getSong(@PathVariable Long id) {
        return songService.findById(id);
    }
}
