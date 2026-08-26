import { apiClient } from "./apiClient";
import { Province } from "../types/province";
export const provinceService = {
  async getAll(): Promise<Province[]> { const res = await apiClient.get<{ data: Province[] }>("/provinces"); return res.data; },
  async getById(id: string): Promise<Province> { const res = await apiClient.get<{ data: Province }>(`/provinces/${id}`); return res.data; }
};
