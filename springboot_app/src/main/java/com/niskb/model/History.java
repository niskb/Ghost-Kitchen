package com.niskb.model;

import java.io.Serializable;

public class History implements Serializable {

    private Long id;
    private String mealsString;
    private String total;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    private static Long idCounter = 1L;

    @Override
    public String toString() {
        System.out.print("[ [History]" + "\nId: " + id + "\n[Meals Included]" + mealsString + ";\nOrder Total: $" + total + "; Name: " + name + "; Email: " + email + "; Address: " + address + "; Phone Number: " + phoneNumber + "] ]");
        return "";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMeals() {
        return mealsString;
    }

    public void setMeals(String meals) {
        this.mealsString = meals;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
