package fr.m2i.gestionhotel.api;

import fr.m2i.gestionhotel.entities.ReservationEntity;
import fr.m2i.gestionhotel.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.io.InvalidObjectException;

@RestController()
@RequestMapping("/api/reservation")
public class ReservationAPIController {

    @Autowired
    private ReservationService rservice;

    public ReservationAPIController( ReservationService rservice ){
        this.rservice = rservice;
    }

    @GetMapping(value="" , produces = "application/json")
    public Iterable<ReservationEntity> findAll(HttpServletRequest request ){
        String search = request.getParameter("search");
        return rservice.findAll();
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    public ResponseEntity<ReservationEntity> findReservationById(@PathVariable("id") int id) {
        try{
            ReservationEntity r = rservice.findReservationById(id);
            return ResponseEntity.ok().body(r);
        }catch( Exception e ) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value="" , consumes = "application/json")
    public ResponseEntity<ReservationEntity> addReservation(@RequestBody ReservationEntity r ) {
        try{
            rservice.addReservation( r );
            return ResponseEntity.ok(r);
        }catch ( InvalidObjectException e ){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST , e.getMessage() );
        }
    }

    @PutMapping(path = "/{id}", produces = "application/json")
    public ResponseEntity<ReservationEntity> editReservation(@PathVariable(name = "id") int id, @RequestBody ReservationEntity r) {
        try{
            rservice.editReservation( id,  r );
            return ResponseEntity.ok(r);
        }catch ( Exception e ){
            System.out.println(e.getMessage());
            throw new ResponseStatusException( HttpStatus.BAD_REQUEST , e.getMessage() );
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Object> deleteReservation(@PathVariable(name = "id")int id) {
        try {
            rservice.deleteReservation(id);
            return ResponseEntity.ok().body(null);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException( HttpStatus.BAD_REQUEST , e.getMessage() );
        }
    }

}