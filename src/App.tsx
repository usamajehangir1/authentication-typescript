import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./user authentication/Login";
import Register from "./user authentication/Register";
import ForgotPassword from "./user authentication/ForgotPassword";
import Home from "./homepage/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./products/ProductDetails";
import AboutUsPage from "./aboutus/AboutUs";
import ContactUsForm from "./contactus/ContactUs";
import ResponsiveAppBar from "./homepage/components/Header";
import Footer from "./homepage/components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import SubscriptionPage from "./subsciption/SubsciptionPage";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/contactus" element={<ContactUsForm />} />
          <Route
            path="/subscription"
            element={<ProtectedRoute element={<SubscriptionPage />} />}
          />
          <Route path="/reset-password" element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
