import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Your custom CSS
import { Button, CloseButton, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { checkOutCartAPI, fetchCartByIDApi } from "../../../../api/cartAPI";
import { decodeToken } from "react-jwt";
import { deleteCartItem, updateCartItem } from "../../../../api/cartItemAPI";
import { SCREEN_URL } from "../../../../constants/screen/PathScreen";

const CartPage = () => {
    const navigate = useNavigate()


    const [cart, setCart] = useState(null);
    const [urlCheckOut, setUrlCheckOut] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");
    const myDecodedToken = decodeToken(token);
    const fetchData = async () => {
        try {
            const fetchedCart = await fetchCartByIDApi(myDecodedToken.id);
            setCart(fetchedCart);
            if (fetchedCart.cart_items.length > 0) {
                const fetchedUrlCheckOut = await checkOutCartAPI(myDecodedToken.id);
                setUrlCheckOut(fetchedUrlCheckOut.approvalUrl);
            } else {
                setError("Please add items to your cart before checking out.");
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (myDecodedToken?.id) {
            fetchData();
        } else {
            return navigate(SCREEN_URL.LOGIN);
        }
    }, []);

    const calculateTotalPrice = () => {
        if (!cart) return 0;
        return cart.cart_items.reduce((total, item) => {
            return total + item.product_id.price * item.quantity;
        }, 0);
    };
    const handleQuantityChange = async (itemId, action) => {
        try {
            const body = {
                cart_id: myDecodedToken.id,
                product_id: itemId,
                action: action,
            };

            await updateCartItem(body);
            fetchData()
        } catch (error) {
            console.error("Error updating cart item:", error);
        }
    };
    const handleDeleteCartItem = async (itemId) => {
        try {
            await deleteCartItem(itemId);
            fetchData()
        } catch (error) {
            console.error("Error delete cart item:", error);
        }
    };
    return (
        <main className="container mt-5">
            <h2 className="mb-4">Shopping Cart</h2>

            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div className="row mb-5">
                    <div className="col-8">
                        <table cellpadding="10" id="table-list-student">
                            <thead>
                                <tr>
                                    <th style={{ opacity: "0" }}>Cover</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart && cart.cart_items.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <img
                                                src={item.product_id.image}
                                                alt={item.product_id.name}
                                                width="70"
                                                height="70"
                                            />
                                        </td>
                                        <td className="product-name">{item.product_id.name}</td>
                                        <td className="product-price">
                                            {item.product_id.price.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </td>
                                        <td className="product-quantity">
                                            <div className="quantity-control">
                                                <Button
                                                    variant="outline-secondary"
                                                    className="quantity-button"
                                                    onClick={() =>
                                                        handleQuantityChange(item.product_id.id, "minus")
                                                    }
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </Button>
                                            </div>
                                            <input
                                                type="text"
                                                className="quantity-input"
                                                value={item.quantity}
                                                readOnly
                                            />
                                            <div className="quantity-control">
                                                <Button
                                                    variant="outline-secondary"
                                                    className="quantity-button"
                                                    onClick={() =>
                                                        handleQuantityChange(item.product_id.id, "add")
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </td>
                                        <td className="product-subtotal">
                                            {(item.product_id.price * item.quantity).toLocaleString(
                                                "vi-VN",
                                                { style: "currency", currency: "VND" }
                                            )}
                                        </td>
                                        <td className="product-del">
                                            <Button
                                                variant="outline-danger"
                                                onClick={() =>
                                                    handleDeleteCartItem(item.id)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-4">
                        <div className="order-summary">
                            <div className="order-summary">
                                <h5 className="card-title p-2">Order Summary</h5>
                                <ul className="list-group p-2">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Total
                                        <span>
                                            {cart ? calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : null}
                                        </span>
                                    </li>
                                </ul>
                                {cart && cart.cart_items.length > 0 && urlCheckOut ? (
                                    <Link to={urlCheckOut}>
                                        <button className="btn btn-success btn-block mt-3">
                                            CHECKOUT
                                        </button>
                                    </Link>
                                ) : null}
                            </div>


                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};


export default CartPage;
