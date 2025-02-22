import React from "react";
import Navbar from "../../Frontend/src/components/Navbar/Navbar";
import Footer from "../../Frontend/src/components/Footer/Footer"
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import Update from "./pages/Update/Update";
import UpdateItem from "./pages/UpdateItem.jsx/UpdateItem";
import Delete from "./pages/Delete/Delete";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/update' element={<Update url={url} />} />
          <Route path="/updateItem/:type/:id" element={<UpdateItem url={url} />} />
          <Route path='/delete' element={<Delete url={url} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
