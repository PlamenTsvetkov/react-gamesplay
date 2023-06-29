import HomeGameCard from "../HomeGameCard/HomeGameCard";
import {useState, useEffect} from 'react';
import {Game} from '../../interfaces/game.interface';
import * as gameService from '../../services/gamesService';
import style from './Home.module.css';

const Home = () =>{
    const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    gameService.getHomeGame()
    .then((res: Game[]) => setGames(res));
  }, []);

    return (
<section id={style['welcome-world']}>

<div className={style['welcome-message']}>
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="/images/four_slider_img01.png" alt="hero"/>

<div id={style['home-page']}>
    <h1>Latest Games</h1>

    {games.length === 0 ? (
        <p className={style['no-articles']}>No games yet</p>
      ) : (
        games.map((p) => (
          <HomeGameCard
            key={p.id} 
            imageUrl={p.imageUrl}
            title={p.title}
            id={p.id}
          />
        ))
      )}
</div>
</section>
    );
}

export default Home;