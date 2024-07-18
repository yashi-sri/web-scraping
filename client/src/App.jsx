import { useEffect } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";

import routes from "./routes";

import "./App.css";
import Header from "./components/header/header";

function App() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      return (
        <Route path={route.route} element={route.component} key={route.key} />
      );
    });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname, id]);
  return (
    <>
      <div className="flex flex-col bg-gray-100">
        <Header />
        <Routes>{getRoutes(routes())}</Routes>
      </div>
    </>
  );
}

export default App;
