"use client";
import { fr } from "date-fns/locale";
import React, { useState } from "react";
import DatePicker, { setDefaultLocale, registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
setDefaultLocale("fr");
registerLocale("fr", fr);

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date as Date)}
      showTimeInput
      className="
      "
      placeholderText="This display holidays"
      //   timeClassName={}
      holidays={[
        { date: "2023-08-15", holidayName: "India's Independence Day" },
        { date: "2023-12-31", holidayName: "New Year's Eve" },
        { date: "2023-12-25", holidayName: "Christmas" },
        { date: "2024-01-01", holidayName: "New Year's Day" },
        { date: "2023-11-23", holidayName: "Thanksgiving Day" },
        { date: "2025-12-25", holidayName: "Fake holiday" },
      ]}
    />
  );
};

export default CustomDatePicker;
