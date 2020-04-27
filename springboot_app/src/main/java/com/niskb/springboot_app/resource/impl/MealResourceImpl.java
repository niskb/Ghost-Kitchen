package com.niskb.springboot_app.resource.impl;

import com.niskb.model.Meal;
import com.niskb.springboot_app.resource.Resource;
import com.niskb.springboot_app.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/meals")
@CrossOrigin(origins="http://localhost:3000")
public class MealResourceImpl implements Resource<Meal> {

    @Autowired
    private MealService mealService;

    @Override
    public ResponseEntity<Collection<Meal>> findAll() {
        return new ResponseEntity<>(mealService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Meal> findById(Long id) {
        return new ResponseEntity<>(mealService.findMealById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Meal> save(Meal recipe) {
        return new ResponseEntity<>(mealService.saveMeal(recipe), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Meal> update(Meal recipe) {
        return new ResponseEntity<>(mealService.updateMeal(recipe), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Meal> deleteById(Long id) {
        return new ResponseEntity<>(mealService.deleteMealById(id), HttpStatus.OK);
    }
}
