package niskb.ghostKitchen;

import niskb.ghostKitchen.model.Event;
import niskb.ghostKitchen.model.Group;
import niskb.ghostKitchen.model.GroupRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final GroupRepository repository;

    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Friendly's", "Bubba's Burrito Bar", "Taco Bell",
                "Miller's Ale House").forEach(name ->
                repository.save(new Group(name))
        );

        Group restaurant = repository.findByName("Friendly's");
        Event e = Event.builder().title("Free ice-cream")
                .description("Free ice-cream for one day")
                .date(Instant.parse("2018-12-12T18:00:00.000Z"))
                .build();
        restaurant.setEvents(Collections.singleton(e));
        repository.save(restaurant);

        repository.findAll().forEach(System.out::println);
    }
}