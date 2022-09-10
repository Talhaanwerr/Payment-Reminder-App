import SignUp from "./SignUp";
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Private from "./Private";
import PaymentsList from "./PaymentsList";
import PaymentAdd from "./PaymentAdd";
import Login from "./Login";

function App() {
  return (
    <AuthProvider>
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
          <Route path="/payment/:id" element={<PaymentAdd />} />
          <Route path="*" element={ <Navigate to="/payments" /> }/>
        </Routes>
      </BrowserRouter>
      </div>
        
    </Container>
    </AuthProvider>
  );
}

export default App;
