import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://35.170.200.125:8000/';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post(`${API_BASE_URL}/products`, newProduct);
      await fetchProducts()
      setNewProduct({ name: '', price: 0 });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct({ ...newProduct, name: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <button onClick={addProduct}>Add</button>
    </div>
  );
}

export default App;
