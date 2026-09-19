import CreateListing from "./CreateListing.jsx";
import Register from "./Register.jsx";
import ListingDetails from "./ListingDetails.jsx";
import SwapRequests from "./SwapRequests.jsx";
import Login from "./Login.jsx";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./App.jsx";
import Browse from "./Browse.jsx";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES */}

        <Route path="/" element={<App />} />

        <Route path="/browse" element={<Browse />} />

        <Route
          path="/listing/:id"
          element={
            <ListingDetails
              token={localStorage.getItem("token")}
            />
          }
        />

<Route
  path="/login"
  element={
    <Login
      onLogin={(token) => {
        localStorage.setItem("token", token);
        window.location.href = "/";
      }}
    />
  }
/>
        <Route path="/register" element={<Register />} />


        {/* PROTECTED PAGES */}

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <div className="app">
                <CreateListing
                  token={localStorage.getItem("token")}
                />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/swaps"
          element={
            <ProtectedRoute>
              <SwapRequests
                token={localStorage.getItem("token")}
              />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;