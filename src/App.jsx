// import styled from "styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyles";
// import MaxWidthCenter from "./ui/MaxWidthCenter";
// import HeaderNav from "./components/HeaderNav";
// import { MantineProvider } from "@mantine/core";
// import "@mantine/core/styles.css";
import { AppLayout } from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import Restaurants from "./pages/Restaurants";
import Signup from "./components/Auths/Signup";
import Login from "./components/Auths/Login";
import Error from "./components/Error";
import { Toaster } from "react-hot-toast";
import Order from "./pages/Order";
import Carts from "./pages/Carts";
import Restaurant from "./pages/Restaurant";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={<Navigate to="/dashboard" replace={true} />}
            ></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/restaurants" element={<Restaurants />}></Route>
            <Route path="/restaurant" element={<Restaurant />}></Route>
            <Route path="/orders" element={<Order />}></Route>
            <Route path="/carts" element={<Carts />}></Route>
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
