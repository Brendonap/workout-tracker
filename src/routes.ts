export const routes = {
  home: "/",
  login: "/login",
  availableExercises: "/manage-available-exercises",
  track: "/track-progress",
  history: "/history",
};

export const routeLabel = (path: string) => {
  switch (path) {
    case routes.home:
      return "HOME";
    case routes.availableExercises:
      return "EXERCISE LIBRARY";
    case routes.track:
      return "TRACK PROGRESS";
    case routes.history:
      return "HISTORY";
    default:
      return;
  }
};
