import { Field, ErrorMessage, FieldProps } from 'formik';
import ErrorText from '../../ErrorMessage/ErrorText';
import styles from './CheckboxGroup.module.css';

export interface RadioButtonsProps extends FieldProps {
  label: string;
  name: string;
  options?: { key: string; value: string }[];
}

const CheckboxGroup = ({ label, name, options, field, form, meta }: RadioButtonsProps) => {
  return (
    <>
      <label className={styles["checkbox-buttons-container"]}>{label}</label>
      <div className={styles["checkbox-buttons-container"]}>
        {options?.map((option) => (
          <div className={styles["checkbox-button"]} key={option.key}>
            <Field
              type="checkbox"
              id={option.value}
              name={name}
              value={option.value}
              checked={field.value.includes(option.value)}
            />
            <label htmlFor={option.key}>{option.value}</label>
          </div>
        ))}
      </div>
      <ErrorMessage name={name} component={ErrorText} />
    </>
  );
};

export default CheckboxGroup;
