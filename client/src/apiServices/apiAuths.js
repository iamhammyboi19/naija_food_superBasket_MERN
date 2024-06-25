import axios from "axios";

const usersBaseUrl = "/api/v1/users";
const menusBaseUrl = "/api/v1/menus";

export async function signupUser(data) {
  try {
    const res = await axios({
      method: "post",
      url: `${usersBaseUrl}/signup`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function loginUser(data) {
  try {
    const res = await axios({
      method: "post",
      url: `${usersBaseUrl}/login`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function logoutUser(data) {
  try {
    const res = await axios({
      method: "delete",
      url: `${usersBaseUrl}/logout`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function get_current_user_from_cookie() {
  try {
    const res = await axios({
      method: "get",
      url: `${usersBaseUrl}/authuser`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function forgot_password(data) {
  try {
    const res = await axios({
      method: "post",
      url: `${usersBaseUrl}/forgot_password`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function verify_email_signup_token(token) {
  try {
    const res = await axios({
      method: "get",
      url: `${usersBaseUrl}/signup/${token}`,
    });

    // console.log("res", res);
    // console.log("token", token);

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    console.log("err", err);
    throw new Error(String(err.response.data.message));
  }
}

export async function verify_email_reset_password_token(token, data) {
  try {
    const res = await axios({
      method: "patch",
      url: `${usersBaseUrl}/reset_password/:${token}`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
  // console.log(token, data);
}

export async function get_all_restaurants(query_str) {
  try {
    const res = await (query_str.length > 0
      ? axios({
          method: "get",
          url: `${usersBaseUrl}/restaurants?restaurant_name=${query_str}`,
        })
      : axios({
          method: "get",
          url: `${usersBaseUrl}/restaurants`,
        }));

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function get_specific_restaurant(restaurant_id) {
  try {
    const res = await axios({
      method: "get",
      url: `${usersBaseUrl}/restaurants/${restaurant_id}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

// menus related api requests
export async function get_specific_restaurant_menus(restaurant_id) {
  try {
    const res = await axios({
      method: "get",
      url: `${menusBaseUrl}/restaurant/:${restaurant_id}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function add_user_address(data) {
  try {
    const res = await axios({
      method: "post",
      url: `${usersBaseUrl}/location`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function update_user_address(data, location_id) {
  try {
    const res = await axios({
      method: "patch",
      url: `${usersBaseUrl}/location/${location_id}`,
      data,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function delete_user_address(location_id) {
  try {
    const res = await axios({
      method: "delete",
      url: `${usersBaseUrl}/location/${location_id}`,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}

export async function update_user_account(data) {
  try {
    const res = await axios({
      method: "patch",
      url: `${usersBaseUrl}/update_me`,
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

//

export async function update_password(data) {
  try {
    const res = await axios({
      method: "patch",
      url: `${usersBaseUrl}/update_password`,
      data,
      // headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    throw new Error(String(err.response.data.message));
  }
}
