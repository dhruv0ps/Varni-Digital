import { axiosRequest } from "../apiConfig/axiosConfig";
import { apiUrl } from "../apiConfig/apiUrl";

const postLogin = async (body: any) => {
  return await axiosRequest.post<any>(apiUrl.login, body);
};

const getCurrentUser = async () => {
  return await axiosRequest.get<any>(apiUrl.currentUser);
};

const postLogout = async () => {
  return await axiosRequest.post<any>(apiUrl.logout, {});
};

export const authApis = {
  postLogin,
  getCurrentUser,
  postLogout,
};
