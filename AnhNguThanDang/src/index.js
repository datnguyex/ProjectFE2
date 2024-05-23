import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import { BrowserRouter,Routes,Route, } from 'react-router-dom';
// import { ProductList } from './pages/admin/products/ProductList';
import { CreateProduct } from './pages/admin/products/CreateProduct';
// import { EditProduct } from './pages/admin/products/EditProduct';
import { CourseList } from './pages/admin/courses/CourseList';
import { CreateCourse } from './pages/admin/courses/CreateCourse';
import { UpdateCourse } from './pages/admin/courses/UpdateCourse';
//to="/Home" no se di chuyen den route va route se tra lai 1 component-> dia chi web cung thay doi
// import component... tu file...

//component nay khong can export vi chua can su dung o dau ca
//npm i react-router-dom tai router de su dung route
//khi Route duoc goi no se xuat hien trang ... o vi tri
// vi navbar dung de goi cac route nen phai dat trong browser
// de lin qua 1 trang nao do thay vi dung the a va href thi su dung link va to
//npm install -g json-server@0.17.4 tao api
//json-server --watch db.json --port 3004 (doi 3004 thanh 400 )xem file api  
// api dung de ghi co so du lieu
//chay http://localhost:4000/products de xem file apu
///chay http://localhost:4000/images/product1.jpg de xem file anh
//key trong moi phan tu trong react dung de nhan dien chung khi thuc hien them xoa sua.
//npm i multer de gui bieu mau
//sau khi sua sever chay lenh node server.js
//const storage = multer.diskStorage({ ... }),const bodyParser = multer({ storage: storage }).any()
//: Bạn đang tạo một đối tượng lưu trữ cho Multer,
// xác định nơi lưu trữ các tệp đã tải lên và tên tệp.
//server.get/post sử lý get/post
//{} dung khi muon tao ra 1 chuoi , viet javascript , fetch ko phai jsx nen k can su dung
// param dung de lay gia tri nhu request php


// GET: Sử dụng để yêu cầu dữ liệu từ một nguồn nào đó. Thường được sử dụng để lấy dữ liệu từ máy chủ và hiển thị trên trình duyệt.

// POST: Sử dụng để gửi dữ liệu từ client đến server để tạo mới một tài nguyên.

// PUT: Sử dụng để cập nhật toàn bộ thông tin của một tài nguyên hoặc tạo mới nếu tài nguyên không tồn tại.

// PATCH: Sử dụng để cập nhật một phần nhỏ của một tài nguyên đã tồn tại.

// DELETE: Sử dụng để xóa một tài nguyên từ server.

// OPTIONS: Sử dụng để yêu cầu các tùy chọn được hỗ trợ cho tài nguyên hoặc máy chủ.

// HEAD: Tương tự như GET, nhưng chỉ trả về phần tiêu đề của phản hồi, không phải dữ liệu thực tế.

// CONNECT: Được sử dụng để thiết lập một kết nối với server thông qua proxy.

// TRACE: Gửi một yêu cầu lặp lại cho máy chủ, giúp xác định vấn đề nếu có trong quá trình truyền tải.

// PATCH: Sử dụng để gửi các thay đổi cho tài nguyên đã tồn tại với dữ liệu chỉ mô tả các thay đổi cần áp dụng.
function App() {
  return (  
    <div>
     <BrowserRouter>
     <Navbar />
      <Routes>
      <Route path='/admin/courses' element={<CourseList />} /> 
      <Route path='/admin/courses/create' element={<CreateCourse />} />
      <Route path='/admin/courses/update/:id' element={<UpdateCourse />} />
      {/* <Route path='/admin/products/create' element={<CreateProduct />} /> */}
        {/*<Route path='/admin/products/edit/:id' element={<EditProduct />}/> */}
      </Routes>
      
     </BrowserRouter>
    </div>
  );
}


//goi va render qua index.html de chay bai
//file index khong can phai import ma chi can goi ten component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


