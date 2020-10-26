import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
  CART_ADD_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET_ITEM,
} from "../constants/types";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
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
    case CART_UPDATE_ITEM:
      const cartItem = action.payload;
      const newCartItems = state.cartItems.map((item) =>
        item.product_id === cartItem.product_id
          ? { ...cartItem, quantity: cartItem.quantity }
          : item
      );
      return {
        ...state,
        cartItems: newCartItems,
      };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product_id !== action.payload
        ),
      };
    case CART_ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_RESET_ITEM:
      return {
        cartItems: [],
        shippingAddress: {},
      };
    default:
      return state;
  }
};
