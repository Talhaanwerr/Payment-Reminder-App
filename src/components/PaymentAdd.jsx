import React, { useState } from 'react' 
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { collection, doc, getDocs, getDoc, addDoc } from "firebase/firestore"
import { db } from '../firebase'



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
                    <Form.Group id='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' required onChange={(e) => handleTitleChange(e)}/>
                    </Form.Group>
                    <Form.Group id='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' required onChange={(e) => handleDescriptionChange(e)}/>
                    </Form.Group>
                    <Form.Group id='due-date'>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control type='date' onChange={(e) => handleDateChange(e)} />
                    </Form.Group>
                    <Button disabled={loading} className='w-100' type='submit'>Save</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}
