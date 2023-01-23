import moment from "moment";

export const validateYear = (data) => {
  const current_year = moment().year();
  const selected_year = moment(data).year();

  console.log("current_year ", current_year);
  console.log("selected_year ", selected_year);

  if (selected_year < 1920 || selected_year > current_year) {
    return false;
  }

  return true;
};
