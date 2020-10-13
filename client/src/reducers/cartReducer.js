import { CART_ADD_ITEM } from "../constants/types";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item.product_id === newItem.product_id
      );
      if (existItem) {
        const newCartItems = state.cartItems.map((item) =>
          item.product_id === newItem.product_id
            ? { ...newItem, quantity: item.quantity + newItem.quantity }
            : item
        );
        return {
          ...state,
          cartItems: newCartItems,
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };
    default:
      return state;
  }
};
