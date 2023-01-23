import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navigation from "./app/navigation";
import { Search } from "./features/search/Search";
import { Show } from "./features/show/Show";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Search />} />
            <Route path="/show/:nasa_id" element={<Show />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
