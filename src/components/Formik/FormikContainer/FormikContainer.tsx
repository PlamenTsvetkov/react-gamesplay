import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikContol from '../FormikContol/FormikContol';
import styles from './FormikContainer.module.css'

interface FormValues {
    email: string;
    options?: { key: string; value: string; }[];
}

const FormikContainer = () => {
    const dropdownOptions = [
        { key: 'Select an option', value: 'Select an option' },
        { key: '1', value: 'male' },
        { key: '2', value: 'famale' },
        { key: '3', value: 'other' },
    ]
    const radioOptions = [
        { key: 'r1', value: 'male' },
        { key: 'r2', value: 'famale' },
        { key: 'r3', value: 'other' },
    ]

    const checkboxOptions = [
        { key: 'c1', value: 'male' },
        { key: 'c2', value: 'famale' },
        { key: 'c3', value: 'other' },
    ]

    const initialValues = {
        email: '',
        description: '',
        select: '',
        radioOption: '',
        checkboxOption: [],
        birthDate: null
    };
    const validationSchema = Yup.object({
        email: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        radioOption: Yup.string().required('Required'),
        birthDate: Yup.date().required('Required').nullable(),
        checkboxOption: Yup.array()
            .required('Please select at least one option')
            .test('at-least-one', 'Please select at least one option', (value) => value && value.length > 0),

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
                    <section id={styles["input"]} className={styles.container}>
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
                                field={formik.getFieldProps('select')}
                                form={formik}
                                meta={formik.getFieldMeta('select')}
                            />

                            <FormikContol
                                control='radio'
                                label='Gender 2'
                                name='radioOption'
                                options={radioOptions}
                                field={formik.getFieldProps('radioOption')}
                                form={formik}
                                meta={formik.getFieldMeta('radioOption')}
                            />

                            <FormikContol
                                control='checkbox'
                                label='Gender 3'
                                name='checkboxOption'
                                options={checkboxOptions}
                                field={formik.getFieldProps('checkboxOption')}
                                form={formik}
                                meta={formik.getFieldMeta('checkboxOption')}
                            />

                            <FormikContol
                                control='date'
                                label='Pick a date'
                                name='birthDate'
                                field={formik.getFieldProps('birthDate')}
                                form={formik}
                                meta={formik.getFieldMeta('birthDate')}
                            />

                            <input className={`${styles.btn} ${styles.submit}`} type="submit" value="Proba !" />
                        </Form>
                    </section>
            }
        </Formik>
    );
}

export default FormikContainer;