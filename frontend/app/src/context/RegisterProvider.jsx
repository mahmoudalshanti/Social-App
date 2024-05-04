import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const registerContext = createContext();

// eslint-disable-next-line react/prop-types
const RegisterProvider = ({ children }) => {
  const [register, setRegister] = useState({});
  return (
    <registerContext.Provider value={{ register, setRegister }}>
      {children}
    </registerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRegister = () => {
  return useContext(registerContext);
};

export default RegisterProvider;
