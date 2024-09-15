import React, { createContext, useEffect, useState } from "react";
import { IBike } from "../domain/Bike";
import { bikes } from "../data/bikes";

interface IBikesContext {
  bikesList: IBike[];
  filteredBikesList: IBike[];
  rentedBike: RentedBike | null;
  inputFilter: string | null;
  startDate: string | null;
  endDate: string | null;
  startTime: Time;
  endTime: Time;
  selectedDates: MarkedDates;
  filtersList: string[];
  setAllBikesHandler: (bikes: IBike[]) => void;
  startDateHandler: (date: string | null) => void;
  endTimeHandler: (time: Time) => void;
  startTimeHandler: (time: Time) => void;
  endDateHandler: (date: string | null) => void;
  selectDatesHandler: (dates: MarkedDates) => void;
  resetDatesHandler: () => void;
  setRentedBikeHandler: (bike: RentedBike) => void;
  inputFilterHandler: (query: string) => void;
  setFiltersListHandler: (filters: string[]) => void;
}

export type Time = {
  hours: string;
  minutes: string;
};

export type MarkedDates = {
  [date: string]: {
    selected: boolean;
    color: string;
    textColor: string;
  };
};

export type RentedBike = {
  bikeId: number;
  brand: string;
  title: string;
  ownerId: string;
  renterId: string;
  endRent: string;
  rentValue: number;
  renterLocation: string;
  startRent: string;
  photoUrl: string;
  category: string;
};

export const BikesContext = createContext<IBikesContext>({} as IBikesContext);

const BikesContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [bikesList, setBikesList] = useState<IBike[]>([]);
  const [filteredBikesList, setFilteredBikesList] = useState<IBike[]>([]);
  const [rentedBike, setRentedBike] = useState<RentedBike | null>(null);
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [inputFilter, setInputFilter] = useState<string | null>(null);
  const [filtersList, setFiltersList] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Time>({
    hours: "00",
    minutes: "00",
  });
  const [endTime, setEndTime] = useState<Time>({ hours: "00", minutes: "00" });

  useEffect(() => {
    let filteredList = bikesList;

    if (inputFilter && inputFilter.trim() !== "") {
      const lowercasedFilter = inputFilter.toLowerCase();
      filteredList = filteredList.filter(
        (bike) =>
          bike.title.toLowerCase().includes(lowercasedFilter) ||
          bike.description.toLowerCase().includes(lowercasedFilter) ||
          bike.brand.toLowerCase().includes(lowercasedFilter)
      );
    }

    if (filtersList.length > 0) {
      filteredList = filterBikes(filtersList, filteredList);
    }

    setFilteredBikesList(filteredList);
  }, [inputFilter, filtersList, bikesList]);

  const filterBikes = (filters: string[], bikesList: IBike[]) => {
    // if (filters.includes("Mostrar Todas")) {
    //   return bikesList;
    // }

    return bikesList.filter((bike) => {
      const matchesBrand = filters.includes(bike.brand);
      const matchesCategory = filters.includes(bike.category);
      const matchesPrice = filters.some(
        (filter) =>
          filter.startsWith("R$") &&
          parseFloat(filter.replace("R$", "")) >= parseFloat(bike.price)
      );

      return matchesBrand || matchesCategory || matchesPrice;
    });
  };

  const setAllBikesHandler = (bikes: IBike[]) => {
    setBikesList(bikes);
  };

  const setRentedBikeHandler = (bike: RentedBike) => {
    setRentedBike(bike);
  };

  const inputFilterHandler = (query: string) => {
    setInputFilter(query);
  };

  const setFiltersListHandler = (filters: string[]) => {
    setFiltersList(filters);
  };

  const selectDatesHandler = (dates: MarkedDates) => {
    setSelectedDates(dates);
  };

  const startDateHandler = (date: string | null) => {
    setStartDate(date);
  };

  const endDateHandler = (date: string | null) => {
    setEndDate(date);
  };

  const startTimeHandler = (time: Time) => {
    setStartTime(time);
  };

  const endTimeHandler = (time: Time) => {
    setEndTime(time);
  };

  const resetDatesHandler = () => {
    setSelectedDates({});
    setStartDate(null);
    setEndDate(null);
    setStartTime({
      hours: "00",
      minutes: "00",
    });
    setEndTime({
      hours: "00",
      minutes: "00",
    });
  };

  const value = {
    bikesList,
    filteredBikesList,
    rentedBike,
    inputFilter,
    filtersList,
    selectedDates,
    startDate,
    endDate,
    startTime,
    endTime,
    setAllBikesHandler,
    startDateHandler,
    endDateHandler,
    startTimeHandler,
    endTimeHandler,
    selectDatesHandler,
    resetDatesHandler,
    setRentedBikeHandler,
    inputFilterHandler,
    setFiltersListHandler, // Handler for setting filters
  };

  return (
    <BikesContext.Provider value={value}>{children}</BikesContext.Provider>
  );
};

export default BikesContextProvider;
