import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import "../../css/base.css"
import "../../css/main.css"
import "../../css/seller.css"

export function NavbarHome({onSubmit }) {   

    const [courses, setCourses] = useState([]);
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
useEffect(getCourses,[]);
    return (
        <div class="main">
            <header class="header">
                <div class="grid">
                    <nav class="header__navbar">
                        <ul class="navbar-list">
                            <li class="navbar-item navbar-item--has-qr navbar-item--separate">
                                <div class="navbar__qr">
                                    <img src="/img/QRcode.png" alt="" class="navbar__qr-img"/>
                                    <div class="navbar__qr-apps">
                                        <a href="" class="navbar__qr-link">
                                            <img src="/img/ggplay.png" class="navbar__qr-apps-img" />
                                        </a>
                                        <a href="" class="navbar__qr-link">
                                            <img src="/img/apple.png" class="navbar__qr-apps-img" />
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul class="navbar__list">
                            <li class="navbar-item navbar-item--has-notify">
                                <a href="#" class="navbar-item-link">
                                    <i class="navbar-icon-link bi bi-bell"></i>
                                    Thông báo
                                </a>
                                <div class="navbar__notify">
                                    <header class="navbar__notify-header">
                                        <h3>Thông báo mới nhận</h3>
                                    </header>
                                    <ul class="navbar__notify-list">
                                        <li class="navbar__notify-item navbar__notify-item--viewed">
                                            <a href="" class="navbar__notify-link">
                                                <span>
                                                    <img src="/img/notify.jpg" alt="" class="navbar__notify-img"/>
                                                </span>
                                                <div class="navbar__notify-info">
                                                    <span class="navbar__notify-name">Chúc mừng năm mới</span>
                                                    <span class="navbar__notify-description">Mô tả</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="navbar__notify-item navbar__notify-item--viewed">
                                            <a href="" class="navbar__notify-link">
                                                <span>
                                                    <img src="/img/notify.jpg" alt="" class="navbar__notify-img"/>
                                                </span>
                                                <div class="navbar__notify-info">
                                                    <span class="navbar__notify-name">Chúc mừng năm mới</span>
                                                    <span class="navbar__notify-description">Mô tả</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="navbar__notify-item navbar__notify-item--viewed">
                                            <a href="" class="navbar__notify-link">
                                                <span>
                                                    <img src="/img/notify.jpg" alt="" class="navbar__notify-img"/>
                                                </span>
                                                <div class="navbar__notify-info">
                                                    <span class="navbar__notify-name">Chúc mừng năm mới Chúc mừng năm mới Chúc mừng năm mới</span>
                                                    <span class="navbar__notify-description">Mô tả Chúc mừng năm mới Chúc mừng năm mới</span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <footer class="navbar__notify-footer">
                                        <a href="" class="navbar__notify-footer-btn">Xem tất cả</a>
                                    </footer>
                                </div>
                            </li>
                            <li class="navbar-item">
                                <a href="#" class="navbar-item-link">
                                    <i class="navbar-icon-link bi bi-question-circle"></i>
                                    Trợ giúp
                                </a>
                            </li>
                            
                            <Link class="navbar-item navbar-item--strong" to={"/auth/login"}>Đăng Nhập</Link>
                            <Link class="navbar-item navbar-item--strong" to={"/auth/Register"}>Đăng Ký</Link>
                            <li class="navbar-item navbar-user">
                                <img src="" alt="" class="navbar-user-img"/>
                                <span class="navbar-user-name"></span>
                                <ul class="navbar-user-info">
                                    <li class="navbar-user-item">
                                        <a href="" class="navbar-user-link">Địa chỉ</a>
                                    </li>
                                    <li class="navbar-user-item">
                                        <a href="" class="navbar-user-link">Đơn mua</a>
                                    </li>
                                    <li class="navbar-user-item">
                                        <a href="" class="navbar-user-link">Đăng xuất</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                  
                        <div class="header-nameGroup">
                        <div class="header__logo">
                            <Link to="/student/Home" class="logo_link">
                                <i class="bi bi-shop logo_shop"></i>
                                <div class="name_header">
                                    <span id="name_shop" >Than</span> 
                                    <span  class="name_shop">Dang</span>
                                </div>
                            </Link>
                        </div>

                        <div id="header__logo" class="header__logo"> 
                        <a href="" class="logo_linkz">
                        <i class="bi bi-caret-down-fill"></i>
                                <div class="name_header">
                                    <span id="name_shopz">Điểm</span> 
                                    <span id="name_shopz">Thi</span>   
                                </div>
                            </a>
                            <ul class="header-listGroup">
                                    <li class="navbar-user-item">
                                        <Link to="/student/StudentResult" class="see-core navbar-user-link">Điểm Thi Học Viên</Link>
                                    </li>
                                    <li class="navbar-user-item">
                                        <Link to="/student/ScoreAndReview" class="navbar-user-link">Đánh Giá Và Gửi Điểm Thi</Link>
                                    </li>
                            </ul>
                        </div>

                        <div class="header__logo header__logoCourse">
                        <a href="" class="logo_linkz">
                        <i class="bi bi-caret-down-fill"></i>
                                <div class="name_header">
                                    <span id="name_shopz" >Khóa</span> 
                                    <span id="name_shopz" >Học</span> 
                                </div>
                            </a>
                            <ul class="header-listGroupCourse">
                                    
                                   {
                                     courses.map(course => (
                                        <li class="navbar-user-item">
                                        <a href="" class="see-core navbar-user-link">{course.course_name}</a>
                                         </li>  
                                     ))
                                   }
                            </ul>   
                        </div>

                        </div>
                       
                        <div class="header__cart">
                            <div class="header__cart-wrap">
                                <i class="cart-icon fa-solid fa-cart-shopping"></i>
                                <div class="header__cart-list header__cart-no-cart">
                                    <img src="/img/no-cart.png" alt="" class="header__cart-no-cart-img"/>
                                    <span class="header__cart-message">Chưa có sản phẩm</span>
                                    <h3 class="cart-heading">Sản phẩm đã thêm</h3>
                                    <ul class="cart-list-item"></ul>
                                    <a href="" class="header__cart-view btn btn--primary">Xem giỏ hàng</a>
                                </div>
                            </div>
                        </div>
                  
                </div>
            </header>
        </div>
    );
}
