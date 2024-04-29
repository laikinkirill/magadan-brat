import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tours from "./components/pages/Tours/Tours";
import Souvenir from "./components/pages/Souvenir/Souvenir";
import Main from "./components/pages/Main/Main";
import Error from "./components/pages/Error/Error";
import Admin from "./components/pages/Admin/Admin";
import Freeride from "./components/pages/Freeride/Freeride";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Error />} />
        <Route path="tours" element={<Tours />} />
        <Route path="souvenir" element={<Souvenir />} />
        <Route path="freeride" element={<Freeride />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
