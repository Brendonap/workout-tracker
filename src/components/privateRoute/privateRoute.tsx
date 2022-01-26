import { Redirect, Route } from "react-router-dom";
import { useAppState } from "../../store";

type PrivateRoutePropTypes = {
  component: any;
  [key: string]: any;
};

const PrivateRoute = ({ Component, ...rest }: PrivateRoutePropTypes) => {
  const { state } = useAppState();
  if (!state.uid) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
