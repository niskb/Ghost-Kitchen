package niskb.ghostKitchen.web;

import niskb.ghostKitchen.model.Restaurant;
import niskb.ghostKitchen.model.RestaurantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RestaurantController {

    private final Logger log = LoggerFactory.getLogger(RestaurantController.class);
    private RestaurantRepository restaurantRepository;

    public RestaurantController(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @GetMapping("/restaurants")
    Collection<Restaurant> restaurants() {
        return restaurantRepository.findAll();
    }

    @GetMapping("/restaurant/{id}")
    ResponseEntity<?> getRestaurant(@PathVariable Long id) {
        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        return restaurant.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/restaurant")
    ResponseEntity<Restaurant> createRestaurant(@Valid @RequestBody Restaurant restaurant) throws URISyntaxException {
        log.info("REQUEST TO *CREATE* RESTAURANT: {}", restaurant);
        Restaurant result = restaurantRepository.save(restaurant);
        return ResponseEntity.created(new URI("/api/restaurant/" + result.getId()))
                .body(result);
    }

    @DeleteMapping("/restaurant/{id}")
    public ResponseEntity<?> deleteRestaurant(@PathVariable Long id) {
        log.info("REQUEST TO *DELETE* RESTAURANT: {}", id);
        restaurantRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}