import React, { useEffect, useState } from 'react' 
import { Form, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from "firebase/firestore"
import { db } from '../../firebase'
import CustomButton from '../Common/CustomButton'
import CustomInput from '../Common/CustomInput'
import { useAuth } from '../../contexts/AuthContext'
import CustomCheckbox from '../Common/CustomCheckbox'



export default function PaymentAdd() {
  const navigate = useNavigate();
  const { currentUser } = useAuth()
  const [ payment, setPayment ] = useState({
    title:"",
    description:"",
    dueDate: "",
    paid:false, 
    userId:""
  })

  const { title, description, dueDate } = payment
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPayment({...payment, userId: currentUser.uid })
  }, [currentUser])

  async function handleSubmit(e) {
    e.preventDefault()

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

  const handleDueDateChange = (e) => {
    setPayment({...payment, dueDate: e.target.value })
  }

  const handlePaymentStatusChange = (e) => {

    setPayment({...payment, paid: true })
}


  return (
    <>
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
                      value={title}
                    />
                    <CustomInput 
                      id='description'
                      title='Description'
                      type='text'
                      handleChange={(e) => handleDescriptionChange(e)}
                      required={true}
                      value={description}
                    />
                    <CustomInput 
                      id='due-date'
                      title='Due Date'
                      type='date'
                      handleChange={(e) => handleDueDateChange(e)}
                      required={true}
                      value={dueDate}
                    />
                    <CustomCheckbox 
                      id='payment-status'
                      label='PAID?'
                      handleChange={(e) => handlePaymentStatusChange(e)}
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
