import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { REDUCER_NAME } from "../../common/consts/const";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import CircularProgress from '@mui/material/CircularProgress';

function ShopingList() {
  const dispatch = useDispatch();
  let shopingList = useSelector((data) => data.shopingList.shopingList);
  let shopingListLoading = useSelector((data) => data.shopingList.loadingShopingList);
  let shopingListError = useSelector((data) => data.shopingList.errorShopingList);

  const handlerClickRemoveProduct = async (id) => {
    try {
      dispatch({ type: REDUCER_NAME.SET_LOADING_SHOPING_LIST, value: true})
      await axios.delete(`http://localhost:9000/products/shopingList/${id}`);
      let shopingListData = await axios.get("http://localhost:9000/products/shopingList");
      dispatch({ type: REDUCER_NAME.SET_SHOPING_LIST, value: shopingListData.data });
      dispatch({ type: REDUCER_NAME.SET_LOADING_SHOPING_LIST, value: false });
    } catch (error) {
      dispatch({type: REDUCER_NAME.SET_ERROR_MESSAGE_SHOPING_LIST, value: error})
    }
  }

  useEffect(() => {
    async function fetchShopingList() {
      try {
        dispatch({ type: REDUCER_NAME.SET_LOADING_SHOPING_LIST, value: true})
        let shopingListData = await axios.get("http://localhost:9000/products/shopingList");
        dispatch({ type: REDUCER_NAME.SET_LOADING_SHOPING_LIST, value: false})
        dispatch({type: REDUCER_NAME.SET_SHOPING_LIST, value: shopingListData.data})
      } catch (error) {
        dispatch({type: REDUCER_NAME.SET_ERROR_MESSAGE_SHOPING_LIST, value: error})
      }      
    }

    fetchShopingList();

  }, [dispatch])

  if (shopingListError) {
    return <div> {shopingListError} </div>
  }
  
  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shoping List</p>
        {shopingList.length === 0 && <div> Shoping list is empty </div>}
        {shopingList.map((product, index) => (
          <div key={index} onClick={() => handlerClickRemoveProduct(product.id)}> {product.name} </div>
        ))}
        {shopingListLoading && <CircularProgress />}
      </header>
    </div>
  );
}

export default ShopingList;
