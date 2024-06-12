import axios from "axios";

const menusBaseUrl = "/api/v1/orders";

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
