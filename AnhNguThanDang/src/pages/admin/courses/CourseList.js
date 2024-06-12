import { Form, Link, useNavigate } from "react-router-dom";
import "../../../css/courseList.scss"
import "../../../css/base.css"
import "../../../css/main.css"
import "../../../css/seller.css"
import "../../../css/profile.css"
import "../../../css/product.css"
import "../../../css/product_detail.css"
import { useEffect, useState } from "react";
import { Navbar } from "../../auth/navbarCourse";
import axios from 'axios';
//retuen chi dung de tra lai giao dien
//vi get dung de lay du lieu nen phai gan lai data
// ham nao cung tra ve reponse nhung get phai co them data de gan lai cho statea
//chi co mang moi su dung 
export function CourseList() {

  //dùng để chuyển ddeeesn file mà người dùng thực hiện
  //là một hook dùng để điều hướng người dùng
  const navigate = useNavigate();


  //
  const [courses, setCourses] = useState([]);
  const [detailCourses, setDetailCourses] = useState([]);



  function getCourses() {
    //phuong thuc get
    fetch("http://localhost:4000/Courses")
    .then(reponse => {
      if(reponse.ok) {
        return reponse.json();
      }
    })
    .then(data => {
       setCourses(data)
    })
  }

  function getCourseDetail() {
    //phuong thuc get
    fetch("http://localhost:4000/detailCourse")
    .then(reponse => {
      if(reponse.ok) {
        return reponse.json();
      }
    })
    .then(data => {
       setDetailCourses(data)
    })
  }


  //1 so ham nhu delete/post khong can phai su dung repose.json -> vi chung ta quan tam 
  //den viec may chu co thuc hien yeu cau them/xoa hay khong chu khong quan tam den viec
  //may chu co phan hoi lai ket qua tra ve hay khong -> ham get quan tam den viec nhan lai
  //ket qua tra ve nen phai repose.json
  //noi chung khi can do du lieu xuong thi phai tra ve response
  //co the tuong tuong response.json chuyen doi data thanh json cho de hieu
  function deleteCourse(id) {
    fetch(`http://localhost:4000/deleteCourseDetails?course_id=${id}`, {
      method: "DELETE"
    }).then(response => {
      if (response.ok) {
      
        return fetch(`http://localhost:4000/Courses/${id}`, {
          method: "DELETE"
        }).then(response => {
            if (response.ok) {
            getCourses();
            getCourseDetail();
        } 
     })
      } 
    })
  }
  
  

 
  //vi cousrse detail da dươc lien ket voi course nen co the sap xep thong qua course
    function Oldest() {
        fetch("http://localhost:4000/Courses")
        .then(response => {
          if (response.ok) {
             return response.json();
          }
        })
        .then(data => {
            const sortedCourses = data.sort((a, b) => a.id - b.id);
            setCourses(sortedCourses)
        })
      }

      function Newest() {
        fetch("http://localhost:4000/Courses")
        .then(response => {
          if (response.ok) {
             return response.json();
          }
        })
        .then(data => {
            const sortedCourses = data.sort((a, b) => b.id - a.id);
            setCourses(sortedCourses)
        })
      }

      function priceASC() {
        fetch("http://localhost:4000/Courses")
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        }) 
        .then(data => {
            const priceASC = data.sort((a,b) => a.course_price - b.course_price)
            setCourses(priceASC)
        }) 
      }
      function priceDESC() {
        fetch("http://localhost:4000/Courses")
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        }) 
        .then(data => {
            const priceASC = data.sort((a,b) => b.course_price - a.course_price)
            setCourses(priceASC)
        }) 
      }

      //sau khi hook da truyen gia tri cho State thi no se sap xep state
      function sortDuaration() {
        fetch("http://localhost:4000/Courses")
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        }) 
        .then(data => {
            const priceASC = data.sort((a,b) => a.course_duration - b.course_duration)
            setCourses(priceASC)
        }) 
      }
      function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const keyword = formData.get("keyword");

        fetch(`http://localhost:4000/getCourseByKeyWord?course_name=${keyword}`) 
        .then(response => {
          if(response.ok) {
            return response.json();
          } 
        })
        .then(data => {
          if(data) {
            setCourses(data)
          }
        })
        .then(() => {
          //khi khong phai formData thi phai co header va stringtify no moi gui duoc
          fetch(`http://localhost:4000/HistorySearch`, {
            method: "POST",
            body: JSON.stringify({ search_name: keyword }),
            headers: {
              "Content-Type": "application/json"
            }
          });
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
    }, []);

  //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day

    const joinedData = courses.map(course => ({
        ...course,//chuyen doi gia tri -> giong ajax
        details: detailCourses.filter(detailCourse => detailCourse.course_id === course.id)
    }));

  //    joinedData.map(course => {
  //     // In ra course_id của từng phần tử trong joinedDatas
  //     console.log(course);
      
  // });
    // console.log(joinedData);

    return (
      <div>
            <Navbar onSubmit={handleSubmit} />
        {
            
<div class="app__container">
    <div class="grid">
        <div class="grid__row app__contents_seller ">
            <div class="grid__column-12">
                <div class="home-filter">
                    <span class="home-filter-title">Sắp xếp theo</span>
                   
                  
                    <input name="id_seller" type="hidden" value="" />
         
                    <button onClick={() => Newest()} name="newest"  type="submit" class="home-filter__btn btn btn--primary">Mới nhất</button> 
                    <button  onClick={() => Oldest()}  type="submit" class="home-filter__btn btn">Cũ nhất</button>
                    <button onClick={() => sortDuaration()} type="submit" class="home-filter__btn btn">Thời lượng</button>
                    
                   
                    <div class="select-input">
                        <span class="home-filter__label" for="">Giá</span>
                        <i class="search-icon fa-solid fa-angle-down"></i>                       
                         <ul class="select-input__list">
                            <li class="select-input__item">
                             <button  n  onClick={() => priceDESC()}  id="btn-sellect-priceASC" type="submit">Cao Đến Thấp</button>
                            </li>
                            <li class="select-input__item">
                               <button  onClick={() => priceASC()}  id="btn-sellect-priceDESC" type="submit">Thấp Đến Cao</button>
                            </li>
                        </ul>
                    </div>   
            
                    <button id="btnAddProject" name="" type="" class="home-filter__btn btn"><Link to="/admin/courses/create" class="seller__product-edit">Thêm</Link></button>
                    <button id="btnLecturers" name="" type="" class="home-filter__btn btn"><Link to="/admin/lecturers" class="seller__product-edit">Giảng Viên</Link></button>
                    <button id="btnLecturers" name="" type="" class="home-filter__btn btn"><Link to="/admin/users" class="seller__product-edit">Sinh Viên</Link></button>
                </div>

                <div class="home__product">
                    <div class="grid__row">
                       
                        <div class="grid__column-product">
                            <table id="customers">
                                <tr>
                                    <th>Tên khóa học</th>
                                    <th>Học Phí</th>
                                    <th>Thời Lượng</th>
                                    <th>Chi Tiết Khóa Học</th>
                                    <th>Thao tác</th>
                                </tr>
                            
                                {joinedData.map(course => (
                                  <tr>
                                      <td class="seller__td-img">
                                    <Link to={`/admin/courses/detail_admin/${course.id}`}  className="link_to">
                                          <div class="detail__product-info">
                                          <img class="Course-img" src={"http://localhost:4000/images/" + course.course_img} />
                                              <a href="" class="information__product-link">
                                                  <span class="seller-name_product">{course.course_name}</span>
                                                  <span class="seller-description_product">{course.course_description}</span>
                                              </a>
                                          </div>
                                    </Link>
                                      </td>
                                      <td>{course.course_price} $</td>
                                      <td>{course.course_duration} Tháng</td> 
                                      <td>
                                          {course.details.map(detail => (
                                          <div>
                                            {detail.location}: {detail.day}  {detail.start} - {detail.end}
                                          </div>
                                          ))}
                                      </td>
                                  
                                      <td class="action__product">
                                          <Link  to={`/admin/courses/update/${course.id}`} class="seller__product-edit">Cập nhật</Link>
                                          <Link to={`/admin/courses/detail_admin/${course.id}`} class="seller__product-detail">Xem thêm</Link> 
                                      <button onClick={() => deleteCourse(course.id)} id="delete_Product" type="submit">Xóa</button> 
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

 ;
