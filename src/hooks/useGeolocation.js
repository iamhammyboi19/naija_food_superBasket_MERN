import { useState, useCallback } from "react";

// get user location using navigator.geolocation

function useGetCurrentPosition(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [getPosErr, setGetPosErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUserPosition = useCallback(function () {
    // if no navigator.geolocation api return function and set error message
    if (!navigator.geolocation) {
      return setGetPosErr(
        "Your browser doesn't have location feature. Please use a different browser"
      );
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (err) => {
        setGetPosErr(`${err.message} -> from getuserpos`);
        setIsLoading(false);
      }
    );
  }, []);

  return { position, getPosErr, getUserPosition, isLoading };
}

export default useGetCurrentPosition;
