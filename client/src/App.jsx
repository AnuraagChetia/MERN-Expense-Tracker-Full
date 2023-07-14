import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/Error/ErrorPage";
import NavBar from "./Components/UI/NavBar";
import TransactionsPage from "./pages/TransactionsPage";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import { useDispatch, useSelector } from "react-redux";
import { userActons } from "./store/user-reducer";
import axios from "axios";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPasswordPage";
import ResetPage from "./pages/ResetPassword/ResetPage";
import ReportPage from "./pages/report/ReportPage";
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.name);
  const isPremium = useSelector((state) => state.user.premium);
  useEffect(() => {
    const getUser = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const user = await axios.get("http://localhost:3000/users/get-user", {
        headers: { Authorization: token },
      });
      dispatch(
        userActons.getUser({
          name: user.data.user.name,
          email: user.data.user.email,
          premium: user.data.user.premium,
          totalExpense: user.data.user.totalExpense,
        })
      );
    };
    getUser();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar />
        </>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: isLoggedIn ? <TransactionsPage /> : <AuthPage />,
        },
        {
          path: "/transactions",
          element: isLoggedIn ? <TransactionsPage /> : <AuthPage />,
        },
        {
          path: "/leaderboard",
          element:
            isLoggedIn && isPremium ? (
              <Leaderboard />
            ) : isLoggedIn ? (
              <TransactionsPage />
            ) : (
              <AuthPage />
            ),
        },
        {
          path: "/report",
          element:
            isLoggedIn && isPremium ? (
              <ReportPage />
            ) : isLoggedIn ? (
              <TransactionsPage />
            ) : (
              <AuthPage />
            ),
        },
        {
          path: "/forgetpassword",
          element: <ForgetPasswordPage />,
        },
        {
          path: "/resetpassword/:id",
          element: <ResetPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
