import React, { useState, useEffect } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { SCREEN_URL } from '../../../../../constants/screen/PathScreen';

const Card = (props) => {
    const { product } = props;
    const createUrlPath = (productName) => {
        return productName.toLowerCase().replace(/ /g, '-');
    };
    const urlPath = createUrlPath(product.name);
    const productDetailUrl = SCREEN_URL.DETAILS.replace(':urlPath', urlPath).replace(':productId', product.id);

    const createdAt = new Date(product.created_at);
    const updatedAt = new Date(product.updated_at);
    const timeDiff = Math.abs(updatedAt.getTime() - createdAt.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let decorationClass = '';
    if (daysDiff <= 7) {
        decorationClass = 'new-product';
    } else if (product.quantity === 0) {
        decorationClass = 'out-of-stock';
    }

    return (
        <div className={`col ${decorationClass}`} key={product.id}>
            <div className="p-3">
                <div className="card">
                    <NavLink to={productDetailUrl}>
                        <img src={product.image} className="img-product card-img-top" alt="..." />
                    </NavLink>
                    <div className="card-body">
                        <Link to={productDetailUrl}>
                            <p className="text-start fw-semibold">{product.name}</p>
                        </Link>
                        <div className="row">
                            <div className="col d-flex">
                                <div className="icon d-flex justify-content-start mb-3">
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14" }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14" }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14" }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14" }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14" }} />
                                    <FontAwesomeIcon icon={faStar} style={{ color: "#f0aa14" }} />
                                </div>
                            </div>
                        </div>
                        <p><b>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
