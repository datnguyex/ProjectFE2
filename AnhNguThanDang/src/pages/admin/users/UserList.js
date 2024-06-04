import React from 'react';
import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "../../../css/courseList.scss"
import "../../../css/base.css"
import "../../../css/main.css"
import "../../../css/seller.css"
import "../../../css/profile.css"
import "../../../css/product.css"
import "../../../css/product_detail.css"
import "../../../css/register.css";
import ReactPaginate from 'react-paginate';
import "../../../../../node_modules/bootstrap/dist/css/bootstrap-grid.css"

export function UserList() {
    const navigate = useNavigate();
    var param = useParams();
    const [totalPage, setTotalPage] = useState([]);
    const [courses, setCourses] = useState([]);
    const [users, setUser] = useState([]);
    const [detailCourses, setDetailCourses] = useState([]);

    const [course, setCourse] = useState([]);
    const [detailCourse, setDetailCourse] = useState([]);
    const [reviews, setReview] = useState([]);
    const [totalUsers, setTotalUser] = useState([]);
    const pageSize = 10; // Số lượng người dùng hiển thị trên một trang
    const totalPages = Math.ceil(totalUsers.length / pageSize);
    function handlePageClick(selectedPage) {
        const offset = selectedPage * pageSize;
        getUser(selectedPage + 1, pageSize); // + 1 vì selectedPage bắt đầu từ 0
    }

    function deleteUser(id) {
        fetch("http://localhost:4000/user/" + id, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    getUser(1, 1);
                }
            })
    }

    function getUser(pageNumber, pageSize) {
        const offset = (pageNumber - 1) * pageSize;
        fetch(`http://localhost:4000/user?limit=${0, 1}&offset=${1}`)
            .then(reponse => {
                return reponse.json();
            })
            .then(data => {
                console.log(data);
                setTotalPage(data.length)
                setUser(data);
            });
    }
    //hook nay goi phuong thuc get lay ra course va detail course 
    //hook se duoc chay truoc
    useEffect(() => {
        axios.get('http://localhost:4000/ScoreAndReview')
            .then(response => {
                setReview(response.data);
            })
        axios.get('http://localhost:4000/user')
            .then(response => {
                setTotalUser(response.data.length);
                getUser(1, 2); // Trang đầu, hiển thị 10 người dùng
            })
    }, []);

    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day

    const userData = users.map(user => ({
        ...user,//chuyen doi gia tri -> giong ajax
        details: reviews.filter(review => review.review_studenEmail === user.email)
    }));


    //sau khi hook truyen du lieu cho useState -> useState se co gia tri de tra xuong day
    // const joinedData = detailCourse.filter(detailCourse => detailCourse.course_id === user.id_course)

    async function HandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const userFormData = new FormData();

        //ham su ly khi do la formdata-> khong ep kieu gi het
        const courseResponse = await fetch("http://localhost:4000/User", {
            method: "POST",
            body: formData
        });
        navigate("/home");

    }

    return (
        <div >{
            <div className="app__container">
                <div className="grid">
                    <div className="grid__row app__contents_seller">
                        <div className="grid__column-12">
                            <div>
                                <h3>DANH SÁCH SINH VIÊN</h3>
                                <div>
                                    <Link class="btn btn-primary btn-lg" to="/admin/user/create">Thêm</Link>
                                </div>
                            </div>
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th className='th_user' scope="col">id</th>
                                        <th className='th_user' scope="col">Họ và tên</th>
                                        <th className='th_user' scope="col">email</th>
                                        <th className='th_user' scope="col">sđt</th>
                                        <th className='th_user' scope="col">Tên khóa học</th>
                                        <th className='th_user' scope="col">Nội dung yêu cầu</th>
                                        <th className='th_user' scope="col">Sự kiện</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    {userData.map(user => (
                                        <tr>
                                            <th className='td_user' scope="row">{user.id}</th>
                                            <td className='td_user'> {user.name}</td>
                                            <td className='td_user'> {user.email}</td>
                                            <td className='td_user'> {user.phone}</td>
                                            <td className='td_user'> {user.id_course}</td>
                                            <td className='td_user'> {user.requirement}</td>
                                            <td className='td_user'>
                                                <div>
                                                    <Link class="btn btn-sm btn-info" to={`/admin/user/update/${user.id}`}>Cập nhật</Link>
                                                </div>
                                                <div>
                                                    <button class="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)} id="delete_Product" type="submit">Xóa</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    )}
                                </tbody>
                            </table>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">>"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={Math.ceil(totalUsers.length / 10)}
                                previousLabel="<<"
                                pageClassName='page-item'
                                pageLinkClassName='page-link'
                                previousClassName='page-item'
                                previousLinkClassName='page-link'
                                nextClassName='page-item'
                                nextLinkClassName='page-link'
                                breakClassName='page-item'
                                breakLinkClassName='page-link'
                                containerClassName='pagination'
                                activeClassName='active'
                            />
                        </div>

                    </div>
                </div>
            </div>
            // <div class="container">
            //     <h1>Quản lý người dùng</h1>

            //     <table class="table table-striped table-hover">
            //         <thead>
            //             <tr>
            //                 <th>Ảnh đại diện</th>
            //                 <th>Tên</th>
            //                 <th>Email</th>
            //                 <th>Vai trò</th>
            //                 <th>Hành động</th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             <tr>
            //                 <td><img src="user-avatar.png" alt="Ảnh đại diện" class="rounded-circle" width="32" height="32" /></td>
            //                 <td>Nguyễn Văn A</td>
            //                 <td>nguyenvana@example.com</td>
            //                 <td>Quản trị viên</td>
            //                 <td>
            //                     <a href="#" class="btn btn-sm btn-info">Chỉnh sửa</a>
            //                     <a href="#" class="btn btn-sm btn-danger">Xóa</a>
            //                 </td>
            //             </tr>
            //         </tbody>
            //     </table>

            //     <a href="#" class="btn btn-primary btn-lg">Thêm người dùng mới</a>
            // </div>
        }
        </div>
    );
}
