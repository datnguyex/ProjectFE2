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
import { Navbar } from "../../auth/navbarCourse";
import ReactPaginate from 'react-paginate';

export function UserUpdate() {
    const navigate = useNavigate();
    var param = useParams();
    const [totalPage, setTotalPage] = useState([]);
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState([]);
    const [detailCourses, setDetailCourses] = useState([]);

    const [course, setCourse] = useState([]);
    const [detailCourse, setDetailCourse] = useState([]);
    const [reviews, setReview] = useState([]);
    const [totalUsers, setTotalUser] = useState([]);

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

    async function HandleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const courseFormData = new FormData();

        await fetch(`http://localhost:4000/user/${param.id}`, {
            method: "PATCH",
            body: formData
        });
        navigate("/admin/users");
    }




    //hook nay goi phuong thuc get lay ra course va detail course 
    //hook se duoc chay truoc
    useEffect(() => {
        axios.get(`http://localhost:4000/user/${param.id}`)
            .then(response => {
                console.log(response);
                setUser(response.data);
            })

        axios.get('http://localhost:4000/ScoreAndReview')
            .then(response => {
                setReview(response.data);
            })
        axios.get('http://localhost:4000/Courses')
            .then(response => {
                setCourses(response.data);
            })



        axios.get('http://localhost:4000/detailCourse')
            .then(response => {
                setDetailCourses(response.data);
            })
        getCourse()
        getCourseDetail();
    }, []);

    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day


    const joinedDatas = courses.map(course => ({
        ...course,//chuyen doi gia tri -> giong ajax
        details: detailCourses.filter(detailCourse => detailCourse.course_id === course.id)
    }));


    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day
    // const joinedData = detailCourse.filter(detailCourse => detailCourse.course_id === user.id_course)



    return (
        <div>
            <Navbar /> {
                <form onSubmit={HandleSubmit}>
                    <div className="app__container">

                        <div className="grid">
                            <div className="grid__row app__contents_seller">
                                <div className="gird__column-2_seller">
                                    <nav className="category">
                                        <ul className="category-list">
                                            <li className="category-item category-item--active">
                                                <a href="" className="category-item__link">Thông tin cơ bản</a>
                                            </li>
                                            <li className="category-item">
                                                <a href="" className="category-item__link">Thông tin khác</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="grid__column-10">
                                    <div className="home-filter">
                                        <span className="home-filter-title product-filter-title">Cập Nhật Sinh Viên</span>
                                    </div>

                                    <div className="home__product">
                                        <div className="grid__row-product">
                                            <div className="product__item-form">
                                                <label htmlFor="lecturer_name">Tên Sinh Viên</label>
                                                <input defaultValue={user.name} className="product__name-form" type="text" name="name" placeholder="Nhập vào" />
                                            </div>
                                            <div className="product__item-form">
                                                <label htmlFor="lecturer_name">Email</label>
                                                <input defaultValue={user.email} className="product__name-form" type="text" name="email" placeholder="Nhập vào" />
                                            </div>
                                            <div className="product__item-form">
                                                <label htmlFor="lecturer_name">Số điện thoại</label>
                                                <input defaultValue={user.phone} className="product__name-form" type="text" name="phone" placeholder="Nhập vào" />
                                            </div>
                                            <div className="product__item-form">
                                                <label htmlFor="lecturer_name">Chọn khóa học</label>
                                                <div class="col-md-6">
                                                    <select name="id_course" class="form-control select__course" required>
                                                        <option value="">Chọn khóa học</option>
                                                        {joinedDatas.map(course => (
                                                            String(course.id) === String(param.id) ? (
                                                                <option selected value={course.id}>{course.course_name}</option>
                                                            ) : <option value={course.id}>{course.course_name}</option>
                                                        ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="product__item-form">
                                                <label htmlFor="lecturer_description">Yêu cầu tư vấn</label>
                                                <textarea defaultValue={user.requirement} className="product__des-form" name="requirement" placeholder="Nhập vào"></textarea>
                                            </div>
                                            <div className="home__product-btn">
                                                <button className="btn" type="button">Hủy</button>
                                                <button type="submit" className="btn btn--primary">Lưu</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            }
        </div>
    );
}
