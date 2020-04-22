package com.niskb.springboot_app.service;

import com.niskb.model.Recipe;

import java.util.Collection;

public interface RecipeService {

    Collection<Recipe> findAll();

    Recipe findRecipeById(Long id);

    Recipe saveRecipe(Recipe recipe);

    Recipe updateRecipe(Recipe recipe);

    Recipe deleteRecipeById(Long id);

}
