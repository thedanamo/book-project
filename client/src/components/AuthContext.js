import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoggingInfo, setUserLoggingInfo] = useState(null);
  const [status, setStatus] = useState("loading");

  const fetchLogin = async (userLoginInfo) => {
    const url = userLoginInfo.password ? "/api/auth/login" : "/api/auth/verify";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ ...userLoginInfo }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message);
      }

      const user = body;

      localStorage.setItem("BP_User", JSON.stringify(user));

      user.username && setUser(user);
      console.log(user);
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("BP_User"));
    user && fetchLogin(user);
    console.log("local storage user: ", user);
  }, []);

  useEffect(() => {
    if (userLoggingInfo) {
      fetchLogin(userLoggingInfo);
    }

    return () => {
      setStatus("loading");

      setUserLoggingInfo(null);
    };
  }, [userLoggingInfo]);

  return (
    <AuthContext.Provider
      value={{
        status,
        setStatus,
        user,
        setUser,
        userLoggingInfo,
        setUserLoggingInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
