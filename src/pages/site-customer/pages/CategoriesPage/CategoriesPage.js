import React from 'react'
import './style.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../../components/molecules/Card/Card';
import { Link, useParams } from 'react-router-dom';
import { SCREEN_URL } from '../../../../constants/screen/PathScreen';
import { fetchCategoriesApi } from '../../../../api/categoryAPI';
import { fetchProductsAPIByCategory } from '../../../../api/productsAPI';
import { Pagination } from 'react-bootstrap';

const CategoriesPage = () => {
    // Params
    const { urlPath, productCategory } = useParams()


    // State
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [sortByPrice, setSortByPrice] = useState("");
    const fetchData = async () => {
        try {
            const fetchedCategories = await fetchCategoriesApi();
            setCategories(fetchedCategories.data.categories)

            const fetchedProducts = await fetchProductsAPIByCategory({
                limit: 3,
                page: activePage,
                sortByPrice: sortByPrice
            }, productCategory);
            setTotalPage(fetchedProducts.data.pagination.totalPages);
            setProducts(fetchedProducts.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };
    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        setSortByPrice(selectedValue);
    };

    useEffect(() => {
        fetchData();
    }, [activePage, productCategory, sortByPrice]);


    return (
        <main className='container'>
            <div className=' row mt-2'>
                <div className='col-3 navigate '>
                    <div className='nav-item'>
                        <h3 className='my-4'>Categories</h3>
                        <div className='list-categories p-4'>

                            {categories.map(category => <div className='item'>
                                <Link class="nav-link" style={{ whiteSpace: "nowrap" }} to={SCREEN_URL.CATEGORY.replace(':urlPath', category.name.toLowerCase().replace(/ /g, '-')).replace(':productCategory', category.id)}>
                                    {category.name}
                                </Link>
                            </div>)}
                        </div>
                    </div>
                </div>
                <div className='col-9 category'>
                    <h1 className='name-category'>{urlPath
                        .split('-')
                        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                        .join(' ')}</h1>
                    <p className='introduce-category'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris turpis velit, iaculis vel risus non, convallis rhoncus ligula.
                        Vestibulum ut lorem posuere, malesuada neque et, placerat quam. In hac habitasse platea dictumst. Sed bibendum porttitor sem,
                        at sollicitudin orci placerat nec.
                    </p>
                    <div className='category-products'>
                        <div className='d-flex justify-content-end'>
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
                        <div className='sort-product'>
                            <p>Showing all 5 results</p>
                            <select id="productsSelect" name="products" onChange={handleSortChange}>
                                <option value="Default Sorting">Default Sorting</option>
                                <option value="asc">Sort by Price: low to high </option>
                                <option value="desc">Sort by Price: high to low </option>
                            </select>
                        </div>
                        <div className='card-list'>
                            {products.map(product => (
                                <Card key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CategoriesPage
