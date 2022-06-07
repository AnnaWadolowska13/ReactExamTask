import { REDUCER_NAME } from "../../common/consts/const";
import { initialShopingListState } from "./initialState";

export const shopingListReducer = (state = initialShopingListState, action) => {
  switch (action.type) {
    case REDUCER_NAME.SET_SHOPING_LIST:
      return { ...state, shopingList: action.value };
    case REDUCER_NAME.SET_ERROR_MESSAGE_SHOPING_LIST:
      return { ...state, errorShopingList: action.value }
    case REDUCER_NAME.SET_LOADING_SHOPING_LIST:
      return {...state, loadingShopingList: action.value}
    default:
      return state;
  }
};
