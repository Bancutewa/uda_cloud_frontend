import React from 'react'
import { useState } from 'react';
import DetailProduct from '../../../../site-customer/components/molecules/DetailProduct/DetailProduct';
import './style.css'
import { createProductsAPI } from '../../../../../api/productsAPI';

const CartCreateAdminPage = () => {

    // Khởi tạo State 
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('')



    // Handle Event
    const onChangeProduct = () => {
        const productUpdate = {
            name: name,
            img: img,
            category: category,
            price: price,
            quantity: quantity
        }
        try {
            createProductsAPI(productUpdate)
            alert(`Đã thê mới sản phẩm ID}`)
        } catch {
            alert(`Không thể thêm sản phẩm`)
        }
    }
    return (
        <main className='content'>


            <div id="form">
                <h3>Chỉnh sửa sản phẩm</h3>
                <input type="hidden" id="ID" />
                <div className="input-group">
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="categorySelect">Danh mục</label>
                    <select id="categorySelect" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="all">Tất cả</option>
                        <option value="Cá Neon">Cá Neon</option>
                        <option value="Cá Dĩa">Cá Dĩa</option>
                        <option value="Cá Thần Tiên">Cá Thần Tiên</option>
                        <option value="Cá Chuột">Cá Chuột</option>
                        <option value="Cá Phượng Hoàng">Cá Phượng Hoàng</option>
                        <option value="Cá Ali Thái">Cá Ali Thái</option>
                        <option value="Cá Cầu Vồng">Cá Cầu Vồng</option>
                        <option value="Thức Ăn Cá">Thức Ăn Cá</option>
                        <option value="Tép Thủy Sinh">Tép Thủy Sinh</option>
                        <option value="Lau Kiếng, Vệ Sinh Hồ">Lau Kiếng, Vệ Sinh Hồ</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="price">Giá cả</label>
                    <input type="text" id="price" placeholder="Giá cả" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="quantity">Số lượng còn trong kho</label>
                    <input type="text" id="quantity" placeholder="Số lượng còn trong kho" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="img">Link hình ảnh</label>
                    <input type="text" id="img" placeholder="Link hình ảnh" value={img} onChange={(e) => setImg(e.target.value)} />
                </div>
                <div className="">
                    <input type="submit" value="Thêm sản phẩm" onClick={onChangeProduct} />
                </div>
            </div>
        </main>
    );
}

export default CartCreateAdminPage
