import axios from "axios";

const menusBaseUrl =
  "https://naija-food-super-basket-backend-api.vercel.app/api/v1/orders";

const axios_instance = axios.create({
  withCredentials: true,
  baseURL: menusBaseUrl,
});

export async function place_order() {
  try {
    const res = await axios_instance({
      method: "get",
      url: `/paystack_check-session`,
    });

    console.log("paystack_check-session", res);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function get_all_orders_fe(params) {
  try {
    const res = await axios_instance({
      method: "get",
      url: `/`,
      params,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function get_specific_order_fe(order_id) {
  try {
    const res = await axios_instance({
      method: "get",
      url: `/${order_id}`,
    });

    console.log("get_specific_order_fe", res);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function accept_order_fe(order_id) {
  try {
    const res = await axios_instance({
      method: "post",
      url: `/${order_id}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function reject_order_fe(order_id) {
  try {
    const res = await axios_instance({
      method: "put",
      url: `/${order_id}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function update_order_fe(order_id, data) {
  try {
    const res = await axios_instance({
      method: "patch",
      data,
      url: `/${order_id}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}
