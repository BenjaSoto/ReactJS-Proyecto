import {Item} from "./Item";

export function ItemList({productos}){
    return(
        <div>
            {productos.map(prod => (
                <Item key={prod.key} {...prod} />
            ))}
        </div>
    )

}