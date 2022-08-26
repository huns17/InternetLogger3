import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import MessageLogEn from "./pages/MessageLogEn";
import MessageLogKr from "./pages/MessageLogKr";
import SignIn from "./pages/SignIn";
import ChangePassword from "./pages/ChangePassword";
import HomePageEn from "./pages/HomePageEn";
import HomePageKr from "./pages/HomePageKr";
import ChangeUserName from "./pages/ChangeUserName";
import InitialPage from "./pages/InitialPage";
// import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { usersActions } from "./store/userSlice";

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
  }, [storedToken, storedIsLoggedIn, storedUser]);

  const isMsgEn = () => {
    if (
      (reduxIsLoggedIn && reduxUser === "Sarah") ||
      (reduxIsLoggedIn && reduxUser === "Hans")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isMsgKr = () => {
    if (
      (reduxIsLoggedIn && reduxUser === "은지") ||
      (reduxIsLoggedIn && reduxUser === "엄마") ||
      (reduxIsLoggedIn && reduxUser === "아빠") ||
      (reduxIsLoggedIn && reduxUser === "성재")
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Layout>
      <Routes>
        {reduxIsLoggedIn ? (
          <Route path="*" element={<Navigate to="/initialpage" />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        {!reduxIsLoggedIn && <Route path="/login" element={<Login></Login>} />}
        {reduxIsLoggedIn && (
          <Route path="/initialpage" element={<InitialPage></InitialPage>} />
        )}
        {!reduxIsLoggedIn && (
          <Route path="/signin" element={<SignIn></SignIn>} />
        )}
        {isMsgEn() && (
          <Route path="/msglogen" element={<MessageLogEn></MessageLogEn>} />
        )}
        {isMsgKr() && (
          <Route path="/msglogkr" element={<MessageLogKr></MessageLogKr>} />
        )}
        {isMsgEn() && (
          <Route path="/hompageen" element={<HomePageEn></HomePageEn>} />
        )}
        {isMsgKr() && (
          <Route path="/hompagekr" element={<HomePageKr></HomePageKr>} />
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
  );
}

export default App;
