import "../../../src/css/base.css"
import "../../../src/css/main.css"
import "../../../src/css/register.scss"
import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
export default function Register() {
    const navigate = useNavigate();
    function HandleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
         
        let password = formData.get('password');
        password = parseInt(password);    
        fetch("http://localhost:4000/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...Object.fromEntries(formData.entries()),
                "password": password
            })
        })
        .then(response => {
            if(response.ok) {
                navigate("/auth/login");
            }
        })
    }
    return (
      <form onSubmit={HandleSubmit}>
          <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__body">    
               <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h3 class="auth-form__heading">Đăng ký</h3>
                        <Link to={'/auth/Login'} class="auth-form__switch-btn">Đăng nhập</Link>
                    </div>
                  
                    <div class="auth-form__form">
                        <div class="auth-form__group">
                            <input type="text" class="auth-form__input" placeholder="Name" name="name"/>
                        </div>
                        <div class="auth-form__group">
                            <input type="text" class="auth-form__input" placeholder="Email" name="email"/>
                        </div>
                        <div class="auth-form__group">
                            <input type="password" class="auth-form__input" placeholder="Password" name="password"/>
                        </div>
                        {/* <label id="role" for="seller">Người Bán</label>
                        <input  id="customer" name="role" value="seller" type="radio"/>

                        <label id="role" for="customer">Người Mua</label>
                        <input id="customer" name="role" value="customer" type="radio"/> */}

                    </div>

                    <div class="auth-form__aside">
                        <p class="auth-form__policy-text">
                            Bằng việc đăng ký, bạn đã đồng ý với Shoppe về
                            <a href="" class="auth-form__text-link">Điều khoản dịch vụ</a>
                            &
                            <a href="" class="auth-form__text-link">Chính xác bảo mật</a>
                        </p>
                    </div>

                    <div class="auth-form__controls">
                        <button type="submit" class="btn btn--primary">ĐĂNG KÝ</button>
                    </div>
                </div>

         
                <div id="auth-form__socials" class="auth-form__socials">
                    <a id="btn__icon-facebook" href="" class="btn btn__size-s btn--with-icon btn__icon-fb">
                        <i class="auth-form__socials-icon fa-brands fa-square-facebook"></i>
                        <span>Kết nối với Facebook</span>

                    </a>
                    <a id="btn__icon-google" href="" class="btn btn__size-s btn--with-icon btn__icon-google">
                        <i class="auth-form__socials-icon fa-brands fa-google"></i>
                        <span>Kết nối với Google</span>
                    </a>
                </div>
         
        </div>
        
    </div>
      </form>
    )
} 