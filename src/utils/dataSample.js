const toppings = [
  {
    toppingsName: "The toppings name",
    numOfSelections: 1,
    compulsory: true,
    id: "thetoppingsId",
    category: "soft drinks",
    toppings_collections: [
      {
        name: "Pepsi",
        value: "Pepsi",
        price: 0,
        free: true,
      },
      {
        name: "Cocacola",
        value: "Cocacola",
        price: 0,
        free: true,
      },
      {
        name: "Fanta",
        value: "Fanta",
        price: 0,
        free: true,
      },
      {
        name: "Sprite",
        value: "Sprite",
        price: 0,
        free: true,
      },
    ],
  },
  {
    toppingsName: "The toppings name II",
    numOfSelections: 1,
    compulsory: false,
    id: "thetoppingsIIId",
    toppings_collections: [
      {
        name: "Kectup",
        value: "Kectup",
        price: 23,
        free: false,
      },
      {
        name: "Corn (Large Size)",
        value: "Corn (Large Size)",
        price: 11,
        free: false,
      },
      {
        name: "Chipotle Sauce",
        value: "Chipotle Sauce",
        price: 19,
        free: false,
      },
    ],
  },
];

export { toppings };

// userSchema
const user = {
  name: "Username",
  email: "user@example.com",
  location: [
    {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinate: {
        type: [Number],
        required: true,
      },
      street_name: "",
      building_name: "name",
      flat: "",
      door_number: "1002",
      floor: "second floor",
      company_name: "",
      phone_no: "",
    },
  ],
  phone_no: 123456789,
  password: "6uyeyydd7e6727tftey",
  password_reset_token: "string",
  password_reset_at: "date",
  cart: [],
  favorites: [],
  payment_method: "",
  confirm_phone_number: "bool",
  confirm_email_address: "bool",
  role: "user",
  profile_photo: "",
  confirm_company_name: "bool",
  company_address: "",
};

const order = {
  orderId: "yt3874",
  delivery_status: [""],
  estimated_arrival: "",
  createdAt: "time",
  user: "user name",
  phone_no: 123456789,
  email: "user@example.com",
  delivery_address: "",
  toppings: ["Pepsi", "kectup"],
  total_price: "amount + delivery",
  delivery_fee: 0,
  price: "amount",
  products: ["productids"],
};

/*
  restuarants owner can:
  setup an account 
  verify business email and phone number
  verfy business name 
  add a location and address
  have ratings
  create a menu add pictures to the menu
  delete a menu 
  update a menu
  create, update and delete extras or toppings to a specific menu
  confirmed_email
  confirmed_phone_number
  confirmed_business_name
  cannot order
  cannot rate 
  cannot add to cart
  */

/*
  users can:
  order a menu
  rate an ordered menu
  can't rate order after 1 week 
  must have an address
  must have a verified phone number
  must have a verified email address
  can add to cart
  */

// it would be a public api which can be accessed using api key
