import React, { useState } from 'react' 
import { Form, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"
import CustomButton from './Common/CustomButton';
import CustomInput from './Common/CustomInput';


export default function SignUp() {
  const navigate = useNavigate();
  const [ user, setUser ] = useState({
    email:"",
    password:"",
    confirmPassword: "",
    address: ""
  })
  
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
//   const history = useHistory()


  const handleEmailChange = (e) => {
    setUser({...user, email: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setUser({...user, password: e.target.value })
  }

  const handleConfirmPasswordChange = (e) => {
    setUser({...user, confirmPassword: e.target.value })
  }

  const handleAddressChange = (e) => {
    setUser({...user, address: e.target.value })
  }


  async function handleSubmit(e) {
    e.preventDefault()
    const { email, password, confirmPassword } = user

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      const res = await signup(email, password)
      navigate("/payments")
    } catch (error) {
      setError("Failed to create an account")
    }

    setLoading(false)
  }


  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
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
                  <CustomInput 
                    id='confirm-password'
                    title='Password Confirmation'
                    type='password'
                    handleChange={(e) => handleConfirmPasswordChange(e)}
                    required={true}
                  />
                  <CustomInput 
                    id='address'
                    title='Address'
                    type='text'
                    handleChange={(e) => handleAddressChange(e)}
                  />
                  <CustomButton 
                    disabled={loading}
                    title='Sign Up'
                  />
                  {/* <Button disabled={loading} className='w-100' type='submit'>Sign Up</Button> */}
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-ceter mt-2'>
            Alreay have an account? <Link to="/login">Log In</Link>
        </div>

    </>
  )
}
