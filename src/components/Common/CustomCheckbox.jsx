import { Form } from 'react-bootstrap'


const CustomCheckbox = ({handleChange, ...rest}) => {  
  return (
    <Form.Check 
        type={'checkbox'}
        onChange={handleChange}
        {...rest}
    />
  );
}

export default CustomCheckbox;




