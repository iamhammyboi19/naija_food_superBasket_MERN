/* eslint-disable indent */
/* eslint-disable multiline-ternary */
module.exports = class ApiFeatures {
  // query -> Model.find()
  // url_query_strings -> {price: 100}
  constructor(query, url_query_strings) {
    this.query = query;
    this.url_query_strings = url_query_strings;
  }

  filter() {
    //
    const query_obj = { ...this.url_query_strings };
    // is it not possible to query with { sort: { $price : "asc" } }
    // it has to be Query.sort('field -test');
    const remove_queries = ["sort", "limit", "page", "fields"];
    remove_queries.forEach((el) => delete query_obj[el]);

    // replace {gte: 20} with {$gte: 30}
    let query_str = JSON.stringify(query_obj);
    query_str = query_str.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`
    );

    // take the req.query and convert the string val to regex
    // { restaurant_name: "Fake" }
    // { restaurant_name: /Fake/ }
    const query_str_keys = Object.keys(JSON.parse(query_str));
    const query_str_vals = Object.values(JSON.parse(query_str)).map((val) =>
      typeof val === "string" ? new RegExp(val) : val
    );

    const final_query = {};

    query_str_keys.forEach((key, i) => {
      final_query[key] = query_str_vals[i];
    });

    // console.log(final_query);

    this.query = this.query.find(final_query);
    return this;
  }

  sort() {
    if (this.url_query_strings.sort) {
      // make sort separated by comma eg ?sort=price,distance
      const sort_by = this.url_query_strings.sort.split(",").join(" ");
      this.query = this.query.sort(sort_by);
    } else {
      // restuarants list should be sort on default by location
      this.query = this.query.sort("_id");
    }
    return this;
  }

  limit_selected_fields() {
    //
    if (this.url_query_strings.fields) {
      const query_obj = { ...this.url_query_strings };
      // remove password as selected fields
      const select_fields = query_obj.fields
        .split(",")
        .filter((el) => el !== "+password")
        .filter((el) => el !== "password")
        .join(" ");

      this.query = this.query.select(select_fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    if (this.url_query_strings.page) {
      // 45 results 10 per page
      const { page } = this.url_query_strings || 1;
      const { limit } = this.url_query_strings || 10;
      const skip_page = (page - 1) * limit;
      this.query = this.query.skip(skip_page).limit(limit);
    }
    return this;
  }
};
