import Input, { InputProps } from "../Input/Input";
import Textarea from '../Textarea/Textarea';
import Select from '../Select/Select';


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
        case 'checkbox':
        case 'date':
        default: return null;
    }
}
export default FormikContol;