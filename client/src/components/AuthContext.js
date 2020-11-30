import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoggingInfo, setUserLoggingInfo] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (userLoggingInfo) {
      fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ ...userLoggingInfo }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((user) => {
          console.log("***** LOGGING IN", user);
          localStorage.setItem("userBPToken", user.token);
          user.username && setUser(user);
        })
        .catch((error) => {
          setStatus("error");
          console.log(error);
        });
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
