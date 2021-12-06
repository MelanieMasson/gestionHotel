package fr.m2i.gestionhotel.service;

import fr.m2i.gestionhotel.entities.HotelEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.io.InvalidObjectException;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

interface HotelRepository extends CrudRepository<HotelEntity, Integer> {
}

@Service
public class HotelService {
    @Autowired
    private HotelRepository hr;

    public HotelService(HotelRepository hr) {
        this.hr = hr;
    }

    public Iterable<HotelEntity> findAll() {
        return hr.findAll();
    }

    public HotelEntity findHotelById(int id) {
        return hr.findById(id).get();
    }

    public static boolean validateEmail(String emailStr) {
        Pattern VALID_EMAIL_ADDRESS_REGEX =
                Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        return matcher.find();
    }

    private void checkHotel(HotelEntity h) throws InvalidObjectException {

        if (h.getNom().length() <= 2) {
            throw new InvalidObjectException("Nom invalide (trop court)");
        }

        if (h.getEtoiles() < 5 || h.getEtoiles() > 0) {
            throw new InvalidObjectException("Nombre d'étoiles invalide (doit être compris entre 0 et 5)");
        }

        if (h.getAdresse().length() <= 5) {
            throw new InvalidObjectException("Adresse invalide (trop court)");
        }
        if (h.getTelephone().length() <= 8) {
            throw new InvalidObjectException("Téléphone invalide");
        }
        if (h.getEmail().length() <= 5 || !validateEmail(h.getEmail())) {
            throw new InvalidObjectException("Email invalide");
        }
    }

    public void addHotel(HotelEntity h) throws InvalidObjectException {
        checkHotel(h);
        hr.save(h);
    }

    public void editHotel(int id, HotelEntity h) throws InvalidObjectException {
        checkHotel(h);
        try {
            HotelEntity hExistant = hr.findById(id).get();
            hExistant.setNom(h.getNom());
            hExistant.setEtoiles(h.getEtoiles());
            hExistant.setAdresse(h.getAdresse());
            hExistant.setTelephone(h.getTelephone());
            hExistant.setEmail(h.getEmail());
            hExistant.setVille(h.getVille());
            hr.save(hExistant);

        } catch (NoSuchElementException e) {
            throw e;
        }
    }

    public void deleteHotel(int id) {
        hr.deleteById(id);
    }
}
