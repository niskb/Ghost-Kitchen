package com.niskb.model;

import java.io.Serializable;

public class RecipePuppyBag implements Serializable {

    private RecipePuppy[] recipes;
    private int nElems;

    public RecipePuppyBag(int maxSize) {
        recipes = new RecipePuppy[maxSize];
        nElems = 0;
    }

    public void insertRecipe(RecipePuppy recipe) {
        recipes[nElems++] = recipe;
    }

    public RecipePuppy getRecipe(int i) {
        return recipes[i];
    }

    public void displayRecipesInConsole() {
        for(int i = 0; i < nElems; i++) {
            System.out.println(recipes[i]);
        }
    }

    public int getNElems() {
        return nElems;
    }

}
