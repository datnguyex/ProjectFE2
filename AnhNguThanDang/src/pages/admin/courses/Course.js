import React from 'react';
import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "../../../css/register.css";

export function CourseDetail() {
    const navigate = useNavigate();
    var param = useParams();
    const [location, setLocation] = useState([]);
    const [courses, setCourses] = useState([]);
    const [detailCourses, setDetailCourses] = useState([]);

    const [course, setCourse] = useState([]);
    const [detailCourse, setDetailCourse] = useState([]);

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
        getCourse()
        getCourseDetail();
    }, []);

    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day

    const joinedDatas = courses.map(course => ({
        ...course,//chuyen doi gia tri -> giong ajax
        details: detailCourses.filter(detailCourse => detailCourse.course_id === course.id)
    }));
    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day
    const joinedData = detailCourse.filter(detailCourse => detailCourse.course_id === course.id)

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
                            <div className="title_product-detail">
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
                                    Học phí:
                                    <span> {course.course_price} VND</span>
                                </div>
                                <div className="product-detail-duration">
                                    <i aria-hidden="true" className="far fa-clock"></i>
                                    Thời lượng:
                                    <span> {course.course_duration} giờ</span>
                                </div>
                                <div className="product-detail-start-date">
                                    <i aria-hidden="true" className="far fa-calendar"></i>
                                    Lịch khai giảng:
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
                                    Nơi học:
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
                            <div class="register__course">
                                <form onSubmit={HandleSubmit}>
                                    <h3 class="title__register">Đăng ký nhận tư vấn</h3>
                                    <p>Vui lòng điền đầy đủ các thông tin theo mẫu dưới đây,</p>
                                    <p>Anh Ngữ Thiên Ân sẽ liên lạc với bạn trong 1 – 2 ngày làm việc. Hoặc gọi ngay cho Trung tâm theo
                                        số điện thoại bên dưới</p>
                                    <div class="body__register">
                                        <input name="name" type="text" class="name__register" placeholder="Họ tên" />
                                        <input name="email" type="text" class="email__register" placeholder="Email" />
                                        <input name="phone" type="text" class="phone__register" placeholder="Số điện thoại" />
                                        <select name="id_course" id="select__course">
                                            Chọn khóa học
                                            {joinedDatas.map(course => (
                                                String(course.id) === String(param.id) ? (
                                                    <option selected value={course.id}>{course.course_name}</option>
                                                ) : <option value={course.id}>{course.course_name}</option>
                                            ))
                                            }
                                        </select>
                                        <textarea name="requirement" type="text" class="text__register" placeholder="Nội dung bạn cần tư vấn" ></textarea>
                                    </div>
                                    <div class="request">
                                        <button type="submit" class="btn btn__request">Gửi yêu cầu</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        }
        </div>
    );
}
