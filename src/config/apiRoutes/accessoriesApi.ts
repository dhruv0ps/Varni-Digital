import { axiosRequest } from "../apiConfig/axiosConfig";
import { apiUrl } from "../apiConfig/apiUrl";

const createAccessoriesApi = async (body: any) => {
  return await axiosRequest.post<any>(`${apiUrl.accessories}/create`, body);
};

const getAccessoriesApi = async () => {
  return await axiosRequest.get<any>(`${apiUrl.accessories}`);
};

const getAccessoriesByIdApi = async (id: string) => {
  return await axiosRequest.get<any>(`${apiUrl.accessories}/${id}`);
};

const updateAccessoriesApi = async (id: string, body: any) => {
  return await axiosRequest.put<any>(`${apiUrl.accessories}/${id}`, body);
};

const deleteAccessoriesApi = async (id: string) => {
  return await axiosRequest.del<any>(`${apiUrl.accessories}/delete/${id}`);
};

const accessoriesApi = {
  createAccessoriesApi,
  getAccessoriesApi,
  getAccessoriesByIdApi,
  updateAccessoriesApi,
  deleteAccessoriesApi,
};

export default accessoriesApi;
