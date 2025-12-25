import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import UserDetail from "./pages/users/UserDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/:id" element={<UserDetail />} />
    </Routes>
  );
};

export default App;
