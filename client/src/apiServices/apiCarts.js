import axios from "axios";

const cartsBaseUrl = "/api/v1/carts";

const axios_instance = axios.create({
  withCredentials: true,
  baseURL: cartsBaseUrl,
});

export async function add_to_cart(data, menu_id) {
  try {
    const res = await axios_instance({
      method: "post",
      url: `/${menu_id}`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function dec_menu_in_cart(menu_id) {
  try {
    const res = await axios_instance({
      method: "put",
      url: `/${menu_id}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function inc_menu_in_cart(menu_id) {
  try {
    const res = await axios_instance({
      method: "patch",
      url: `/${menu_id}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function remove_all_cart() {
  try {
    const res = await axios_instance({
      method: "delete",
      url: `/`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function remove_cart(menu_id) {
  try {
    const res = await axios_instance({
      method: "delete",
      url: `/${menu_id}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}
