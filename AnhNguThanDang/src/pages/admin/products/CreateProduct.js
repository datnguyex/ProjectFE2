import { Form, Link, useNavigate } from "react-router-dom";

export function CreateProduct() {

    const navigate = useNavigate();
    async function HandleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)
        const product = Object.fromEntries(formData.entries())
        //chuyen doi doi tuong thanh doi tuong javascript de so sanh ""


      
        alert("Success")
        const reponse = await fetch("http://localhost:4000/products?_sort=views&_order=asc",{
            method: "POST",
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
        <form onSubmit={HandleSubmit} class="container">
        <div class="mb-3 col-sm-8 mx-auto">
          <label for="Name" class="form-label">Name</label>
          <input name="name" type="text" class="form-control" id="Name"/>
        </div>

        <div class="mb-3 col-sm-8 mx-auto">
          <label for="Branch" class="form-label">Branch</label>
          <input name="brand" type="text" class="form-control" id="Branch"/>
        </div>

                <select name="category" class="form-select form-select" aria-label="Small select example">
                <option selected>Open this select menu</option>
                <option value="phone">Phone</option>
                <option value="laptop">Laptop</option>
                <option value="playstation">Play Station</option>
                </select>


        <div class="mb-3 col-sm-8 mx-auto">
          <label for="price" class="form-label">Price</label>
          <input name="price" type="text" class="form-control" id="price"/>
        </div>


        <div class="mb-3 col-sm-8 mx-auto">
          <label for="description" class="form-label">Description</label>
          <input name="description" type="text" class="form-control" id="description"/>
        </div>

        <div class="mb-3 col-sm-8 mx-auto">
          <label for="image" class="form-label">Images</label>
          <input name="imageFilename" type="file" class="form-control" id="image"/>
        </div>


        <button type="submit" class="btn btn-primary">Submit</button>

      </form>  
    );
}