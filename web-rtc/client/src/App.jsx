import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { SocketProvider } from "./providers/Socket";

const App = () => {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<div>Room Page</div>} />
      </Routes>
    </SocketProvider>
  );
};

export default App;
