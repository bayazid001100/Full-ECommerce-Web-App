import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import Cookie from 'js-cookie';
import {productListReducer, productDetailsReducer} from './reducers/productReducers';
import thunk from 'redux-thunk';
import {cartReducer} from './reducers/cartReducers'


const cartItems = Cookie.getJSON("cartItems") || [];

const initialState={cart: {cartItems}};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;