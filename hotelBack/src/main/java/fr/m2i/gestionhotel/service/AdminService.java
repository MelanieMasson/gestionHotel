package fr.m2i.gestionhotel.service;

import fr.m2i.gestionhotel.entities.AdminEntity;
import fr.m2i.gestionhotel.entities.ClientEntity;
import fr.m2i.gestionhotel.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.io.InvalidObjectException;

@Service
public class AdminService {

    @Autowired
    private AdminRepository ar;

    public Iterable<AdminEntity> findAll(String search) {
        return ar.findAll();
    }

    public AdminEntity findAdminById(int id) {
        return ar.findById(id).get();
    }

    private void checkAdmin(AdminEntity a) throws InvalidObjectException {
        if (a.getUsername().length() <= 2)
            throw new InvalidObjectException("Username invalide (trop court)");
    }

    public void addAdmin(AdminEntity a) throws InvalidObjectException {
        checkAdmin(a);
        AdminEntity toUpdate = this.findAdminById(a.getId());

        toUpdate.setUsername(a.getUsername());
        toUpdate.setRole(a.getRole());
        toUpdate.setPassword(toUpdate.getPassword());

        ar.save(toUpdate);
    }

    public void editAdmin(int id, AdminEntity a) {
    }

    public void deleteAdmin(int id) {
        AdminEntity a = this.findAdminById(id);
        ar.delete(a);
    }
}

