import React, { useEffect, useState } from "react"
import { Button, Alert, Table } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import DeleteIcon from "../Icons/DeleteIcon"
import EditIcon from "../Icons/EditIcon"
import { useContext } from "react"
import { PaymentContext } from "../../contexts/PaymentContext"
import PaymentHeaders from "./PaymentHeaders"
import { ToastError, ToastSuccess } from "../../helpers/ToastHelpers"

export default function PaymentsList() {
  const [ payments, setPayments ] = useState([])
  const [ paymentHeaders, setPaymentHeaders ] = useState(['id', 'title', 'description', "status"])  
  const [error, setError] = useState("")
  const { deletePayment, getPayments } = useContext(PaymentContext)
  const { logout } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
      const retrievePaments = async () => {
        const payments = await getPayments()
        setPayments(payments)   
      }
      retrievePaments()
  }, [])


  async function handleDeletePayment(id) {
    try {
      await deletePayment(id)
      setPayments(
        payments.filter((payment) => {
          return payment.id != id
        })
      )
      ToastSuccess("Payment Deleted Successfully")
    } catch (error) {
      ToastError("Failed to delete a payment") 
    }
  }

  async function handleAddPayment() {
    try {
      navigate("/payment")
    } catch {
      setError("Failed to log out")
    }
  }

  async function handleLogout() {
    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <h2 className="text-center mb-4">Payments</h2>
      <Button onClick={handleAddPayment}>
          Add Payment
      </Button>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered>
        <PaymentHeaders 
          headers={paymentHeaders}
        />
      <tbody>
        {payments.map((payment, index) => {
          return (
            <tr key={`row_${index}`}>
              {paymentHeaders?.map((paymentHeader, index) => {
                return(
                  <td key={`col_${index}`}>{payment[paymentHeader]}</td>
                )
              })}
              <td key={`col_99`}>
                <EditIcon />
                <DeleteIcon onClick={() => handleDeletePayment(payment.id)} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}