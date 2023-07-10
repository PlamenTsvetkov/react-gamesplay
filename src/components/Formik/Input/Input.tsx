import { Field, ErrorMessage, FieldProps } from 'formik';
import ErrorText from '../../ErrorMessage/ErrorText';

export interface InputProps extends FieldProps {
    label: string;
    name: string;
    inputType?:string;
}

const Input = ({ label, name,inputType, ...rest }: InputProps) => {

    return (
       <>
            <label htmlFor={name}>{label}</label>
            <Field 
            type={inputType} 
            id={name} 
            name={name} 
            {...rest} />
            <ErrorMessage name={name} component={ErrorText} />
        </>
    )
}

export default Input;