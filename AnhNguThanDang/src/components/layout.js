
//da duoc export roi nen khong can export nưa

import { Link } from "react-router-dom";

//phai import css de chay
import '../css/style.css';


//me2 -> margin-left 2
export function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" href="#">BestStore
          <img src="/icon.png" alt="" width="30" className="me-2"/>
          </Link>
       
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link text-dark" aria-current="page" to="/Home">Home</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link text-dark" to="/Contact">Contact</Link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Admin
                </a>
                <ul class="dropdown-menu">
                  <li><Link class="dropdown-item" to="/admin/Products">Products</Link></li>
                  <li><Link class="dropdown-item" href="/Profile">Profile</Link></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><Link class="dropdown-item" href="/Logout">Logout</Link></li>
                </ul>
              </li>
              
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    );
}
export function Footer() {
    return (
        <div class="text-center p-4 border-top">
              <img src="/icon.png" alt="" width="30" className="me-2"/>
              BestStore
        </div>
    );
}