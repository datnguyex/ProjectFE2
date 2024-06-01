import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../../css/createCourse.scss";
import "../../../css/base.css";
import "../../../css/main.css";
import "../../../css/profile.css";
import "../../../css/seller.css";
import "../../../css/product.css";

export function UpdateCourse() {
    const navigate = useNavigate();
    const param = useParams();
    const [course, setCourses] = useState({});
    const [detailCourse, setDetailCourse] = useState([]);

    function getCourses() {
        fetch("http://localhost:4000/Courses/" + param.id)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            setCourses(data);
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const courseFormData = new FormData();

        for (const [key, value] of formData.entries()) {
            if (key.startsWith("course_")) {
                courseFormData.append(key, value);
            }
        }

        await fetch(`http://localhost:4000/Courses/${param.id}`, {
            method: "PATCH",
            body: courseFormData
        });

        await Promise.all(detailCourse.map(async locationItem => {
            const detailFormData = new FormData();
            detailFormData.append("location", formData.get(`location_${locationItem.id}`));
            detailFormData.append("start", formData.get(`start_${locationItem.id}`));
            detailFormData.append("end", formData.get(`end_${locationItem.id}`));

            detailFormData.append("day", [
                formData.get(`ngayHoc1_${locationItem.id}`),
                formData.get(`ngayHoc2_${locationItem.id}`),
                formData.get(`ngayHoc3_${locationItem.id}`),
            ]);

            await fetch(`http://localhost:4000/detailCourse/${locationItem.id}`, {
                method: "PATCH",
                body: detailFormData,
            });
        }));

        navigate("/admin/courses");
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

    useEffect(() => {
        getCourses();
        getCourseDetail();
    }, []);

    return (  
        <div className="app__container">
            <form onSubmit={handleSubmit}> 
                <div className="grid">
                    <div className="grid__row app__contents_seller ">
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
                                <span className="home-filter-title product-filter-title">Thêm sản phẩm</span>
                            </div>

                            <div className="home__product">
                                <div className="grid__row-product">
                                    <div className="product__item-form">
                                        <label htmlFor="">Thêm ảnh khóa học</label>
                                        <button className="btn--textFile have-img" onClick={() => document.getElementById('getFile').click()}>
                                            <div className="delete__img">
                                                <i className="fa-solid fa-x"></i>
                                            </div>
                                            <img src={"http://localhost:4000/images/" + course.course_img} alt=""/>
                                        </button>

                                        <button id="btnImg" className="btn--textFile no-img">
                                            <img id="main-imgPr" alt="" name="course_img" src="http://localhost:4000/images/themanh.jpg"/>
                                            <span id="textBtnImg">Thêm ảnh</span>  
                                        </button>
                                        <input id="ipImg" className="" type="file" name="img"/>
                                        <input id="course_img" type="file" name="course_img"/>
                                    </div>
                                    <div className="product__item-form">
                                        <label htmlFor="">Tên khóa học</label>
                                        <input defaultValue={course.course_name} className="product__name-form" type="text" name="course_name" placeholder="Nhập vào"/>
                                    </div>
                                    <div className="product__item-form">
                                        <div className="product__item-price">
                                            <label htmlFor="">Học phí</label>
                                            <input defaultValue={course.course_price} className="product__price-form" type="number" name="course_price" placeholder="Nhập vào"/>
                                        </div>
                                        <div className="product__item-quantity">
                                            <label htmlFor="">Thời Lượng</label>
                                            <input defaultValue={course.course_duration} className="product__quantity-form" type="number" name="course_duration" placeholder="Nhập vào"/>
                                        </div>
                                    </div>
                                    
                                    <div className="product__item-form">
                                        <label htmlFor="">Mô tả sản phẩm</label>
                                        <textarea className="product__des-form" defaultValue={course.course_description} type="text" name="course_description"></textarea>
                                    </div>

                                    {detailCourse.map(locationItem => (
                                        <div key={locationItem.id}>
                                            <div className="product__item-form">
                                                <label htmlFor="">{'Cơ sở '+locationItem.id}</label>
                                                <input defaultValue={locationItem.location} className="product__name-form" type="text" name={`location_${locationItem.id}`} placeholder="Nhập vào"/>
                                            </div>
                                            {locationItem.day.split(",").map((day, index) => (
                                                <div key={index} className="product__item-form">
                                                    <label htmlFor={`ngayHoc${index + 1}_${locationItem.id}`}>{`Ngày Học ${index + 1}`}</label>
                                                    <input defaultValue={day} className="product__name-form" type="text" name={`ngayHoc${index + 1}_${locationItem.id}`} placeholder="Nhập vào"/>
                                                </div>
                                            ))}
                                            <div className="product__item-form">
                                                <label htmlFor="">Giờ vào học</label>
                                                <input defaultValue={locationItem.start} className="product__name-form" type="text" name={`start_${locationItem.id}`} placeholder="Nhập vào"/>
                                            </div> 
                                            <div className="product__item-form">
                                                <label htmlFor="">Giờ tan học</label>
                                                <input defaultValue={locationItem.end} className="product__name-form" type="text" name={`end_${locationItem.id}`} placeholder="Nhập vào"/>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="home__product-btn">
                                        <button className="btn">Hủy</button>
                                        <button type="submit" className="btn btn--primary">Lưu</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
