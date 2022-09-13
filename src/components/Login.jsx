import React, { useState } from 'react' 
import { Form, Card, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from './Common/CustomInput';
import CustomButton from './Common/CustomButton';


export default function Login() {
  const navigate = useNavigate();
  const [ user, setUser ] = useState({
    email:"",
    password:""
  })
  
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
//   const history = useHistory()

const handleEmailChange = (e) => {
  setUser({...user, email: e.target.value })
}

const handlePasswordChange = (e) => {
  setUser({...user, password: e.target.value })
}


  async function handleSubmit(e) {
    e.preventDefault()

    const { email, password } = user

    try {
      setError("")
      setLoading(true)
      await login(email, password)
      navigate('/payments');
    } catch (error) {
      setError("Failed to sign in")
    }

    setLoading(false)
  }


  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                <CustomInput 
                    id='email'
                    title='Email'
                    type='email'
                    handleChange={(e) => handleEmailChange(e)}
                    required={true}
                  />
                  <CustomInput 
                    id='password'
                    title='Password'
                    type='password'
                    handleChange={(e) => handlePasswordChange(e)}
                    required={true}
                  />
                  <CustomButton 
                    disabled={loading}
                    title='Log In'
                  />
                  {/* <Button disabled={loading} className='w-100' type='submit'>Log In</Button> */}
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-ceter mt-2'>
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>

    </>
  )
}
