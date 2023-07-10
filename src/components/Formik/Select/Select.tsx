import { Field, ErrorMessage, FieldProps } from 'formik';
import ErrorText from '../../ErrorMessage/ErrorText';

export interface InputProps extends FieldProps {
    label: string;
    name: string;
    options?: { key: string ; value: string;  }[];
    inputType?:string;
}

const Select = ({ label, name, options, ...rest }: InputProps) => {

    return (
       <>
            <label htmlFor={name}>{label}</label>
            <Field 
            as='select'
            id={name} 
            name={name} 
            {...rest}>
                {
                    options!.map(option=>{
                        return(
                            <option key={option.key} >{option.value}</option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component={ErrorText} />
        </>
    )
}

export default Select;