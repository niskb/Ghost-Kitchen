package niskb.ghostKitchen.model;

import java.io.Serializable;

public class RecipeBag implements Serializable {

    private Recipe[] recipes;
    private int nElems;

    public RecipeBag(int maxSize) {
        recipes = new Recipe[maxSize];
        nElems = 0;
    }

    public void insertRecipe(Recipe recipe) {
        recipes[nElems++] = recipe;
    }

    public void displayRecipesInConsole() {
    for(int i = 0; i < nElems; i++) {
        System.out.println(recipes[i]);
    }
    }

}
