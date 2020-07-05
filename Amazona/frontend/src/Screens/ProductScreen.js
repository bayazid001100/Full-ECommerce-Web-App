import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {
    const[qty, setQty] = useState();
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);

  const handleAddToCart = () =>{
      props.history.push("/cart/" + props.match.params.id + "?qty=" +qty);
  }

    return (
    <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        {
        loading? <div>Loading.....</div>:
        error? <div>{error}</div>:
        (
            product !== undefined ?
            <div className="details">
            <div className="details-image">
            <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
            <ul>
                <li>
                <h4>{product.name}</h4>
                </li>
                <li>
                    {product.rating} Stars ({product.numReviws} Reviews)
                </li>
                <li>
                    Price: <b>${product.price}</b>
                </li>
                <li>
                    Description:
                    <div>{product.description}</div>
                </li>
            </ul>
            </div>
            <div className= "details-action">
                <ul>
                    <li>
                        Price: <b>${product.price}</b>
                    </li>
                    <li>
                        Status: {product.countIntStock > 0? "In Stock": "Out Of Stock"}
                    </li>
                    <li>
                        Qty: <select value = {qty} onChange={(e) =>{setQty(e.target.value)}}>
                            {[...Array(product.countIntStock).keys()].map(x=>
                                <option key={x+1} value={x+1}>{x+1}</option>)}
                        </select>
                    </li>
                    <li>
                        {product.countIntStock > 0 &&
                        <button onClick= {handleAddToCart}className="button primary">Add to Cart </button>}
                    </li>
                </ul>
            </div>
        </div>
        : null
        )
    }
    </div>
    )
}

export default ProductScreen;
