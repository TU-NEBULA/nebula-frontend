import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const postTerm = async (token: string, body: { [key: string]: boolean }) => {
  return await axios.post(
    `${baseUrl}/terms/agree`,
    { agreeMap: body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
