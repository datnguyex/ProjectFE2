import "../../css/main.css"
import "../../css/courseList.scss"
import "../../css/base.css"
import "../../css/profile.css"
import "../../css/seller.css"
import "../../css/product.css"
import "../../css/product_detail.css"
import "../../css/listLecturer.scss"
import "../../js/action.js"
import { useEffect, useState } from "react";
import axios from 'axios';
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { NavbarHome } from "../auth/navbarHome";
import ReactPaginate from 'react-paginate';
export function Home() {
    const navigate = useNavigate();
    var param = useParams();
    const [courses, setCourses] = useState([]);
    const [detailCourses, setDetailCourses] = useState([]);

    //hook nay goi phuong thuc get lay ra course va detail course 
    //hook se duoc chay truoc
    useEffect(() => {
        //lay ra phuong thuc get
        //dung de su dung ra phuong thuc get/post...
        //co the lay ra trong hook thay vi goi ham getCourses
        ///axious co the lay du lieu truc tiep tu may chu (response.data)
        //con fetch phai dung json de phan hoi yeu cau
        //co the su dung fetch de nhan du lieu o day 
        axios.get('http://localhost:4000/Courses')
            .then(response => {
                setCourses(response.data);
            })



        axios.get('http://localhost:4000/detailCourse')
            .then(response => {
                setDetailCourses(response.data);
            })

        let img_Main = document.getElementById('main_img_Advertisement');
        let img_Item = document.querySelectorAll('.item_img_Advertisement');
        let dem = 0;
        let lastItem = img_Item[0];
        setInterval(change, 2000);
        console.log(img_Item)
        function change() {
            dem++;
            if (dem == img_Item.length) {
                dem = 0
            };
            lastItem = img_Item[dem];
            img_Main.src = lastItem.src
        }

        let mainMallImg = document.getElementById('mainMallImg');
        let mainMallImg1 = document.getElementById('mainMallImg1');
        let mainMallImg2 = document.getElementById('mainMallImg2');

        let itemMallImg = document.querySelectorAll('.itemMallImg');
        let itemMallImg1 = document.querySelectorAll('.itemMallImg1');
        let itemMallImg2 = document.querySelectorAll('.itemMallImg2');

        let lastItemMall = itemMallImg[0];
        let lastItemMall1 = itemMallImg1[0];
        let lastItemMall2 = itemMallImg2[0];

        let count = 0;
        setInterval(changeMall, 3000);

        function changeMall() {
            count++;
            if (count == itemMallImg.length) {
                count = 0;
            };
            lastItemMall = itemMallImg[count];
            lastItemMall1 = itemMallImg1[count];
            lastItemMall2 = itemMallImg2[count];
            mainMallImg.src = lastItemMall.src;
            mainMallImg1.src = lastItemMall1.src;
            mainMallImg2.src = lastItemMall2.src;


        }
    }, []);

    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day

    const joinedData = courses.map(course => ({
        ...course,//chuyen doi gia tri -> giong ajax
        details: detailCourses.filter(detailCourse => detailCourse.course_id === course.id)
    }));
    // console.log(joinedData);
    return (
        <div>
            <NavbarHome />{
                <div class="app__container">
                    <div class="grid">
                        <div class="grid__row ">
                            <div class="grid__column-12 advertisement animated">  <div class="adver_main">
                                <div class="img_main">
                                    <img src="http://localhost:4000/images/1716522975523-IELTSPreparationCourse.jpg" alt="" id="main_img_Advertisement" />
                                </div>
                                <div class="img_Item">
                                    <img src="http://localhost:4000/images/1716487640313-toiec4KyNang.jpg" alt="" class="item_img_Advertisement" />
                                </div>
                                <div class="img_Item">
                                    <img src="http://localhost:4000/images/1716522975523-IELTSPreparationCourse.jpg" alt="" class="item_img_Advertisement" />
                                </div>
                            </div>

                                <div class="adver_item">
                                    <div class="item_img">
                                        <img src="http://localhost:4000/images/1716487640313-toiec4KyNang.jpg" alt="" class="img_Advertisement" />
                                    </div>
                                    <div class="item_img">
                                        <img src="http://localhost:4000/images/1716522975523-IELTSPreparationCourse.jpg" alt="" class="img_Advertisement" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section>
                        <div class="grid">
                            <div class="grid__row app__contents">
                                <div class="grid__column-12">
                                    <div class="home-filter">
                                        <span class="home-filter-title">Sắp xếp theo</span>
                                        <form action="" method="post">
                                            <button name="oldest" type="submit" class="home-filter__btn btn">Cũ nhất</button>
                                            <button name="newest" type="submit" class="home-filter__btn btn btn--primary">Mới nhất</button>
                                            <button name="bestselling" type="submit" class="home-filter__btn btn">Bán chạy</button>
                                            <div class="select-input">
                                                <span class="home-filter__label" for="">Giá</span>
                                                <i class="search-icon fa-solid fa-angle-down"></i>

                                                <ul class="select-input__list">
                                                    <li class="select-input__item">
                                                        <button id="btn-sellect-priceASC" name="priceASC" type="submit">Cao Đến
                                                            Thấp</button>
                                                    </li>
                                                    <li class="select-input__item">
                                                        <button id="btn-sellect-priceDESC" name="priceDESC" type="submit">Thấp Đến
                                                            Cao</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </form>
                                    </div>

                                    <div class="home__product">
                                        <div class="grid__row">
                                            {joinedData.map(course => (
                                                <div class="grid__column-2-4">
                                                    <Link to={`/admin/courses/detail/${course.id}`} class="product-item">
                                                        <div className="product-item__img" style={{
                                                            backgroundImage: `url("http://localhost:4000/images/${course.course_img}")`
                                                        }}>
                                                        </div>
                                                        <h4 class="product-item__name">{course.course_name}</h4>
                                                        <h4 class="product-item__name">{course.course_description}</h4>
                                                        <div class="product-item__price">
                                                            <span class="product-item__price_current">Thời lượng: {course.course_duration}</span>
                                                            <span class="product-item__price_current">{course.course_price}$</span>
                                                        </div>
                                                        <div class="custom-button">Tham Gia Ngay</div>
                                                        <div class="product-item__action">
                                                            <span class="product-item_like product-item_liked">
                                                                <i class="product-item_like-icon-empty fa-regular fa-heart"></i>
                                                                <i class="product-item_liked-icon-fill fa-solid fa-heart"></i>
                                                            </span>
                                                            <div class="product-item__rating">
                                                                <i class="product-item__star--gold fa-solid fa-star"></i>
                                                                <i class="product-item__star--gold fa-solid fa-star"></i>
                                                                <i class="product-item__star--gold fa-solid fa-star"></i>
                                                                <i class="product-item__star--gold fa-solid fa-star"></i>
                                                                <i class=" fa-solid fa-star"></i>
                                                            </div>

                                                        </div>

                                                    </Link>
                                                </div>
                                            ))}

                                        </div>
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel=">>"
                                            onPageChange={5}
                                            pageRangeDisplayed={5}
                                            pageCount={4}
                                            previousLabel="<<"
                                            pageClassName='page-item'
                                            pageLinkClassName='page-link'
                                            previousClassName='page-item'
                                            previousLinkClassName='page-link'
                                            nextClassName='page-item'
                                            nextLinkClassName='page-link'
                                            breakClassName='page-item'
                                            breakLinkClassName='page-link'
                                            containerClassName='pagination'
                                            activeClassName='active'
                                        />
                                    </div>

                                    <ul class="pagination home__product-pagination">
                                        <li class="pagination-item">
                                            <a href="" class="pagination-item__link">
                                                <i class="pagination-item__icon fa-solid fa-angle-left"></i>
                                            </a>
                                        </li>
                                        <li class="pagination-item">
                                            <a href=""
                                                class="pagination-item__link"></a>
                                        </li>
                                        <li class="pagination-item">
                                            <a href="" class="pagination-item__link">
                                                <i class="pagination-item__icon fa-solid fa-angle-right"></i>
                                            </a>
                                        </li>

                                    </ul>

                                </div>
                            </div>
                            <div class="grid__column-12">
                                <div class="title__home-product">
                                    <div class="title__home">Gợi ý liên quan</div>
                                </div>
                                <div class="home__product">
                                    <div class="grid__row">
                                        {joinedData.map(course => (
                                            <div class="grid__column-2-4">
                                                <Link to={`/admin/courses/detail/${course.id}`} class="product-item">
                                                    <div className="product-item__img" style={{
                                                        backgroundImage: `url("http://localhost:4000/images/${course.course_img}")`
                                                    }}>
                                                    </div>
                                                    <h4 class="product-item__name">{course.course_name}</h4>
                                                    <h4 class="product-item__name">{course.course_description}</h4>
                                                    <div class="product-item__price">
                                                        <span class="product-item__price_current">Thời lượng: {course.course_duration}</span>
                                                        <span class="product-item__price_current">{course.course_price}$</span>
                                                    </div>
                                                    <div class="custom-button">Tham Gia Ngay</div>
                                                    <div class="product-item__action">
                                                        <span class="product-item_like product-item_liked">
                                                            <i class="product-item_like-icon-empty fa-regular fa-heart"></i>
                                                            <i class="product-item_liked-icon-fill fa-solid fa-heart"></i>
                                                        </span>
                                                        <div class="product-item__rating">
                                                            <i class="product-item__star--gold fa-solid fa-star"></i>
                                                            <i class="product-item__star--gold fa-solid fa-star"></i>
                                                            <i class="product-item__star--gold fa-solid fa-star"></i>
                                                            <i class="product-item__star--gold fa-solid fa-star"></i>
                                                            <i class=" fa-solid fa-star"></i>
                                                        </div>

                                                    </div>

                                                </Link>
                                            </div>
                                        ))}

                                    </div>
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel=">>"
                                        onPageChange={5}
                                        pageRangeDisplayed={5}
                                        pageCount={4}
                                        previousLabel="<<"
                                        pageClassName='page-item'
                                        pageLinkClassName='page-link'
                                        previousClassName='page-item'
                                        previousLinkClassName='page-link'
                                        nextClassName='page-item'
                                        nextLinkClassName='page-link'
                                        breakClassName='page-item'
                                        breakLinkClassName='page-link'
                                        containerClassName='pagination'
                                        activeClassName='active'
                                    />
                                </div>

                                <ul class="pagination home__product-pagination">
                                    <li class="pagination-item">
                                        <a href="" class="pagination-item__link">
                                            <i class="pagination-item__icon fa-solid fa-angle-left"></i>
                                        </a>
                                    </li>
                                    <li class="pagination-item">
                                        <a href=""
                                            class="pagination-item__link"></a>
                                    </li>
                                    <li class="pagination-item">
                                        <a href="" class="pagination-item__link">
                                            <i class="pagination-item__icon fa-solid fa-angle-right"></i>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="grid">
                            <div class="grid__row ">
                                <div class="grid__column-4">
                                    <div class="shoppeMallMenuBar">
                                        <div class="selectionMallMenu">
                                            <div class="backLeftMall flashSaleBackLeftMall">
                                                <i class="fa-solid  fa-chevron-left fa-beat"></i>
                                            </div>
                                            <div class="menuMallSelectionBackShoppe">
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/1.jpg" alt="" id="mainMallImg" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/1716522975523-IELTSPreparationCourse.jpg" alt="" class="itemMallImg" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/2-1.jpg" alt="" class="itemMallImg" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/3-2.jpg" alt="" class="itemMallImg" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/7.jpg" alt="" class="itemMallImg" />
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="backRightMall flashSaleBackRightMall">
                                                <i class="fa-solid fa-chevron-right fa-beat" ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid__column-4">
                                    <div class="shoppeMallMenuBar">
                                        <div class="selectionMallMenu">
                                            <div class="backLeftMall flashSaleBackLeftMall">
                                                <i class="fa-solid  fa-chevron-left fa-beat"></i>
                                            </div>
                                            <div class="menuMallSelectionBackShoppe">
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/2-1.jpg" alt="" id="mainMallImg1" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/1.jpg" alt="" class="itemMallImg1" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/1716522975523-IELTSPreparationCourse.jpg" alt="" class="itemMallImg1" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/3-2.jpg" alt="" class="itemMallImg1" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/7.jpg" alt="" class="itemMallImg1" />
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="backRightMall flashSaleBackRightMall">
                                                <i class="fa-solid fa-chevron-right fa-beat" ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid__column-4">
                                    <div class="shoppeMallMenuBar">
                                        <div class="selectionMallMenu">
                                            <div class="backLeftMall flashSaleBackLeftMall">
                                                <i class="fa-solid  fa-chevron-left fa-beat"></i>
                                            </div>
                                            <div class="menuMallSelectionBackShoppe">
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/1716522975523-IELTSPreparationCourse.jpg" alt="" id="mainMallImg2" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/1.jpg" alt="" class="itemMallImg2" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/2-1.jpg" alt="" class="itemMallImg2" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/3-2.jpg" alt="" class="itemMallImg2" />
                                                    </div>
                                                </a>
                                                <a href="" class="linkselectionItem">
                                                    <div class="mainMallAdversiment">
                                                        <img src="http://localhost:4000/images/7.jpg" alt="" class="itemMallImg2" />
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="backRightMall flashSaleBackRightMall">
                                                <i class="fa-solid fa-chevron-right fa-beat" ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            }
        </div>
    )
}

