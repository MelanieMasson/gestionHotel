package fr.m2i.gestionhotel.repositories;

import fr.m2i.gestionhotel.entities.AdminEntity;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<AdminEntity, Integer> {

    public AdminEntity findAdminByUsername(String username);

}