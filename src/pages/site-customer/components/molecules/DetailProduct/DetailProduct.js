import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { fetchProductAPIByID } from '../../../../../api/productsAPI';
import { Button } from 'react-bootstrap';
import { decodeToken } from 'react-jwt';
import { createCartItem, updateCartItem } from '../../../../../api/cartItemAPI';
import { toast } from 'react-toastify';

const DetailProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [quantityBuy, setQuantityBuy] = useState(1);

    const token = localStorage.getItem("token");
    const myDecodedToken = decodeToken(token);

    const fetchData = async () => {
        try {
            const fetchedProduct = await fetchProductAPIByID(productId);
            setProduct(fetchedProduct.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [productId]);

    const handleQuantityChange = (value) => {
        setQuantityBuy(prevQuantity => prevQuantity + value);
    };

    const addToCart = async () => {
        try {
            if (!myDecodedToken?.id) {
                toast.error('Vui lòng đăng nhập trước khi thêm vào giỏ hàng.');
                return;
            }

            const body = {
                cart_id: myDecodedToken.id,
                product_id: productId,
                quantity: quantityBuy
            };

            await createCartItem(body);
            toast.success('Đã thêm sản phẩm vào giỏ hàng thành công!');
            fetchData();

        } catch (error) {
            console.error("Error updating cart item:", error);
            toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng.");
        }
    };

    return (
        <div className="detail-product">
            {product && Object.keys(product).length > 0 && (
                <>
                    <div className="product-img">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-information">
                        <div className="product-name">
                            <h2>{product.name}</h2>
                        </div>
                        <div className="more-infor">
                            <span>Category</span>
                            <p>{product.category.name}</p>
                        </div>
                        <div className="more-infor">
                            <span>Giá</span>
                            <span>₫{product.price.toLocaleString('vi-VN')}</span>
                        </div>
                        <div className="more-infor">
                            <span>Tình trạng:</span>
                            <span>{parseInt(product.quantity) ? `Còn hàng (${product.quantity} sản phẩm)` : "Hết hàng"}</span>
                        </div>
                        <div className="add-to-cart">
                            <td className="product-quantity">
                                <div className="quantity-control">
                                    <Button
                                        variant="outline-secondary"
                                        className="quantity-button"
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantityBuy <= 1}
                                    >
                                        -
                                    </Button>
                                </div>
                                <input
                                    type="text"
                                    className="quantity-input"
                                    value={quantityBuy}
                                    readOnly
                                />
                                <div className="quantity-control">
                                    <Button
                                        variant="outline-secondary"
                                        className="quantity-button"
                                        onClick={() => handleQuantityChange(1)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </td>
                            <Button onClick={addToCart} disabled={parseInt(product.quantity) === 0 || quantityBuy === 0}>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DetailProduct;
