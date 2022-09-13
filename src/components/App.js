import SignUp from "./SignUp";
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Private from "./Private";
import PaymentsList from "./Payments/PaymentsList";
import PaymentAdd from "./Payments/PaymentAdd";
import Login from "./Login";
import { getTokenn, onMessageListener } from "../firebase";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastSuccess } from "../helpers/ToastHelpers";



function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({
    title: '', 
    body: ''
  });

  onMessageListener()
  .then(payload => {
    setNotification({title: payload.notification.title, body: payload.notification.body})
    ToastSuccess(payload.notification.body)
  })
  .catch(err => console.log('failed: ', err));

  
  useEffect(() => {
    getTokenn(setTokenFound);
  }, [isTokenFound])
  
  return (
    
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeigth: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <BrowserRouter>
          <Routes basename="/">
            <Route
              path="/payments"
              element={
                <Private>
                    <PaymentsList />
                </Private>
              }
            />
            <Route 
              path="/payment" 
              element={
                <Private>
                  <PaymentAdd />
                </Private>
              } 
            />
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/login" element={ <Login /> } />
            {/* <Route path="/payment/:id" element={<PaymentAdd />} /> */}
            <Route path="*" element={ <Navigate to="/payments" /> }/>
          </Routes>
        </BrowserRouter>
        </div>
        <ToastContainer />
          
      </Container>
  );
}

export default App;
