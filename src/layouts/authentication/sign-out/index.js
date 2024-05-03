import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getCookie } from "App";

export default function SignOut() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);

  const logoutUser = async () => {
    await fetch("https://plate-pal-97cd0667892d.herokuapp.com/api/user/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      credentials: "include",
      cors: "cors",
    });
  };

  useEffect(() => {
    const logoutAndRedirect = async () => {
      await logoutUser();
      setCookie("user", "", { path: "/" });
      navigate("/authentication/sign-in");
      console.log("User logged out");
    };

    logoutAndRedirect();
  }, [navigate, logoutUser, setCookie]);

  // Render nothing, as this component's sole purpose is to sign out the user
  return null;
}
