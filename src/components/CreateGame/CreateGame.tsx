import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../interfaces/game.interface';
import * as gameService from '../../services/gamesService';
import AuthContext, { AuthContextType } from '../../contexts/AuthContext';
import style from './CreateGame.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorText from '../ErrorMessage/ErrorText';

interface FormValues {
  title: string;
  category: string;
  maxLevel: string;
  imageUrl: string;
  summary: string;
}

const initialValues = {} as FormValues;

const validationSchema = Yup.object({
  title: Yup.string().required('Required!').min(3, 'Title must be at least 3 characters').max(50, 'Title can be maximum 50 characters'),
  category: Yup.string().required('Required!'),
  maxLevel: Yup.number().min(1, 'MaxLevel must be at least 1').max(100, 'MaxLevel can be maximum 100'),
  imageUrl: Yup.string().required('Required!').url('Need to be url!'),
  summary: Yup.string().required('Required!').min(3, 'Summary must be at least 3 characters').max(500, 'Summary can be maximum 500 characters'),
})




const CreateGame = () => {
  const { userId }: AuthContextType = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = (values: FormValues) => {
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
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <section id={style["create-page"]} className="auth">
          <Form id="create">
            <div className={style.container}>
              <h1>Create Game</h1>
              <label htmlFor="leg-title">Legendary title:</label>
              <Field
                name="title"
                type="text"
                id="title"
                placeholder="Enter game title"
                className={`${errors.title && touched.title ? style.error : ''}`}
              />
              <ErrorMessage name="title" component={ErrorText}/>

              <label htmlFor="category">Category:</label>
              <Field
                name="category"
                type="text"
                id="category"
                placeholder="Enter game category"
                className={`${errors.category && touched.category ? style.error : ''}`}
              />
              <ErrorMessage name="category" component={ErrorText}/>

              <label htmlFor="levels">MaxLevel:</label>
              <Field
                name="maxLevel"
                type="number"
                id="maxLevel"
                min="1"
                placeholder="1"
                className={`${errors.maxLevel && touched.maxLevel ? style.error : ''}`}
              />
              <ErrorMessage name="maxLevel" component={ErrorText}/>

              <label htmlFor="game-img">Image:</label>
              <Field
                name="imageUrl"
                type="text"
                id="imageUrl"
                placeholder="Upload a photo"
                className={`${errors.imageUrl && touched.imageUrl ? style.error : ''}`}
              />
              <ErrorMessage name="imageUrl" component={ErrorText}/>

              <label htmlFor="summary">Summary:</label>
              <Field
                name="summary"
                as="textarea"
                id="summary"
                className={`${errors.summary && touched.summary ? style.error : ''}`}
              ></Field>
              <ErrorMessage name="summary" component={ErrorText}/>

              <Field className={`${style.btn} ${style.submit}`} type="submit" value="Create Game" />
            </div>
          </Form>
        </section>
      )}
    </Formik>
  );
}

export default CreateGame;