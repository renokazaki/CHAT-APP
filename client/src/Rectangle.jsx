import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("https://chat-app-5y9l.onrender.com");
const Rectagle = () => {
  const [touchedIndices, setTouchedIndices] = useState(Array(9).fill(null));
  const [currentUser, setCurrentUser] = useState("user1");

  useEffect(() => {
    socket.on("value", (newTouchedIndices) => {
      setTouchedIndices(newTouchedIndices);
    });

    socket.on("user", (user) => {
      setCurrentUser(user);
    });

    socket.on("reset", (user) => {
      setTouchedIndices(Array(9).fill(null));
      setCurrentUser(user);
    });
  }, [socket]);

  const handleTouch = (index, currentUser) => {
    if (touchedIndices[index] === null) {
      const newTouchedIndices = [...touchedIndices];
      newTouchedIndices[index] = currentUser === "user1" ? "〇" : "✕";
      setTouchedIndices(newTouchedIndices);
      setCurrentUser(currentUser === "user1" ? "user2" : "user1");
      socket.emit("value", newTouchedIndices);
      socket.emit("user", currentUser === "user1" ? "user2" : "user1");
    }
  };

  const handleReset = (e) => {
    const resetIndices = Array(9).fill(null);
    setTouchedIndices(resetIndices);
    setCurrentUser("user1");
    socket.emit("reset", "user1");
  };

  const rectangle = (index) => {
    return (
      <div key={index}>
        <div
          className="rectangle"
          onClick={() => handleTouch(index, currentUser)}
        >
          {touchedIndices[index] && (
            <div className="circle">
              <div className="circleText">{touchedIndices[index]}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="con">
      <div className="container">
        {[...Array(9)].map((_, index) => rectangle(index))}
        <p>現在のプレイヤー : {currentUser}</p>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
};
export default Rectagle;
