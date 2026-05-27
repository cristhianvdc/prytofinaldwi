package com.athletixsport.prytofinalmdw.repository;

import com.athletixsport.prytofinalmdw.model.Producto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Integer> {

    @Query("SELECT p FROM Producto p WHERE p.categoria.id = ?1")
    List<Producto> listarPorCategoria(Integer idCategoria);

    @Query("SELECT p FROM Producto p WHERE p.destacado = true ORDER BY p.nombre ASC")
    List<Producto> listarDestacados();

    @Query("SELECT p FROM Producto p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Producto> buscarPorNombre(@Param("nombre") String nombre);
}
