package com.athletixsport.prytofinalmdw.service.impl;

import com.athletixsport.prytofinalmdw.model.Categoria;
import com.athletixsport.prytofinalmdw.repository.ICategoriaRepository;
import com.athletixsport.prytofinalmdw.service.ICategoriaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServiceImpl implements ICategoriaService {

    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Override
    public List<Categoria> listar() {
        return categoriaRepository.listarOrdenadasPorNombre();
    }

    @Override
    public Categoria buscarPorId(int id) {
        return categoriaRepository.findById(id).orElse(null);
    }
}
