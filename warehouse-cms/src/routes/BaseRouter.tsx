import Login from "@/modules/Auth/Login";
import Home from "@/modules/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function BaseRouter() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default BaseRouter;
