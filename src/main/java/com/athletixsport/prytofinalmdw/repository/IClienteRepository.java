package com.athletixsport.prytofinalmdw.repository;

import com.athletixsport.prytofinalmdw.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IClienteRepository extends JpaRepository<Cliente, Integer> {
    boolean existsByCorreo(String correo);
}