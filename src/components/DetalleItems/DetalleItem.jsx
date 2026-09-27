import style from "./DetalleItem.module.css"
const DetalleItem =({title, price, image, description, category}) => {

    return(
        <div className={style.detalle}>
                    <div className={style.detalleImg}>
                        <img src={image} alt={description}/>
                    </div>

                    <div className={style.detalleContent}>
                        <h3 title ={title} >{title}</h3>
                        <p title ={category}>{category}</p>
                
                        <p className={style.descripcion} title ={description}>Descripcion:<br/>{description}</p>
                        <div className={style.detallePrecio}>
                            <p>${price}</p>
                            <div className={style.detalleBtns}>
                                <a href="#" className={style.btnDetalle}><button>-</button></a>
                                <a href="#" className={style.btnDetalle}><button>+</button></a>
                            </div> 
                        </div>
                    </div>
        </div>
    )
}

export default DetalleItem;