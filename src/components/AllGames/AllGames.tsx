import { useEffect, useState } from 'react';
import * as gameService from '../../services/gamesService'
import GameCard from '../GameCard/GameCard';
import style from './AllGames.module.css';
import {Game} from '../../interfaces/game.interface'

const AllGames = () => {
    const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    gameService.getAll()
    .then((res: Game[]) => setGames(res));
  }, []);

    return (
<section id={style["catalog-page"]}>
<h1>All Games</h1>
{games.length === 0 ? (
        <h3 className={style.noArticles}>No articles yet</h3>
      ) : (
        games.map((p) => (
          <GameCard
            key={p.id} // Заменете с уникален идентификаторен ключ
            imageUrl={p.imageUrl}
            category={p.category}
            title={p.title}
            id={p.id}
          />
        ))
      )}
    </section>
    );
}

export default AllGames;