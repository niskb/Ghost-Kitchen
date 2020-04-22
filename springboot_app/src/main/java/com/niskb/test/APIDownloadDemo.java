package com.niskb.test;

import com.niskb.api.Downloader;
import com.niskb.api.Loader;
import com.niskb.api.Saver;
import com.niskb.model.Recipe;
import com.niskb.model.RecipeBag;

public class APIDownloadDemo {

    public static void main(String[] args) {
        RecipeBag recipeBag = Downloader.downloadData();
        Saver.saveRecipes(recipeBag);
        recipeBag = Loader.loadRecipes();
        for(int i = 0; i < 1000; i++) {
            Recipe recipe = new Recipe();
            recipe.setTitle(recipeBag.getRecipe(i).getTitle());
            recipe.setHref(recipeBag.getRecipe(i).getHref());
            recipe.setIngredients(recipeBag.getRecipe(i).getIngredients());
            recipe.setThumbnail(recipeBag.getRecipe(i).getThumbnail());
            recipe.setPrice(recipeBag.getRecipe(i).getPrice());
            System.out.println(recipe);
        }
    }

}
