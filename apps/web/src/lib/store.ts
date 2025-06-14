import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Form = {
  title: string;
  price: number;
  currency: string;
  category: string;
  desc: string;
  image_url?: string | undefined;
};

type FormState = {
  jewerlyForm: Form;
  addJewerlyForm: (form: Form) => void;
};

export const useFormStorage = create<FormState>()(
  persist(
    (set) => ({
      jewerlyForm: {
        title: '',
        price: 0,
        currency: '',
        category: '',
        desc: '',
        image_url: '',
      },
      addJewerlyForm: (form) => set(() => ({ jewerlyForm: form })),
    }),
    {
      name: 'form-djiwa-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
