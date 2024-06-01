import { Form, Link, useNavigate } from "react-router-dom";
import { NavbarHome } from "../../pages/auth/navbarHome";
import { useEffect, useState } from "react";
import axios from 'axios';
export function Home() {
    return (
        <div>
        <NavbarHome />
        {
            <h1>Đây là trang home</h1>
        }
        </div>  
    );
}