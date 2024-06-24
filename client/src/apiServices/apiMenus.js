import axios from "axios";

const menusBaseUrl = "/api/v1/menus";

const axios_instance = axios.create({
  withCredentials: true,
  baseURL: menusBaseUrl,
});

export async function create_menu(data) {
  try {
    const res = await axios_instance({
      method: "post",
      url: `/create_menu`,
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function update_menu(menu_id, data) {
  try {
    const res = await axios_instance({
      method: "patch",
      url: `/${menu_id}`,
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function delete_menu(menu_id) {
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

export async function get_specific_menu(menu_id) {
  try {
    const res = await axios_instance({
      method: "get",
      url: `/${menu_id}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

// TOPPINGS PART
export async function add_toppings(data, menu_id) {
  try {
    const res = await axios_instance({
      method: "post",
      url: `/add_toppings/${menu_id}`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function update_toppings(data, menu_id, toppings_slug) {
  try {
    const res = await axios_instance({
      method: "patch",
      url: `/toppings/${menu_id}/${toppings_slug}`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function delete_toppings(menu_id, toppings_slug) {
  try {
    const res = await axios_instance({
      method: "delete",
      url: `/toppings/${menu_id}/${toppings_slug}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function add_option(data, menu_id, toppings_slug) {
  try {
    const res = await axios_instance({
      method: "post",
      url: `/add_toppings_options/${menu_id}/${toppings_slug}`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function update_option(data, menu_id, toppings_slug, option_slug) {
  try {
    const res = await axios_instance({
      method: "patch",
      url: `/toppings_option/${menu_id}/${toppings_slug}/${option_slug}`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function delete_option(menu_id, toppings_slug, option_slug) {
  try {
    const res = await axios_instance({
      method: "delete",
      url: `/toppings_option/${menu_id}/${toppings_slug}/${option_slug}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}
