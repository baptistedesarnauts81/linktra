import { create } from "zustand";

const usePreviewStore = create<{
  preview: boolean;
  togglePreview: () => void;
  setPreview: (preview: boolean) => void;
}>((set) => ({
  preview: true,
  togglePreview: () => set((state) => ({ preview: !state.preview })),
  setPreview: (preview: boolean) => set({ preview }),
}));

export default usePreviewStore;
