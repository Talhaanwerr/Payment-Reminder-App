import { Form } from 'react-bootstrap'


const CustomInput = ({id, title, handleChange, ...rest}) => {
  
  return (
    <Form.Group id={id}>
        <Form.Label>{title}</Form.Label>
        <Form.Control onChange={handleChange} {...rest} />
    </Form.Group>
  );
}

export default CustomInput;
