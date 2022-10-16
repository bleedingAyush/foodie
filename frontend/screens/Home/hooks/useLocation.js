import { useFocusEffect } from "@react-navigation/native";
import { getCurrentPositionAsync } from "expo-location";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useIsMounted } from "../../../hooks/useIsMounted";
import { enableLocation } from "../../../redux/user/user-actions";
const useLocation = (loadingSuccess) => {
  const dispatch = useDispatch();

  const turnOnLocation = () => {
    dispatch(enableLocation());
  };

  useFocusEffect(
    React.useCallback(() => {
      if (loadingSuccess.includes("HOME_SCREEN_DATA_SUCCESS")) {
        dispatch({ type: "HOME_SCREEN_DATA_RESET" });
        async function getCurrentPosititon() {
          try {
            await getCurrentPositionAsync();
            turnOnLocation();
          } catch (err) {
            let unsatisfiedDeviceSettings =
              "Location request failed due to unsatisfied device settings.";
            let locNotObject =
              err.message ==
              "location is not an Object. (evaluating '\"latitude\" in location')";

            if (
              (err.message =
                "Not authorized to use location services." ||
                err.message == unsatisfiedDeviceSettings) ||
              locNotObject
            ) {
              turnOnLocation();
            }
          }
        }
        getCurrentPosititon();
      }
    }, [loadingSuccess])
  );
};

export default useLocation;
