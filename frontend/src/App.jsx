import { useRef, useState, useEffect } from "react";
import Register from "./Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="App">
        <Register />
      </main>
    </>
  );
}

export default App;
