import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import * as gameService from '../../services/gamesService';
import { Game } from '../../interfaces/game.interface';
import { RouteParams } from '../../interfaces/rauteParams.interface';
import style from './Details.module.css';
import AuthContext, { AuthContextType } from '../../contexts/AuthContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Details = () => {
    const { userId }: AuthContextType = useContext(AuthContext);
    const { gameId } = useParams<RouteParams>();
    const navigate = useNavigate();

    let [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        gameService.getOne(gameId)
            .then((res: Game) => setGame(res));
    }, [gameId]);

    const handleDelete = (gameId: string) => {
        gameService.del(gameId)
          .then(() => {
            navigate('/');
          })
          .catch((error) => {
            // Handle delete error
          });
      };

      const showConfirmationDialog = () => {
        confirmAlert({
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this game?',
          buttons: [
            {
                label: 'Yes',
                onClick: () => handleDelete(gameId as string),
            },
            {
              label: 'No',
              onClick: () => {
                // Handle 'No' button click
              }
            },
          ],
        });
      };

    const isOwner = userId && game?._ownerId == userId;
    return (
        <section id={style["game-details"]}>
            <h1>Game Details</h1>
            <div className={style["info-section"]}>

                <div className={style["game-header"]}>
                    <img className={style["game-img"]} src={game?.imageUrl} />
                    <h1>{game?.title}</h1>
                    <span className={style["levels"]}>MaxLevel: {game?.maxLevel}</span>
                    <p className={style["type"]}>{game?.category}</p>
                </div>

                <p className={style.text}>
                    {game?.summary}
                </p>


                {/* {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isOwner ? (
                    // Logged-in users
                    <div className={style.buttons}>
                        <Link to= {`/edit/${gameId}`} className={style.button}>Edit</Link>
                        <button onClick={showConfirmationDialog} className={style.button}>Delete</button>
                    </div>
                ) : (
                    // Guest users
                    null
                )}

            </div>

        </section>
    );
}

export default Details;