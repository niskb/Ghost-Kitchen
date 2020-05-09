package com.niskb.springboot_app.service.impl;

import com.niskb.api.Loader;
import com.niskb.model.Meal;
import com.niskb.model.RecipePuppyBag;
import com.niskb.springboot_app.service.MealService;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;


@Service
public class MealServiceImpl implements MealService {

    private Long mealId = 1L;
    private Map<Long, Meal> mealMap = new HashMap<Long, Meal>();

    {
        RecipePuppyBag recipeBag = Loader.loadRecipes();
        for(int i = 0; i < recipeBag.getNElems(); i++) {
            Meal meal = new Meal();
            meal.setTitle(recipeBag.getRecipe(i).getTitle());
            meal.setHref(recipeBag.getRecipe(i).getHref());
            meal.setIngredients(recipeBag.getRecipe(i).getIngredients());
            meal.setThumbnail(recipeBag.getRecipe(i).getThumbnail());
            meal.setPrice(recipeBag.getRecipe(i).getPrice());
            meal.setId(mealId++);
            meal.setIsSuggested("false");
            meal.setIsSelected("false");
            meal.setQuantity(0);
            System.out.println("PUTTING NEW MEAL IN, Meal Id: " + meal.getId());
            mealMap.put(meal.getId(), meal);
        }
    }

    @Override
    public Collection<Meal> findAll() {
        return mealMap.values();
    }

    @Override
    public Meal findMealById(Long id) {
        return mealMap.get(id);
    }

    @Override
    public Meal saveMeal(Meal meal) {
        Long newMealId = ++mealId;
        meal.setId(mealId);
        System.out.println("SAVING MEAL, Meal Id: " + meal.getId());
        mealMap.put(meal.getId(), meal);
        return mealMap.get(newMealId);
    }

    @Override
    public Meal updateMeal(Meal meal) {
        mealId = meal.getId();
        if(mealMap.get(mealId) != null) {
            System.out.println("UPDATING MEAL, Meal Id: " + meal.getId());
            mealMap.put(mealId, meal);
            return mealMap.get(mealId);
        }
        return null;
    }

    @Override
    public Meal deleteMealById(Long id) {
        if(mealMap.get(id) != null) {
            System.out.println("DELETING MEAL, Meal Id: " + id);
            mealMap.remove(id);
        }
        return null;
    }
}
