import "../../css/main.css"
import "../../css/courseList.scss"
import "../../css/base.css"
import "../../css/main.css"
import "../../css/profile.css"
import "../../css/seller.css"
import "../../css/product.css"
import "../../css/product_detail.css"
import "../../css/listLecturer.scss"
import { useEffect, useState } from "react";
import axios from 'axios';
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { NavbarHome } from "../auth/navbarHome";

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
    }, []);

    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day

    const joinedData = courses.map(course => ({
        ...course,//chuyen doi gia tri -> giong ajax
        details: detailCourses.filter(detailCourse => detailCourse.course_id === course.id)
    }));
    // console.log(joinedData);
    return (
        <div>
           <NavbarHome/>{
           <div class="app__container">
           <div class="grid">
               <div class="grid__row ">
                   <div class="grid__column-12 advertisement">
                       <div class="adver_main">
                           <div class="img_main">
                               <img src="http://localhost:4000/images/1716390528925-BusinessEnglishCourse.jpg" alt="" id="main_img_Advertisement" />
                           </div>
                           <div class="img_Item">
                               <img src="http://localhost:4000/images/anime.jpg" alt="" class="item_img_Advertisement" />
                           </div>
                           <div class="img_Item">
                               <img src="/img/img_auth/main3.jpg" alt="" class="item_img_Advertisement" />
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

           {/* Course */}
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
                                               <div class="product-item__price">
                                                   <span class="product-item__price_old">{course.course_price}</span>
                                                   <span class="product-item__price_current">{course.course_price}</span>
                                               </div>
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
                                                   <span class="product-item__sold">
                                                       <span
                                                           class="product-item__star--sold-quantity"></span>
                                                       Đã bán
                                                   </span>
                                               </div>
                                               <div class="product-item__origin">
                                                   <span class="product-item__brand">Whoo</span>
                                                   <span
                                                       class="product-item__origin-name"></span>
                                               </div>
                                           </Link>
                                       </div>
                                   ))}

                               </div>
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
                                       <div class="product-item">
                                           <div className="product-item__img" style={{
                                               backgroundImage: `url("http://localhost:4000/images/${course.course_img}")`
                                           }}>
                                           </div>
                                           <h4 class="product-item__name">{course.course_name}</h4>
                                           <div class="product-item__price">
                                               <span class="product-item__price_old">{course.course_price}</span>
                                               <span class="product-item__price_current">{course.course_price}</span>
                                           </div>
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
                                               <span class="product-item__sold">
                                                   <span
                                                       class="product-item__star--sold-quantity"></span>
                                                   Đã bán
                                               </span>
                                           </div>
                                           <div class="product-item__origin">
                                               <span class="product-item__brand">Whoo</span>
                                               <span
                                                   class="product-item__origin-name"></span>
                                           </div>
                                       </div>
                                   </div>
                               ))}

                           </div>
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
                       <div class="grid__column-6">
                           <div className="content_lecturers">
                                   <img
                                       className="lectures__img"
                                       src="http://localhost:4000/images/1.jpg"
                                       alt="Course Image 1"
                                   />
                               <div class="lectures__name"></div>
                               <div class="lectures__description"></div>
                           </div>
                       </div>
                       <div class="grid__column-6">

                       </div>
                   </div>
               </div>

           </section>
       </div>
           }
        </div>
    )
}