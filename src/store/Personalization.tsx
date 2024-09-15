import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    AsyncStorage.setItem("rent-objetive", objective);
  };

  const updateRentPriceHandler = (prices: number[]) => {
    setRentPrice(prices);
    AsyncStorage.setItem("rent-price", JSON.stringify(prices));
  };

  const updateRentTimeHandler = (time: string) => {
    setRentTime(time);
    AsyncStorage.setItem("rent-time", time);
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
