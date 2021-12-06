package fr.m2i.gestionhotel.service;

import fr.m2i.gestionhotel.entities.ReservationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.io.InvalidObjectException;
import java.util.NoSuchElementException;

interface ReservationRepository extends CrudRepository<ReservationEntity , Integer> {
}

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository rr;

    public ReservationService(ReservationRepository rr){
        this.rr = rr;
    }

    public Iterable<ReservationEntity> findAll() { return rr.findAll(); }

    public ReservationEntity findReservationById(int id) {return rr.findById(id).get();}

    private void checkReservation( ReservationEntity r ) throws InvalidObjectException {

        if( r.getClient() == null){
            throw new InvalidObjectException("Client invalide");
        }
        if( r.getHotel() == null){
            throw new InvalidObjectException("Hotel invalide");
        }
        if( r.getDatedeb().compareTo(r.getDatefin()) >= 0){
            throw new InvalidObjectException("Durée invalide : la réservation doit faire au moins un jour et le jour d'arrivé doit être antérieur au jour de départ");
        }
    }

    public void addReservation(ReservationEntity r) throws InvalidObjectException {
        checkReservation(r);
        rr.save(r);
    }

    public void editReservation(int id, ReservationEntity r) throws InvalidObjectException {
        checkReservation(r);
        try{
            ReservationEntity rExistant = rr.findById(id).get();
            rExistant.setClient( r.getClient() );
            rExistant.setHotel( r.getHotel() );
            rExistant.setDatedeb( r.getDatedeb() );
            rExistant.setDatefin( r.getDatefin() );
            rExistant.setNumChambre( r.getNumChambre() );
            rr.save( rExistant );

        }catch ( NoSuchElementException e ){
            throw e;
        }
    }

    public void deleteReservation(int id) { rr.deleteById(id); }
}
