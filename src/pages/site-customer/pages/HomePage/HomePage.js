import React, { useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { faCarSide, faCircleNotch, faComment, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import Card from '../../components/molecules/Card/Card'
import ServiceItem from '../../components/molecules/ServiceItem/ServiceItem'
import { GroceryBanner } from '../../components/molecules/GroceryBanner/GroceryBanner'
import SaleProduct from '../../components/molecules/SaleProduct/SaleProduct'
import Comment from '../../components/molecules/Comment/Comment'
import { Carousel, Pagination } from 'react-bootstrap'
import { fetchProductsApi } from '../../../../api/productsAPI'
const HomePage = () => {
    const [products, setProducts] = useState([])
    const [productsToRender, setProductsToRender] = useState([])
    const [totalPage, setTotalPage] = useState(0);
    const [activePage, setActivePage] = useState(1);
    // Category Inner
    const fetchData = async () => {
        try {
            const fetchedProducts = await fetchProductsApi({
                limit: 8,
                page: activePage
            });
            const fetchedProductsHehe = await fetchProductsApi();
            setTotalPage(fetchedProducts.data.pagination.totalPages);
            setProducts(fetchedProducts.data.products);
            setProductsToRender(fetchedProductsHehe.data.products);
            console.log(fetchedProducts.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };
    useEffect(() => {
        fetchData();
    }, [activePage]);

    return (
        <main style={{ backgroundColor: "#E6E8EA" }}>
            <div className='container banner mb-5' >
                <Carousel className='py-4'>
                    <Carousel.Item>
                        <img className='imgCarousel' src='https://images.pexels.com/photos/3332538/pexels-photo-3332538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' text="First slide" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='imgCarousel' src='https://images.pexels.com/photos/1700731/pexels-photo-1700731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' text="First slide" />


                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='imgCarousel' src='https://images.pexels.com/photos/2156316/pexels-photo-2156316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' text="First slide" />


                    </Carousel.Item>
                </Carousel>
            </div>
            <div className='container elementor '>
                {/* Service */}
                <section className='elementor-section services d-flex justify-content-around align-items-center mb-5'>
                    <ul className='list-unstyled d-flex m-0 p-0'>
                        <ServiceItem icon={faCarSide} text='FreeShip' />
                        <ServiceItem icon={faComment} text='We are available 24/7' />
                        <ServiceItem icon={faCircleNotch} text='Satisfied or return' />
                        <ServiceItem icon={faCreditCard} text='100% secure payments' />
                    </ul>
                </section>
                {/* Products */}
                <section className='elementor-section '>
                    <div className='category'>
                        <h2>Bán chạy nhất hôm nay</h2>

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
                        <div className='products'>
                            {products.map(product => (
                                <Card key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
                {/* Banner */}
                <section className='elementor-section  '>
                    <div className="row my-5">
                        <div className="col-6">
                            <GroceryBanner
                                image='https://images.pexels.com/photos/1677116/pexels-photo-1677116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                title="Cá Hồng Nhung Vây Dài"
                                content='Hạ giá lên tới 30%'
                            />
                        </div>
                        <div className="col-6">
                            <GroceryBanner
                                image="https://images.pexels.com/photos/3905046/pexels-photo-3905046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                title="Cá Neon Vua "
                                content='Tươi mới'
                            />
                        </div>
                    </div>
                </section>
                {/* Products */}
                <section className='elementor-section'>
                    <div className='category'>
                        <h2>Cá Kim Cương</h2>
                        <div className='products'>
                            {productsToRender
                                .filter(product => product.category.name === "Cá Kim Cương")
                                .slice(0, 4)
                                .map(product => (
                                    <Card key={product.id} product={product} />
                                ))}
                        </div>
                    </div>
                </section>
                {/* Banner */}
                <section className='elementor-section  '>
                    <div className="row my-5">
                        <div className="col-12">
                            <GroceryBanner
                                image='https://images.pexels.com/photos/3062947/pexels-photo-3062947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
                                title="CREATE. PLAY"
                                content="Adpiscing ultries arcu id toror enim"
                            />
                        </div>
                    </div>
                </section>
                {/* Products */}
                <section className='elementor-section'>
                    <div className='category'>
                        <h2>Cá Lóc Cảnh</h2>
                        <div className='products'>
                            {products
                                .filter(product => product.category.name === "Cá Lóc Cảnh")
                                .slice(0, 4)
                                .map(product => (
                                    <Card key={product.id} product={product} />
                                ))}
                        </div>
                    </div>
                </section>
                <section className='elementor-section'>
                    <div className='category'>
                        <h2>Cá Chép Các Loại</h2>
                        <div className='products'>
                            {productsToRender
                                .filter(product => product.category.name === "Cá Chép Các Loại")
                                .slice(0, 4)
                                .map(product => (
                                    <Card key={product.id} product={product} />
                                ))}
                        </div>
                    </div>
                </section>

                {/* Sale */}
                <section className='elementor-section mb-2'>
                    <SaleProduct
                        title='Deal'
                        content='Tiết kiệm lên tới 10% khi mua trên 10 con'
                        image='https://images.pexels.com/photos/3626111/pexels-photo-3626111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    />
                </section>

                {/* Product */}
                <section className='elementor-section'>
                    <div className='category'>
                        <h2>Cá Săn Mồi</h2>
                        <div className='products'>
                            {productsToRender
                                .filter(product => product.category.name === "Cá Săn Mồi")
                                .slice(0, 4)
                                .map(product => (
                                    <Card key={product.id} product={product} />
                                ))}
                        </div>
                    </div>
                </section>


                <section className='elementor-section '>
                    <h2>What is everyone saying?</h2>
                    <div className='comments'>
                        <Comment
                            content='Dolorem et cumque consequuntur consequuntur cumque eligendi voluptate. Tempore accusamus tempore consectetur dolor aliquid.'
                            avatar='https://websitedemos.net/electronic-store-04/wp-content/uploads/sites/1055/2022/03/electronic-store-reviewer-avatar-image-1.jpg'
                            name='	Chelsea Turner'
                        />
                        <Comment
                            content='Dolores porro laboriosam molestias est quo. Et et eos. Ab error modi labore sed eaque est. Quaerat aut est fugiat.'
                            avatar='https://websitedemos.net/electronic-store-04/wp-content/uploads/sites/1055/2022/03/electronic-store-reviewer-avatar-image-3.jpg'
                            name='Rafael Stokes'
                        />
                        <Comment
                            content='Et eum neque ipsum quaerat ratione qui dolore eos. Numquam quo vel amet expedita eius facere minima. Dolor et saepe consequuntur.'
                            avatar='https://websitedemos.net/electronic-store-04/wp-content/uploads/sites/1055/2022/03/electronic-store-reviewer-avatar-image-6.jpg'
                            name='Jacqueline Mueller'
                        />
                        <Comment
                            content='Itaque dicta rerum aliquam sit corporis iste omnis. Officia veritatis vel labore et dolor iste velit distinctio.'
                            avatar='https://websitedemos.net/electronic-store-04/wp-content/uploads/sites/1055/2022/03/electronic-store-reviewer-avatar-image-2.jpg'
                            name='	Olive Borer'
                        />
                        <Comment
                            content='In saepe veniam. Rerum excepturi dolor voluptatibus asperiores ad ut. Veniam molestiae tenetur velit voluptatum.'
                            avatar='https://websitedemos.net/electronic-store-04/wp-content/uploads/sites/1055/2022/03/electronic-store-reviewer-avatar-image-5.jpg'
                            name='	Priscilla Jacobson'
                        />
                        <Comment
                            content='Saepe doloribus deserunt in. At beatae neque pariatur harum vel.'
                            avatar='https://maychusaigon.vn/wp-content/uploads/2023/02/gioi-thieu-elon-musk-la-ai-maychusaigon.jpg'
                            name='Elon Musk'
                        />
                    </div>
                </section>
            </div >
        </main >
    )
}

export default HomePage



