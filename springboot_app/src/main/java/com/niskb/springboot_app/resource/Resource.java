package com.niskb.springboot_app.resource;

import com.niskb.model.Recipe;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

public interface Resource<T> {

    @GetMapping
    ResponseEntity<Collection<T>> findAll();

    @GetMapping("/{id}")
    ResponseEntity<T> findRecipeById(@PathVariable Long id);

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<T> saveRecipe(@RequestBody T t);

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<T> updateRecipe(@RequestBody T t);

    @DeleteMapping("/{id}")
    ResponseEntity<T> deleteRecipeById(@PathVariable Long id);

}
