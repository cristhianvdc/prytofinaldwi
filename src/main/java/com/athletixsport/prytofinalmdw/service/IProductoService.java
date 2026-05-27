package com.athletixsport.prytofinalmdw.service;

import com.athletixsport.prytofinalmdw.model.Producto;
import java.util.List;

public interface IProductoService {

    List<Producto> listarPorCategoria(Integer idCategoria);

    List<Producto> listarDestacados();

    List<Producto> listarTodos();

    Producto buscarPorId(Integer id);

    List<Producto> buscarPorNombre(String nombre);
    
    boolean guardar(Producto producto);
    
    boolean eliminar(Integer id);
}
