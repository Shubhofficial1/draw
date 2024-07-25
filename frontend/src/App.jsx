import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { socketConnection } from "./socket/socketConnection";

const App = () => {
  useEffect(() => {
    socketConnection();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
