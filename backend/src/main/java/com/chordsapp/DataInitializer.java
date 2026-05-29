package com.chordsapp;

import com.chordsapp.model.Artist;
import com.chordsapp.model.Song;
import com.chordsapp.model.User;
import com.chordsapp.repository.ArtistRepository;
import com.chordsapp.repository.SongRepository;
import com.chordsapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedData(
            UserRepository userRepo,
            ArtistRepository artistRepo,
            SongRepository songRepo,
            PasswordEncoder passwordEncoder) {

        return args -> {

            // ── Admin user ──────────────────────────────────────────────────
            if (!userRepo.existsByEmail("admin@chordsapp.com")) {
                User admin = new User();
                admin.setEmail("admin@chordsapp.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");
                userRepo.save(admin);
                System.out.println("✅ Admin user created: admin@chordsapp.com / admin123");
            } else {
                System.out.println("ℹ️  Admin user already exists.");
            }

            // ── Sample artists & songs ──────────────────────────────────────
            if (artistRepo.count() == 0) {

                Artist eagles = new Artist();
                eagles.setName("Eagles");
                eagles.setBio("American rock band formed in Los Angeles in 1971.");
                artistRepo.save(eagles);

                Artist oasis = new Artist();
                oasis.setName("Oasis");
                oasis.setBio("British rock band from Manchester, formed in 1991.");
                artistRepo.save(oasis);

                Artist beatles = new Artist();
                beatles.setName("The Beatles");
                beatles.setBio("English rock band from Liverpool, formed in 1960.");
                artistRepo.save(beatles);

                // Hotel California
                Song hotelCal = new Song();
                hotelCal.setTitle("Hotel California");
                hotelCal.setArtist(eagles);
                hotelCal.setChords("Bm F# A E G D Em F#");
                hotelCal.setLyrics(
                    "On a dark desert highway, cool wind in my hair\n" +
                    "Warm smell of colitas rising up through the air\n" +
                    "Up ahead in the distance, I saw a shimmering light\n" +
                    "My head grew heavy and my sight grew dim\n" +
                    "I had to stop for the night\n\n" +
                    "[Chorus]\n" +
                    "Welcome to the Hotel California\n" +
                    "Such a lovely place, such a lovely face\n" +
                    "Plenty of room at the Hotel California\n" +
                    "Any time of year, you can find it here"
                );
                songRepo.save(hotelCal);

                // Wonderwall
                Song wonderwall = new Song();
                wonderwall.setTitle("Wonderwall");
                wonderwall.setArtist(oasis);
                wonderwall.setChords("Em7 G Dsus4 A7sus4");
                wonderwall.setLyrics(
                    "Today is gonna be the day\n" +
                    "That they're gonna throw it back to you\n" +
                    "By now you should've somehow\n" +
                    "Realized what you gotta do\n\n" +
                    "[Chorus]\n" +
                    "And all the roads we have to walk are winding\n" +
                    "And all the lights that lead us there are blinding\n" +
                    "There are many things that I would like to say to you\n" +
                    "But I don't know how\n" +
                    "Because maybe, you're gonna be the one that saves me\n" +
                    "And after all, you're my wonderwall"
                );
                songRepo.save(wonderwall);

                // Blackbird
                Song blackbird = new Song();
                blackbird.setTitle("Blackbird");
                blackbird.setArtist(beatles);
                blackbird.setChords("G Am7 G/B G");
                blackbird.setLyrics(
                    "Blackbird singing in the dead of night\n" +
                    "Take these broken wings and learn to fly\n" +
                    "All your life\n" +
                    "You were only waiting for this moment to arise\n\n" +
                    "Blackbird singing in the dead of night\n" +
                    "Take these sunken eyes and learn to see\n" +
                    "All your life\n" +
                    "You were only waiting for this moment to be free"
                );
                songRepo.save(blackbird);

                System.out.println("✅ Sample artists and songs seeded.");
            }
        };
    }
}
