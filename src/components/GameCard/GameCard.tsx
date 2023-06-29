import { Link } from 'react-router-dom';
import style from './GameCard.module.css';

export interface GameCardProps {
    imageUrl: string;
    category: string;
    title: string;
    id: string;
  }

const GameCard = (props: GameCardProps) =>{
    const { imageUrl, category, title, id } = props;
    return(
<div className={style.allGames}>
    <div className={style["allGames-info"]}>
        <img src={imageUrl} className={style.gameImage}/>
        <h6>{category}</h6>
        <h2>{title}</h2>
        <Link to={`/details/${id}`} className={style["details-button"]}>Details</Link>
    </div>

</div>
    );
}

export default GameCard;