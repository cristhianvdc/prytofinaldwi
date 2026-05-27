package com.athletixsport.prytofinalmdw.service.impl;

import com.athletixsport.prytofinalmdw.model.Producto;
import com.athletixsport.prytofinalmdw.repository.IProductoRepository;
import com.athletixsport.prytofinalmdw.service.IProductoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoServiceImpl implements IProductoService {

	@Autowired
	private IProductoRepository productoRepository;

	@Override
	public List<Producto> listarPorCategoria(Integer idCategoria) {
		return productoRepository.listarPorCategoria(idCategoria);
	}

	@Override
	public List<Producto> listarDestacados() {
		return productoRepository.listarDestacados();
	}

	@Override
	public Producto buscarPorId(Integer id) {
		return productoRepository.findById(id).orElse(null);
	}

	@Override
	public List<Producto> listarTodos() {
		return productoRepository.findAll();
	}

	@Override
	public List<Producto> buscarPorNombre(String nombre) {
		return productoRepository.buscarPorNombre(nombre);
	}

	@Override
	public boolean guardar(Producto producto) {
		try {
			productoRepository.save(producto);
			return true;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean eliminar(Integer id) {
		try {
			productoRepository.deleteById(id);
			return true;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}
}
