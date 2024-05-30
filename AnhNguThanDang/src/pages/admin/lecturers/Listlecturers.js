
import { Form, Link, useNavigate } from "react-router-dom";

import "../../../css/courseList.scss"
import "../../../css/base.css"
import "../../../css/main.css"
import "../../../css/profile.css"
import "../../../css/seller.css"
import "../../../css/product.css"
import "../../../css/product_detail.css"
import "../../../css/listLecturer.scss"
import { useEffect, useState } from "react";
import {getLecturers,deleteLecturer} from "../../../components/lecturers/CpnLecturers";
import { Navbar } from "../../auth/navbarCourse";

export function Listlecturers() {

     const navigate = useNavigate();
     const [lecturers, setLecturer] = useState([]);


     //xoa theo ham
     useEffect(function() {
        getLecturers()
        .then(function(reponse) {
            if (reponse) {
                return reponse.json();
            }
          })
          .then(function(data) {
            if (data) {
              setLecturer(data);
            }
          })
      }, []);
      

      function handleSubmitDelete(id) {
        deleteLecturer(id)
        //khi co du lieu dc tra ve phai response no
            .then(response => {
                if (response.ok) {
                    return response.json();
                }     
            })
            .then(data => {
                setLecturer(data);
            })
    }
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const keyword = formData.get("keyword");
        fetch(`http://localhost:4000/getLecturerByKeyWord?lecturer_name=${keyword}`) 
        .then(response => {
          if(response.ok) {
            return response.json();
          }
        })
        .then(data => {
          if(data) {
            setLecturer(data)
          }
        })
      };

    return(      
         <div>
        <Navbar onSubmit={handleSubmit} />
    {
         <div class="app__container">
         <div class="grid">
             <div class="grid__row app__contents_seller ">
                
                 <div class="gird__column-2_seller">
                     <nav class="category">
                         <ul class="category-list">
                             <li class="category-item category-item--active">
                                 <a href="" class="category-item__link">Quản lý đơn hàng</a>
                             </li>
                             <li class="category-item">
                                 <a href="" class="category-item__link">Quản lý sản phẩm</a>
                             </li>
                             <li class="category-item">
                                 <a href="" class="category-item__link">Quản lý shop</a>
                             </li>
                             <li class="category-item">
                                 <a href="" class="category-item__link">Chăm sóc khách hàng</a>
                             </li>
                         </ul>
                     </nav>
                 </div>
                
     
                 <div class="grid__column-10">
                     <div class="home-filter">
                         <span class="home-filter-title">Sắp xếp theo</span>
                        
              
                         {/* <button onClick={() => Newest()} name="newest"  type="submit" class="home-filter__btn btn btn--primary">Mới nhất</button> 
                         <button  onClick={() => Oldest()}  type="submit" class="home-filter__btn btn">Cũ nhất</button>
                         <button onClick={() => sortDuaration()} type="submit" class="home-filter__btn btn">Thời lượng</button>
                          */}
                        
                        
                         <button id="btnAddProject" name="" type="" class="home-filter__btn btn"><Link to="/admin/lecturers/create" class="seller__product-edit">Thêm</Link></button>
                         <button id="btnAddProject" name="" type="" class="home-filter__btn btn"><Link to="/admin/courses" class="seller__product-edit">Khóa Học</Link></button>
                     </div>
     
                     <div class="home__product">
                         <div class="grid__row">
                            
                             <div class="grid__column-product">
                                 <table id="customers">
                                     <tr>
                                       <th>Ảnh giảng viên</th>
                                         <th>Tên giảng viên</th>
                                         <th>Chứng chỉ</th>
                                         <th>Mô tả</th>
                                         <th>Chức năng</th>
                                     </tr>
                                 
                                     {lecturers.map(lec => (
                                      <tr>
                                          <td><img class="lecturer-img" alt="" src={"http://localhost:4000/images/" + lec.lecturer_img} /></td>
                                          <td>{lec.lecturer_name}</td>
                                             <td>
                                         {lec.lecturer_certificate.split(",").map((cer, index) => (
                                          <p>- {cer}</p>
                                         ))}
                                           </td>
                                          <td>{lec.lecturer_description}</td>
                                       <td className="action__product">
                                       <button onClick={() => handleSubmitDelete(lec.id)} id="delete_Product" type="submit">Xóa</button> 
                                       <Link  to={`/admin/lecturers/update/${lec.id}`} class="seller__product-edit">Cập nhật</Link>
                                     </td>
                                     </tr>
                                     ))}

                                 </table>
                             </div>
                            
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
}
</div>
           
                );
            }