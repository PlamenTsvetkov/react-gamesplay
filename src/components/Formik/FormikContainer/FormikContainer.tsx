import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikContol from '../FormikContol/FormikContol';
import styles from './FormikContainer.module.css'

interface FormValues {
    email: string;
}

const FormikContainer = () => {
    const initialValues = {
        email: '',
        description: '',
    };
    const validationSchema = Yup.object({
        email: Yup.string().required('Required'),
        description: Yup.string().required('Required')
    });

    const onSubmit = (values: FormValues) => console.log(values)

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>{
                formik =>
                    <div id={styles["input"]} className={styles.container}>
                        <h1>Test input form</h1>
                        <Form>
                            <FormikContol
                                control='input'
                                inputType='email'
                                label='Email'
                                name='email'
                                field={formik.getFieldProps('email')}
                                form={formik}
                                meta={formik.getFieldMeta('email')}
                            />
                            <FormikContol
                                control='textarea'
                                label='Description'
                                name='description'
                                field={formik.getFieldProps('description')}
                                form={formik}
                                meta={formik.getFieldMeta('description')}
                            />
                            <input className={`${styles.btn} ${styles.submit}`} type="submit" value="Proba !" />
                        </Form>
                    </div>
            }
        </Formik>
    );
}

export default FormikContainer;