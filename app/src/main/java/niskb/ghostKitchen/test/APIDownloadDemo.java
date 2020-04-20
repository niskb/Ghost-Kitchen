package niskb.ghostKitchen.test;

import niskb.ghostKitchen.api.Downloader;
import niskb.ghostKitchen.api.Loader;
import niskb.ghostKitchen.api.Saver;
import niskb.ghostKitchen.model.RecipeBag;

public class APIDownloadDemo {

    public static void main(String[] args) {
        RecipeBag recipeBag = Downloader.downloadData();
        Saver.saveRecipes(recipeBag);
        recipeBag = Loader.loadRecipes();
        recipeBag.displayRecipesInConsole();
    }

}
