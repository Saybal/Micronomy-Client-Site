import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});
const AxiosToken = () => {
    const { user, SignOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

  const handleLogOut = () => {
    SignOutUser()
      .then(() => {
        Swal({
          text: "You have successfully signed Out",
          icon: "success",
          button: {
            text: "Okay",
            closeModal: true,
          },
        });
        localStorage.setItem("Theme", "acid");
        document.documentElement.setAttribute("data-theme", "acid");
        // settheme("acid");
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  instance.interceptors.request.use(
    (config) => {
      if (user && user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
          handleLogOut();
        }
      else if (error.response && error.response.status === 403) {
          console.error("Access denied:", error);
        Swal.fire({
          title: "Access Denied",
          text: "If you are bad, I am your Dad 😎",
          icon: "error",
          timer: 2000
        });
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default AxiosToken;
