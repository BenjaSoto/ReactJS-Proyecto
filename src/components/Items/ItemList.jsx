import {Item} from "./Item";
import style from "./ItemList.module.css"
export function ItemList({productos}){
    return(
        <div className={style.prdCards}>
            {productos.map(prod => (
                <Item key={prod.key} {...prod} />
            ))}
        </div>
    )

}