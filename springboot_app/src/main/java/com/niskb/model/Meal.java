package com.niskb.model;

import java.io.Serializable;

public class Meal implements Serializable {

    private Long id;
    private String title = "";
    private String href = "";
    private String ingredients = "";
    private String thumbnail = "";
    private String price = "";
    private String isSuggested = "";
    private String isSelected = "";
    private int quantity = 0;
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

    public String getIsSuggested() {
        return this.isSuggested;
    }

    public String setIsSuggested(String isSuggested) {
        return this.isSuggested = isSuggested;
    }

    public String getIsSelected() {
        return this.isSelected;
    }

    public String setIsSelected(String isSelected) {
        return this.isSelected = isSelected;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public int setQuantity(int quantity) {
        return this.quantity = quantity;
    }

}