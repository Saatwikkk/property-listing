import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./pages/homePage/HomePage";
import SignUpPage from "./pages/signupPage/SignupPage";
import LoginPage from "./pages/loginPage/LoginPage";
import CustomNavbar from "./components/navbar/Navbar";
import PropertyList from "./pages/propertyList/PropertyList";
import PropertyDetail from "./pages/propertyDetails/PropertyDetails";
import BookingPage from "./pages/bookingPage/BookingPage";
import AdminPage from "./pages/adminPage/AdminPage";
import PaymentPage from "./pages/paymentPage/PaymentPage"
import Dashboard from './pages/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <CustomNavbar />
        <Dashboard />
      </div>
    ),
  },
  {
    path: "/home",
    element: (
      <div>
        <CustomNavbar />
        <HomePage />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <CustomNavbar />
        <SignUpPage />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <CustomNavbar />
        <LoginPage />
      </div>
    ),
  },
  {
    path: "/properties",
    element: (
      <div>
        <CustomNavbar />
        <PropertyList />
      </div>
    ),
  },
  {
    path: "/property/:id",
    element: (
      <div>
        <CustomNavbar />
        <PropertyDetail />
      </div>
    ),
  },
  {
    path: "/booking/:id",
    element: (
      <div>
        <BookingPage />
      </div>
    ),
  },
  {
    path: "/admin",
    element: (
      <div>
        <CustomNavbar />
        <AdminPage />
      </div>
    )
  },
  {
    path: "/payment/:id",
    element: (
      <div>
        <CustomNavbar />
        <PaymentPage />
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
