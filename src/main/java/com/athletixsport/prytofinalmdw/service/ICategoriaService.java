package com.athletixsport.prytofinalmdw.service;

import com.athletixsport.prytofinalmdw.model.Categoria;
import java.util.List;

public interface ICategoriaService {

    List<Categoria> listar();
    
    Categoria buscarPorId(int id);
}
