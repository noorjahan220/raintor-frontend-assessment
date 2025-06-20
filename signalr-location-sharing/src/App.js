import UserASender from "./UserASender";
import UserBReceiver from "./UserBReceiver";
import "./index.css";

function App() {
  return (
    <div className="container">
      <h1>📍 Real-Time Location Sharing</h1>
      <div className="grid">
        <UserASender />
        <UserBReceiver />
      </div>
    </div>
  );
}

export default App;
