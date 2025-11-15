import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Product from "../../../components/organisms/Product/Product";
import { Link } from "react-router-dom";
import { SCREEN_URL } from "../../../../../constants/screen/PathScreen";
import { useRef } from "react";
import { deleteProductAPI, fetchProductsAPIByCategory, fetchProductsApi } from "../../../../../api/productsAPI";
import { delProductById, fetchCategoriesApi } from "../../../../../api/categoryAPI";
const Carts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const categoryRef = useRef();
    const fetchData = async () => {
        try {
            const fetchedProducts = await fetchProductsApi();
            const fetchedCategories = await fetchCategoriesApi();
            setProducts(fetchedProducts.data.products);
            setCategories(fetchedCategories.data.categories);

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {


        fetchData();
    }, []);

    const searchByCategory = async () => {
        const categoryId = categoryRef.current.value;
        try {
            let products;
            if (categoryId === "all") {
                products = await fetchProductsApi();
            } else {
                products = await fetchProductsAPIByCategory(categoryId);
            }
            setProducts(products.data.products);
        } catch (error) {
            console.error("Error searching by category:", error);
        }
    };


    const onClickDeleteProduct = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await deleteProductAPI(id);
                fetchData();
                alert("Sản phẩm đã được xóa thành công.");
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm:", error);
                alert("Không thể xóa sản phẩm.");
            }
        }
    };
    return (
        <div>
            <div className="control d-flex justify-content-between ">
                <Button variant="primary" >
                    <Link style={{ color: 'white' }} to={SCREEN_URL.ADMIN_CREATE_PRODUCT}>Tạo sản phẩm mới</Link>
                </Button>{' '}
                <select
                    style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: "#0D6EFD",
                        color: "white",
                    }}
                    id="categorySelect"
                    name="category"
                    ref={categoryRef}
                    onChange={searchByCategory}
                >
                    <option value="all">Tất cả</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <Table striped bordered hover style={{ width: "1200px" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Giá</th>
                        <th>Số lượng còn trong kho</th>
                        <th>Xoá sản phẩm</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <Product
                            key={product.id}
                            index={index}
                            data={product}
                            deleteProduct={onClickDeleteProduct} />
                    ))}
                </tbody>
            </Table>
        </div >
    );
};

export default Carts;
