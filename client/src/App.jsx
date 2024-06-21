import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyles";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Map from "./pages/Map";
import Menus from "./pages/Menus";
import Confirmation from "./pages/Confirmation";
import RequestEmail from "./pages/RequestEmail";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ConfirmToken from "./pages/ConfirmToken";
import Menu from "./pages/Menu";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import AllOrders from "./pages/AllOrders";
import Checkout from "./pages/Checkout";
// import LineTime from "./pages/LineTime";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to="/dashboard" replace={true} />}
              ></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/restaurants" element={<Restaurants />}></Route>
              <Route
                path="/restaurants/:restaurant_id"
                element={<Restaurant />}
              ></Route>
              <Route path="/menus" element={<Menus />}></Route>
              <Route path="/menus/:menu_id" element={<Menu />}></Route>
              <Route path="/orders" element={<Order />}></Route>
              <Route path="/carts" element={<Carts />}></Route>
              <Route path="/carts/checkout" element={<Checkout />}></Route>
              <Route path="/map" element={<Map />}></Route>
              <Route path="/account" element={<Account />}></Route>
              <Route path="/logout" element={<AllOrders />}></Route>
            </Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/confirmaccount" element={<Confirmation />}></Route>
            <Route
              path="/confirmtoken/:token"
              element={<ConfirmToken />}
            ></Route>
            <Route
              path="/requestemail"
              element={<RequestEmail reason="Request signup verification" />}
            ></Route>
            <Route
              path="/forgotpassword"
              element={<RequestEmail reason="Forgot password" />}
            ></Route>
            <Route
              path="/resetpassword/:token"
              element={<ResetPassword />}
            ></Route>

            <Route path="*" element={<Error />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
