import { createContext, useState } from "react";
import { IBike } from "../domain/Bike";

interface IBikesContext {
  bikes: IBike[];
}

export const BikesContext = createContext<IBikesContext>({
  bikes: [],
});

const BikesContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [bikes, setBikes] = useState([]);
  const value = {
    bikes,
  };

  return (
    <BikesContext.Provider value={value}>{children}</BikesContext.Provider>
  );
};

export default BikesContextProvider;
