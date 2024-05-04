import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getCookie } from "App";
import axios from "axios";

export default function SignOut() {
  let currentUser = localStorage.getItem("currentUser");
  const url = localStorage.getItem("baseURL");
  const navigate = useNavigate();

  const setCurrentUser = (value) => {
    localStorage.setItem("currentUser", value);
    currentUser = value;
  };

  //   const logoutUser = async () => {
  //     await fetch("https://backend.platepal.eu/api/user/logout/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // "X-CSRFToken": getCookie("csrftoken"),
  //       },
  //       credentials: "include",
  //     });
  //   };

  useEffect(() => {
    axios.post(`${url}/logout/`, {}).then((response) => {
      if (response.status === 200) {
        setCurrentUser(false);
        navigate("/authentication/sign-in");
      }
    });
  }, []);

  // Render nothing, as this component's sole purpose is to sign out the user
  return null;
}
