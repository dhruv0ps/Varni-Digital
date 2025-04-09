import { axiosRequest } from "../apiConfig/axiosConfig";
import { apiUrl } from "../apiConfig/apiUrl";

const createPanelApi = async (body: any) => {
  return await axiosRequest.post<any>(`${apiUrl.panel}/create`, body);
};

const getPanelApi = async () => {
  return await axiosRequest.get<any>(`${apiUrl.panel}`);
};

const getPanelByIdApi = async (id: string) => {
  return await axiosRequest.get<any>(`${apiUrl.panel}/${id}`);
};

const updatePanelApi = async (id: string, body: any) => {
  return await axiosRequest.put<any>(`${apiUrl.panel}/${id}`, body);
};

const deletePanelApi = async (id: string) => {
  return await axiosRequest.del<any>(`${apiUrl.panel}/delete/${id}`);
};

const panelApi = {
  createPanelApi,
  getPanelApi,
  getPanelByIdApi,
  updatePanelApi,
  deletePanelApi,
};

export default panelApi;

