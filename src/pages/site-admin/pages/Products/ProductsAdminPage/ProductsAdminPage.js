import { useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import Product from "../../../components/organisms/Product/Product";
import { Link } from "react-router-dom";
import { SCREEN_URL } from "../../../../../constants/screen/PathScreen";
import { useRef } from "react";
import { deleteProductAPI, fetchProductsAPIByCategory, fetchProductsApi } from "../../../../../api/productsAPI";
import { delProductById, fetchCategoriesApi } from "../../../../../api/categoryAPI";
import { toast } from "react-toastify";
import { useAuth } from "../../../../../context/auth.context";
const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("all");


    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const fetchData = async () => {
        try {
            const fetchedCategories = await fetchCategoriesApi();
            setCategories(fetchedCategories.data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchProductsByCategoryAndPage = async (categoryId = null, page = 1, sortByDate = "newest") => {
        try {
            let fetchedProducts;

            if (categoryId === "all" || categoryId === null) {
                fetchedProducts = await fetchProductsApi({ limit: 5, page, sortByDate });
            } else {
                fetchedProducts = await fetchProductsAPIByCategory({ limit: 5, page, sortByDate }, categoryId);
            }

            setProducts(fetchedProducts.data.products);
            setTotalPage(fetchedProducts.data.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchData();
        fetchProductsByCategoryAndPage();
    }, []);

    useEffect(() => {
        fetchProductsByCategoryAndPage(selectedCategory, activePage);
    }, [activePage, selectedCategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setActivePage(1);
    };
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const onClickDeleteProduct = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            try {
                await deleteProductAPI(id);
                fetchProductsByCategoryAndPage();
                toast.success("Sản phẩm đã được xóa thành công.");
            } catch (error) {
                if (error.message === "Unauthorized") {
                    toast.error("Bạn không phải là admin.");
                    setIsLoggedIn(false)
                } else {
                    console.error("Error updating product:", error);
                    toast.error("Có lỗi xảy ra khi cập nhật sản phẩm.");
                }
            }
        }
    };
    return (
        <div>
            <div className="control d-flex justify-content-between ">
                <Button variant="primary" >
                    <Link style={{ color: 'white' }} to={SCREEN_URL.ADMIN_CREATE_PRODUCT}>Tạo sản phẩm mới</Link>
                </Button>{' '}
                <div>
                    <div className="d-flex justify-content-end">
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => handlePageChange(activePage - 1)}
                                disabled={activePage === 1}
                            />
                            {Array.from({ length: totalPage }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === activePage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePageChange(activePage + 1)}
                                disabled={activePage === totalPage}
                            />
                        </Pagination>
                    </div>

                    <select
                        style={{
                            padding: "5px 12px",
                            borderRadius: "5px",
                            background: "#0D5EFD",
                            color: "white",
                        }}
                        id="categorySelect"
                        name="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="all">Tất cả</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Table striped bordered hover style={{ width: "1200px" }}>
                <thead>
                    <tr>
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

export default Products;
