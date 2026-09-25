import { ItemList } from "./ItemList";
import style from "./ItemListContainer.module.css"

export function ItemListContainer({ Mensaje }) {
    const productos = [
        { id: '1234', nombre: 'Notebook Pro', precio: 12000, stock: 15 },
        { id: '2344', nombre: 'Monitor Curvo', precio: 450000, stock: 25 },
        { id: '2545', nombre: 'Teclado Mecánico', precio: 15000, stock: 50 },
         {id: '1234', nombre: 'Notebook Pro', precio: 12000, stock: 15 },
        { id: '2344', nombre: 'Monitor Curvo', precio: 450000, stock: 25 },
        { id: '2545', nombre: 'Teclado Mecánico', precio: 15000, stock: 50 },
         {id: '1234', nombre: 'Notebook Pro', precio: 12000, stock: 15 },
        { id: '2344', nombre: 'Monitor Curvo', precio: 450000, stock: 25 },
        { id: '2545', nombre: 'Teclado Mecánico', precio: 15000, stock: 50 },
                { id: '2545', nombre: 'Teclado Mecánico', precio: 15000, stock: 50 },];

    return (
        <div>
            <h2>{Mensaje}</h2>
            <div className={style.productos}>
                <ItemList productos={productos} />
            </div>
        </div>
    );
}