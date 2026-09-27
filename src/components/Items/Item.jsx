import style from "./Item.module.css"

export function Item({title, price, image, description, category}) {
    return (
        <div className={style.card}>
                    <div className={style.cardImg}>
                        <img src={image} alt={description}/>
                    </div>

                    <div className={style.cardContent}>
                        <h3 title ={title} >{title}</h3>
                        <p title ={category}>{category}</p>
                        <div className={style.cardPrecio}>
                            <p>${price}</p>
                            <div className={style.cardBtns}>
                                <a href="#" className={style.btnCard}><button>-</button></a>
                                <a href="#" className={style.btnCard}><button>+</button></a>
                            </div> 
                        </div>
                    </div>
        </div>
    )
}