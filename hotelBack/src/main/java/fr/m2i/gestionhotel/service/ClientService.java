package fr.m2i.gestionhotel.service;

import fr.m2i.gestionhotel.entities.ClientEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.io.InvalidObjectException;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

interface ClientRepository extends CrudRepository<ClientEntity , Integer> {
}

@Service
public class ClientService {

    private ClientRepository cr;

    public ClientService(ClientRepository cr){
        this.cr = cr;
    }

    public Iterable<ClientEntity> findAll() {
        return cr.findAll();
    }

    public ClientEntity findClientdById(int id) {return cr.findById(id).get();}

    public static boolean validateEmail(String emailStr) {
        Pattern VALID_EMAIL_ADDRESS_REGEX =
                Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        return matcher.find();
    }

    private void checkClient( ClientEntity c ) throws InvalidObjectException {

        if( c.getNomComplet().length() <= 2 ){
            throw new InvalidObjectException("Nom invalide (trop court)");
        }
        if( c.getAdresse().length() <= 10 ){
            throw new InvalidObjectException("Adresse invalide (trop court)");
        }
        if( c.getTelephone().length() <= 8 ){
            throw new InvalidObjectException("Téléphone invalide");
        }
        if( c.getEmail().length() <= 5 || !validateEmail( c.getEmail() ) ){
            throw new InvalidObjectException("Email invalide");
        }
    }

    public void addClient(ClientEntity c) throws InvalidObjectException {
        checkClient(c);
        cr.save(c);
    }

    public void editClient(int id, ClientEntity c) throws InvalidObjectException {
        checkClient(c);
        try{
            ClientEntity cExistant = cr.findById(id).get();
            cExistant.setNomComplet( c.getNomComplet() );
            cExistant.setTelephone( c.getTelephone() );
            cExistant.setAdresse( c.getAdresse() );
            cExistant.setEmail( c.getEmail() );
            cr.save( cExistant );

        }catch ( NoSuchElementException e ){
            throw e;
        }
    }

    public void deleteClient(int id) {
        cr.deleteById(id);
    }
}