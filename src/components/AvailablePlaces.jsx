import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isfetching, setIsfetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsfetching(true);
      try {
        const places = await fetchAvailablePlaces();
        //   navigator.geolocation.getCurrentPosition((position) => {
        //   const sortedPlaces = sortPlacesByDistance(resData.places, position.coords.latitude, position.coords.longitude);
        //   setAvailablePlaces(sortedPlaces);
        //   setIsfetching(false);
        // })
        setAvailablePlaces(places);


      } catch (error) {
        setError({ message: error.messege || "Failed to get places please try again later." })
        // setIsfetching(false);
      }
      setIsfetching(false);

    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An Error Ocurred!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isfetching={isfetching}
      loadingText="Fetching Places Data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
