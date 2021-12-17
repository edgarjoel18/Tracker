import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TRACKS":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => {
  return async () => {
    const response = await trackerApi.get("/tracks");
    dipatch({ type: "FETCH_TRACKS", payload: response.data });
  };
};

const createTrack = (dipatch) => {
  return async (name, locations) => {
    // make a request
    await trackerApi.post("/tracks", { name, locations });
  };
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
