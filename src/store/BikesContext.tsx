import React, { createContext, useEffect, useState } from "react";
import { IBike } from "../domain/Bike";
import { bikes } from "../data/bikes";

const mockBikesList = [
  {
    id: 1,
    brand: "Trek Marlin 7",
    createdAt: "2024-03-15T14:30:00+00:00",
    description: "Uma mountain bike versátil",
    isRented: false,
    ownerId: "108b3659-d3c6-4685-af38-20955da062a2",
    photoUrl:
      "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 25.45,
    ratingsAvg: 4.7,
    rentedSince: null,
    reviewsQuantity: 18,
    rim: 29,
    timesRented: 3,
    title: "Trek Marlin 7 Aro 29",
    users: {
      createdAt: "2024-04-24T23:26:28.316",
      email: "email@email.com",
      id: "a4c0a7e3-1ac1-4a28-8b80-3bcbbe36bdc9",
      location: "Boa Viagem, Recife - PE",
      name: "Roberta Gouveia",
      phone: "81988882222",
      photoUrl: "https://randomuser.me/api/portraits/women/56.jpg",
      rents: 0,
      reviewsQuantity: 0,
    },
  },

  // {
  //   id: 3,
  //   brand: "Specialized Rockhopper",
  //   createdAt: "2024-02-10T08:20:00+00:00",
  //   description: "Ideal para trilhas difíceis",
  //   isRented: true,
  //   ownerId: "72d3659-e3c6-4685-af38-20955da062a4",
  //   photoUrl:
  //     "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   price: 35,
  //   ratingsAvg: 4.8,
  //   rentedSince: "2024-04-01T10:00:00+00:00",
  //   reviewsQuantity: 25,
  //   rim: 27.5,
  //   timesRented: 5,
  //   title: "Specialized Rockhopper Aro 27.5",
  //   users: {
  //     createdAt: "2024-04-24T23:26:28.316",
  //     email: "email@email.com",
  //     id: "a4c0a7e3-1ac1-4a28-8b80-3bcbbe36bdc9",
  //     location: "Boa Viagem, Recife - PE",
  //     name: "Roberta Gouveia",
  //     phone: "81988882222",
  //     photoUrl: "https://randomuser.me/api/portraits/women/56.jpg",
  //     rents: 0,
  //     reviewsQuantity: 0,
  //   },
  // },

  // {
  //   id: 4,
  //   brand: "Scott Aspect 950",
  //   createdAt: "2024-01-25T11:45:00+00:00",
  //   description: "Perfeita para iniciantes",
  //   isRented: false,
  //   ownerId: "85e3659-f4c6-4685-af38-20955da062a5",
  //   photoUrl:
  //     "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   price: 28,
  //   ratingsAvg: 4.3,
  //   rentedSince: null,
  //   reviewsQuantity: 10,
  //   rim: 29,
  //   timesRented: 1,
  //   title: "Scott Aspect 950 Aro 29",
  //   users: {
  //     createdAt: "2024-04-24T23:26:28.316",
  //     email: "email@email.com",
  //     id: "a4c0a7e3-1ac1-4a28-8b80-3bcbbe36bdc9",
  //     location: "Boa Viagem, Recife - PE",
  //     name: "Roberta Gouveia",
  //     phone: "81988882222",
  //     photoUrl: "https://randomuser.me/api/portraits/women/56.jpg",
  //     rents: 0,
  //     reviewsQuantity: 0,
  //   },
  // },

  // {
  //   id: 5,
  //   brand: "GT Aggressor Pro",
  //   createdAt: "2024-05-10T13:00:00+00:00",
  //   description: "Bike agressiva para terrenos difíceis",
  //   isRented: true,
  //   ownerId: "96f3659-g5c6-4685-af38-20955da062a6",
  //   photoUrl:
  //     "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   price: 32,
  //   ratingsAvg: 4.6,
  //   rentedSince: "2024-07-01T08:00:00+00:00",
  //   reviewsQuantity: 20,
  //   rim: 27.5,
  //   timesRented: 4,
  //   title: "GT Aggressor Pro Aro 27.5",
  //   users: {
  //     createdAt: "2024-04-24T23:26:28.316",
  //     email: "email@email.com",
  //     id: "a4c0a7e3-1ac1-4a28-8b80-3bcbbe36bdc9",
  //     location: "Boa Viagem, Recife - PE",
  //     name: "Roberta Gouveia",
  //     phone: "81988882222",
  //     photoUrl: "https://randomuser.me/api/portraits/women/56.jpg",
  //     rents: 0,
  //     reviewsQuantity: 0,
  //   },
  // },
];

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
  setAllBikesHandler: (bikes: IBike[]) => void;
  startDateHandler: (date: string | null) => void;
  endTimeHandler: (time: Time) => void;
  startTimeHandler: (time: Time) => void;
  endDateHandler: (date: string | null) => void;
  selectDatesHandler: (dates: MarkedDates) => void;
  resetDatesHandler: () => void;
  setRentedBikeHandler: (bike: RentedBike) => void;
  inputFilterHandler: (query: string) => void;
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
};

export const BikesContext = createContext<IBikesContext>({} as IBikesContext);

const BikesContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [bikesList, setBikesList] = useState<IBike[]>([]); //mockBikesList
  const [filteredBikesList, setFilteredBikesList] = useState<IBike[]>([]);
  const [rentedBike, setRentedBike] = useState<RentedBike | null>(null);
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [inputFilter, setInputFilter] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Time>({
    hours: "00",
    minutes: "00",
  });
  const [endTime, setEndTime] = useState<Time>({ hours: "00", minutes: "00" });

  useEffect(() => {
    if (inputFilter === null || inputFilter.trim() === "") {
      setFilteredBikesList(bikesList);
    } else {
      const lowercasedFilter = inputFilter.toLowerCase();
      const filteredList = bikesList?.filter(
        (bike) =>
          bike.title.toLowerCase().includes(lowercasedFilter) ||
          bike.description.toLowerCase().includes(lowercasedFilter) ||
          bike.brand.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredBikesList(filteredList);
    }
  }, [inputFilter, bikesList]);

  const setAllBikesHandler = (bikes: IBike[]) => {
    setBikesList(bikes);
  };

  const setRentedBikeHandler = (bike: RentedBike) => {
    setRentedBike(bike);
  };

  const inputFilterHandler = (query: string) => {
    setInputFilter(query);
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
  };

  return (
    <BikesContext.Provider value={value}>{children}</BikesContext.Provider>
  );
};

export default BikesContextProvider;
