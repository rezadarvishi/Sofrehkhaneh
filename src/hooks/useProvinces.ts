import { useState, useEffect } from "react";
import { provinceService } from "../services/provinceService";
import { Province } from "../types/province";
export function useProvinces() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { provinceService.getAll().then(setProvinces).catch(console.error).finally(() => setLoading(false)); }, []);
  return { provinces, loading };
}
