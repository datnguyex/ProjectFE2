import { Form, Link, useNavigate } from "react-router-dom";
import { NavbarHome } from "../../pages/auth/navbarHome";
import { useEffect, useState } from "react";
import axios from 'axios';
export function StudenResult() {
    return (
        <div>
        <NavbarHome />
        {
            <h1>Đây là trang kết quả của học viên</h1>
        }
        </div>  
    );
}
