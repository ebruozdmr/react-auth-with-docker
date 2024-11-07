import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "./../helper/localStorageHelper";
import { useState } from "react";
import { getLocalStorage } from "./../helper/localStorageHelper";
import axios from "axios";
import { toastSuccess, toastError } from "./../components/ToastHelper";
export default function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getLocalStorage("user"));

  const login = async (data) => {
    try {
      console.log(data);
      const { email, password } = data;
      const response = await axios.post(
        "http://localhost:5002/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      if (response.status == 200) {
        if (data.checked) setLocalStorage("user", response.data.user);
        setLocalStorage("token", response.data.userToken);
        setUser(response.data.user);
        console.log("User localstorage'a kaydedildi.");
        toastSuccess("Kullanıcı girişi başarılı!");
        setTimeout(() => {
          navigate("/home");
        }, 4000);
      }
      return true;
    } catch (error) {
      toastError("Email veya parola geçersiz!");
      return false;
    }
  };

  const signUp = async (data) => {
    try {
      const { ad, soyad, email, password } = data;
      const response = await axios.post(
        "http://localhost:5002/register",
        {
          ad,
          soyad,
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data.newUser);
      if (response.status == 201) {
        setLocalStorage("token", response.data.userToken);
        toastSuccess("Kullanıcı kaydı başarılı!");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }

      return true;
    } catch (error) {
      toastError("Bİr hata meydana geldi.Lütfen bilgilerinizi kontrol ediniz!");
      return false;
    }
  };

  return { user, login, signUp };
}
