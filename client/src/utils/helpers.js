export function getCurrentDayTime(time) {
  const cur_time = new Date(Date.now());
  const year = cur_time.getFullYear();
  const month = cur_time.getMonth();
  const day = cur_time.getDate();
  // check current day if it is in open day
  //   const theday = cur_time.getDay();

  // take open and close time eg 10:00 17:00
  // split and extract hours and minute of the current date
  // use that to create everyday open and close hour
  const close = time.split(":").map((el) => Number(el));
  return new Date(year, month, day, close.at(0), close.at(1));
}
