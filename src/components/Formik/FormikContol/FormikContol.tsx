import Input, { InputProps } from "../Input/Input";
import Textarea from '../Textarea/Textarea';
import Select from '../Select/Select';
import RadioButtons from "../RadioButtons/RadioButtons";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";


interface FormikControlProps extends InputProps {
    control: string;
    inputType?: string;
    label: string;
    name: string;
    options?: { key: string ; value: string;  }[];
}

const FormikContol = (props: FormikControlProps) => {
    const { control, ...rest } = props;

    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <Textarea {...rest}/>
        case 'select':
            return <Select {...rest}/>
        case 'radio':
            return <RadioButtons {...rest}/>
        case 'checkbox':
            return <CheckboxGroup {...rest}/>
        case 'date':
        default: return null;
    }
}
export default FormikContol;