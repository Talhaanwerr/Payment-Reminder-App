import { Button } from 'react-bootstrap'


const PaymentHeaders = ({ headers }) => {
  
  return (
    <thead>
        <tr>
            {headers?.map((paymentHeader, index) => {
            return(
                <th key={`header_${index}`}>{paymentHeader.toUpperCase()}</th>
            )
            })}
            <th key={`header_99}`}>ACTIONS</th>
        </tr>
    </thead>
  );
}

export default PaymentHeaders;
