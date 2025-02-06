// Purpose: To display the cart page
import { Button, Table } from "react-bootstrap";
import { useCart } from "./CartProvider";
import { useTheme } from "./ThemeProvider";
import axios from "axios";
const Cart = () => {
    const { theme } = useTheme();
    const { cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();
    const total_amount = cartItems.reduce((total, item) => total + (item.quantity * item.model), 0);
    
    const paymentUpdate = () => {
        window.open("https://buy.stripe.com/test_3cs01tfW91xq5TqbII", "_blank");
    }
    return (
        <div  className={`container ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
            <h1>Cart Items</h1>
            <Table responsive striped bordered className={theme === "dark" ? "table-dark" : ""}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{(item.quantity * item.model).toFixed(2)}</td>
                                    <td>
                                        <Button variant="info" onClick={() => addToCart(item)}>+</Button>&nbsp;
                                        <Button>{ item.quantity}</Button>&nbsp;
                                        <Button variant="success" onClick={() => decrementQuantity(item)} disabled={item.quantity == 1}>-</Button>&nbsp;
                                        <Button variant="danger" onClick={() => removeFromCart(item)}><i className="bi bi-trash"></i></Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="alert alert-danger">
                                <td colSpan={4} className="alert alert-danger">No Items in Cart</td>
                            </tr>
                        )
                    }
                </tbody> 
                  
                {/* Single tfoot for total amount and button */}
                {cartItems.length > 0 && (
                    <tfoot>
                        <tr>
                            <td colSpan={2}><strong>Total Amount</strong></td>
                            <td colSpan={2}><strong>{total_amount.toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="text-center">
                                <Button variant="primary" onClick={() => paymentUpdate()}>Proceed to Payment</Button>
                            </td>
                        </tr>
                    </tfoot>
                )}
                </Table>
        </div>
    )
}
export default Cart;