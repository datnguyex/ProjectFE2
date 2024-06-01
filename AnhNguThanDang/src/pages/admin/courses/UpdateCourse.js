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
var [detailCourse,setDetailCourse] = useState([]);

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

    async function HandleSubmit(event) {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const courseFormData = new FormData();
    
        for (const [key, value] of formData.entries()) {
            if (key.startsWith("course_")) {
                courseFormData.append(key, value);
            }
        }
    
        // Gửi yêu cầu cập nhật thông tin khóa học
        await fetch(`http://localhost:4000/Courses/${param.id}`, {
            method: "PATCH",
            body: courseFormData
        });
    
        // Cập nhật thông tin chi tiết khóa học
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
    
            // Gửi yêu cầu cập nhật thông tin chi tiết khóa học
            
            await fetch(`http://localhost:4000/detailCourse/${locationItem.id}`, {
                method: "PATCH",
                body: detailFormData,
            });
        }));
    
        // Chuyển hướng sau khi cập nhật thành công
        navigate("/admin/courses");
    }
    

    
    // function getCourseDetail() {
    //     fetch(`http://localhost:4000/getCourseDetail?course_id=${param.id}`)
    //     .then(response => {
    //         if(response.ok) {
    //             return response.json();
    //         }
    //         throw new Error('Network response was not ok.');
    //     })  
    //     .then(data => {
    //         setDetailCourse(data);
    //     })
    //     .catch(error => {   
    //         console.error('There was a problem with your fetch operation:', error);
    //     });
    // }
    
    
    useEffect(() => {
        getCourses();
        // getCourseDetail();
    }, []);
    
//    console.log(course);
    
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
                                <textarea  class="product__des-form" type="text" name="course_description"></textarea>
                            </div>

                            {
                            detailCourse.map(locationItem => (
                                <div key={locationItem.id}>
                                <div className="product__item-form">
                                    <label htmlFor="">{'Cơ sở '+locationItem.id}</label>
                                    <input value={locationItem.location} className="product__name-form" type="text" name={`location_${locationItem.id}`} placeholder="Nhập vào"/>
                                </div>
                                
                                {
                                    //index bang 1 tuong ung voi thu 3...
                            locationItem.day.split(",").map((day, index) => (
                          <div key={index} className="product__item-form">
                        <label htmlFor={`ngayHoc${index + 1}_${locationItem.id}`}>{`Ngày Học ${index + 1}`}</label>
                        <input defaultValue={day} className="product__name-form" type="text" name={`ngayHoc${index + 1}_${locationItem.id}`} placeholder="Nhập vào"/>
                         </div>
                            ))
                            }
                    
                                <div className="product__item-form">
                                    <label htmlFor="">Giờ vào học</label>
                                    <input defaultValue={locationItem.start} className="product__name-form" type="text" name={`start_${locationItem.id}`} placeholder="Nhập vào"/>
                                </div> 
                    
                                <div className="product__item-form">
                                    <label htmlFor="">Giờ tan học</label>
                                    <input defaultValue={locationItem.end} className="product__name-form" type="text" name={`end_${locationItem.id}`} placeholder="Nhập vào"/>
                                </div>
                            </div>
                            ))};

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