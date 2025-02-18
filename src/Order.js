import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

const Order = () => {
    const { theme } = useTheme();
    const [params] = useSearchParams();
    const order_id = params.get("order_id");
    const [success, setSuccess] = useState("");
    const [showToast, setShowToast] = useState(false); //To show in Toast Modal
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const fetchOrders = async () => {
            try {
                const response = await axios.get("http://192.168.1.24/ecommerce/public/ecommerceCategory/getOrdersList");
                if (response.request.status == 200 && Array.isArray(response.data.orders)) {
                    setOrders(response.data.orders);
                } else {
                    setOrders([]);  // Empty array
                }
            } catch (error) {
                if (error.message) {
                    setError(error.message);
                } else if(error.request){
                    setError("Network Error : "+error.request.status+" : "+error.request.statusText);
                } else {
                    setError("Network error: Unable to connect to the server.");
                }
            }
        };
    useEffect(() => { 
        fetchOrders();
        if (order_id) {
            setSuccess("Order Placed Successfully");
            setShowToast(true);
        }
    }, [order_id]); 
    if (error) {
        <h1>Orders</h1>
        return <div className="container alert alert-danger">{error}</div>;
    }
    return (
        <div className={`container ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
            <h1>Orders</h1>
            <div>
                <Table responsive striped bordered hover className={theme === "dark" ? "table-dark" : ""}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Order ID</th>
                            <th>Amount</th>
                            <th>Payment Status</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order.order_id}</td>
                                        <td>{order.amount}</td>
                                        <td>{order.payment_status}</td>
                                        <td>{order.created_at}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>No Orders Found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
            <ToastContainer position='bottom-end' className='p-3'>
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide bg="success">
                    <ToastHeader>
                        <span>Order ID: {order_id}</span></ToastHeader>
                    <ToastBody> {success} </ToastBody>
                </Toast>
            </ToastContainer>
        </div>
    );
}
export default Order;