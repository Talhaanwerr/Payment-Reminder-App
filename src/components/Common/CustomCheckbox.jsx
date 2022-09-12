import { Form } from 'react-bootstrap'


const CustomCheckbox = ({handleChange, ...rest}) => {  
  return (
    <Form.Check 
        type={'checkbox'}
        onChange={handleChange}
        {...rest}
    />
    // <Form.Group id={id}>
    //     <Form.Label>{title}</Form.Label>
    //     <Form.Control onChange={handleChange} {...rest} />
    // </Form.Group>
  );
}

export default CustomCheckbox;




