import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as LoctionContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = ({ navigation }) => {
  const _id = navigation.getParam("_id");
  const { state } = useContext(LocationContext);
  const currentTrack = state.find((track) => track._id === _id);
  const initalCoords = currentTrack.locations[0].coords;
  return (
    <>
      <Text style={{ fontSize: 48 }}>{currentTrack.name}</Text>

      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
        style={styles.mapStyle}
      >
        <Polyline
          coordinates={currentTrack.locations.map(
            (location) => location.coords
          )}
        />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    height: 300,
  },
});

export default TrackDetailScreen;
