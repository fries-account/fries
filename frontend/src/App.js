import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReviewDetails from './pages/ReviewDetails';
import HomeGuest from './pages/HomeGuest';
import ReviewDetailsGuest from './pages/ReviewDetailsGuest';
import Account from './pages/Account';
import ViewAccount from './pages/ViewAccount';
import HomeOwner from './pages/HomeOwner';
import ViewAccountGuest from './pages/ViewAccountGuest';
import EditAccount from './pages/EditAccount';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details" element={<ReviewDetails />} />
            <Route path="/details-guest" element={<ReviewDetailsGuest />} />
            <Route path="/home-guest" element={<HomeGuest />} />
            <Route path="/account" element={<Account />} />
            <Route path="/view-account" element={<ViewAccount />} />
            <Route path="/home-owner" element={<HomeOwner />} />
            <Route path="/view-account-guest" element={<ViewAccountGuest />} />
            <Route path="/edit-account" element={<EditAccount />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
