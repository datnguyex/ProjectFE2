import {useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../../css/createCourse.scss"
import "../../../css/base.css"
import "../../../css/main.css"
import "../../../css/profile.css"
import "../../../css/seller.css"
import "../../../css/product.css"



export function UpdateCourse() {
    
const navigate = useNavigate();

var param = useParams();
var [course,setCourses] = useState({});

    function getCourses() {
        fetch("http://localhost:4000/Courses/"+param.id)
        .then(reponse => {
            if(reponse.ok) {
                return reponse.json();
            }
        })
        .then(data => {
            setCourses(data);
        });
    }

    function HandleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        const course = Object.fromEntries(formData.entries())
        fetch("http://localhost:4000/Courses/"+param.id, {
            method: "PATCH",
            body: formData,
        })
        .then(reponse => {
            if(reponse.ok) {
                navigate("/admin/courses");
            }
        })
        .then(data => {
            
        })
    }

   
    useEffect(getCourses,[]);
    
    return (
   
     
<div class="app__container">
<form onSubmit={HandleSubmit}> 
    <div class="grid">
        <div class="grid__row app__contents_seller ">
            <div class="gird__column-2_seller">
                <nav class="category">
                    <ul class="category-list">
                        <li class="category-item category-item--active">
                            <a href="" class="category-item__link">Thông tin cơ bản</a>
                        </li>
                        <li class="category-item">
                            <a href="" class="category-item__link">Thông tin khác</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="grid__column-10">
                <div class="home-filter">
                    <span class="home-filter-title product-filter-title">Thêm sản phẩm</span>
                </div>

                <div class="home__product">
                    <div class="grid__row-product">
                        <div class="product__item-form">
                                <label for="">Thêm ảnh khóa học</label>
                                <button class="btn--textFile have-img" onclick="document.getElementById('getFile').click()">
                                    <div class="delete__img">
                                        <i class="fa-solid fa-x"></i>
                                    </div>
                                    <img src={"http://localhost:4000/images/"+course.course_img} alt=""/>
                                </button>

                                <button id="btnImg" class="btn--textFile no-img">
                                <img id="main-imgPr"alt="" name="course_img" src="http://localhost:4000/images/themanh.jpg"/>
                                
                            <span id="textBtnImg">Thêm ảnh</span>  
                            </button>
                                 <input id="ipImg" class="" type="file" name="img"/>
                                  <input id="course_img" type="file" name="course_img"/>
                            </div>
                            <div class="product__item-form">
                                <label for="">Tên khóa học</label>
                                <input defaultValue={course.course_name} class="product__name-form" type="text" name="course_name" placeholder="Nhập vào"/>
                            </div>
                            <div class="product__item-form">
                                <div class="product__item-price">
                                    <label for="">Học phí</label>
                                    <input defaultValue={course.course_price} class="product__price-form" type="number" name="course_price" placeholder="Nhập vào"/>
                                </div>
                                <div class="product__item-quantity">
                                    <label for="">Thời Lượng</label>
                                    <input defaultValue={course.course_duration} class="product__quantity-form" type="number" name="course_duration" placeholder="Nhập vào"/>
                                </div>
                            </div>
                            {/* <div class="product__item-form">
                                <label for="">Danh mục sản phẩm</label>
                                 <div class="product__item-cate">
                                    <input id="selectCate" class="product__cate-form" type="text" name="category" readonly placeholder="Chọn danh mục"/>
                                    <div class="select__cate">
                                    @foreach($categories as $category)  
                                        <div value="{{$category->category_id}}" class="option__cate">{{$category->category_name}}</div>
                                        <div id ="valueCate">1</div>
                                        @endforeach  
                                    </div>
                              
                             
                                <select id="cars" name="category_id">
                                @foreach($categories as $category)  
                                <option value=""></option>
                                @endforeach    
                                 </select>
                            </div> */}
                           
                           
                            <div class="product__item-form">
                                <label for="">Mô tả sản phẩm</label>
                                <textarea value={course.course_description} class="product__des-form" type="text" name="course_description"></textarea>
                            </div>
                            <div class="home__product-btn">
                                <button class="btn ">Hủy</button>
                                <button  type="submit" class="btn btn--primary">Lưu</button>
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