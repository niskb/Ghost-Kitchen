package com.niskb.model;

public class Recipe {

    private Long id;
    private String title;
    private String href = "";
    private String ingredients = "";
    private String thumbnail = "";
    private String price = "";
    private static Long idCounter = 1L;

    @Override
    public String toString() {
        return "Id: " + id + " [Title: " + title + "; HREF: " + href + "; Ingredients: " + ingredients + "; Thumbnail: " + thumbnail + "; Price: " + price + "]";
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}