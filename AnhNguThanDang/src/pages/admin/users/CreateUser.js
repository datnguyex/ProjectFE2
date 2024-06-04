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
export function UserCreate() {
    const navigate = useNavigate();
    var param = useParams();
    const [totalPage, setTotalPage] = useState([]);
    const [courses, setCourses] = useState([]);
    const [users, setUser] = useState([]);
    const [detailCourses, setDetailCourses] = useState([]);

    const [course, setCourse] = useState([]);
    const [detailCourse, setDetailCourse] = useState([]);
    const [reviews, setReview] = useState([]);
    const [totalUsers, setTotalUser] = useState([]);


    function handlePageClick() {

    }

    function getUser(pageNumber, pageSize) {
        const offset = (pageNumber - 1) * pageSize;
        fetch(`http://localhost:4000/user?limit=${0, 1}&offset=${1}`)
            .then(reponse => {
                return reponse.json();
            })
            .then(data => {
                console.log(data);
                setTotalPage(data.length)
                setUser(data);
            });
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

    //hook nay goi phuong thuc get lay ra course va detail course 
    //hook se duoc chay truoc
    useEffect(() => {
        // axios.get('http://localhost:4000/user')
        //     .then(response => {
        //         console.log(response);
        //         setUser(response.data);
        //     })

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
        getUser(0, 1);
    }, []);

    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day

    const userData = users.map(user => ({
        ...user,//chuyen doi gia tri -> giong ajax
        details: reviews.filter(review => review.review_studenEmail === user.email)
    }));

    const joinedDatas = courses.map(course => ({
        ...course,//chuyen doi gia tri -> giong ajax
        details: detailCourses.filter(detailCourse => detailCourse.course_id === course.id)
    }));

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
        navigate("/admin/users");

    }

    return (
        <div >{
            <div class="container-xxl">
                <div class="register__body">
                    <div class="row">
                        <div class="col-12">
                            <form onSubmit={HandleSubmit}>
                                <h3 class="title__register">Đăng ký nhận tư vấn</h3>
                                <p>Vui lòng điền đầy đủ các thông tin theo mẫu dưới đây,</p>
                                <p>Anh Ngữ Thiên Ân sẽ liên lạc với bạn trong 1 – 2 ngày làm việc. Hoặc gọi ngay cho Trung tâm theo
                                    số điện thoại bên dưới</p>

                                <div class="body__register">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <input name="name" type="text" class="form-control name__register" placeholder="Họ tên" required />
                                        </div>
                                        <div class="col-md-6">
                                            <input name="email" type="email" class="form-control email__register" placeholder="Email" required />
                                        </div>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <input name="phone" type="tel" class="form-control phone__register" placeholder="Số điện thoại" required />
                                        </div>
                                        <div class="col-md-6">
                                            <select name="id_course" class="form-control select__course" required>
                                                <option value="">Chọn khóa học</option>
                                                {joinedDatas.map(course => (
                                                    <option value={course.id}>{course.course_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-12">
                                            <textarea name="requirement" class="form-control text__register" placeholder="Nội dung bạn cần tư vấn" rows="5" required></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="request mt-3">
                                    <button type="submit" class="btn btn-primary btn__request">Gửi yêu cầu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
    );
}
