package niskb.ghostKitchen.model;

import java.io.Serializable;

public class Recipe implements Serializable {

    private String title;
    private String href;
    private String ingredients;
    private String thumbnail;
    private double price;

    public Recipe(String title, String href, String ingredients, String thumbnail) {
        this.title = title;
        this.href = href;
        this.ingredients = ingredients;
        this.thumbnail = thumbnail;
        int ingredientCount = 1;
        for (int i = 0; i < ingredients.length(); i++) {
            if (ingredients.charAt(i) == ',') {
                ingredientCount++;
            }
        }
        double rate = Math.random() * 0.25;
        final double TIP_RATE = 13.25;
        this.price = (rate * (ingredientCount / 2.0000)) + TIP_RATE;

    }

    public String getTitle() {
        return title;
    }

    public String getHref() {
        return href;
    }

    public String getIngredients() {
        return ingredients;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public double getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return "[Title = " + title + ", HREF = " + href + ", Ingredients = " + ingredients + ", Thumbnail = " + thumbnail + ", Price = $" + String.format("%.2f", this.price) + "]";
    }

}
