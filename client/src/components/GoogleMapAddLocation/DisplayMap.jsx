/* eslint-disable react/prop-types */
// RESOURCES
// https://www.youtube.com/watch?v=BL2XVTqz9Ek -> HOW TO USE "@react-google-maps/api"

// GOALS

/*
get the current user location from database and check if it's different from the current lat, lng
if it is different prompt the user to add a new location or update current location
load the map initially on render and get the lat and lng 
get the address from the lat and lng then update the input field and suburb field
make sure user input other address info before they can save and continue
*/

import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindowF,
  MarkerF,
} from "@react-google-maps/api";
import useGetCurrentPosition from "../../hooks/useGeolocation";
// import { GOOGLE_MAP_APIKEY } from "../../config";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import Spinner from "../../ui/Spinner";
import { addInitialAddress, addLatLng } from "../../allRedux/latlngSlice";
import { HiViewfinderCircle } from "react-icons/hi2";
import MapForm from "./MapForm";
import { get_user_address_usinglatlng } from "./apiMaps";

// RESTYLING COMBOBOX UI
const StyledComboboxInput = styled(ComboboxInput)`
  width: 100%;
  padding: 10px;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--oc-gray-4);
  font-size: 14px;
  color: var(--oc-gray-8);
  font-weight: 300;
  &:focus {
    outline: none;
    border: 1px solid var(--oc-gray-5);
  }

  &::placeholder {
    color: var(--oc-gray-6);
  }
`;

const StyledCombobox = styled(Combobox)`
  margin-bottom: 15px;
  z-index: 99999999999;
`;

const StyledComboboxPopover = styled(ComboboxPopover)`
  z-index: 1000;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-top: 10px;
  border-radius: var(--border-radius-md);
  padding: 5px;
  /* background-color: black; */
`;

const LocateMeBtn = styled.button`
  position: absolute;
  z-index: 99999999999;
  top: 50%;
  right: 2%;
  transform: translate(0%, -50%);
  display: flex;
  gap: 0.6rem;
  align-items: center;
  padding: 0.5rem;
  border: none;
  background-color: rgba(255, 255, 255, 0);

  & span {
    font-size: 1.3rem;
    letter-spacing: 0.1px;
    color: var(--oc-red-7);
    font-weight: 600;
    display: inline-block;
  }
`;

const StyledMapContainer = styled.div`
  border: 1px solid black;
  width: 600px;
  padding: 10px;

  @media (max-width: 45.1875em) {
    width: 100%;
    /* height: 100vh; */
  }
`;

const containerStyle = {
  height: "300px",
  width: "100%",
  margin: "0 auto",
};

const libraries = ["places"];

// USE PLACES AUTOCOMPLETE AS YOU SEARCH ADDRESS -> display the options using combobox ui
function PlacesAutoComplete({ getUserPosition, isLoading, position }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ callbackName: "YOUR_CALLBACK_NAME" });

  const dispatch = useDispatch();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // handled selected combobox option
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    // takes selected address and convert to geocode then from geocode to lat lng which is updated so the map can rerender to the speicific lat lng
    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    dispatch(addLatLng({ lat, lng }));
  };

  return (
    <div style={{ position: "relative" }}>
      <StyledCombobox onSelect={handleSelect}>
        <StyledComboboxInput
          placeholder="Find or Choose Your Address"
          value={value}
          onChange={handleInput}
          disabled={!ready}
        />
        <StyledComboboxPopover className="comboboxopt">
          <ComboboxList className="comboboxopt">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  className="comboboxopt"
                  key={place_id}
                  value={description}
                />
              ))}
          </ComboboxList>
        </StyledComboboxPopover>
      </StyledCombobox>
      {value.length < 1 && (
        <LocateMeBtn
          onClick={() => {
            getUserPosition();

            if (!position?.lat || !position?.lng) {
              return;
            }

            dispatch(addLatLng({ lat: position.lat, lng: position.lng }));
          }}
          disabled={isLoading}
        >
          <HiViewfinderCircle fill="var(--oc-red-9)" fontSize={"2rem"} />{" "}
          <span>Locate me</span>
        </LocateMeBtn>
      )}
    </div>
  );
}

function ShowMap() {
  // react-google-map-api is loaded then display the map

  const libRef = useRef(libraries);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.GOOGLE_MAP_APIKEY,
    libraries: libRef.current,
  });

  if (!isLoaded)
    return (
      <div style={{ height: "400px", width: "500px", margin: "0 auto" }}>
        <Spinner />
      </div>
    );

  return <SimpleMap />;
}

function SimpleMap() {
  const { getUserPosition, position, isLoading } = useGetCurrentPosition();
  const { lat, lng } = useSelector((state) => state.latlng);
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(true);

  const coords = useMemo(() => {
    if (lat && lng) {
      return { lat, lng };
    } else if (!lat && !lng && position?.lat && position?.lng) {
      return { lat: position?.lat, lng: position?.lng };
    }
  }, [position?.lat, position?.lng, lat, lng]);

  useEffect(
    function () {
      // stop map to reload with current or new lat and lng if there is lat and lng on mount
      if (!lat || !lng) {
        getUserPosition();
      }

      if (!position?.lat || !position?.lng) {
        return;
      }

      dispatch(addLatLng({ lat: position.lat, lng: position.lng }));

      // this shows the user current location on mount
      get_user_address_usinglatlng(position.lat, position.lng)
        .then((res) =>
          // 847 Street name, idktbh, postal code, Lagos, Nigeria
          // returns 847 street name, idktbh, postal code, Lagos
          dispatch(
            addInitialAddress(
              res.results
                .at(0)
                .formatted_address.split(",")
                .slice(0, -1)
                .join(",")
            )
          )
        )
        .catch(() => dispatch(addInitialAddress("Type suburb here")));

      // console.log("check on drag", coords);
    },

    [dispatch, getUserPosition, position?.lat, position?.lng, lat, lng]
  );

  return (
    <>
      <StyledMapContainer>
        <PlacesAutoComplete
          getUserPosition={getUserPosition}
          isLoading={isLoading}
          position={position}
        />

        <GoogleMap
          mapContainerStyle={containerStyle}
          // center={{ lat, lng }}
          center={coords}
          zoom={15}
          mapTypeControl={false}
        >
          <>
            {coords?.lat && coords?.lng && (
              <MarkerF
                position={coords}
                draggable={true}
                onClick={() => {
                  setPopup((cur) => !cur);
                }}
                onDragEnd={(e) => {
                  const lat = e.latLng.lat();
                  const lng = e.latLng.lng();
                  dispatch(addLatLng({ lat, lng }));

                  // this updates the user current location on drag
                  get_user_address_usinglatlng(lat, lng)
                    .then((res) =>
                      // 847 Street name, idktbh, postal code, Lagos, Nigeria
                      // returns 847 street name, idktbh, postal code, Lagos
                      dispatch(
                        addInitialAddress(
                          res.results
                            .at(0)
                            .formatted_address.split(",")
                            .slice(0, -1)
                            .join(",")
                        )
                      )
                    )
                    .catch(() =>
                      dispatch(addInitialAddress("Type suburb here"))
                    );
                }}
              >
                {popup && (
                  <InfoWindowF
                    position={coords}
                    onCloseClick={() => setPopup(false)}
                  >
                    <div>
                      <strong>Is this your building entrance?</strong>
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
            )}
          </>
        </GoogleMap>
        {/* FORM TO UPLOAD USER ADDRESS DETAILS */}
        <MapForm lat={lat} lng={lng} />
      </StyledMapContainer>
    </>
  );
}

export default ShowMap;
