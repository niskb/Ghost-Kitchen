package niskb.ghostKitchen.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_restaurant")
public class Restaurant {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private String address = "";
    private String city = "";
    private String stateOrProvince = "";
    private String country = "";
    private String postalCode = "";
    private String phoneNumber = "";
}