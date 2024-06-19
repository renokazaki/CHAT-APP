import Rectagle from "./Rectangle";

const App = () => {
  return (
    <div>
      <Rectagle />
    </div>
  );
};
export default App;

//以下はチャットのソース
//動作確認済

// import "./App.css";
// import io from "socket.io-client";
// import { useState, useEffect } from "react";

// const socket = io.connect("https://chat-app-5y9l.onrender.com");
// const App = () => {
//   const [inputMessage, setInputMessage] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     socket.on("new_message", (data) => {
//       setMessage(data.message);
//     });
//   }, [socket]);

//   const handleChange = (e) => {
//     setInputMessage(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit("send_message", { message: inputMessage });
//     setInputMessage("");
//   };
//   return (
//     <div>
//       <h1>Chat App</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="inputMessage"
//           value={inputMessage}
//           onChange={handleChange}
//           placeholder="Enter Message"
//         />
//         <button type="submit">Send Message</button>
//       </form>

//       {message && <h2> {message} </h2>}
//     </div>
//   );
// };
// export default App;
