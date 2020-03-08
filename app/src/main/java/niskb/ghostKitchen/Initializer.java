package niskb.ghostKitchen;

import niskb.ghostKitchen.model.Restaurant;
import niskb.ghostKitchen.model.RestaurantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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
        restaurant.setPhoneNumber("6316506333");
        repository.save(restaurant);

        repository.findAll().forEach(System.out::println);
    }
}