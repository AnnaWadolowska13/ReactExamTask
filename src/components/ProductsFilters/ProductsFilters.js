import React, { useState } from "react";
import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { REDUCER_NAME } from "../../common/consts/const";

function ProductsFilters() {
  const dispatch = useDispatch();

  const [isFood, setIsFood] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const handleSearchWordChange = (e) => {
    setSearchWord(e.target.value);
  }

  useEffect(() => {
    dispatch({
      type: REDUCER_NAME.SET_FILTERED_PRODUCT_LIST,
      value: {
        isFood,
        searchWord
    }})
  }, [isFood, searchWord, dispatch])


  return (
    <div className={styles.filtersHeaderWrapper}>
      <Typography variant="h4">Filtruj produkty: </Typography>
      <FormGroup>
        <div className={styles.filtersForm}>
          <FormControlLabel
            control={
              <TextField
                margin="dense"
                label="Nazwa"
                variant="outlined"
                value={searchWord}
                onChange={handleSearchWordChange}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox checked={isFood} onClick={() => setIsFood(!isFood) } />}
            label="Tylko produkty spożywcze"
          />
        </div>
      </FormGroup>
    </div>
  );
}

export default ProductsFilters;
