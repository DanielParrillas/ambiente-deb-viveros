import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import calendar from "dayjs/plugin/calendar";
import "dayjs/locale/es-mx";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const formatCalendar = {
  sameDay: "[hoy a las] h:mm A", // The same day ( Today at 2:30 AM )
  nextDay: "[mañana a las] h:mm A", // The next day ( Tomorrow at 2:30 AM )
  nextWeek: "dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
  lastDay: "[ayer a las] h:mm A", // The day before ( Yesterday at 2:30 AM )
  lastWeek: "[Last] dddd [at] h:mm A", // Last week ( Last Monday at 2:30 AM )
  sameElse: "DD/MM/YYYY", // Everything else ( 17/10/2011 )
};

export function setDayFormat() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localizedFormat);
  dayjs.locale("es-mx");
  // dayjs.extend(calendar);
  // dayjs.extend(updateLocale);
  // dayjs.updateLocale("es-mx", {
  //   calendar: {
  //     sameDay: "[hoy]", // The same day ( Today at 2:30 AM )
  //     nextDay: "[ayer]", // The next day ( Tomorrow at 2:30 AM )
  //     nextWeek: "ll", // The next week ( Sunday at 2:30 AM )
  //     lastDay: "[mañana]", // The day before ( Yesterday at 2:30 AM )
  //     lastWeek: "ll", // Last week ( Last Monday at 2:30 AM )
  //     sameElse: "ll", // Everything else ( 17/10/2011 )
  //   },
  // });
  // dayjs().calendar();
}
