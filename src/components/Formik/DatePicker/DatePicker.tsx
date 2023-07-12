import DateView from 'react-datepicker';
import { Field, ErrorMessage, FieldProps } from 'formik';
import ErrorText from '../../ErrorMessage/ErrorText';
import 'react-datepicker/dist/react-datepicker.module.css';

export interface DatePickerProps extends FieldProps {
    label: string;
    name: string;
}

const DatePicker = ({ label, name,form, field, ...rest }: DatePickerProps) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <Field name={name}>
                {
                    () => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return <DateView 
                        id={name} 
                        {...field} 
                        selected={value} 
                        onChange ={val=>setFieldValue(name,val)}/>
                    }
                }
            </Field>
            <ErrorMessage name={name} Component={ErrorText}/>
        </>
    );
}
export default DatePicker;
  