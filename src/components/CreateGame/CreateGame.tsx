import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../interfaces/game.interface';
import * as gameService from '../../services/gamesService';
import AuthContext, { AuthContextType } from '../../contexts/AuthContext';
import style from './CreateGame.module.css';
import { useFormik } from 'formik';

interface FormValues {
  title: string;
  category: string;
  maxLevel: string;
  imageUrl: string;
  summary: string;
}

const initialValues = {

}

const CreateGame = () => {
  const { userId }: AuthContextType = useContext(AuthContext);

  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      category: '',
      maxLevel: '',
      imageUrl: '',
      summary: ''
    },
    onSubmit: (values) => {
      const newGame: Game = {
        id: '',
        _ownerId: userId as string,
        title: values.title,
        category: values.category,
        maxLevel: values.maxLevel,
        imageUrl: values.imageUrl,
        summary: values.summary,
        _createdOn: Date.now(),
      };

      gameService.create(newGame)
        .then(() => {
          navigate('/');
        });
    },
    validate: (values) => {
      let errors: Partial<FormValues> = {};

      if (!values.title) {
        errors.title = 'Required';
      }
      if (!values.category) {
        errors.category = 'Required';
      }
      if (!values.maxLevel) {
        errors.maxLevel = 'Required';
      }
      if (!values.imageUrl) {
        errors.imageUrl = 'Required';
      }
      if (!values.summary) {
        errors.summary = 'Required';
      }


      return errors;
    }
  });

  return (
    <section id={style["create-page"]} className="auth">
      <form onSubmit={formik.handleSubmit} id="create">
        <div className={style.container}>
          <h1>Create Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter game title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${formik.errors.title && formik.touched.title ? style.error : ''}`}
          />
          {formik.errors.title && formik.touched.title && <div className={style["error-message"]}>{formik.errors.title}</div>}

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter game category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${formik.errors.category && formik.touched.category ? style.error : ''}`}
          />
          {formik.errors.category && formik.touched.category && <div className={style["error-message"]}>{formik.errors.category}</div>}

          <label htmlFor="levels">MaxLevel:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            min="1"
            placeholder="1"
            value={formik.values.maxLevel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${formik.errors.maxLevel && formik.touched.maxLevel ? style.error : ''}`}
          />
          {formik.errors.maxLevel && formik.touched.maxLevel && <div className={style["error-message"]}>{formik.errors.maxLevel}</div>}

          <label htmlFor="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Upload a photo"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${formik.errors.imageUrl && formik.touched.imageUrl ? style.error : ''}`}
          />
          {formik.errors.imageUrl && formik.touched.imageUrl && <div className={style["error-message"]}>{formik.errors.imageUrl}</div>}

          <label htmlFor="summary">Summary:</label>
          <textarea
            name="summary"
            id="summary"
            value={formik.values.summary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${formik.errors.summary && formik.touched.summary ? style.error : ''}`}
          ></textarea>
          {formik.errors.summary && formik.touched.summary && <div className={style["error-message"]}>{formik.errors.summary}</div>}

          <input className={`${style.btn} ${style.submit}`} type="submit" value="Create Game" />
        </div>
      </form>
    </section>
  );
}

export default CreateGame;