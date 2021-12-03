package entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "reservation", schema = "gestion_hotel", catalog = "")
public class ReservationEntity {
    private int id;
    private int client;
    private int hotel;
    private Date datedeb;
    private Date datefin;
    private int numChambre;
    private ClientEntity clientByClient;
    private HotelEntity hotelByHotel;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "client", nullable = false)
    public int getClient() {
        return client;
    }

    public void setClient(int client) {
        this.client = client;
    }

    @Basic
    @Column(name = "hotel", nullable = false)
    public int getHotel() {
        return hotel;
    }

    public void setHotel(int hotel) {
        this.hotel = hotel;
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
        return id == that.id && client == that.client && hotel == that.hotel && numChambre == that.numChambre && Objects.equals(datedeb, that.datedeb) && Objects.equals(datefin, that.datefin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, client, hotel, datedeb, datefin, numChambre);
    }

    @ManyToOne
    @JoinColumn(name = "client", referencedColumnName = "id", nullable = false)
    public ClientEntity getClientByClient() {
        return clientByClient;
    }

    public void setClientByClient(ClientEntity clientByClient) {
        this.clientByClient = clientByClient;
    }

    @ManyToOne
    @JoinColumn(name = "hotel", referencedColumnName = "id", nullable = false)
    public HotelEntity getHotelByHotel() {
        return hotelByHotel;
    }

    public void setHotelByHotel(HotelEntity hotelByHotel) {
        this.hotelByHotel = hotelByHotel;
    }
}
