import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home/Home"
import Navbar from './components/Navbar';
import GenerateImage from "./Image/GenerateImage"
import SubscriptionCards from './Home/SubscriptionCards';
import PaymentSuccess from "./Home/PaymentSuccess"
import Profile from './Profile/Profile';
function Success() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-500">Payment Successful!</h1>
    </div>
  );
}

function Failure() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-500">Payment Failed!</h1>
    </div>
  );
}
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generateImage" element={<GenerateImage />} />
        <Route path="/pricing" element={<SubscriptionCards />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<Failure />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;


