import { useEffect, useState } from "react";
import { useSocket } from "../providers/Socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleRoomJoined = (data) => {
    navigate(`/room/${data.roomId}`);
  };

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
  }, [socket]);

  const handleJoinRoom = () => {
    socket.emit("join-room", { emailId: email, roomId });
  };

  return (
    <div className="homepage-container">
      <div className="input-container">
        <input
          type="email"
          placeholder="Enter your email here..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Room Code..."
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Enter Room</button>
      </div>
    </div>
  );
};

export default Home;
