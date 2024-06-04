import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import "../../../src/css/login.scss"
import "../../../src/css/base.css"
import "../../../src/css/main.css"

///default dung de xuat 1 gia tri
export default function Login() {
    
    const navigate = useNavigate();

    function HandleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        
         fetch("http://localhost:4000/login",{
            method: "POST",
            body: formData,
        })
        .then(response => {
            if(response.ok) {
                navigate("/admin/courses");
            }
        })
    }


    return (
        <form onSubmit={HandleSubmit}>
          <div class="modal">
             <div class="modal__overlay"></div>
             <div class="modal__body">
                 <div id="auth-form__container" class="auth-form__container">
                     <div class="auth-form__header">
                         <h3 class="auth-form__heading">Đăng nhập</h3>
                         <Link to={'/auth/Register'} class="auth-form__switch-btn">Đăng ký</Link>
                     </div>
                     <div class="auth-form__form">
                         <div class="auth-form__group">
                             <input
                                 type="text"
                                 class="auth-form__input"
                                 placeholder="Email"
                                 id="email"
                                 name="email"
                             />
                         </div>
                         <div class="auth-form__group">
                             <input
                                 type="password"
                                 class="auth-form__input"
                                 placeholder="Password"
                                 id="password"
                                 name="password"
                             />
                         </div>
                     </div>
                     {/* <label for="seller">Người Bán</label>
                     <input id="seller" name="role" value="seller" type="radio" />
     
                     <label for="customer">Người Mua</label>
                     <input id="customer" name="role" value="customer" type="radio" />
     
                     <label for="admin">Quản Trị Viên</label>
                     <input id="admin" name="role" value="admin" type="radio" />
                     <br /> */}
                     <div>
                         {/* <div class="formCapCha">
                             <input name="CapCha" id="capCha" class="form-control capCha" value="" readOnly />
                             <input
                                 placeholder="Nhập mã..."
                                 class="inputCapcha"
                                 id="inputCapcha"
                                 name="inputCapcha"
                                 type="text"
                             />
                         </div> */}
                         {/* <div class="auth-form__group">
                             <input
                                 name="inputCapcha"
                                 class="auth-form__input"
                                 placeholder="Nhập mã..."
                                 id="capchaInput"
                             />
                         </div> */}
                         <div class="auth-form__aside">
                             <p class="auth-form__help">
                                 <a href="" class="auth-form__help-link auth-form__help-forgot">Quên mật khẩu</a>
                                 <span class="auth-form__help-separate"></span>
                                 <a href="" class="auth-form__help-link">Cần trợ giúp?</a>
                             </p>
                         </div>
                         <div class="auth-form__controls">
                             <button type="submit" class="btn btn--primary">ĐĂNG NHẬP</button>
                         </div>
                     </div>
                     <div id="auth-form__socials" class="auth-form__socials">
                         <a id="btn__icon-fb" href="" class="btn btn__size-s btn--with-icon btn__icon-fb">
                             <i class="auth-form__socials-icon fa-brands fa-square-facebook"></i>
                             <span>Kết nối với Facebook</span>
                         </a>
                         <a href="" class="btn btn__size-s btn--with-icon btn__icon-google">
                             <i class="auth-form__socials-icon fa-brands fa-google"></i>
                             <span>Kết nối với Google</span>
                         </a>
                     </div>
                 </div>
             </div>
         </div>
        </form>
     );
}