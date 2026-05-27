package com.athletixsport.prytofinalmdw.repository;

import com.athletixsport.prytofinalmdw.model.Categoria;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoriaRepository extends JpaRepository<Categoria, Integer> {

    @Query("SELECT c FROM Categoria c ORDER BY c.nombre ASC")
    List<Categoria> listarOrdenadasPorNombre();
}
