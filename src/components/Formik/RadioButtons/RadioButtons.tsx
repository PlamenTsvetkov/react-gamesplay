import { Field, ErrorMessage, FieldProps } from 'formik';
import ErrorText from '../../ErrorMessage/ErrorText';
import styles from './RadioButtons.module.css';

export interface RadioButtonsProps extends FieldProps {
  label: string;
  name: string;
  options?: { key: string; value: string }[];
}

const RadioButtons = ({ label, name, options, field }: RadioButtonsProps) => {
  return (
    <>
      <label className={styles["radio-buttons-container"]}>{label}</label>
      <div className={styles["radio-buttons-container"]}>
        {options?.map((option) => (
          <div className={styles["radio-button"]} key={option.key}>
            <Field
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={field.value === option.value}
            />
            <label htmlFor={option.key}>{option.value}</label>
          </div>
        ))}
      </div>
      <ErrorMessage name={name} component={ErrorText} />
    </>
  );
};

export default RadioButtons;
