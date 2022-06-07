import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { REDUCER_NAME } from "../../common/consts/const";

function Header(props) {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(window.localStorage.getItem("user"));

  const loadStoreData = async () => {
    try {
      const storeData = await axios.get("http://localhost:9000/products");
      dispatch({type: REDUCER_NAME.SET_INITIAL_PRODUCTS_LIST, value: storeData.data})
      dispatch({type: REDUCER_NAME.SET_INITIAL_FILTERED_PRODUCT_LIST, value: storeData.data})
    } catch (error) {
      dispatch({ type: REDUCER_NAME.SET_ERROR_MESSAGE_PRODUCTS_LIST, value: error });
    }
  }

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
        <Typography sx={{ m: 2 }} variant="h5">
          Zalogowany:{" "}
          {`${currentUser.userfirstName} ${currentUser.userLastName}`}
        </Typography>
        <Button variant="contained" onClick={loadStoreData}>Załaduj produkty</Button>
        <Link to="/">
          <Button variant="contained" color="error">
            Wyloguj
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;