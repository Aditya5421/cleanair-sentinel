import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";

import Footer from "./components/Footer";


export default function App() {

  return (

    <>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/report" element={<Report />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/map" element={<Map />} />

      </Routes>


      <Footer />

    </>

  );

}