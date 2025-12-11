import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

const useTrainStore = create((set, get) => ({
  isLoading: false,
  currentBatch: 0,
  currentEpoch: 0,
  totalEpochs: 0,
  progress: 80,
  isTraining: false,
  metrics: {
    accuracy: 0.8,
    loss: 0.005,
    val_accuracy: 0.7,
    val_loss: 0.001,
  },

  startTraining: async (parameter) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/train/start", parameter);
      console.log("Response:", res.data);

      get().startProgressPolling();
      toast.success("training model selesai");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  startProgressPolling: () => {
    const interval = setInterval(() => {
      get().fetchProgress();
    }, 5000);

    set({ pollingInterval: interval });
  },

  fetchProgress: async () => {
    try {
      const res = await axiosInstance.get("/train/progress");
      const data = res.data;
      set({
        currentBatch: data.current_batch || 0,
        currentEpoch: data.current_epoch || 0,
        totalEpochs: data.total_epochs || 0,
        progress: data.progress || 0,
        isTraining: data.is_training || false,
        metrics: {
          accuracy: data.metrics?.accuracy,
          loss: data.metrics?.loss || 0,
          val_accuracy: data.metrics?.val_accuracy,
          val_loss: data.metrics?.val_loss || 0,
        },
        bestAccuracy: newBestAccuracy,
        bestAccuracyEpoch: newBestAccuracyEpoch,
      });
      if (!data.is_training && get().pollingInterval) {
        clearInterval(get().pollingInterval);
        set({ pollingInterval: null });
        get().fetchResults();
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  },
  detailTraining: async () => {
    try {
      const res = await axiosInstance.get("/result");
    } catch (error) {}
  },
}));

export default useTrainStore;
