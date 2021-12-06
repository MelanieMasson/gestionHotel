package fr.m2i.gestionhotel.api;

import fr.m2i.gestionhotel.entities.ClientEntity;
import fr.m2i.gestionhotel.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import javax.servlet.http.HttpServletRequest;
import java.io.InvalidObjectException;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/client")
public class ClientAPIController {

    @Autowired
    private ClientService cservice;

    public ClientAPIController( ClientService cservice ){this.cservice = cservice;}

    @GetMapping(value="" , produces = "application/json")
    public Iterable<ClientEntity> findAll( HttpServletRequest request ){
        String search = request.getParameter("search");
        return cservice.findAll();
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<ClientEntity> findClientdById(@PathVariable("id") int id) {
        try{
            ClientEntity c = cservice.findClientdById(id);
            return ResponseEntity.ok(c);
        }catch ( Exception e ){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value="" , consumes = "application/json")
    public ResponseEntity<ClientEntity> addClient(@RequestBody ClientEntity c ){
        try{
            cservice.addClient( c );
            return ResponseEntity.ok(c);

        }catch ( InvalidObjectException e ){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST , e.getMessage() );
        }
    }

    @PutMapping(value="/{id}" , consumes = "application/json")
    public void editClient(@PathVariable int id , @RequestBody ClientEntity c ){
        try{
            cservice.editClient( id , c );
        }catch ( NoSuchElementException e ){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND , "Client introuvable" );
        }catch ( InvalidObjectException e ){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST , e.getMessage() );
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteClient(@PathVariable int id) throws Exception {
        try{
            cservice.deleteClient(id);
            return ResponseEntity.ok(null);
        }catch ( Exception e ){
            return ResponseEntity.notFound().build();
        }

    }
}