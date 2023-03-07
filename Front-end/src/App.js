import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Layout/Header";
import Home from "./Layout/Home";
import { createContext, useEffect, useReducer, useState } from "react";
import myReducer from "./Reducers/MyReducer";
import cookies from "react-cookies";
import FbLogin from "./Components/Facebook";
import Google from "./Components/Google";
import Bill from "./Components/Bill";
import TripList from "./pages/TripList";
import TourDetail from "./pages/TripDetail";
import Articals from "./pages/Garages";
import ArticalDetails from "./pages/GarageDetails";
import Booking1 from "./pages/Booking1";
import Booking2 from "./pages/Booking2";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Page404 from "./pages/Page404";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import LoginAdmin from "./pages/LoginAdmin";
import Admin from "./pages/Admin";
import AddArtical from "./pages/AddGarage";
import UpdateArtical from "./pages/UpdateGarage";
import TourDelete from "./pages/TripDelete";
import Booking3 from "./pages/Booking3";
import Routed from "./pages/Route";
import Bills from "./Components/Bills";
import MomoReturn from "./pages/MoMoReturn";
import ScrollToTop from "./Components/ScrollToTop";
import Footer2 from "./Layout/Footer";
import Login from './pages/Login';
import Register from './pages/Register';

export const UserContext = createContext();

function App() {
  const [user, dispatch] = useReducer(myReducer, cookies.load("current_user"));

  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, dispatch]}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/route-list/" element={<TripList />} />
          <Route exact path="/routed/" element={<Routed />} />
          <Route
            exact
            path="/route-detail/:routerId/"
            element={<TourDetail />}
          />
          <Route
            exact
            path="/route-detail/:routerId/booking-1"
            element={<Booking1 />}
          />
          <Route
            exact
            path="/route-detail/:routerId/booking-2"
            element={<Booking2 />}
          />
          <Route exact path="/route-detail/booking-3" element={<Booking3 />} />
          <Route path="*" element={<Page404 />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about-us" element={<About />} />
          <Route path="/fblogin/" element={<FbLogin />} />
          <Route path="/google/" element={<Google />} />
          <Route path="/bill/:userId" element={<Bill />} />
          <Route exact path="/change-password" element={<ChangePassword />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/garage" element={<Articals />} />
          <Route
            exact
            path="/bus-details/:busId"
            element={<ArticalDetails />}
          />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addArtical" element={<AddArtical />} />
          <Route
            path="/articals/:articalId/update"
            element={<UpdateArtical />}
          />
          <Route path="/deleteTour" element={<TourDelete />} />
          <Route path="/MomoReturn" element={<MomoReturn />} />
          <Route path="/bills" element={<Bills />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
        <ScrollToTop />
        <Footer2 />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
