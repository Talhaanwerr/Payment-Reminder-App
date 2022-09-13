import React from "react"
import { db } from '../firebase'
import { collection, doc, getDocs, addDoc, updateDoc, query, where } from "firebase/firestore"
import { useAuth } from "./AuthContext"

const PaymentContext = React.createContext()

function PaymentProvider({ children }) {

  const { currentUser } = useAuth()

  const createPayment = async (payment) => {
    const paymentsCollectionRef = collection(db, "payments")
    return await addDoc(paymentsCollectionRef, payment)
  }

  const deletePayment = async (id) => {
    const paymentDoc = doc(db, "payments", id)
    updateDoc(paymentDoc, {
      deleted: true
    })
    .then(() => {
      return true
    })
    .catch(error => {
        return false;
    })
  }

  const getPayments = async () => {
    const paymentsCollectionRef = collection(db, "payments")
    const payments = []
    const q = query(paymentsCollectionRef, where("deleted", "==", false), where("userId", "==", currentUser.uid))
      const snapshot = await getDocs(q)
      snapshot.docs.forEach((doc) => {
        payments.push({
          id: doc.id,
          status: (doc.data().paid == true ? "PAID" : "UNPAID"),
          ...doc.data()
        })
      })
      return payments
  }


  
  const value = {
    createPayment,
    getPayments,
    deletePayment
  }

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  )
}

export { PaymentProvider, PaymentContext} 