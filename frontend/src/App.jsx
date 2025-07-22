import { useRef, useState, useEffect } from "react";

import Register from "./Register";
import Login from "./Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="App">
        {/* <Register /> */}
        <Login />
      </main>
    </>
  );
}

export default App;
