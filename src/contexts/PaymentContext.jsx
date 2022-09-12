import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { db } from '../firebase'
import { collection, doc, getDocs, deleteDoc, addDoc } from "firebase/firestore"


const PaymentContext = React.createContext()

// export function usePayment() {
//   return useContext(PaymentContext)
// }

function PaymentProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     setCurrentUser(user)
  //     setLoading(false)
  //   })

  //   return unsubscribe
  // }, [])

  // function signup(email, password) {
  //   return auth.createUserWithEmailAndPassword(email, password)
  // }

  // function login(email, password) {
  //   return auth.signInWithEmailAndPassword(email, password)
  // }

  // function logout() {
  //   return auth.signOut()
  // }
  const createPayment = async (payment) => {
    const paymentsCollectionRef = collection(db, "payments")
    return await addDoc(paymentsCollectionRef, payment)
  }

  const deletePayment = async (id) => {
    const paymentDoc = doc(db, "payments", id)
    return await deleteDoc(paymentDoc)
  }


  
  const value = {
    createPayment,
    deletePayment
  }

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  )
}

export { PaymentProvider, PaymentContext} 