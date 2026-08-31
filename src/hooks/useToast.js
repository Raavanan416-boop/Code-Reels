import { useApp } from '../context/AppContext';

export const useToast = () => {
  const { addToast, removeToast, toasts } = useApp();
  return { addToast, removeToast, toasts };
};
