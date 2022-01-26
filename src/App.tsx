/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/styles/App.scss";
import Home from "./pages/home";
import Sidebar from "./components/sidebar";
import Login from "./pages/login";
import History from "./pages/history";
import TrackProgress from "./pages/trackProgress";
import { clearState, LocalStorageType, saveState, useAppState } from "./store";
import ManageAvailableExercises from "./pages/manageAvailableExercises";
import { routes } from "./routes";
import { auth } from "./firestore";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./components/privateRoute/privateRoute";
import { useEffect } from "react";
import { getAvailableExercises, getCustomUserExercise } from "./api";
import { UPDATE_SESSION } from "./store/types";

function App() {
  const { state, dispatch } = useAppState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      saveState({ uid: user.uid, user });
    } else {
      clearState(LocalStorageType.STATE_KEY);
    }
  });

  const fetchAvailableExercises = async () => {
    const [defaultExercises, customExercises] = await Promise.all([
      getAvailableExercises(),
      getCustomUserExercise(),
    ]);
    dispatch({
      type: UPDATE_SESSION,
      payload: {
        ...state,
        availableExercises: [
          ...defaultExercises,
          ...customExercises.map((exercise) => {
            return {
              ...exercise,
              isCustom: true,
            };
          }),
        ],
      },
    });
  };

  useEffect(() => {
    if (state.uid) {
      fetchAvailableExercises();
    }
  }, [state.uid]);

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Switch>
          <PrivateRoute exact path={routes.home} component={Home} />
          <PrivateRoute
            exact
            path={routes.availableExercises}
            component={ManageAvailableExercises}
          />
          <PrivateRoute exact path={routes.track} component={TrackProgress} />
          <PrivateRoute exact path={routes.history} component={History} />
          <Route exact path={routes.login} component={Login} />
        </Switch>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
