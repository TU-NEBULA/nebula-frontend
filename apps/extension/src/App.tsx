import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
