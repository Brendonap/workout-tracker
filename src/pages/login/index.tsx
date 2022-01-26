import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Card from "../../components/card";
import { googleLogin } from "../../firestore";
import { useAppState } from "../../store";
import { UPDATE_SESSION } from "../../store/types";
import styles from "./login.module.scss";
import cn from "classnames";
import Button from "../../components/button";

const Login = () => {
  const { state, dispatch } = useAppState();
  const [isLoading, setIsloading] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      setIsloading(true);
      const res = await googleLogin();

      if (res?.token) {
        dispatch({
          type: UPDATE_SESSION,
          payload: {
            token: res?.token,
            user: res.user,
            uid: res.user.uid,
          },
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (state.token) {
      history.push("/");
    }
  }, [state.token]);

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles["login-container"])}>
        <h1>Basic workout app</h1>
        <Card classNames={styles["login-card"]}>
          <h2>Login</h2>
          <Button onClick={handleLogin}>Sign in with Google</Button>
        </Card>
      </div>
    </div>
  );
};

export default Login;
