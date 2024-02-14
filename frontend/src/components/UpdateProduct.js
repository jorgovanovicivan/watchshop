import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProduct = (props) => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    // Fetch the product details using the product ID from the URL params
    axios.get(`/api/products/${props.match.params.id}`)
      .then((response) => {
        // Update the state with the product details
        setProduct(response.data);
      });
  }, [props.match.params.id]);

  const handleChange = (e) => {
    // Update the state with the new value
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a PUT request to the API to update the product details
    axios.put(`/api/products/${props.match.params.id}`, product)
      .then(() => {
        // Redirect the user to the product list screen
        props.history.push('/products');
      });
  };

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" value={product.category} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={product.description} onChange={handleChange} />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
