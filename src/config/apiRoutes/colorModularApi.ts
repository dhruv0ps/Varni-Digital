import { axiosRequest } from "../apiConfig/axiosConfig";
import { apiUrl } from "../apiConfig/apiUrl";

const createColorModularApi = async (body: any) => {
  return await axiosRequest.post<any>(`${apiUrl.colorModular}/create`, body);
};

const getColorModularApi = async () => {
  return await axiosRequest.get<any>(`${apiUrl.colorModular}`);
};

const getColorModularByIdApi = async (id: string) => {
  return await axiosRequest.get<any>(`${apiUrl.colorModular}/${id}`);
};

const updateColorModularApi = async (id: string, body: any) => {
  return await axiosRequest.put<any>(`${apiUrl.colorModular}/${id}`, body);
};

const deleteColorModularApi = async (id: string) => {
  return await axiosRequest.del<any>(`${apiUrl.colorModular}/delete/${id}`);
};

const colorModularApi = {
  createColorModularApi,
  getColorModularApi,
  getColorModularByIdApi,
  updateColorModularApi,
  deleteColorModularApi,
};

export default colorModularApi;
