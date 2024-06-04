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
        <div >{
            <div class="register__course">
                <form onSubmit={HandleSubmit}>
                    <h3 class="title__register">Đăng ký nhận tư vấn</h3>
                    <p>Vui lòng điền đầy đủ các thông tin theo mẫu dưới đây,</p>
                    <p>Anh Ngữ Thiên Ân sẽ liên lạc với bạn trong 1 – 2 ngày làm việc. Hoặc gọi ngay cho Trung tâm theo
                        số điện thoại bên dưới</p>
                    <div class="body__register">
                        <input defaultValue={user.name} name="name" type="text" class="name__register" placeholder="Họ tên" />
                        <input defaultValue={user.email} name="email" type="text" class="email__register" placeholder="Email" />
                        <input defaultValue={user.phone} name="phone" type="text" class="phone__register" placeholder="Số điện thoại" />
                        <select name="id_course" id="select__course">
                            Chọn khóa học
                            {joinedDatas.map(course => (
                                String(course.id) === String(param.id) ? (
                                    <option selected value={course.id}>{course.course_name}</option>
                                ) : <option value={course.id}>{course.course_name}</option>
                            ))
                            }
                        </select>
                        <textarea defaultValue={user.requirement} name="requirement" type="text" class="text__register" placeholder="Nội dung bạn cần tư vấn" ></textarea>
                    </div>
                    <div class="request">
                        <button type="submit" class="btn btn__request">Gửi yêu cầu</button>
                    </div>
                </form>
            </div>
        }
        </div>
    );
}
