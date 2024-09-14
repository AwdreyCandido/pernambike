import React, { useState, createContext } from "react";

interface IPersonalizationContext {
  rentObjective: string;
  rentPrice: number[];
  rentTime: string;
  updateRentObjectiveHandler: (objective: string) => void;
  updateRentPriceHandler: (price: number[]) => void;
  updateRentTimeHandler: (time: string) => void;
}

export const PersonalizationContext = createContext<IPersonalizationContext>(
  {} as IPersonalizationContext
);

const PersonalizationContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [rentObjective, setRentObjective] = useState<string>("");
  const [rentPrice, setRentPrice] = useState<number[]>([]);
  const [rentTime, setRentTime] = useState<string>("");

  const updateRentObjectiveHandler = (objective: string) => {
    setRentObjective(objective);
  };

  const updateRentPriceHandler = (prices: number[]) => {
    setRentPrice(prices);
  };

  const updateRentTimeHandler = (time: string) => {
    setRentTime(time);
  };

  const value = {
    rentObjective,
    rentPrice,
    rentTime,
    updateRentObjectiveHandler,
    updateRentPriceHandler,
    updateRentTimeHandler,
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
};

export default PersonalizationContextProvider;
