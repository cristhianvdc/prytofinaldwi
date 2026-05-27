package com.athletixsport.prytofinalmdw.service;

import com.athletixsport.prytofinalmdw.dto.CarritoItem;
import jakarta.servlet.http.HttpSession;
import java.util.List;

public interface ICarritoService {

    void agregarProducto(HttpSession session, CarritoItem item);

    void actualizarCantidad(HttpSession session, Integer productoId, String talla, String color, int cantidad);

    void eliminarProducto(HttpSession session, int index);

    List<CarritoItem> obtenerCarrito(HttpSession session);

    void vaciarCarrito(HttpSession session);

    double calcularTotal(HttpSession session);

    int obtenerCantidadProductos(HttpSession session);
}
