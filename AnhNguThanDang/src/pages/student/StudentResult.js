import { Form, Link, useNavigate } from "react-router-dom";
import { NavbarHome } from "../../pages/auth/navbarHome";
import { useEffect, useState } from "react";
import axios from 'axios';
import "../../../src/css/studenResult.scss"
export function StudenResult() {
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState([]);
    const [scoreAndReview, setScoreAndReview] = useState([]);
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
      function getReviewUser() {
        //phuong thuc get
        fetch("http://localhost:4000/ScoreAndReview")
        .then(reponse => {
          if(reponse.ok) {
            return reponse.json();
          }
        })
        .then(data => {
           setScoreAndReview(data)
        })
      }
      useEffect(() => {
        getCourses();
        getUser();
        getReviewUser();
      }, []);
      const joinedDatas = courses.map(course => {
        const usersInCourse = user.filter(u => parseInt(u.id_course) === course.id);
        return {
            ...course,
            users: usersInCourse, // cai nay de lien ket voi bang course theo cau truc 1 3 3. 
            // 1 cha 2 con 
            reviews: scoreAndReview
                .filter(review => usersInCourse.some(user => user.email === review.review_studentEmail))
                //tim kiem coi co review ben trong user khong
                //cha con chau
                .map(review => ({
                    ...review,
                    user: usersInCourse.find(user => user.email === review.review_studentEmail)
                    //luu user vao review -> no se hien thi theo cau truc 1 1 3
                }))
        };
    });
    return (
      <div>
          <NavbarHome />
          
          <div className="container mt-5">

                  {joinedDatas.map(course => (
                      <div>
                          <h1 class="mt-5">{course.course_name}</h1>
                          {course.reviews.map(review => (
                              <div className="row">
                                  <div className="col-md-6">
                                      <div id="cardItem" className="card">
                                          <img id="imgstudent" src={"http://localhost:4000/images/"+review.review_studentImg} className="card-img-top" alt="..." />
                                          <div className="card-body">
                                              <h2 className="card-title">{review.user.name}</h2>
                                              <p className="card-text">{review.studentReview}</p>
                                              <p className="card-text">{review.score}/990</p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col-md-6">
                                      <div id="cardItem2" className="a">
                                          <img src={"http://localhost:4000/images/" + review.review_img} className="cardImg" alt="..." />
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  ))}
              </div>
       
      </div>  
  );
}  