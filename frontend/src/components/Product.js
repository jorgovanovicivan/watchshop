import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext, useState, useEffect,useReducer} from 'react';
import { Store } from '../Store';
import { Mutex } from 'async-mutex';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};
function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const [countInStock, setCountInStock] = useState(0);
  const handleCountInStockChange = (e) => {
    setCountInStock(e.target.value);
  };
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
  useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchCountInStock = async () => {
      const { data } = await axios.get(`/api/products/${product._id}`);
    
      setCountInStock(data.countInStock);
    };
    fetchCountInStock();
  }, [product._id]);
  
  const mutex =new Mutex();
  const addToCartHandler = async (item) => {
   
      await mutex.runExclusive(async () => { 
       const { data } = await axios.get(`/api/products/${item._id}`);
        const existItem = cartItems.find((x) => x._id === item._id);
        
         const quantity = existItem ? existItem.quantity + 1 : 1;
        setCountInStock(data.countInStock - quantity);
        if (data.countInStock <quantity ) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
ctxDispatch({
  type: 'CART_ADD_ITEM',
  payload: { ...item, quantity },
});     

      });
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;