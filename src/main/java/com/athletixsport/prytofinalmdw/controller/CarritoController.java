package com.athletixsport.prytofinalmdw.controller;

import com.athletixsport.prytofinalmdw.dto.CarritoItem;
import com.athletixsport.prytofinalmdw.model.Producto;
import com.athletixsport.prytofinalmdw.repository.IProductoRepository;
import com.athletixsport.prytofinalmdw.service.ICarritoService;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private ICarritoService carritoService;

    @Autowired
    private IProductoRepository productoRepo;

    @PostMapping("/agregar")
    public ResponseEntity<Map<String, Object>> agregar(
            @RequestParam Integer productoId,
            @RequestParam String talla,
            @RequestParam String color,
            @RequestParam int cantidad,
            HttpSession session) {

        Map<String, Object> response = new HashMap<>();

        try {
            Producto producto = productoRepo.findById(productoId).orElse(null);
            if (producto == null) {
                response.put("success", false);
                response.put("message", "Producto no encontrado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            if (talla == null || talla.isEmpty() || color == null || color.isEmpty()) {
                response.put("success", false);
                response.put("message", "Debe seleccionar talla y color");
                return ResponseEntity.badRequest().body(response);
            }

            CarritoItem item = new CarritoItem();
            item.setIdProducto(producto.getId());
            item.setNombre(producto.getNombre());
            item.setNombreCategoria(producto.getCategoria().getNombre());
            item.setTalla(talla);
            item.setColor(color);
            item.setPrecio(producto.getPrecio());
            item.setCantidad(cantidad);
            item.setImagenUrl(producto.getImagenUrl());

            carritoService.agregarProducto(session, item);
            int cantidadCarrito = carritoService.obtenerCantidadProductos(session);

            response.put("success", true);
            response.put("message", "Producto agregado correctamente al carrito");
            response.put("cantidadCarrito", cantidadCarrito);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al agregar al carrito: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> verCarrito(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        response.put("items", carritoService.obtenerCarrito(session));
        response.put("total", carritoService.calcularTotal(session));
        return ResponseEntity.ok(response);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Map<String, Object>> actualizar(
            @RequestParam Integer productoId,
            @RequestParam String talla,
            @RequestParam String color,
            @RequestParam int cantidad,
            HttpSession session) {

        carritoService.actualizarCantidad(session, productoId, talla, color, cantidad);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Cantidad modificada con éxito");
        response.put("carritoActualizado", carritoService.obtenerCarrito(session));
        response.put("total", carritoService.calcularTotal(session));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/eliminar/{index}")
    public ResponseEntity<Map<String, Object>> eliminar(@PathVariable int index, HttpSession session) {
        carritoService.eliminarProducto(session, index);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Producto eliminado del carrito");
        response.put("carritoActualizado", carritoService.obtenerCarrito(session));
        response.put("total", carritoService.calcularTotal(session));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/procesar")
    public ResponseEntity<Map<String, Object>> procesar(HttpSession session) {
        carritoService.vaciarCarrito(session);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Compra procesada con éxito y carrito vaciado");
        return ResponseEntity.ok(response);
    }
}