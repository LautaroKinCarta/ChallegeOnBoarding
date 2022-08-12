import { configureStore, applyMiddleware, combineReducers, createStore, compose } from "@reduxjs/toolkit";
import productReducer from "./features/users/productSlice";
import { logger } from "redux-logger"
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
  products: productReducer,
});

// export const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(thunk))
// )

export default configureStore({
  reducer: {
    products: productReducer,
  }
})