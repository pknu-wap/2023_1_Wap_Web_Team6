import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fireStore } from "./Firebase";
import { useEffect } from "react";
// import Main from "./pages/Main";
// import Login from "./pages/Login";
// import Join from "./pages/Join";

function App() {
  useEffect(() => {
    console.log(fireStore);
  });
  return (<div>
  </div>);
}

export default App;
