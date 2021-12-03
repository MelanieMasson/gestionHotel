package fr.m2i.gestionHotel.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "client", schema = "gestion_hotel", catalog = "")
public class ClientEntity {
    private int id;
    private String nomComplet;
    private String telephone;
    private String email;
    private String adresse;

    public ClientEntity() {
    }

    public ClientEntity(int id, String nomComplet, String telephone, String email, String adresse) {
        this.id = id;
        this.nomComplet = nomComplet;
        this.telephone = telephone;
        this.email = email;
        this.adresse = adresse;
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
    @Column(name = "nom_complet", nullable = false, length = 100)
    public String getNomComplet() {
        return nomComplet;
    }

    public void setNomComplet(String nomComplet) {
        this.nomComplet = nomComplet;
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
    @Column(name = "adresse", nullable = false, length = 130)
    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClientEntity that = (ClientEntity) o;
        return id == that.id && Objects.equals(nomComplet, that.nomComplet) && Objects.equals(telephone, that.telephone) && Objects.equals(email, that.email) && Objects.equals(adresse, that.adresse);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nomComplet, telephone, email, adresse);
    }
}
