import { create } from "zustand";
import {axiosInstance} from "../lib/axios";

const useTrainStore = create((set) => ({
  isLoading: false,

  startTraining: async (parameter) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/train/start",parameter);
      console.log("Response:", res.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTrainStore;
