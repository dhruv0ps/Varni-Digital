import { axiosRequest } from "../apiConfig/axiosConfig";
import { apiUrl } from "../apiConfig/apiUrl";

const createIconModularApi = async (body: any) => {
  return await axiosRequest.post<any>(`${apiUrl.iconModular}/create`, body);
};

const getIconModularApi = async () => {
  return await axiosRequest.get<any>(`${apiUrl.iconModular}`);
};

const getIconModularByIdApi = async (id: string) => {
  return await axiosRequest.get<any>(`${apiUrl.iconModular}/${id}`);
};

const updateIconModularApi = async (id: string, body: any) => {
  return await axiosRequest.put<any>(`${apiUrl.iconModular}/${id}`, body);
};

const deleteIconModularApi = async (id: string) => {
  return await axiosRequest.del<any>(`${apiUrl.iconModular}/delete/${id}`);
};

const iconModularApi = {
  createIconModularApi,
  getIconModularApi,
  getIconModularByIdApi,
  updateIconModularApi,
  deleteIconModularApi,
};

export default iconModularApi;
