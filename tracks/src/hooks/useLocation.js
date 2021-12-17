import { useState, useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

// return the resuable hook

export default (shouldTrack, callback) => {
  const [error, setError] = useState(null);
  const [subscriber, setSubscriber] = useState(null);

  const startLocation = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        callback
      );
      setSubscriber(sub);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    if (shouldTrack) {
      startLocation();
    } else {
      // stop tracking
      subscriber.remove();
      setSubscriber(null);
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]); // when we get a new version of callback, create a new function

  return [error];
};
