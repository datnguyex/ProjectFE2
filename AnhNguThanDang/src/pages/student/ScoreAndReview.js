import { Form, Link, useNavigate } from "react-router-dom";
import { NavbarHome } from "../../pages/auth/navbarHome";
import { useEffect, useState } from "react";
import axios from 'axios';
import "../../../src/css/ScoreAndReview.scss"
export function ScoreAndReview(){

   const [courses, setCourses] = useState([]);
   const [defaulValue, setDefaultValue] = useState([]);
   const [user, setUser] = useState([]);

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
      function getUser() {
        //phuong thuc get
        fetch("http://localhost:4000/user")
        .then(reponse => {
          if(reponse.ok) {
            return reponse.json();
          }
        })
        .then(data => {
           setUser(data)
        })
      }

      function handleChangeDefaultValue(value) {
            setDefaultValue(value);
        }

     async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);  
        const isUserExist = user.find(us => us.email === formData.get("review_studentEmail"));
        if(isUserExist) {
          const response = await fetch("http://localhost:4000/ScoreAndReview",{
            method: "POST",
            body: formData,
        });
        if(response) {
          alert("Gửi Thành Công")
        }
        }
        else {
          alert("Học Viên Không Có Trong Lớp Học")
        }
    
      }
      useEffect(() => {
        getCourses();
        getUser();
      }, []);
    return (
        <div>

            <NavbarHome />
            <div className="container mt-5">
                <h1>Gửi Điểm Số Và Cảm Nhận Về Khóa Học</h1>
                <div className="row row-cols-3 gx-0">
                    {courses.map(course => (
                        <div  onClick={() => handleChangeDefaultValue(course.id)}  className="col">
                           <div  class="card" >
  <img  src={"http://localhost:4000/images/" + course.course_img} class="card-img card-img-top" alt="..."/>
  <div class="card-body">
    <h3 class="card-title cousetTitle">{course.course_name}</h3>
    <p class="card-text cousetDes">{course.course_description}</p>
     <div class="durationFee">
        <p class="duration">{course.course_duration} Tuần</p>
        <p class="fee">{course.course_price} $</p>
    </div>                   
  </div>
</div>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit} class="formScoreSubmit">
                <h1>Phiếu Đánh Giá</h1>
            <div>
            <button className="btnScore">
            <i className="fa-solid fa-x"></i>
            <img id="ThemAnhImg1" src="http://localhost:4000/images/themanh.jpg" alt=""/>
            </button>
            </div>
            <div>
            <input name="review_studentImg" type="file" class="fileScore2"></input>
            <label class="imgStudent1">Ảnh Học viên</label>  


            <button className="btnScore2">
             <div className="">
            <i className="fa-solid fa-x"></i>
            </div>
            <img id="ThemAnhImg2" src="http://localhost:4000/images/themanh.jpg" alt=""/>
            </button>
            </div>
            <input name="review_img" type="file" class="fileScore"></input>
            <label class="imgStudent2">Ảnh Điểm Thi</label>        
            
             <div class="groupInput">
        <div class="mb-3">
            <input name="review_studentEmail" type="text" class="form-control" id="exampleInput" placeholder="Email Học Viên"/>
          </div>
          <div class="mb-3">
            <input name="score" type="text" class="form-control" id="exampleInput" placeholder="Điểm Số"/>
          </div>
{/*         
            <input defaultValue={defaulValue} name="review_courseId" type="text" class="form-control" id="review_courseId" placeholder="Course_id"/> */}
         
        </div>
        
        <textarea name="studentReview" class="form-control" defaultValue="Cảm Nhận Của Học Viên Về Khóa Học" id="floatingTextarea"></textarea>

          <button type="submit" class="btn btn-primary">Xác Nhận</button>
        </form>
          
        </div>
    );    
}