package com.athletixsport.prytofinalmdw.controller;

import com.athletixsport.prytofinalmdw.model.Categoria;
import com.athletixsport.prytofinalmdw.model.Producto;
import com.athletixsport.prytofinalmdw.service.ICategoriaService;
import com.athletixsport.prytofinalmdw.service.IProductoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/catalogo")
public class InicioController {

    @Autowired
    private ICategoriaService categoriaService;

    @Autowired
    private IProductoService productoService;

    @GetMapping("/destacados") // Trae los productos destacados de la página principal
    public ResponseEntity<List<Producto>> obtenerDestacados() {
        List<Producto> productos = productoService.listarDestacados();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/productos") // Reemplaza la ruta /tienda para traer todo el catálogo
    public ResponseEntity<List<Producto>> obtenerTodosLosProductos() {
        List<Producto> productos = productoService.listarTodos();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/categoria/{id}") // Uso correcto de PathVariable para recursos RESTful estructurados
    public ResponseEntity<?> listarPorCategoria(@PathVariable("id") Integer id) {
        Categoria categoria = categoriaService.buscarPorId(id);

        if (categoria == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("La categoría solicitada no existe");
        }

        List<Producto> productos = productoService.listarPorCategoria(id);
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/buscar") // Mantiene la búsqueda mediante parámetros de consulta (?q=...)
    public ResponseEntity<List<Producto>> buscar(@RequestParam("q") String query) {
        List<Producto> productos = productoService.buscarPorNombre(query);
        return ResponseEntity.ok(productos);
    }
}