import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DateData, LocaleConfig } from "react-native-calendars";
import { Calendar } from "react-native-calendars";
import { color } from "react-native-elements/dist/helpers";
import { colors, texts } from "../../utils/custom-styles";
import { IBike } from "../../domain/Bike";
import { BikesContext } from "../../store/BikesContext";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import OutlineButton from "../../components/buttons/OulineButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import TimeBox from "../../components/time-box/TimeBox";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar.",
    "Abr.",
    "Mai.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt-br";

interface MarkedDates {
  [date: string]: {
    selected: boolean;
    color: string;
    textColor: string;
  };
}

const BikeAvailability = ({ navigation, route }: any) => {
  const bikeId = route.params.bikeId;
  const {
    bikesList,
    startDate,
    endDate,
    startTime,
    endTime,
    startDateHandler,
    endDateHandler,
    startTimeHandler,
    endTimeHandler,
    selectedDates,
    selectDatesHandler,
    resetDatesHandler,
  } = useContext(BikesContext);

  const bike = bikesList.find((item: IBike) => item.id == bikeId);

  // const [selectedDates, selectDatesHandler] = useState<MarkedDates>({});
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  // const [startHour, setStartHour] = useState<string | null>(null);
  // const [endHour, setEndHour] = useState<string | null>(null);
  // const [visible, setVisible] = useState(false);
  // const [date, setDate] = useState(new Date());
  // const [open, setOpen] = useState(false);

  const onDayPress = (day: DateData) => {
    let newSelectedDates = { ...selectedDates };

    if (newSelectedDates[day.dateString]) {
      delete newSelectedDates[day.dateString];

      if (day.dateString === startDate) {
        startDateHandler(null);
        endDateHandler(null);
      } else if (day.dateString === endDate) {
        endDateHandler(null);
      }

      selectDatesHandler(newSelectedDates);
      return;
    }

    if (!startDate) {
      startDateHandler(day.dateString);
      newSelectedDates[day.dateString] = {
        selected: true,
        color: "#5464FF",
        textColor: "white",
      };
    } else if (!endDate) {
      if (day.dateString < startDate) {
        return;
      } else {
        endDateHandler(day.dateString);
        newSelectedDates[day.dateString] = {
          selected: true,
          color: "#5464FF",
          textColor: "white",
        };
      }
    } else {
      newSelectedDates = {
        [day.dateString]: {
          selected: true,
          color: "#5464FF",
          textColor: "white",
        },
      };
      startDateHandler(day.dateString);
      endDateHandler(null);
    }

    selectDatesHandler(newSelectedDates);
  };

  const handleStartTime = (event: any, selectedTime: Date | undefined) => {
    if (event.type === "set" && selectedTime) {
      setStart(selectedTime);
      const timeHour = selectedTime
        .toLocaleTimeString("pt-BR")
        .slice(0, 5)
        .split(":");
      startTimeHandler({ hours: timeHour[0], minutes: timeHour[1] });
    }
    setShowStart(false);
  };

  const handleEndTime = (event: any, selectedTime: Date | undefined) => {
    if (event.type === "set" && selectedTime) {
      setEnd(selectedTime);
      const timeHour = selectedTime
        .toLocaleTimeString("pt-BR")
        .slice(0, 5)
        .split(":");
      endTimeHandler({ hours: timeHour[0], minutes: timeHour[1] });
    }
    setShowEnd(false);
  };

  const showStartTimePicker = () => {
    setShowStart(true);
  };
  const showEndTimePicker = () => {
    setShowEnd(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: colors.primary[5],
            width: "100%",
            borderRadius: 20,
            overflow: "hidden",
            padding: 10,
          }}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ebebeb",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#5464FF",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "#333",
            textDisabledColor: "#999999",
          }}
          current={new Date().toDateString()}
          minDate={new Date().toDateString()}
          onDayPress={onDayPress}
          markedType={"period"}
          markedDates={selectedDates}
        />
      </View>
      <View style={styles.timeContainer}>
        <Text
          style={[
            texts.dmText.regular,
            { fontSize: 16, textAlign: "center", marginBottom: 10 },
          ]}
        >
          A bicicleta apenas estará disponível para diárias.
        </Text>

        <View style={{ alignItems: "center", marginTop: 10, gap: 20 }}>
          <Pressable onPress={showStartTimePicker}>
            <View style={{ width: "80%", gap: 10 }}>
              <SecondaryButton
                onPress={showEndTimePicker}
                title="Selecionar horário para pegar a bike"
              />
              <TimeBox
                time={{ hours: startTime.hours, minutes: startTime.minutes }}
              />
            </View>
          </Pressable>
          <Pressable onPress={showEndTimePicker}>
            <View style={{ width: "80%", gap: 10 }}>
              <SecondaryButton
                onPress={showEndTimePicker}
                title="Selecionar horário para devolver a bike"
              />
              <TimeBox
                time={{ hours: endTime.hours, minutes: endTime.minutes }}
              />
            </View>
          </Pressable>
        </View>
        {showStart && (
          <DateTimePicker
            value={start || new Date()}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleStartTime}
          />
        )}

        {showEnd && (
          <DateTimePicker
            value={end}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleEndTime}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1 }}>
          <OutlineButton
            onPress={() => {
              resetDatesHandler();
              navigation.goBack();
            }}
            title="Cancelar"
          />
        </View>
        <View style={{ flex: 1 }}>
          <PrimaryButton
            onPress={() => {
              if (!startDate) {
                Alert.alert("Data de início é obrigatório.");
                return;
              }
              if (!endDate) {
                Alert.alert("Data de entrega é obrigatório.");
                return;
              }
              if (startTime.hours === "00" && startTime.minutes === "00") {
                Alert.alert("Selecione um horário para pegar a bike.");
                return;
              }
              if (endTime.hours === "00" && endTime.minutes === "00") {
                Alert.alert("Selecione um horário para devolver a bike.");
                return;
              }
              navigation.navigate("bike-rent-summary", { bikeId });
            }}
            title="Próximo"
          />
        </View>
      </View>
    </View>
  );
};

export default BikeAvailability;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 20,
    gap: 20,
    flex: 1,
  },
  calendarContainer: {
    width: "95%",
    marginTop: 20,
  },
  timeContainer: {
    flex: 1,
    width: "100%",
  },
  chooseDateContainer: {
    width: "100%",
    marginTop: 20,
  },
  dateContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  date: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.primary[6],
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.primary[4],
    borderRadius: 10,
  },
  buttonContainer: {
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 20,
    gap: 40,
    overflow: "hidden",
  },
});
