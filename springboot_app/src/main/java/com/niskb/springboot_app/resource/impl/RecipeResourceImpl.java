package com.niskb.springboot_app.resource.impl;

import com.niskb.model.Recipe;
import com.niskb.springboot_app.resource.Resource;
import com.niskb.springboot_app.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/recipes")
public class RecipeResourceImpl implements Resource<Recipe> {

    @Autowired
    private RecipeService recipeService;

    @Override
    public ResponseEntity<Collection<Recipe>> findAll() {
        return new ResponseEntity<>(recipeService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Recipe> findRecipeById(Long id) {
        return new ResponseEntity<>(recipeService.findRecipeById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Recipe> saveRecipe(Recipe recipe) {
        return new ResponseEntity<>(recipeService.saveRecipe(recipe), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Recipe> updateRecipe(Recipe recipe) {
        return new ResponseEntity<>(recipeService.updateRecipe(recipe), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Recipe> deleteRecipeById(Long id) {
        return new ResponseEntity<>(recipeService.deleteRecipeById(id), HttpStatus.OK);
    }
}
