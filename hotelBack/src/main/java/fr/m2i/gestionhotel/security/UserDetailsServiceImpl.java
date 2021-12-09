package fr.m2i.gestionhotel.security;

import fr.m2i.gestionhotel.entities.AdminEntity;
import fr.m2i.gestionhotel.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminEntity admin = adminRepository.findAdminByUsername(username);

        if(admin == null) {
            throw new UsernameNotFoundException("No user named " + username);
        } else {
            return new UserDetailsImpl(admin);
        }
    }

}