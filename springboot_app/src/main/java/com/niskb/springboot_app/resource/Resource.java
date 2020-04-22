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
    ResponseEntity<T> findById(@PathVariable Long id);

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<T> save(@RequestBody T t);

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<T> update(@RequestBody T t);

    @DeleteMapping("/{id}")
    ResponseEntity<T> deleteById(@PathVariable Long id);

}
