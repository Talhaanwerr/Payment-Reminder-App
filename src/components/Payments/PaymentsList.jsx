import React, { useEffect, useState } from "react"
import { Button, Alert, Table } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore"
import { db } from '../../firebase'
import DeleteIcon from "../Icons/DeleteIcon"
import EditIcon from "../Icons/EditIcon"
import { useContext } from "react"
import { PaymentContext } from "../../contexts/PaymentContext"
import PaymentHeaders from "./PaymentHeaders"

export default function PaymentsList() {
  const [ payments, setPayments ] = useState([])
  const [ paymentHeaders, setPaymentHeaders ] = useState(['id', 'title', 'description', "Status"])  
  const [error, setError] = useState("")
  const { deletePayment } = useContext(PaymentContext)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  
  const paymentsCollectionRef = collection(db, "payments")
  useEffect(() => {
    const getPayments = async () => {
      const payments = []
      const snapshot = await getDocs(paymentsCollectionRef)
      snapshot.docs.forEach((doc) => {
        payments.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setPayments(payments)   
    }
    getPayments()
  })

  const handleDeletePayment =  (id) => async (e) => {
    const res = await deletePayment(id)
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
                <DeleteIcon deletePayment={handleDeletePayment(payment.id)} />
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