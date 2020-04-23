package com.niskb.springboot_app.resource.impl;

import com.niskb.model.Recipe;
import com.niskb.springboot_app.resource.Resource;
import com.niskb.springboot_app.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins="http://localhost:3000")
public class RecipeResourceImpl implements Resource<Recipe> {

    @Autowired
    private RecipeService recipeService;

    @Override
    public ResponseEntity<Collection<Recipe>> findAll() {
        return new ResponseEntity<>(recipeService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Recipe> findById(Long id) {
        return new ResponseEntity<>(recipeService.findRecipeById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Recipe> save(Recipe recipe) {
        return new ResponseEntity<>(recipeService.saveRecipe(recipe), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Recipe> update(Recipe recipe) {
        return new ResponseEntity<>(recipeService.updateRecipe(recipe), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Recipe> deleteById(Long id) {
        return new ResponseEntity<>(recipeService.deleteRecipeById(id), HttpStatus.OK);
    }
}
