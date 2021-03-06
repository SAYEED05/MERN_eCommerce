import axios from "axios";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_LIST_BY_CATEGORY_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_FAIL,
  PRODUCTS_ORDER_BY_PRICE,
} from "../constants/productConstants";

//LIST ALL PRODUCTS

export const listProducts = (keyword = "", pageNumber = "") => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );

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

//LIST PRODUCT BY CATEGORY

export const listProductByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/products/category/${category}`);

    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//LIST PRODUCT BY BRAND

export const listProductByBrand = (brand) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/products/brand/${brand}`);

    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//LIST DETAILS OF A SINGLE PRODUCT

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//DELETE A PRODUCT

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//CREATE A PRODUCT

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/`, {}, config);

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

//UPDATE PRODUCT

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
    });

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
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

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
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

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sortProducts = (products, sort) => (dispatch) => {
  const items = products.slice();
  if (sort !== "") {
    if (sort === "lowestprice") {
      items.sort((a, b) =>
        sort === "lowestprice"
          ? a.price > b.price
            ? 1
            : -1
          : a.price < b.price
          ? 1
          : -1
      );
    } else if (sort === "highestprice") {
      items.sort((a, b) =>
        sort === "highestprice"
          ? a.price < b.price
            ? 1
            : -1
          : a.price > b.price
          ? 1
          : -1
      );
    } else if (sort === "toprated") {
      items.sort((a, b) =>
        sort === "toprated"
          ? a.rating < b.rating
            ? 1
            : -1
          : a.rating > b.rating
          ? 1
          : -1
      );
    } else if (sort === "popularity") {
      items.sort((a, b) =>
        sort === "popularity"
          ? a.numReviews < b.numReviews
            ? 1
            : -1
          : a.numReviews > b.numReviews
          ? 1
          : -1
      );
    }
  } else {
    items.sort((a, b) => (a._id > b._id ? 1 : -1));
  }

  dispatch({
    type: PRODUCTS_ORDER_BY_PRICE,
    payload: {
      products: items,
      sort: sort,
    },
  });
};

/* export const sortProducts = (products, sort) => (dispatch) => {
  const items = products.slice();
  if (sort !== "") {
    items.sort((a, b) =>
      sort === "lowestprice"
        ? a.price > b.price
          ? 1
          : -1
        : a.price < b.price
        ? 1
        : -1
    );
  } else {
    items.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  dispatch({
    type: PRODUCTS_ORDER_BY_PRICE,
    payload: {
      products: items,
      sort: sort,
    },
  });
};
 */
