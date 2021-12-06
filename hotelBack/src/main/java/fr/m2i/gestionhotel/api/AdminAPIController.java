package fr.m2i.gestionhotel.api;

import fr.m2i.gestionhotel.entities.AdminEntity;;
import fr.m2i.gestionhotel.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import javax.servlet.http.HttpServletRequest;
import java.io.InvalidObjectException;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/administrateur")
public class AdminAPIController {

    @Autowired
    private AdminService aservice;

    @Autowired
    private PasswordEncoder pwdEncoder;

    @GetMapping(value="" , produces = "application/json")
    public Iterable<AdminEntity> findAll(HttpServletRequest request ){
        String search = request.getParameter("search");
        System.out.println( "Recherche d admin avec param = " + search );
        return aservice.findAll( search );
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<AdminEntity> findAdminById(@PathVariable("id") int id) {
        try{
            AdminEntity a = aservice.findAdminById(id);
            return ResponseEntity.ok(a);
        }catch ( Exception e ){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value="" , consumes = "application/json")
    public ResponseEntity<AdminEntity> addAdmin(@RequestBody AdminEntity a ){
        try{
            a.setPassword(pwdEncoder.encode(a.getPassword()));
            aservice.addAdmin( a );
            return ResponseEntity.ok(a);
        }catch ( InvalidObjectException e ){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST , e.getMessage() );
        }
    }

    @PutMapping(value="/{id}" , consumes = "application/json")
    public void editAdmin(@PathVariable int id , @RequestBody AdminEntity a ){
        try{
            aservice.editAdmin( id , a );
        }catch ( NoSuchElementException e ){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND , "Administrateur introuvable" );
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteAdmin(@PathVariable int id) throws Exception {
        try{
            aservice.deleteAdmin(id);
            return ResponseEntity.ok(null);
        }catch ( Exception e ){
            return ResponseEntity.notFound().build();
        }

    }
}