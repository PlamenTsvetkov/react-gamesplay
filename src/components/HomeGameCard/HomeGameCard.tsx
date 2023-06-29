import style from './HomeGameCard.module.css'
export interface HomeGameCardProps {
    imageUrl: string;
    title: string;
    id: string;
  }
const HomeGameCard = (props:HomeGameCardProps) =>{
    const { imageUrl, title, id } = props;

    return(
<div className={style.game}>
        <div className={style['image-wrap']}>
            <img src={imageUrl}/>
        </div>
        <h3>{title}</h3>
        <div className={style.rating}>
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div className={style['data-buttons']}>
            <a href={`/details/${id}`} className={`${style.btn} ${style['details-btn']}`}>Details</a>
        </div>
    </div>
    );
}

export default HomeGameCard;