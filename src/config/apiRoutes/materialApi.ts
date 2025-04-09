import { axiosRequest } from "../apiConfig/axiosConfig";
import { apiUrl } from "../apiConfig/apiUrl";

const createMaterialApi = async (body: any) => {
  return await axiosRequest.post<any>(`${apiUrl.material}/create`, body);
};

const getMaterialApi = async () => {
  return await axiosRequest.get<any>(`${apiUrl.material}`);
};

const getMaterialByIdApi = async (id: string) => {
  return await axiosRequest.get<any>(`${apiUrl.material}/${id}`);
};

const updateMaterialApi = async (id: string, body: any) => {
  return await axiosRequest.put<any>(`${apiUrl.material}/${id}`, body);
};

const deleteMaterialApi = async (id: string) => {
  return await axiosRequest.del<any>(`${apiUrl.material}/delete/${id}`);
};

const materialApi = {
  createMaterialApi,
  getMaterialApi,
  getMaterialByIdApi,
  updateMaterialApi,
  deleteMaterialApi,
};

export default materialApi;
