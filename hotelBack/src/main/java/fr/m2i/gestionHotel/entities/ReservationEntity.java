package fr.m2i.gestionHotel.entities;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "reservation", schema = "gestion_hotel", catalog = "")
public class ReservationEntity {
    private int id;
    private ClientEntity client;
    private HotelEntity hotel;
    private Date datedeb;
    private Date datefin;
    private int numChambre;

    public ReservationEntity() {
    }

    public ReservationEntity(int id, ClientEntity client, HotelEntity hotel, Date datedeb, Date datefin, int numChambre) {
        this.id = id;
        this.client = client;
        this.hotel = hotel;
        this.datedeb = datedeb;
        this.datefin = datefin;
        this.numChambre = numChambre;
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
    @Column(name = "datedeb", nullable = false)
    public Date getDatedeb() {
        return datedeb;
    }

    public void setDatedeb(Date datedeb) {
        this.datedeb = datedeb;
    }

    @Basic
    @Column(name = "datefin", nullable = false)
    public Date getDatefin() {
        return datefin;
    }

    public void setDatefin(Date datefin) {
        this.datefin = datefin;
    }

    @Basic
    @Column(name = "num_chambre", nullable = false)
    public int getNumChambre() {
        return numChambre;
    }

    public void setNumChambre(int numChambre) {
        this.numChambre = numChambre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReservationEntity that = (ReservationEntity) o;
        return id == that.id && Objects.equals(datedeb, that.datedeb) && Objects.equals(datefin, that.datefin) && Objects.equals(numChambre, that.numChambre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, datedeb, datefin, numChambre);
    }

    @ManyToOne
    @JoinColumn(name = "client", referencedColumnName = "id", nullable = false)
    public ClientEntity getClient() {
        return client;
    }

    public void setClient(ClientEntity client) {
        this.client = client;
    }

    @ManyToOne
    @JoinColumn(name = "hotel", referencedColumnName = "id", nullable = false)
    public HotelEntity getHotel() {
        return hotel;
    }

    public void setHotel(HotelEntity hotel) {
        this.hotel = hotel;
    }
}
