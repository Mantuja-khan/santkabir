const IS_PROD = true; // Set to true for production

export const BACKEND_URL = IS_PROD 
  ? "https://stkabirpublicschool.in" 
  : "http://localhost:5000";

export const API_URL = `${BACKEND_URL}/api`;
export const UPLOADS_URL = `${BACKEND_URL}/uploads`;
