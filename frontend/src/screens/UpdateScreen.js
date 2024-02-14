import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate,useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
  const UpdateScreen = (props) => {
 
    const params = useParams(); // /product/:id
    const { id: productId } = params;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const navigate = useNavigate();
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
    const handleUpdateProduct = async (e) => {
      e.preventDefault();
      try {
        dispatch({ type: 'UPDATE_REQUEST' });
        await axios.put(
          `/api/products/category`,
          {
            name:name,
            price:price,
            category:category,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({
          type: 'UPDATE_SUCCESS',
        });
        toast.success('Product updated successfully');
        navigate('/admin/products');
      } catch (err) {
        toast.error(getError(err));
        dispatch({ type: 'UPDATE_FAIL' });
      }
    };
    return (
      <div>
        <h1>Update Product by Category</h1>
        <form onSubmit={handleUpdateProduct}>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="productPrice">Product Price:</label>
            <input
              type="text"
              id="productPrice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="productCategory">Product Category:</label>
            <input
              type="text"
              id="productCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button type="submit">Update Product</button>
        </form>
      </div>
    );
  };
  
  export default UpdateScreen;