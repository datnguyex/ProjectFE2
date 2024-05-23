import { Form, useNavigate } from "react-router-dom";
import "../../../css/createCourse.scss"
import "../../../css/base.css"
import "../../../css/main.css"
import "../../../css/profile.css"
import "../../../css/seller.css"
import "../../../css/product.css"
import "../../../css/product_detail.css"
import { useState } from "react";


export function CreateCourse() {

  
    const navigate = useNavigate();

    const [course_id, getCourse_id] = useState({});

    async function HandleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        const course = Object.fromEntries(formData.entries())

                // Chuyển đổi course_id từ chuỗi thành số nguyên
           
            const location = formData.get("location");
            const start = formData.get("start");
            const end = formData.get("end");
            const ngayHoc1 = formData.get("ngayHoc1");
            const ngayHoc2 = formData.get("ngayHoc2");
            const ngayHoc3 = formData.get("ngayHoc3");

            // Xóa course_id từ formData vì chúng ta sẽ gửi nó dưới dạng JSON
            formData.delete("course_id");
            formData.delete("location");
            formData.delete("start");
            formData.delete("end");
            formData.delete("ngayHoc1");
            formData.delete("ngayHoc2");
            formData.delete("ngayHoc3");

        const reponse = await fetch("http://localhost:4000/Courses",{
            method: "POST",
            body: formData,
        });
        // gui bieu mau
        const data = await reponse.json();
        if(reponse.ok) {
           const courseId = data.id;
           const dayArray = [ngayHoc1, ngayHoc2, ngayHoc3];
        formData.append("course_id", courseId);
        formData.append("location", location);
        formData.append("start", start);
        formData.append("end", end);

        formData.delete("course_name");
        formData.delete("course_description");
        formData.delete("course_price");
        formData.delete("course_duration");
        formData.delete("course_img");
        formData.delete("img");
       
        //chuyen doi kieu du lieu
        const responsez = await fetch("http://localhost:4000/detailCourse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...Object.fromEntries(formData.entries()), // Thêm các thông tin khác từ formData
                course_id: courseId, // Thêm course_id đã được chuyển đổi
                day: dayArray
            })
        });
    
     
        if (responsez.ok) {
            navigate("/admin/courses");
        }       
    }
}
    return (
   
        <div className="app__container">
        <form onSubmit={HandleSubmit}>
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
                            <span className="home-filter-title product-filter-title">Thêm sản phẩm</span>
                        </div>

                        <div className="home__product">
                            <div className="grid__row-product">
                                <div className="product__item-form">
                                    <label htmlFor="">Thêm ảnh khóa học</label>
                                    <button className="btn--textFile have-img" onClick={() => document.getElementById('getFile').click()}>
                                        <div className="delete__img">
                                            <i className="fa-solid fa-x"></i>
                                        </div>
                                        <img src="http://localhost:4000/images/product1.jpg" alt=""/>
                                    </button>

                                    <button id="btnImg" className="btn--textFile no-img">
                                        <img id="main-imgPr" alt="" name="course_img" src="http://localhost:4000/images/themanh.jpg"/>
                                        
                                        <span id="textBtnImg">Thêm ảnh</span>  
                                    </button>
                                    <input id="ipImg" className="" type="file" name="img"/>
                                    <input id="course_img" type="file" name="course_img"/>
                                </div>
                                <div className="product__item-form">
                                    <label htmlFor="">Tên khóa học</label>
                                    <input className="product__name-form" type="text" name="course_name" placeholder="Nhập vào"/>
                                </div>
                                <div className="product__item-form">
                                    <div className="product__item-price">
                                        <label htmlFor="">Học phí</label>
                                        <input className="product__price-form" type="number" name="course_price" placeholder="Nhập vào"/>
                                    </div>
                                    <div className="product__item-quantity">
                                        <label htmlFor="">Thời lượng</label>
                                        <input className="product__quantity-form" type="number" name="course_duration" placeholder="Nhập vào"/>
                                    </div>
                                </div>

                                <div className="product__item-form">
                                    <label htmlFor="">Mô tả khóa học</label>
                                    <textarea className="product__des-form" type="text" name="course_description"> </textarea>
                                </div>
                                <div className="product__item-form">
                                    <label htmlFor="">Cơ sở</label>
                                    <input className="product__name-form" type="text" name="location" placeholder="Nhập vào"/>
                                </div>

                                <div className="product__item-form">
                                    <label htmlFor="">Ngày Học 1</label>
                                    <input className="product__name-form" type="text" name="ngayHoc1" placeholder="Nhập vào"/>
                                </div> 

                                <div className="product__item-form">
                                    <label htmlFor="">Ngày Học 2</label>
                                    <input className="product__name-form" type="text" name="ngayHoc2" placeholder="Nhập vào"/>
                                </div> 

                                <div className="product__item-form">
                                    <label htmlFor="">Ngày Học 3</label>
                                    <input className="product__name-form" type="text" name="ngayHoc3" placeholder="Nhập vào"/>
                                </div> 

                                <div className="product__item-form">
                                    <label htmlFor="">Giờ vào học</label>
                                    <input className="product__name-form" type="text" name="start" placeholder="Nhập vào"/>
                                </div> 

                                <div className="product__item-form">
                                    <label htmlFor="">Giờ tan học</label>
                                    <input className="product__name-form" type="text" name="end" placeholder="Nhập vào"/>
                                </div>

                               <div className="home__product-btn">
                                  <button className="btn ">Hủy</button>
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