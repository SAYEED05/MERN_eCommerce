import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_CASH_RECEIVED_REQUEST,
  ORDER_CASH_RECEIVED_SUCCESS,
  ORDER_CASH_RECEIVED_FAIL,
  ORDER_CASH_RECEIVED_RESET,
  ORDER_PACKED_REQUEST,
  ORDER_PACKED_SUCCESS,
  ORDER_PACKED_FAIL,
  ORDER_PACKED_RESET,
  ORDER_DISPATCHED_REQUEST,
  ORDER_DISPATCHED_SUCCESS,
  ORDER_DISPATCHED_FAIL,
  ORDER_DISPATCHED_RESET,
} from "../constants/orderConstants";

//CREATE ORDER
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//GET ORDER DETAILS
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

//CASH RECEIVED REDUCER

export const cashReceivedReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CASH_RECEIVED_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CASH_RECEIVED_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_CASH_RECEIVED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CASH_RECEIVED_RESET:
      return {};
    default:
      return state;
  }
};

//ORDER PACKED REDUCER

export const orderPackedReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PACKED_REQUEST:
      return {
        loading: true,
      };

    case ORDER_PACKED_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PACKED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PACKED_RESET:
      return {};
    default:
      return state;
  }
};

//ORDER DISPATCHED REDUCER

export const orderDispatchedReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DISPATCHED_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DISPATCHED_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_DISPATCHED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DISPATCHED_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };

    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };

    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
