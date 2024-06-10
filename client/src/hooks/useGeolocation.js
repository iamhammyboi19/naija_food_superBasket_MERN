import { useState, useCallback } from "react";
import toast from "react-hot-toast";

// get user location using navigator.geolocation
function useGetCurrentPosition(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [getPosErr, setGetPosErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUserPosition = useCallback(function () {
    // if no navigator.geolocation api return function and set error message
    if (!navigator.geolocation) {
      toast.error(
        "Your browser doesn't have location feature. Please use a different browser",
        { duration: 4000 }
      );
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (err) => {
        toast.error(`${err.message}`, { duration: 5000, id: "1" });
        setIsLoading(false);
      }
    );
  }, []);

  return { position, getPosErr, getUserPosition, isLoading, setGetPosErr };
}

export default useGetCurrentPosition;
