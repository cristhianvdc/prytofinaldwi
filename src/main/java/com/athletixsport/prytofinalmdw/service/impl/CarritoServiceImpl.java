package com.athletixsport.prytofinalmdw.service.impl;

import com.athletixsport.prytofinalmdw.dto.CarritoItem;
import com.athletixsport.prytofinalmdw.service.ICarritoService;
import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CarritoServiceImpl implements ICarritoService {

    private static final String SESSION_KEY = "carrito";

    @SuppressWarnings("unchecked")
    private List<CarritoItem> getCarrito(HttpSession session) {
        List<CarritoItem> carrito = (List<CarritoItem>) session.getAttribute(SESSION_KEY);
        if (carrito == null) {
            carrito = new ArrayList<>();
            session.setAttribute(SESSION_KEY, carrito);
        }
        return carrito;
    }

    @Override
    public void agregarProducto(HttpSession session, CarritoItem item) {
        List<CarritoItem> carrito = getCarrito(session);

        for (CarritoItem c : carrito) {
            if (c.getIdProducto().equals(item.getIdProducto())
                    && c.getTalla().equals(item.getTalla())
                    && c.getColor().equals(item.getColor())) {
                c.setCantidad(c.getCantidad() + item.getCantidad());
                return;
            }
        }

        carrito.add(item);
    }

    @Override
    public void actualizarCantidad(HttpSession session, Integer productoId, String talla, String color, int cantidad) {
        List<CarritoItem> carrito = getCarrito(session);
        for (CarritoItem c : carrito) {
            if (c.getIdProducto().equals(productoId)
                    && c.getTalla().equals(talla)
                    && c.getColor().equals(color)) {
                c.setCantidad(cantidad);
                break;
            }
        }
    }

    @Override
    public void eliminarProducto(HttpSession session, int index) {
        List<CarritoItem> carrito = getCarrito(session);
        if (index >= 0 && index < carrito.size()) {
            carrito.remove(index);
        }
    }

    @Override
    public List<CarritoItem> obtenerCarrito(HttpSession session) {
        return getCarrito(session);
    }

    @Override
    public void vaciarCarrito(HttpSession session) {
        session.removeAttribute(SESSION_KEY);
    }

    @Override
    public double calcularTotal(HttpSession session) {
        return getCarrito(session).stream()
                .mapToDouble(CarritoItem::getSubtotal)
                .sum();
    }
    
    @Override
    public int obtenerCantidadProductos(HttpSession session) {
        return getCarrito(session).size();
    }
}
