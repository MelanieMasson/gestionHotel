package fr.m2i.gestionhotel.api;

import fr.m2i.gestionhotel.entities.HotelEntity;
import fr.m2i.gestionhotel.service.HotelService;
import fr.m2i.gestionhotel.service.StorageService;
import fr.m2i.gestionhotel.service.StorageServiceImpl;
import org.hibernate.query.criteria.internal.IllegalDereferenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InvalidObjectException;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/hotel")
public class HotelAPIController {

    @Autowired
    private HotelService hservice;

    @Autowired
    private StorageServiceImpl storageService;

    public HotelAPIController(HotelService hservice) {
        this.hservice = hservice;
    }

    @GetMapping(value = "", produces = "application/json")
    public Iterable<HotelEntity> findAll(HttpServletRequest request) {
        String search = request.getParameter("search");
        return hservice.findAll();

    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<HotelEntity> findHotelById(@PathVariable("id") int id) {
        try {
            HotelEntity h = hservice.findHotelById(id);
            return ResponseEntity.ok(h);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "", consumes = "application/json")
    public ResponseEntity<HotelEntity> addHotel(@RequestBody HotelEntity h, MultipartFile file, HttpServletRequest request) throws IOException {
        try {
            hservice.addHotel(h);

            String photo = null;
            if (file != null) {
                photo = storageService.store(file, "src\\main\\resources\\static\\images\\uploads");
            }

            String nom = request.getParameter("nom");
            int etoiles = Integer.parseInt(request.getParameter("etoiles"));
            String adresse = request.getParameter("adresse");
            String telephone = request.getParameter("telephone");
            String email = request.getParameter("email");
            String ville = request.getParameter("ville");
            String images = request.getParameter("images");

        return ResponseEntity.ok(h);

        } catch (InvalidObjectException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }


    @PutMapping(value="/{id}" , consumes = "application/json")
    public void editHotel(@PathVariable int id , @RequestBody HotelEntity h ){
        try{
            hservice.editHotel( id , h );
        }catch (NoSuchElementException | InvalidObjectException e ){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND , "Hotel introuvable" );
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteHotel(@PathVariable int id) throws Exception {
        try{
            hservice.deleteHotel(id);
            return ResponseEntity.ok(null);
        }catch ( Exception e ){
            return ResponseEntity.notFound().build();
        }

    }
}