package niskb.ghostKitchen;

import niskb.ghostKitchen.model.Event;
import niskb.ghostKitchen.model.Restaurant;
import niskb.ghostKitchen.model.RestaurantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final RestaurantRepository repository;

    public Initializer(RestaurantRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Friendly's", "Bubba's Burrito Bar", "Taco Bell",
                "Burger King").forEach(name ->
                repository.save(new Restaurant(name))
        );

        Restaurant restaurant = repository.findByName("Bubba's Burrito Bar");
        restaurant.setAddress("513 Main St");
        restaurant.setCity("Islip");
        restaurant.setStateOrProvince("New York");
        restaurant.setPostalCode("11751");
        restaurant.setCountry("United States");
        Event e = Event.builder().title("CSE Meetup")
                .description("Meetup in Islip")
                .date(Instant.parse("2020-03-03T12:00:00.000Z"))
                .build();
        restaurant.setEvents(Collections.singleton(e));
        repository.save(restaurant);

        repository.findAll().forEach(System.out::println);
    }
}