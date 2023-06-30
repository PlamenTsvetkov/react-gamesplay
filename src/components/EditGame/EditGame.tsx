import { RouteParams } from '../../interfaces/rauteParams.interface';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Game } from '../../interfaces/game.interface';
import * as gameService from '../../services/gamesService';
import style from './EditGame.module.css'


const EditGame = () => {
    const { gameId } = useParams<RouteParams>();
    const navigate = useNavigate();

    console.log(gameId);
    let [game, setGame] = useState<Game | null>(null);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [maxLevel, setMaxLevel] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [summary, setSummary] = useState('');

    useEffect(() => {
        gameService.getOne(gameId)
            .then((res: Game) => {
                setGame(res);
                setTitle(res.title);
                setCategory(res.category);
                setMaxLevel(res.maxLevel);
                setImageUrl(res.imageUrl);
                setSummary(res.summary);
            });
    }, [gameId]);

    const handleEditGameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let updatedGame = { ...game }; 

        updatedGame.title = title; 
        updatedGame.category = category;
        updatedGame.maxLevel = maxLevel;
        updatedGame.imageUrl = imageUrl;
        updatedGame.summary = summary;
        
        console.log(updatedGame)
        gameService.update(gameId as string, updatedGame as Game)
        .then(()=>{
            navigate(`/details/${gameId}`);
        });
    };

    return (
        <section id={style["edit-page"]} className={style.auth}>
            <form onSubmit={handleEditGameSubmit} id="edit">
                <div className={style.container}>

                    <h1>Edit Game</h1>
                    <label htmlFor="title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min="1"
                        value={maxLevel}
                        onChange={(e) => setMaxLevel(e.target.value)}
                    />

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    ></textarea>
                    <input className={`${style.btn} ${style.submit}`} type="submit" value="Edit Game" />

                </div>
            </form>
        </section>
    );
}

export default EditGame;