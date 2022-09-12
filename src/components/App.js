import SignUp from "./SignUp";
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Private from "./Private";
import PaymentsList from "./Payments/PaymentsList";
import PaymentAdd from "./Payments/PaymentAdd";
import Login from "./Login";
import { PaymentProvider } from "../contexts/PaymentContext";

function App() {
  console.log("App")
  return (
    <AuthProvider>
    <PaymentProvider>
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
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/login" element={ <Login /> } />
            {/* <Route path="/payment/:id" element={<PaymentAdd />} /> */}
            <Route path="/payment" element={<PaymentAdd />} />
            <Route path="*" element={ <Navigate to="/payments" /> }/>
          </Routes>
        </BrowserRouter>
        </div>
          
      </Container>
    </PaymentProvider>
    </AuthProvider>
  );
}

export default App;
