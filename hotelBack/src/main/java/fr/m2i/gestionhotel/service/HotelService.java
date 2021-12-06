package fr.m2i.gestionhotel.service;

import fr.m2i.gestionhotel.entities.HotelEntity;
import fr.m2i.gestionhotel.repositories.HotelRepository;

public class HotelService {
    private HotelRepository hr;

    public HotelService(HotelRepository hr){
        this.hr = hr;
    }

    public Iterable<HotelEntity> findAll() {
        return hr.findAll();
    }
}
