"use client";
import INTIAL_SINGLE_PICKER from "@/constant/intialSinglePicker";
import { SingleDatePicker } from "@osiris70cl/simple-react-date-picker";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useEffect, useMemo, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import styles from "./DatePicker.module.scss";

type Props = {
  label?: string;
  isRequired?: boolean;
  initialStartDate?: string;
  initialEndDate?: string;
  handleData: Function;
  singlePicker?: boolean;
};

const DatePicker = ({
  label,
  isRequired,
  initialEndDate,
  initialStartDate,
  handleData,
  singlePicker,
}: Props) => {
  dayjs.locale("fr");
  const [dropdown, setDropdown] = useState(false);
  const [startDate, setStartDate] = useState(
    initialStartDate && initialStartDate !== null
      ? dayjs(initialStartDate).format("DD/MM/YYYY")
      : dayjs().format("DD/MM/YYYY")
  );
  const [endDate, setEndDate] = useState(
    initialEndDate ? dayjs(initialEndDate).format("DD/MM/YYYY") : null
  );
  const [initialDataPackage, setInitialDataPackage] =
    useState(INTIAL_SINGLE_PICKER);

  const handleCloseDropdown = () => {
    setDropdown(false);
  };

  useEffect(() => {
    if (initialStartDate && initialStartDate !== null) {
      setStartDate(dayjs(initialStartDate).format("DD/MM/YYYY"));
    }
  }, [initialStartDate]);

  const dropdownRef = useOutsideClick(handleCloseDropdown);

  const handleDataSelected = (data: any) => {
    if (data) {
      handleData(dayjs(data).format());
      setDropdown(false);
      if (singlePicker) {
        setStartDate(data.startDate);
      } else {
        setStartDate(dayjs(data.startDate).format("DD/MM/YYYY"));
        setEndDate(dayjs(data.endDate).format("DD/MM/YYYY"));
      }
    }
  };
  useEffect(() => {
    setInitialDataPackage({
      ...initialDataPackage,
      initial_date: initialStartDate
        ? initialStartDate
        : `${dayjs().format("YYYY-MM-DD")}`,
    });
  }, [initialStartDate]);

  const handleSelect = () => {
    if (singlePicker) {
      setDropdown(!dropdown);
    }
  };

  // const renderButton = useMemo(() => {
  //   return (

  //   );
  // }, [startDate, endDate, singlePicker]);

  const handleClose = () => {
    setDropdown(false);
  };

  const renderDropdown = useMemo(() => {
    console.log("dropdown", initialDataPackage);
    if (dropdown) {
      return (
        <>
          {singlePicker ? (
            <div className={styles.modal}>
              <div className={styles.content} ref={dropdownRef}>
                <SingleDatePicker
                  handleSelectedDate={handleDataSelected}
                  initialData={initialDataPackage}
                  canChangeYear={true}
                />
              </div>
            </div>
          ) : null}
        </>
      );
    }
  }, [dropdown, initialDataPackage, initialEndDate, initialStartDate]);

  return (
    <div className={styles.datePicker}>
      {label && (
        <label>
          {label} {isRequired && <span>*</span>}
        </label>
      )}
      <button
        type="button"
        className={styles.dateDisplay}
        onClick={handleSelect}
      >
        <CalendarBlank weight="bold" />
        <span className={styles.startDate}>{startDate}</span>
        {endDate && !singlePicker && (
          <>
            <ArrowRight weight="bold" />
            <span>{endDate}</span>
          </>
        )}
      </button>
      {renderDropdown}
    </div>
  );
};

export default DatePicker;
