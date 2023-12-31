import Login from "./component/Login";
import { Routes, Route } from "react-router-dom";
import Credentials from "./component/Credentials"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/catalog" element={<Credentials />}></Route>
    </Routes>
  );
}

export default App;
