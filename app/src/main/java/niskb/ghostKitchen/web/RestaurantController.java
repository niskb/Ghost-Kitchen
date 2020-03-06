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
    Collection<Restaurant> groups() {
        return restaurantRepository.findAll();
    }

    @GetMapping("/restaurant/{id}")
    ResponseEntity<?> getGroup(@PathVariable Long id) {
        Optional<Restaurant> group = restaurantRepository.findById(id);
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/restaurant")
    ResponseEntity<Restaurant> createGroup(@Valid @RequestBody Restaurant restaurant) throws URISyntaxException {
        log.info("Request to create restaurant: {}", restaurant);
        Restaurant result = restaurantRepository.save(restaurant);
        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
                .body(result);
    }

    @PutMapping("/restaurant/{id}")
    ResponseEntity<Restaurant> updateGroup(@Valid @RequestBody Restaurant restaurant) {
        log.info("Request to update restaurant: {}", restaurant);
        Restaurant result = restaurantRepository.save(restaurant);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/restaurant/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Request to delete restaurant: {}", id);
        restaurantRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}