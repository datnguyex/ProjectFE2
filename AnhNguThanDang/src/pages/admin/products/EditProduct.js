import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";

export function EditProduct() {


    const params = useParams();
 
    const [initialData,setInitialData] = useState([])
    
    const navigate = useNavigate();

    function getProduct() {
        fetch("http://localhost:4000/products/" + params.id)
        .then(reponse => {
            if(reponse.ok) {
              return reponse.json();
            } throw new Error()
        })
        .then(data => {
            setInitialData(data)
         })
    }

    useEffect(getProduct,[]);
    async function HandleSubmit(event) {
      //ngan chan form tu gui di va tai lai trang
        event.preventDefault();

        const formData = new FormData(event.target)
        const product = Object.fromEntries(formData.entries())
        //chuyen doi doi tuong thanh doi tuong javascript de so sanh ""


        //post de tao du lieu moi
        //patch de cap nhat du lieu
      
        alert("Success")
        const reponse = await fetch("http://localhost:4000/products/"+params.id,{
            method: "PATCH",
            body: formData,

        });
        // gui bieu mau

        const data = await reponse.json();
        if(reponse.ok) {
            navigate("/admin/Products");
            //neu them thanh cong thi tra ve dia chi cua route
        }
    }

    return (
        
      <div class="container">
          <div class="mb-3 col-sm-8 mx-auto">
        <label  class="form-label">ID</label>
        <input readOnly class="form-control-plantext"  defaultValue={params.id}/>
      </div>

      {
        //co cung dc khong co cung dc
        initialData &&
        <form onSubmit={HandleSubmit} >
        <h2 class="mb-3 col-sm-8 mx-auto">Edit Product</h2>

    <div class="mb-3 col-sm-8 mx-auto">
      <label class="form-label">Name</label>
      <input defaultValue={initialData.name} name="name" type="text" class="form-control" />
    </div>

    <div class="mb-3 col-sm-8 mx-auto">
      <label class="form-label">Branch</label>
      <input defaultValue={initialData.brand} name="brand" type="text" class="form-control" />
    </div>

            <select name="category" class="form-select form-select" aria-label="Small select example">
            <option selected>Open this select menu</option>
            <option value="phone">Phone</option>
            <option value="laptop">Laptop</option>
            <option value="playstation">Play Station</option>
            </select>


    <div class="mb-3 col-sm-8 mx-auto">
      <label class="form-label">Price</label>
      <input defaultValue={initialData.price} name="price" type="text" class="form-control"/>
    </div>


    <div class="mb-3 col-sm-8 mx-auto">
      <label  class="form-label">Description</label>
      <input defaultValue={initialData.description} name="description" type="text" class="form-control" />
    </div>

    <div class="mb-3 col-sm-8 mx-auto">
      <label for="image" class="form-label">Images</label>
      <input type="file" class="form-control"/>
      <img style={{ width: "50px", height: '50px' }} className="img-fluid" src={"http://localhost:4000/images/" + initialData.imageFilename} />
    </div>

    <div class="mb-3 col-sm-8 mx-auto">
    <label  class="form-label">CreatAt</label>
    <input readOnly name="createAt" class="form-control-plantext" defaultValue={initialData.createdAt}/>
  </div>


    <button type="submit" class="btn btn-primary">Submit</button>

  </form>  
      }
      </div>
    );
}