import React from 'react';
import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "../../../css/courseList.scss"
import "../../../css/base.css"
import "../../../css/main.css"
import "../../../css/seller.css"
import "../../../css/profile.css"
import "../../../css/product.css"
import "../../../css/product_detail.css"
import "../../../css/register.css";
import ReactPaginate from 'react-paginate';
// import "../node_modules/bootstrap/scss/bootstrap";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap-grid.css"
import { Navbar } from "../../auth/navbarCourse";

export function CourseDetailAdmin() {
    const navigate = useNavigate();
    var param = useParams();
    const [location, setLocation] = useState([]);
    const [courses, setCourses] = useState([]);
    const [users, setUser] = useState([]);
    const [detailCourses, setDetailCourses] = useState([]);

    const [course, setCourse] = useState([]);
    const [detailCourse, setDetailCourse] = useState([]);
    const [reviews, setReview] = useState([]);
    const [totalUsers, setTotalUser] = useState([]);


    function handlePageClick() {

    }

    function getCourse() {

        fetch("http://localhost:4000/Courses/" + param.id)
            .then(reponse => {
                if (reponse.ok) {
                    return reponse.json();
                }
            })
            .then(data => {
                setCourse(data);
            });
    }

    function getCourseDetail() {
        fetch(`http://localhost:4000/getCourseDetail?course_id=${param.id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setDetailCourse(data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }

    function getUser() {
        fetch("http://localhost:4000/user")
            .then(reponse => {

                // console.log(reponse.json());
                return reponse.json();
            })
            .then(data => {
                setUser(data);

            });
    }
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

        // axios.get('http://localhost:4000/user')
        //     .then(response => {
        //         console.log(response);
        //         setUser(response.data);
        //     })

        axios.get('http://localhost:4000/ScoreAndReview')
            .then(response => {
                setReview(response.data);
            })
        getUser();
        getCourse();
        getCourseDetail();
    }, []);

    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day

    const joinedDatas = courses.map(course => ({
        ...course,//chuyen doi gia tri -> giong ajax
        details: detailCourses.filter(detailCourse => detailCourse.course_id === course.id)
    }));


    const userData = users.map(user => ({
        ...user,//chuyen doi gia tri -> giong ajax
        details: reviews.filter(review => review.review_studenEmail === user.email)
    }));


    userData.map(course => {
        // In ra course_id của từng phần tử trong joinedDatas
        console.log(course);

    });
    // console.log(userData);

    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day
    // const joinedData = detailCourse.filter(detailCourse => detailCourse.course_id === user.id_course)

    async function HandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const userFormData = new FormData();

        //ham su ly khi do la formdata-> khong ep kieu gi het
        const courseResponse = await fetch("http://localhost:4000/User", {
            method: "POST",
            body: formData
        });
        navigate("/home");

    }

    return (


        <div>
            <Navbar/>
            <div >{
                <div className="app__container">
                    <div className="grid">
                        <div className="grid__row app__contents_seller">
                            <div className="grid__column-4">
                                <div className="product__img-detail">
                                    <img
                                        className="img__product-detail"
                                        src="http://localhost:4000/images/1.jpg"
                                        alt="Course Image 1"
                                    />
                                </div>
                            </div>
                            <div className="grid__column-4">
                                <div className="product__img-detail">
                                    <img
                                        className="img__product-detail"
                                        src="http://localhost:4000/images/2-1.jpg"
                                        alt="Course Image 2"
                                    />
                                </div>
                            </div>
                            <div className="grid__column-4">
                                <div className="title_product-detail" style={{ height: "100%" }}>
                                    <div className="product-detail-name">CHI TIẾT KHÓA HỌC</div>
                                    <div className="product-detail-info">
                                        <div className="product-detail-rate">
                                            <i className="product-item__star--gold fa-solid fa-star"></i>
                                            <i className="product-item__star--gold fa-solid fa-star"></i>
                                            <i className="product-item__star--gold fa-solid fa-star"></i>
                                            <i className="product-item__star--gold fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <div className="product-detail-cate"></div>
                                    <div className="product-detail-price">
                                        <i aria-hidden="true" className="far fa-credit-card"></i>
                                        <span className='text'>
                                            Học phí:
                                        </span>
                                        <span> {course.course_price} VND</span>
                                    </div>
                                    <div className="product-detail-duration">
                                        <i aria-hidden="true" className="far fa-clock"></i>
                                        <span className='text'>
                                            Thời lượng:
                                        </span>
                                        <span> {course.course_duration} Tháng</span>
                                    </div>
                                    <div className="product-detail-start-date">
                                        <i aria-hidden="true" className="far fa-calendar"></i>
                                        <span className='text'>
                                            Lịch khai giảng:
                                        </span>
                                        {joinedDatas.map(course => (
                                            String(course.id) === String(param.id) ? (
                                                course.details.map(detail => (

                                                    String(detail.course_id) === String(param.id) ? (
                                                        <div>
                                                            {detail.location}: {detail.day}  {detail.start} - {detail.end}
                                                        </div>
                                                    ) : null

                                                )
                                                )) : null
                                        ))}


                                    </div>
                                    <div className="product-detail-location">
                                        <i aria-hidden="true" className="fas fa-map-marker-alt"></i>
                                        <span className='text'>
                                            Nơi học:
                                        </span>
                                        {joinedDatas.map(course => (
                                            String(course.id) === String(param.id) ? (
                                                course.details.map(detail => (

                                                    String(detail.course_id) === String(param.id) ? (
                                                        <span>
                                                            {detail.location + " "}
                                                        </span>
                                                    ) : null
                                                )
                                                )) : null
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="grid__row app__contents_seller">
                            <div className="grid__column-12">
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className='th_user' scope="col">id</th>
                                            <th className='th_user' scope="col">Họ và tên</th>
                                            <th className='th_user' scope="col">email</th>
                                            <th className='th_user' scope="col">sđt</th>
                                            <th className='th_user' scope="col">Tên khóa học</th>
                                            <th className='th_user' scope="col">Nội dung yêu cầu</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        {userData.map(user => (
                                            String(user.id_course) === String(param.id) ? (
                                                <tr>
                                                    <th className='td_user' scope="row">{user.id}</th>
                                                    <td className='td_user'> {user.name}</td>
                                                    <td className='td_user'> {user.email}</td>
                                                    <td className='td_user'> {user.phone}</td>
                                                    <td className='td_user'> {user.id_course}</td>
                                                    <td className='td_user'> {user.requirement}</td>
                                                </tr>
                                            ) : null
                                        )
                                        )}
                                    </tbody>
                                </table>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=">>"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={1}
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

                        </div>
                    </div>
                </div>
            }
            </div>
        </div>
    );
}
