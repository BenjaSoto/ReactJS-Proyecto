import { createContext, useContext, useState } from "react";

export const CarritoContext = createContext();

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error("useCarrito debe ser usado dentro de un CarritoProvider");
    }
    return context;
};

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarACarrito = ({ producto, cantidad = 1 }) => {
        setCarrito((carritoPrevio) => {
            const existente = carritoPrevio.find((item) => item.id === producto.id);

            if (existente) {
                return carritoPrevio.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: Math.min(item.cantidad + cantidad, item.stock) }
                        : item
                );
            }
            return [...carritoPrevio, { ...producto, cantidad: Math.min(cantidad, producto.stock) }];
        });
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((carritoPrevio) => carritoPrevio.filter((item) => item.id !== id));
    };

    const incrementarCantidad = (id) => {
        setCarrito((carritoPrevio) =>
            carritoPrevio.map((item) =>
                item.id === id && item.cantidad < item.stock
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            )
        );
    };

    const decrementarCantidad = (id) => {
        setCarrito((carritoPrevio) =>
            carritoPrevio
                .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
                .filter((item) => item.cantidad > 0)
        );
    };

    const vaciarCarrito = () => setCarrito([]);

    const getCantidad = (id) => {
        const item = carrito.find((item) => item.id === id);
        return item ? item.cantidad : 0;
    };

    const itemsEnCarrito = () => carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const cobroTotal = () => carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarACarrito,
                eliminarDelCarrito,
                incrementarCantidad,
                decrementarCantidad,
                vaciarCarrito,
                getCantidad,
                itemsEnCarrito,
                cobroTotal,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};
