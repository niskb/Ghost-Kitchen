package com.niskb.test;

import com.niskb.api.Downloader;
import com.niskb.api.Loader;
import com.niskb.api.Saver;
import com.niskb.model.Meal;
import com.niskb.model.RecipePuppyBag;

public class APIDownloadDemo {

    public static void main(String[] args) {
        RecipePuppyBag recipePuppyBag = Downloader.downloadRecipeData(1000);
        Saver.saveRecipes(recipePuppyBag);
        recipePuppyBag = Loader.loadRecipes();
        for(int i = 0; i < 1000; i++) {
            Meal meal = new Meal();
            meal.setTitle(recipePuppyBag.getRecipe(i).getTitle());
            meal.setHref(recipePuppyBag.getRecipe(i).getHref());
            meal.setIngredients(recipePuppyBag.getRecipe(i).getIngredients());
            meal.setThumbnail(recipePuppyBag.getRecipe(i).getThumbnail());
            meal.setPrice(recipePuppyBag.getRecipe(i).getPrice());
            System.out.println(meal);
        }
    }

}
