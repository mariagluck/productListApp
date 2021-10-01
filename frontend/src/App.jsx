import { useState, useEffect } from 'react';
import "./style.css";

export default function App() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [products, setProducts] = useState([]);

    function getProducts () {
        const url = "http://localhost:3333/products";
        fetch(url)
            .then(response => response.json())
            .then(results => setProducts(results))
            .catch(error => console.log("Error fetching data", error));
    }; 
  
    useEffect(getProducts, []);
   

    function addProduct() {
       const product = { name, price };
       const url = "http://localhost:3333/products";
       const config = {
           method: 'POST',
           body: JSON.stringify(product),
           headers: {
            'Content-Type': 'application/json'
           }
           
       };
       
       fetch(url, config)
            .then(response => response.json())
            .then(result => {
                getProducts();
                setName("");
                setPrice(0);    
            })
            .catch(err => console.log("OH NO, ERROR", err))
    }

    function deleteProduct(product) {
        alert("deleting " + product.name);
        const url = "http://localhost:3333/products/" + product._id;
        const config = {
            method: 'DELETE'
        };

        fetch(url, config)
            .then(response => response.json())
            .then(result => {
                getProducts();
            })
            .catch(err => console.log("OH NO, ERROR", err))
    }

    return (
        <div className="form">
            <h1>Product List</h1>
            <ul>
                {products.map(product => 
                    <li>
                        Product: {product.name} Price: {product.price} Euros
                       
                    <button className="deleteBtn" onClick={()=> {deleteProduct(product)}}>delete</button>
                    </li>
                    )}
            </ul>
            
            <input 
               type="text" 
               value={name} 
               onChange={(e) => setName(e.target.value)} 
               placeholder="product name" /><br/>
            <input 
               type="number" 
               value={price} 
               onChange={(e) => setPrice(parseInt(e.target.value))} 
               placeholder="price" /><br/>
            <button onClick={addProduct}>
                Add a new product
            </button>
        </div>
    )
}