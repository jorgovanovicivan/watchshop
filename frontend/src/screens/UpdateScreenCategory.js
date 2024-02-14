import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateScreenCategory = (props) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch the product details for the given ID from the API and populate the form fields
    axios.get(`/api/products/${props.match.params.id}`).then((response) => {
      const { name, category, price, description } = response.data;
      setName(name);
      setCategory(category);
      setPrice(price);
      setDescription(description);
    });
  }, [props.match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a PUT request to the API to update the product details
    axios.put(`/api/products/category/${props.match.params.category}`, {
      name,
      category,
      price,
      description,
    }).then(() => {
      // Redirect the user to the product list screen
      props.history.push('/products');
    });
  };

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateScreenCategory;
