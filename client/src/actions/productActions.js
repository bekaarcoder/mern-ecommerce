import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_REMOVE_FAIL,
  PRODUCT_REMOVE_REQUEST,
  PRODUCT_REMOVE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
} from "../constants/types";
import axios from "axios";

export const listProducts = (keyword = "") => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/products?keyword=${keyword}`);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/products", product, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST,
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REMOVE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_REMOVE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview = (id, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${id}/reviews`, review, config);

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
