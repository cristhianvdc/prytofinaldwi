package com.athletixsport.prytofinalmdw.controller;

import com.athletixsport.prytofinalmdw.model.Producto;
import com.athletixsport.prytofinalmdw.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // <- Cambiado de @Controller a @RestController para API REST
@RequestMapping("/api/productos") // <- Convención estándar de rutas API
public class ProductoController {

    @Autowired
    private IProductoService productoService;

    @GetMapping
    public ResponseEntity<List<Producto>> listar() {
        return ResponseEntity.ok(productoService.listarTodos());
    }

    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Producto producto) { // <- @RequestBody procesa el JSON entrante
        if (producto.getCategoria() == null || producto.getCategoria().getId() == null) {
            return ResponseEntity.badRequest().body("Debe seleccionar una categoría obligatoriamente");
        }
        boolean result = productoService.guardar(producto);
        if (!result) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No se pudo guardar el producto");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(producto);
    }

    @PutMapping("/{id}") // <- Verbo HTTP PUT correcto para actualizaciones
    public ResponseEntity<?> actualizar(@PathVariable("id") Integer id, @RequestBody Producto producto) {
        Producto prodExistente = productoService.buscarPorId(id);
        if (prodExistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
        }
        producto.setId(id);
        productoService.guardar(producto);
        return ResponseEntity.ok(producto);
    }

    @DeleteMapping("/{id}") // <- Verbo HTTP DELETE correcto para eliminaciones
    public ResponseEntity<?> eliminar(@PathVariable("id") Integer id) {
        boolean result = productoService.eliminar(id);
        if (result) {
            return ResponseEntity.ok("Producto eliminado correctamente");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No se pudo eliminar el producto");
    }
}