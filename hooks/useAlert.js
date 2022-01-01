import { toast } from "react-toastify";

export const useAlert = () => {
  const alertSuccess = (message) => {
    toast.success(
      <div className="flex items-start">
        <span className="text-sm">{message}</span>
      </div>
    );
  };

  const alertError = (message) => {
    toast.error(
      <div className="flex items-start">
        <span className="text-sm">{message}</span>
      </div>,
    );
  };

  const alertInfo = (message) => {
    toast.info(
      <div className="flex items-start">
        <span className="text-sm">{message}</span>
      </div>,
    );
  };

  const alertWarning = (message) => {
    toast.warning(
      <div className="flex items-start">
        <span className="text-sm">{message}</span>
      </div>,
    );
  };

  return {
      alertSuccess,
      alertError,
      alertInfo,
      alertWarning
  }
};
