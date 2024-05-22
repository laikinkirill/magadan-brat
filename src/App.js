import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Tours from "./pages/Tours/Tours";
import Souvenir from "./pages/Souvenir/Souvenir";
import Main from "./pages/Main/Main";
import Error from "./pages/Error/Error";
import Freeride from "./pages/Freeride/Freeride";

import { JackLondonLake } from "./pages/JackLondonLake/JackLondonLake";

// Страница не будет загружаться пока на нее не перейти
// Чтобы пользователи не загружали лишний код
const AdminPageLazy = lazy(() => import('./pages/Admin/Admin'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Error />} />
        <Route path="tours" element={<Tours />} />
        <Route path="souvenir" element={<Souvenir />} />
        <Route path="freeride" element={<Freeride />} />
        <Route path="jack-london-lake" element={<JackLondonLake />} />
        <Route path="admin" element={
            <Suspense fallback={<span>Загрузка</span>} >
               <AdminPageLazy />
            </Suspense>
         } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
