import { axiosRequest } from "../apiConfig/axiosConfig";
import { apiUrl } from "../apiConfig/apiUrl";

const createSizeApi = async (body: any) => {
  return await axiosRequest.post<any>(`${apiUrl.size}/create`, body);
};

const getSizeApi = async () => {
  return await axiosRequest.get<any>(`${apiUrl.size}`);
};

const getSizeByIdApi = async (id: string) => {
  return await axiosRequest.get<any>(`${apiUrl.size}/${id}`);
};

const updateSizeApi = async (id: string, body: any) => {
  return await axiosRequest.put<any>(`${apiUrl.size}/${id}`, body);
};

const deleteSizeApi = async (id: string) => {
  return await axiosRequest.del<any>(`${apiUrl.size}/delete/${id}`);
};

const sizeApi = {
  createSizeApi,
  getSizeApi,
  getSizeByIdApi,
  updateSizeApi,
  deleteSizeApi,
};

export default sizeApi;
