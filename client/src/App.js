import "./App.css";
import { AuthContext } from "./components/AuthContext";
import { useContext } from "react";
import Header from "./components/Header";
import Inventory from "./components/Inventory";

function App() {
  const { status, user, userLoggingInfo } = useContext(AuthContext);
  return (
    <div className="App">
      <Header />
      <Inventory />
    </div>
  );
}

export default App;
