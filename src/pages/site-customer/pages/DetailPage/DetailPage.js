import React, { useRef } from 'react'

import { useEffect } from 'react'

import { useState } from 'react'

import { useParams } from 'react-router-dom'

import DetailProduct from '../../components/molecules/DetailProduct/DetailProduct'

import { Accordion } from 'react-bootstrap'

import './style.css'

import Card from '../../components/molecules/Card/Card'

import { fetchProductAPIByID, fetchProductsAPIByCategory } from '../../../../api/productsAPI'
import { createComment, getAllCommentsByProductID } from '../../../../api/commentsAPI'
import { decodeToken } from 'react-jwt'
import { useAuth } from '../../../../context/auth.context'



const DetailPage = () => {

    const { isLoggedIn } = useAuth();

    const token = localStorage.getItem("token");
    const myDecodedToken = decodeToken(token);
    const user_id = myDecodedToken?.id

    const { productId, urlPath } = useParams()

    // State
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const [comments, setComments] = useState([]);


    const newCommentRef = useRef()

    const fetchData = async () => {
        try {
            // current Product
            const fetchedProduct = await fetchProductAPIByID(productId);
            setProduct(fetchedProduct.data)

            // List Products
            const fetchedProducts = await fetchProductsAPIByCategory({}, fetchedProduct.data.category.id);
            setProducts(fetchedProducts.data.products)

            // List comment
            const fetchedComments = await getAllCommentsByProductID(productId);
            setComments(fetchedComments);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    const handleSubmitComment = async (event) => {
        event.preventDefault();
        try {
            const newCommentData = {
                content: newCommentRef.current.value,
                user_id: user_id,
                product_id: productId,
            };

            await createComment(newCommentData);
            fetchData();
            newCommentRef.current.value = "";
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [urlPath, productId, isLoggedIn]);
    return (
        <main className='container content'>
            <div className='details-product row'>
                <DetailProduct key={product.id} product={product} />
            </div>
            <Accordion defaultActiveKey="0" className='description-product row my-4'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Description</Accordion.Header>
                    <Accordion.Body>
                        {product.description}

                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Reviews</Accordion.Header>
                    <Accordion.Body>
                        {comments.length === 0 ? (
                            <h3 className='p-3'>There are no reviews yet.</h3>
                        ) : (
                            <ul>
                                {comments.map((comment) => (
                                    <li key={comment.id}>
                                        <h5>{comment.user_id?.name || "Anonymous"}:</h5>
                                        <p>{comment.content}</p>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {isLoggedIn && (
                            <form onSubmit={handleSubmitComment} className='form-review border p-4'>
                                <h4>Write a comment</h4>
                                <div>
                                    <textarea
                                        placeholder='Comment content'
                                        required
                                        ref={newCommentRef}
                                    ></textarea>
                                </div>
                                <button type="submit">Submit comment</button>
                            </form>
                        )}

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='related-products row'>
                <h2>Related products</h2>
                <div className='products' onClick={window.scrollTo(0, 0)}>
                    {products
                        .map(product => (
                            <Card key={product.id} product={product} />
                        ))}
                </div>
            </div>
        </main >
    )
}
export default DetailPage





