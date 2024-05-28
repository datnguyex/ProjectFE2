    import { Form, useNavigate } from "react-router-dom";
    import "../../../css/createCourse.scss"
    import "../../../css/base.css"
    import "../../../css/main.css"
    import "../../../css/profile.css"
    import "../../../css/seller.css"
    import "../../../css/product.css"
    import "../../../css/product_detail.css"
    import { useState } from "react";
    import { useEffect} from "react";


    export function CreateCourse() {
        const [location, setLocation] = useState([]);
        const navigate = useNavigate();


    
        function getLocationCourse() {
            //phuong thuc get
            fetch("http://localhost:4000/locationCourse")
            .then(reponse => {
            if(reponse.ok) {
                return reponse.json();
            }
            })
            .then(data => {
            setLocation(data)
            })
        
        }
    
            useEffect(getLocationCourse,[]);

        async function HandleSubmit(event) {
            event.preventDefault();
        
            const formData = new FormData(event.target);
            const courseFormData = new FormData();

            for (const [key, value] of formData.entries()) {
                if (key.startsWith("course_")) {
                    courseFormData.append(key, value);
                }
            }
        
            
                //ham su ly khi do la formdata-> khong ep kieu gi het
                const courseResponse = await fetch("http://localhost:4000/Courses", {
                    method: "POST",
                    body: courseFormData
                });
        
            
                const courseData = await courseResponse.json();
                let courseId = courseData.id;
        
                courseId = parseInt(courseId);       
                    location.map(async locationItem => {
                    let detailFormData = new FormData();
                    
                        //append truyen 1 kieu string vo form 
                        detailFormData.append("location", formData.get(`location_${locationItem.id}`));
                        detailFormData.append("start", formData.get(`start_${locationItem.id}`));
                        detailFormData.append("end", formData.get(`end_${locationItem.id}`));
                        detailFormData.append("day", [
                            formData.get(`ngayHoc1_${locationItem.id}`),
                            formData.get(`ngayHoc2_${locationItem.id}`),
                            formData.get(`ngayHoc3_${locationItem.id}`)
                        ]);
        
                       //add them du lieu moi vao nen lam them buoc nay
                        const detailResponse = await fetch("http://localhost:4000/detailCourse", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                ...Object.fromEntries(detailFormData.entries()),
                                "course_id": courseId
                            })
                        });
        
                     
                        detailFormData = "";
                    })
            
        
                navigate("/admin/courses");
        
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
                                

                                    {location.map(locationItem => (
                                      
        <div key={locationItem.id}>
            <div className="product__item-form">
                <label htmlFor="">{'Cơ sở '+locationItem.id}</label>
                <input value={locationItem.locationName} className="product__name-form" type="text" name={`location_${locationItem.id}`} placeholder="Nhập vào"/>
            </div>
         
            <div className="product__item-form">
                <label htmlFor="">Ngày Học 1</label>
                <input className="product__name-form" type="text" name={`ngayHoc1_${locationItem.id}`} placeholder="Nhập vào"/>
            </div> 

            <div className="product__item-form">
                <label htmlFor="">Ngày Học 2</label>
                <input className="product__name-form" type="text" name={`ngayHoc2_${locationItem.id}`} placeholder="Nhập vào"/>
            </div> 

            <div className="product__item-form">
                <label htmlFor="">Ngày Học 3</label>
                <input className="product__name-form" type="text" name={`ngayHoc3_${locationItem.id}`} placeholder="Nhập vào"/>
            </div> 

            <div className="product__item-form">
                <label htmlFor="">Giờ vào học</label>
                <input className="product__name-form" type="text" name={`start_${locationItem.id}`} placeholder="Nhập vào"/>
            </div> 

            <div className="product__item-form">
                <label htmlFor="">Giờ tan học</label>
                <input className="product__name-form" type="text" name={`end_${locationItem.id}`} placeholder="Nhập vào"/>
            </div>
        </div>
    ))}


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