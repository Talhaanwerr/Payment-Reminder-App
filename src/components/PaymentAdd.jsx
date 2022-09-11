import React, { useState } from 'react' 
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { collection, doc, getDocs, getDoc, addDoc } from "firebase/firestore"
import { db } from '../firebase'
import CustomButton from './Common/CustomButton'
import CustomInput from './Common/CustomInput'



export default function PaymentAdd() {
  const navigate = useNavigate();
  const [ payment, setPayment ] = useState({
    title:"",
    description:"",
    due_date: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    try {
      setError("")
      setLoading(true)
      const paymentsCollectionRef = collection(db, "payments")
      const res = await addDoc(paymentsCollectionRef, payment)
      navigate("/payments")
    } catch (error) {
      console.log("res: ", error)
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  const handleTitleChange = (e) => {
    setPayment({...payment, title: e.target.value })
  }

  const handleDescriptionChange = (e) => {
    setPayment({...payment, description: e.target.value })
  }

  const handleDateChange = (e) => {
    console.log(e.target.value)
  }


  return (
    <>
    {console.log("payyy: ", payment)}
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Add Payment</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <CustomInput 
                      id='title'
                      title='Title'
                      type='text'
                      handleChange={(e) => handleTitleChange(e)}
                      required={true}
                    />
                    <CustomInput 
                      id='description'
                      title='Description'
                      type='text'
                      handleChange={(e) => handleDescriptionChange(e)}
                      required={true}
                    />
                    <CustomInput 
                      id='due-date'
                      title='Due Date'
                      type='date'
                      handleChange={(e) => handleDateChange(e)}
                      required={true}
                    />
                    <CustomButton
                      disabled={loading}
                      title='Save'
                    />
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}
