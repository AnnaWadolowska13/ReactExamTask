import { REDUCER_NAME } from "../../common/consts/const";
import { initialProductState } from "./initialState";

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case REDUCER_NAME.SET_INITIAL_PRODUCTS_LIST:
      return { ...state, productsList: action.value };
    case REDUCER_NAME.SET_ERROR_MESSAGE_PRODUCTS_LIST:
      return { ...state, errorProducsList: action.value };
    case REDUCER_NAME.SET_INITIAL_FILTERED_PRODUCT_LIST:
      return { ...state, filteredProductsList: action.value };
    case REDUCER_NAME.SET_FILTERED_PRODUCT_LIST:
      let filteredList = state.productsList.filter((product) => product.name.toLowerCase().includes(action.value.searchWord.toLowerCase()))
      if (action.value.isFood) {
        filteredList = filteredList.filter((product) => product.isFood === action.value.isFood )
      }
      return { ...state, filteredProductsList: filteredList };
    default:
      return state;
  }
};
