import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

const useTestStore = create((set, get) => ({
  currentModel: null,
  loading: false,
  imageFile: null,
  predictionResult: null,

  setCurrentModel: (filename) => set({ currentModel: filename }),
  setImageFile: (file) => set({ imageFile: file }),

  getModels: async () => {
    try {
      const res = await axiosInstance.get("/test/models");
      console.log("Get models response:", res.data);
      return res.data.model;
    } catch (error) {
      console.error("Get models error:", error);
      return [];
    }
  },

  loadModel: async () => {
    const { currentModel } = get();
    if (!currentModel) {
      return { success: false, error: "No model selected" };
    }
    set({ loading: true });
    try {
      const res = await fetch("http://localhost:5000/api/test/load_model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_name: currentModel,
        }),
      });

      const data = await res.json();
      set({ loading: false });
      toast.success("Model telah di-load");
      return data;
    } catch (error) {
      console.error("Load model ERROR:", error);
      set({ loading: false });
      return {
        success: false,
        error: error.message,
      };
    }
  },
  predictImage: async () => {
    const { imageFile } = get();

    if (!imageFile) {
      set({ error: "Please select an image first" });
      return;
    }

    set({ loading: true, error: null, predictionResult: null });

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axiosInstance.post("/test/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({
        predictionResult: res.data,
        loading: false,
      });

      return res.data;
    } catch (error) {
      console.error("Prediction error:", error);
      set({
        error: error.response?.data?.message || "Prediction failed",
        loading: false,
      });
    }
  },

  resetTest: () =>
    set({
      imageFile: null,
      predictionResult: null,
      error: null,
    }),
}));

export default useTestStore;
