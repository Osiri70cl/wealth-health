import dayjs from "dayjs";

const INTIAL_SINGLE_PICKER = {
  arrow_background: "#E2E8F0",
  arrow_color: "#E2E8F0",
  arrow_hover_background: "#E2E8F0",
  current_day_background: "#EEC32D",
  day_hover_background: "transparent",
  initial_date: `${dayjs().format("YYYY-MM-DD")}`,
  dayjsLocale: "fr",
};

export default INTIAL_SINGLE_PICKER;
