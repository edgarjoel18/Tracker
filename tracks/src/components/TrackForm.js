import React, { useContext } from "react";
import { Button, Input } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeTrackName,
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();
  console.log(locations);

  // const changeButton = recording ? (
  //   <Button title="Stop" onPress={stopRecording} />
  // ) : (
  //   <Button title="Start Recording" onPress={startRecording} />
  // );
  return (
    <>
      <Spacer>
        <Input placeholder="Enter name of Track" onChange={changeTrackName} />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button title="Stop" onPress={stopRecording} />
        ) : (
          <Button title="Start Recording" onPress={startRecording} />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length > 0 ? (
          <Button title="Save Recording" onPress={saveTrack} />
        ) : null}
      </Spacer>
    </>
  );
};

export default TrackForm;

/* <Spacer>
        {!recording && locations.length > 0 ? (
          <Button
            title="Save Recording"
            onPress={startRecording}
            onPress={saveTrack}
          />
        ) : null}
      </Spacer> */
