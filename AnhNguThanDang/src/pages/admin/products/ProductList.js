import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export function ProductList() {
  const navigate = useNavigate();
  //tao 1 mang rong state ten la products 
  //truy cap vao danh sach san pham -> neu sever phan hoi ok thi chuyen doi du lieu thanh 
  //json va cap  hat state bang septproducts(data);

  // trong react dung de viet 1 t
  //{{}} dung de viet javascript nhu <php ?> vay
  //?_sort=views&_order=asc sap xep theo view tang dan
  const [products, setProducts,] = useState([])

  function getPrducts() {
    //phuong thuc get
    fetch("http://localhost:4000/products?_sort=id&_order=desc")
      .then(reponse => {
        if (reponse.ok) {
          return reponse.json();
        }

        throw new Error()
      })
      .then(data => {
        setProducts(data)
      })
      .catch(error => {
        alert("unable to get the data")
      })
  }

  function deleteProduct(id) {
    fetch("http://localhost:4000/products/" + id, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          getPrducts();
        }
      })
  }

  //cap nhat lai khi them xoa sua
  useEffect(getPrducts, []);
  return (
    <div class="container p-2">
      <h2 class="text-center" mb-4>Products</h2>
      <div class="row mb-3">
        <div class="col">
          <Link to="/admin/products/create" type="button" class="btn btn-danger">Add Product</Link>

        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td><img style={{ width: "50px", height: '50px' }} className="img-fluid" src={"http://localhost:4000/images/" + product.imageFilename} /></td>
                <td>
                  <Link to={`/admin/products/edit/${product.id}`} className="btn btn-primary">Edit</Link>

                  <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}