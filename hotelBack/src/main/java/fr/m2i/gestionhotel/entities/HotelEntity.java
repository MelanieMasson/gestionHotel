package fr.m2i.gestionhotel.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "hotel", schema = "gestion_hotel", catalog = "")
public class HotelEntity {
    private int id;
    private String nom;
    private int etoiles;
    private String adresse;
    private String telephone;
    private String email;
    private String ville;
    private String images;

    public HotelEntity() {
    }

    public HotelEntity(int id, String nom, Integer etoiles, String adresse, String telephone, String email, String ville, String images) {
        this.id = id;
        this.nom = nom;
        this.etoiles = etoiles;
        this.adresse = adresse;
        this.telephone = telephone;
        this.email = email;
        this.ville = ville;
        this.images = images;
    }

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "nom", nullable = false, length = 100)
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    @Basic
    @Column(name = "images", nullable = true, length = 200)
    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    @Basic
    @Column(name = "etoiles", nullable = true)
    public int getEtoiles() {
        return etoiles;
    }

    public void setEtoiles(int etoiles) {
        this.etoiles = etoiles;
    }

    @Basic
    @Column(name = "adresse", nullable = false, length = 130)
    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    @Basic
    @Column(name = "telephone", nullable = false, length = 20)
    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    @Basic
    @Column(name = "email", nullable = false, length = 100)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "ville", nullable = false, length = 100)
    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HotelEntity that = (HotelEntity) o;
        return id == that.id && Objects.equals(images, that.images) && Objects.equals(nom, that.nom) && Objects.equals(etoiles, that.etoiles) && Objects.equals(adresse, that.adresse) && Objects.equals(telephone, that.telephone) && Objects.equals(email, that.email) && Objects.equals(ville, that.ville);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nom, etoiles, adresse, telephone, email, ville, images);
    }

}
