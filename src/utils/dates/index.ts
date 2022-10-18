import moment from "moment";

export const formatToDateOnly = (date: string | Date) => {
  return moment(date).format("DD/MM/YYYY");
};
