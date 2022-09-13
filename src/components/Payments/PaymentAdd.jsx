import React, { useEffect, useState } from 'react' 
import { Form, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../Common/CustomButton'
import CustomInput from '../Common/CustomInput'
import { useAuth } from '../../contexts/AuthContext'
import CustomCheckbox from '../Common/CustomCheckbox'
import { PaymentContext } from '../../contexts/PaymentContext'
import { useContext } from 'react'
import { ToastSuccess } from '../../helpers/ToastHelpers'


export default function PaymentAdd() {
  const navigate = useNavigate();
  const { currentUser } = useAuth()
  const [ payment, setPayment ] = useState({
    title:"",
    description:"",
    dueDate: "",
    paid:false, 
    userId:"",
    deleted: false
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { createPayment } = useContext(PaymentContext)
  const { title, description, dueDate } = payment

  useEffect(() => {
    setPayment({...payment, userId: currentUser.uid })
  }, [currentUser])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await createPayment(payment)
      ToastSuccess("Payment Added Successfully")
      navigate("/payments")
    } catch (error) {
      setError("Failed to create a payment")
    }
    setLoading(false)
  }

  const handleTitleChange = (e) => setPayment({...payment, title: e.target.value })

  const handleDescriptionChange = (e) => setPayment({...payment, description: e.target.value })

  const handleDueDateChange = (e) => setPayment({...payment, dueDate: e.target.value })

  const handlePaymentStatusChange = (e) => setPayment({...payment, paid: true })


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
