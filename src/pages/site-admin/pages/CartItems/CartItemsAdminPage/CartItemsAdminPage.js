import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Product from "../../../components/organisms/Product/Product";
import { Link } from "react-router-dom";
import { SCREEN_URL } from "../../../../../constants/screen/PathScreen";
import { useRef } from "react";
import { async } from "q";
import { delProductById, deleteProductAPI, fetchProductsAPIByCategory, fetchProductsApi } from "../../../../../api/productsAPI";

const CartItems = () => {
    const [products, setProducts] = useState([]);
    // const [productsRender, setProductsRender] = useState([]);
    const fetchData = async () => {
        try {
            const fetchedProducts = await fetchProductsApi();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Ref
    const categoryRef = useRef()


    // Handle event
    const searchByCategory = async (name) => {
        try {
            let category;
            if (name === "all") {
                category = await fetchProductsApi();
            } else {
                category = await fetchProductsAPIByCategory(name);
            }
            setProducts(category);
        } catch (error) {
            console.error("Error searching by category:", error);
        }
    };


    const onclickDeleteProduct = async (id) => {
        await deleteProductAPI(id)
        fetchData();
    }

    return (
        <div>

            <div className="control d-flex justify-content-between ">
                <Button variant="primary" > <Link style={{ color: 'white' }} to={SCREEN_URL.ADMIN_CREATE_PRODUCT}>Tạo sản phẩm mới</Link></Button>{' '}
                <select style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: '#0D6EFD',
                    color: 'white'
                }}
                    id="categorySelect" name="category" ref={categoryRef} onChange={() => searchByCategory(categoryRef.current.value)}>
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
            <Table striped bordered hover style={{ width: "1200px" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Giá</th>
                        <th>Số lượng còn trong kho</th>
                        <th>Xoá sản phẩm</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, i) => (
                        <Product
                            i={i}
                            data={product}
                            deleteProduct={onclickDeleteProduct} />
                    ))}
                </tbody>
            </Table>
        </div >
    );
};

export default CartItems;