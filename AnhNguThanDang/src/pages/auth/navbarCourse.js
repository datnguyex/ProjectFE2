import "../../css/courseList.scss"
import "../../css/base.css"
import "../../css/main.css"
import "../../css/seller.css"
import "../../css/profile.css"
import "../../css/product.css"
import "../../css/product_detail.css"
export function Navbar(onInputChange, onSubmit) {
    const handleInputChange = (event) => {
        const value = event.target.value;
        onInputChange(value);
      };
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
                                    <i class="navbar-icon-link fa-solid fa-bell"></i>
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
                                    <i class="navbar-icon-link fa-regular fa-circle-question"></i>
                                    Trợ giúp
                                </a>
                            </li>
                            <li class="navbar-item navbar-item--strong navbar-item--separate">Đăng ký</li>
                            <li class="navbar-item navbar-item--strong">Đăng nhập</li>
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
                    <div class="header-with-search">
                        <div class="header__logo">
                            <a href="" class="logo_link">
                                <i class="fa-solid fa-store logo_shop"></i>
                                <div class="name_header">
                                    <span >SMART</span> 
                                    <span class="name_shop">STORE</span>
                                </div>
                            </a>
                        </div>
                        <div class="header__search">
                            <div class="header__search-input-wrap">
                              <form>
                              <input  class="header__search-input"  name="keyword"
        type="text"
        className="header__search-input"
        placeholder="Nhập tên khóa học"
        onChange={handleInputChange}/>
                              </form>
                                <div class="header__search-history">
                                    <h3 class="header__search-history-heading">Lịch sử tìm kiếm</h3>
    import "../../css/base.css"
    import "../../css/main.css"
    import "../../css/seller.css"
    import { useEffect, useState } from "react";
    import { Form, Link, useNavigate, useParams } from "react-router-dom";

    export function Navbar({onSubmit }) {   

        const [historySearch, setHistorySearch] = useState([]);

        const [defaulValue, setDefaultValue] = useState([]);

        function getHistorySearch() {
            fetch("http://localhost:4000/HistorySearch")
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
            }) 
            .then(data => {
                const reversedData = data.reverse().slice(0, 3);
                setHistorySearch(reversedData);
            }) 
        }
    
        function handleChangeDefaultValue(value) {
            setDefaultValue(value);
        }
        useEffect(getHistorySearch,[]);
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
                                
                                <Link class="navbar-item navbar-item--strong" to={"/student/Home"}>Đăng Xuất</Link>
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
                        <div class="header-with-search">
                            <div class="header__logo">
                                <a href="" class="logo_link">
                                    <i class="bi bi-shop logo_shop"></i>
                                    <div class="name_header">
                                        <span id="name_shop" >Than</span> 
                                        <span  class="name_shop">Dang</span>
                                    </div>
                                </a>
                            </div>
                            <form onSubmit={onSubmit}>
                            <div class="header__search">
                                <div class="header__search-input-wrap">
                                
                                <input defaultValue={defaulValue}
                                            id="header__search-input"
                                            className="header__search-input"
                                            name="keyword"
                                            autoComplete="off" />
                                    <div class="SearchParent">
                                        <h3 class="header__search-history-heading">Lịch sử tìm kiếm</h3>
                                    <ul class="header__search-history-list">
                                        {
                                            historySearch.map(search => (
                                        <li  onClick={() => handleChangeDefaultValue(search.search_name)}  class="header__search-history-item">
                                         <button type="submit" id="history-item-link" className="history-item-link">
                                            {search.search_name}
                                            </button>
                                            </li>
                                             ))
                                            }
                                            </ul>
                                    </div>
                                    
                                </div>
                                <div class="search-select">
                                    <span class="search-title">Trong Shop</span>
                                    <i class="search-icon fa-solid fa-angle-down"></i>
                                    <ul class="search-option">
                                        <li class="search-option-item search-option-item-action">
                                            <span>Trong Shop</span>
                                            <i class="fa-solid fa-check"></i>
                                        </li>
                                        <li class="search-option-item">
                                            <span>Ngoài Shop</span>
                                            <i class="fa-solid fa-check"></i>
                                        </li>
                                    </ul>
                                </div>
                                
                                <button class="search-btn">
                                    <i class="search-btn-icon bi bi-search"></i>
                                </button>
                            
                            </div>
                            </form>
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
                    </div>
                </header>
            </div>
        );
    }

