package com.niskb.springboot_app.service;

import com.niskb.model.Meal;

import java.util.Collection;

public interface MealService {

    Collection<Meal> findAll();

    Meal findMealById(Long id);

    Meal saveMeal(Meal meal);

    Meal updateMeal(Meal meal);

    Meal deleteMealById(Long id);

}
