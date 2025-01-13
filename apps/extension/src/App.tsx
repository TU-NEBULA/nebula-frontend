import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import Agreement from "./pages/agreement";
import BadRequest from "./pages/bad-request";
import Bookmark from "./pages/bookmark";
import CreateBookmark from "./pages/create-bookmark";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/create-bookmark" element={<CreateBookmark />} />
          <Route path="/bad-request" element={<BadRequest />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
