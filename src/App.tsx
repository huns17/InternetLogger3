import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import MessageLogEn from "./pages/MessageLogEn";
import SignIn from "./pages/SignIn";
import ChangePassword from "./pages/ChangePassword";
import ChangeUserName from "./pages/ChangeUserName";
import InitialPage from "./pages/InitialPage";
// import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { usersActions } from "./store/userSlice";
import { CssBaseline } from "@material-ui/core";

function App() {
  const reduxIsLoggedIn: boolean = useAppSelector((state) => state.isLoggedIn);
  const reduxUser: string = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const storedToken: string = localStorage.getItem("token") as string;
  const storedIsLoggedIn: boolean =
    localStorage.getItem("isLoggedIn")!?.toLowerCase() === "true";
  const storedUser: string = localStorage.getItem("user") as string;

  useEffect(() => {
    if (storedIsLoggedIn) {
      dispatch(usersActions.updateIdToken(storedToken));
      dispatch(usersActions.updateUser(storedUser));
      dispatch(usersActions.updateIsLoggedIn(storedIsLoggedIn));
    }
  }, [storedToken, storedIsLoggedIn, storedUser, dispatch]);

  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          {reduxIsLoggedIn ? (
            <Route path="*" element={<Navigate to="/initialpage" />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          {!reduxIsLoggedIn && (
            <Route path="/login" element={<Login></Login>} />
          )}
          {reduxIsLoggedIn && (
            <Route path="/initialpage" element={<InitialPage></InitialPage>} />
          )}
          {!reduxIsLoggedIn && (
            <Route path="/signin" element={<SignIn></SignIn>} />
          )}
          {reduxIsLoggedIn && (
            <Route path="/msglog" element={<MessageLogEn></MessageLogEn>} />
          )}

          {reduxIsLoggedIn && (
            <Route
              path="/updateusername"
              element={<ChangeUserName></ChangeUserName>}
            />
          )}
          {reduxIsLoggedIn && (
            <Route
              path="/changepassword"
              element={<ChangePassword></ChangePassword>}
            />
          )}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
