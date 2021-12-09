package fr.m2i.gestionhotel.api;

import fr.m2i.gestionhotel.entities.AdminEntity;
import fr.m2i.gestionhotel.repositories.AdminRepository;
import fr.m2i.gestionhotel.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Base64;

@RestController
public class LoginAPIController {

    @Autowired
    private AdminRepository ar;

    @Autowired
    private PasswordEncoder encoder;

    private AdminService aservice;

    @PostMapping( value = "/api/login" ,  consumes = "application/json" ,  produces = "application/json")
    public ResponseEntity<AdminEntity> get( @RequestBody  AdminEntity a ) {

        AdminEntity admin = ar.findAdminByUsername( a.getUsername());

        if(admin == null) {
            return ResponseEntity.notFound().build();
        } else {
            System.out.println( "encoded pass : " + a.getPassword() );
            System.out.println( "pass en bd : " + admin.getPassword() );

            if( encoder.matches( a.getPassword() , admin.getPassword() ) ){
                String encoding = Base64.getEncoder().encodeToString((a.getUsername()+":"+a.getPassword()).getBytes());
                admin.setPassword(encoding);

                return ResponseEntity.ok(admin);
            }
            return ResponseEntity.badRequest().build();
        }

    }
}