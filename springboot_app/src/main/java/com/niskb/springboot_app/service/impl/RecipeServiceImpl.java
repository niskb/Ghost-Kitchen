package com.niskb.springboot_app.service.impl;

import com.niskb.api.Loader;
import com.niskb.model.Recipe;
import com.niskb.model.RecipeBag;
import com.niskb.springboot_app.service.RecipeService;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;


@Service
public class RecipeServiceImpl implements RecipeService {

    private Long recipeId = 1L;
    private Map<Long, Recipe> recipeMap = new HashMap<Long, Recipe>();

    {
        RecipeBag recipeBag = Loader.loadRecipes();
        for(int i = 0; i < 1000; i++) {
            Recipe recipe = new Recipe();
            recipe.setTitle(recipeBag.getRecipe(i).getTitle());
            recipe.setHref(recipeBag.getRecipe(i).getHref());
            recipe.setIngredients(recipeBag.getRecipe(i).getIngredients());
            recipe.setThumbnail(recipeBag.getRecipe(i).getThumbnail());
            recipe.setPrice(recipeBag.getRecipe(i).getPrice());
            recipe.setId(recipeId++);
            System.out.println("PUTTING NEW RECIPE IN, Recipe Id: " + recipe.getId());
            recipeMap.put(recipe.getId(), recipe);
        }
    }

    @Override
    public Collection<Recipe> findAll() {
        return recipeMap.values();
    }

    @Override
    public Recipe findRecipeById(Long id) {
        return recipeMap.get(id);
    }

    @Override
    public Recipe saveRecipe(Recipe recipe) {
        Long newRecipeId = ++recipeId;
        recipe.setId(recipeId);
        System.out.println("SAVING RECIPE, Recipe Id: " + recipe.getId());
        recipeMap.put(recipe.getId(), recipe);
        return recipeMap.get(newRecipeId);
    }

    @Override
    public Recipe updateRecipe(Recipe recipe) {
        recipeId = recipe.getId();
        if(recipeMap.get(recipeId) != null) {
            System.out.println("UPDATING RECIPE, Recipe Id: " + recipe.getId());
            recipeMap.put(recipeId, recipe);
            return recipeMap.get(recipeId);
        }
        return null;
    }

    @Override
    public Recipe deleteRecipeById(Long id) {
        if(recipeMap.get(id) != null) {
            System.out.println("DELETING RECIPE, Recipe Id: " + id);
            recipeMap.remove(id);
        }
        return null;
    }
}
