export const API = "http://192.168.18.3:5000";
export const placeHeaders = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
