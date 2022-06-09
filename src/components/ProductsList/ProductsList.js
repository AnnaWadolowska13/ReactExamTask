import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { REDUCER_NAME } from "../../common/consts/const";
import { useNavigate } from "react-router-dom";
import "./ProductsList.css"

function ProductsList() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let productsList = useSelector((data) => data.products.filteredProductsList);
  let errorMessage = useSelector((data) => data.products.errorProducsList);
  const productsRef = useRef(null);

  const handlerClickAddProduct = async (product) => {
    try {
      dispatch({ type: REDUCER_NAME.SET_LOADING_SHOPING_LIST, value: true})
      await axios.post("http://localhost:9000/products/shopingList/new", { ...product });
      let shopingListData = await axios.get("http://localhost:9000/products/shopingList");
      dispatch({ type: REDUCER_NAME.SET_SHOPING_LIST, value: shopingListData.data });
      dispatch({ type: REDUCER_NAME.SET_LOADING_SHOPING_LIST, value: false });

    } catch (error) {
      dispatch({type: REDUCER_NAME.SET_ERROR_MESSAGE_SHOPING_LIST, value: error})
    }
  }

  const handleKeyDown = event => {
    switch (event.key){
      case "ArrowDown":
        if(event.target.nextSibling) event.target.nextSibling.focus();
        break;
      case "ArrowUp":
        if(event.target.previousSibling) event.target.previousSibling.focus();
        break;
      case "d":
        navigate(`../productDetails/${event.target.id}`);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (productsList.length > 0) productsRef.current.children[0].focus();
    
  },[productsList] )

  if (errorMessage) {
    return <div> {errorMessage} </div>
  }
  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {productsList.length === 0 && <div> Products List is empty</div>}
        <div ref={productsRef}>
          {productsList.map(product => (
            <div tabIndex={0} key={product.id} onClick={() => handlerClickAddProduct(product)} onKeyDown={handleKeyDown} id={product.id} onContextMenu={() => navigate(`../productDetails/${product.id}`)}> {product.name} </div>
          ))}          
        </div>

        {/* Poniżej znajduje się ostylowany aktywny produkt do zadania 5 */}
        {/* <span
          style={{
            backgroundColor: "white",
            border: "1px black solid",
            borderRadius: "16px",
            padding: "6px",
          }}
        >
          Przykładowy aktywny produkt
        </span> */}
      </header>
    </div>
  );
}

export default ProductsList;
