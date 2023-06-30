import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Game} from '../../interfaces/game.interface';
import * as gameService from '../../services/gamesService';
import AuthContext, { AuthContextType } from '../../contexts/AuthContext';
import style from './CreateGame.module.css'

const CreateGame = () =>{
    const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [maxLevel, setMaxLevel] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [summary, setSummary] = useState('');
  
  const { userId }: AuthContextType = useContext(AuthContext);

    const navigate = useNavigate();

    const onCreateGameSubmitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
const newGame: Game = {
      id: '',
      _ownerId: userId as string,
      title,
      category,
      maxLevel,
      imageUrl,
      summary,
      _createdOn: Date.now(),
    };

console.log(newGame);

    gameService.create(newGame)
    .then(()=>{
        navigate('/');
    });

    }
    return(
       <section id={style["create-page"]} className="auth">
      <form onSubmit={onCreateGameSubmitHandler} id="create">
        <div className={style.container}>
          <h1>Create Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter game title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter game category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label htmlFor="levels">MaxLevel:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            min="1"
            placeholder="1"
            value={maxLevel}
            onChange={(e) => setMaxLevel(e.target.value)}
          />

          <label htmlFor="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Upload a photo"
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
          <input className={`${style.btn} ${style.submit}`} type="submit" value="Create Game" />
        </div>
      </form>
    </section>
    );
}

export default CreateGame;