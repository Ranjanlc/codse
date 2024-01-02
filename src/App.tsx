import { Navigate, Route, Routes } from "react-router-dom";
import CardList from "./pages/CardList/CardList";
import CardDetail from "./pages/CardDetail/CardDetail";
import CardStudy from "./pages/CardStudy/CardStudy";
import Navbar from "./UI/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="/list" element={<CardList />} />
        <Route path="/detail/:id" element={<CardDetail />} />
        <Route path="/study" element={<CardStudy />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
