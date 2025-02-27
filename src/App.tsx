import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Circle } from "./components/common/Preloaders/Circle/Circle";
import { AppDispatchType } from "./redux/store";
import { getMeTC, setAppAuthAC } from "./redux/appReducer";
import { displayMode } from "./redux/AppContants";

//@ts-ignore
const Login = React.lazy(() => import("./components/Login/Login"));
const Main = React.lazy(() => import("./components/Main/Main"));

function App() {
  const dispatch = useDispatch<AppDispatchType>();

  // const navigate = useNavigate(); // Use useNavigate for navigation
  const token = localStorage.getItem("token");

  useEffect(() => {
    const isAuthenticated = !!token; // Проверяем наличие токена
    dispatch(setAppAuthAC(isAuthenticated));
  }, [dispatch, token]);

  // useEffect(() => {
  //   dispatch(getMeTC());
  // }, [dispatch]);

  return (
    <Routes>
      <Route
        element={
          <Suspense fallback={<Circle />}>
            <Login />
          </Suspense>
        }
        path="/"
      />
      <Route element={<Main mode={displayMode.profile} />} path="/profile">
        <Route element={<Main mode={displayMode.profile} />} path=":id" />
      </Route>
      <Route element={<Main mode={displayMode.messages} />} path="/messages" />
      <Route element={<Main mode={displayMode.users} />} path="/users" />
      <Route element={<Main mode={displayMode.home} />} path="/home" />
      <Route element={<Main mode={displayMode.settings} />} path="/settings" />
      <Route element={<div>Not Found</div>} path="*" />
    </Routes>
  );
}

export default App;
