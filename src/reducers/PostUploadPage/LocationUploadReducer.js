export const updateLocation = (state, rawLocation) => {
  return { ...state, location: trimLocation(rawLocation), isEdited: true };
};
const trimLocation = (location) => {
  const {
    x: lng,
    y: lat,
    place_name: name,
    road_address_name: address,
    place_url: link,
    phone,
  } = location;

  return {
    latitude: Number(lat),
    longitude: Number(lng),
    name,
    address,
    link,
    phone,
  };
};
