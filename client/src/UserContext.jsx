import { useState, createContext, useEffect } from "react";

export const UserContext = createContext([]);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const getUser = () => {
    const token = localStorage.getItem("auth");
    fetch(api_base + "/getUser", {
      headers: { authorization: `bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.message.userName) {
          navigate("/login");
        }

        setUser(data.message.userName);
      })
      .catch((err) => console.error("Error: ", err));
  };

  useEffect(() => {
    getUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "https://seize-the-day-api.up.railway.app";
