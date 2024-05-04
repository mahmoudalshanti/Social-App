import { createContext, useContext, useReducer } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "setUser":
      return {
        ...action.payload,
      };

    case "userUpdate":
      state.username = action.payload.username ?? state.username;
      state.password = action.payload?.password ?? state.password;
      state.email = action.payload?.email ?? state.email;
      state.fName = action.payload?.fName || state.fName;
      state.lName = action.payload?.lName || state.lName;
      return state;

    case "friendsUpdate":
      state.friends = action.payload;
      return state;

    case "newNof":
      state.nof = [...action.payload];
      return state;
  }
}

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {});

  return (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useContext(userContext);
};
export default UserProvider;
