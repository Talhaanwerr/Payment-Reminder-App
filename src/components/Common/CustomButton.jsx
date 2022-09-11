import { Button } from 'react-bootstrap'


const CustomButton = ({ disabled, title }) => {
  
  return (
    <Button disabled={disabled} className='w-100' type='submit'>
        {title}
    </Button>
  );
}

export default CustomButton;
