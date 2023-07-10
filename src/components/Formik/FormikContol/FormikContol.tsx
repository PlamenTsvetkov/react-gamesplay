import Input, { InputProps } from "../Input/Input";
import Textarea from '../Textarea/Textarea'


interface FormikControlProps extends InputProps {
    control: string;
    inputType?: string;
    label: string;
    name: string;
}

const FormikContol = (props: FormikControlProps) => {
    const { control, ...rest } = props;

    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <Textarea {...rest}/>
        case 'select':
        case 'radio':
        case 'checkbox':
        case 'date':
        default: return null;
    }
}
export default FormikContol;