import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikContol from '../FormikContol/FormikContol';
import styles from './FormikContainer.module.css'

interface FormValues {
    email: string;
    options?: { key: string ; value: string;  }[];
}

const FormikContainer = () => {
    const dropdownOptions=[
        {key:'Select an option', value:'Select an option'},
        {key:'1', value:'male'},
        {key:'2', value:'famale'},
        {key:'3', value:'other'},
    ]
    const initialValues = {
        email: '',
        description: '',
        select:''
    };
    const validationSchema = Yup.object({
        email: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        select: Yup.string()
        .notOneOf(['Select an option'], 'Please select an option')
        .required('Required'),
       
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
                             <FormikContol
                                control='select'
                                label='Gender'
                                name='select'
                                options={dropdownOptions}
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