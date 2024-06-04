import React from 'react';
import { Form,useNavigate } from 'react-router-dom';
import {CreateLecture}  from "../../../components/lecturers/CpnLecturers";

export function LecturerCreate() {
        //form khong the submit qua trang khac
    const navigate = useNavigate();
    async function HandleSubmitCreate(event) {
        //phai de prevenDefault ben day
        event.preventDefault();
        CreateLecture(event)
         .then(response => {
            if(response.ok) {
                navigate("/admin/lecturers");
            }
         })
    }
  

    return (
       
       <form onSubmit={HandleSubmitCreate}>
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
                                <span className="home-filter-title product-filter-title">Thêm Giảng Viên</span>
                            </div>

                            <div className="home__product">
                                <div className="grid__row-product">
                                    <div className="product__item-form">
                                        <label>Thêm ảnh khóa học</label>
                                        <button 
                                            className="btn--textFile have-img" 
                                            type="button"
                                            onClick={() => document.getElementById('ipImg').click()}
                                        >
                                            <div className="delete__img">
                                                <i className="fa-solid fa-x"></i>
                                            </div>
                                            <img src="http://localhost:4000/images/product1.jpg" alt=""/>
                                        </button>
                                        <button id="btnImg" className="btn--textFile no-img" type="button">
                                            <img id="main-imgPr" alt="" name="lecturer_name" src="http://localhost:4000/images/themanh.jpg"/>
                                            <span id="textBtnImg">Thêm ảnh</span>  
                                        </button>
                                        <input id="course_img" type="file" name="lecturer_img" />
                                    </div>
                                    <div className="product__item-form">
                                        <label htmlFor="lecturer_name">Tên Giảng Viên</label>
                                        <input className="product__name-form" type="text" name="lecturer_name" placeholder="Nhập vào"/>
                                    </div>
                                    <div className="product__item-form">
                                        <label htmlFor="lecturer_name">Thêm chứng chỉ 1</label>
                                        <input className="product__name-form" type="text" name="lecturer_certificate1" placeholder="Nhập vào"/>
                                    </div>

                                    <div className="product__item-form">
                                        <label htmlFor="lecturer_name">Thêm chứng chỉ 2</label>
                                        <input className="product__name-form" type="text" name="lecturer_certificate2" placeholder="Nhập vào"/>
                                    </div>

                                    <div className="product__item-form">
                                        <label htmlFor="lecturer_name">Thêm chứng chỉ 3</label>
                                        <input className="product__name-form" type="text" name="lecturer_certificate3" placeholder="Nhập vào"/>
                                    </div>

                                    <div className="product__item-form">
                                        <label htmlFor="lecturer_name">Thêm chứng chỉ 4</label>
                                        <input className="product__name-form" type="text" name="lecturer_certificate4" placeholder="Nhập vào"/>
                                    </div>
                                    <div className="product__item-form">
                                        <label htmlFor="lecturer_description">Mô tả Giảng Viên</label>
                                        <textarea className="product__des-form" name="lecturer_description" placeholder="Nhập vào"></textarea>
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
    );
}
