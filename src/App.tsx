import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./user authentication/Login";
import Register from "./user authentication/Register";
import ForgotPassword from "./user authentication/ForgotPassword";
import Home from "./homepage/Home";
import LoggedIn from "./user authentication/LoggedIn";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./products/ProductDetails";
import AboutUsPage from "./aboutus/AboutUs";
import ContactUsForm from "./contactus/ContactUs";
import SignupForm from "./user authentication/SignUp";
import ResponsiveAppBar from "./homepage/components/Header";
import Footer from "./homepage/components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import SubscriptionPage from "./subsciption/SubsciptionPage";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/contactus" element={<ContactUsForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route
            path="/loggedin"
            element={<ProtectedRoute element={<LoggedIn />} />}
          />
          <Route path="/reset-password" element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
