const calculateDateDifference = (targetDate: string) => {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  const timeDifference: number =
    targetDateTime.getTime() - currentDate.getTime();

  const daysDifference = Math.round(
    Math.abs(timeDifference / (1000 * 60 * 60 * 24))
  );

  const weeksDifference = Math.round(
    Math.abs(timeDifference / (1000 * 60 * 60 * 24 * 7))
  );

  return { days: daysDifference, weeks: weeksDifference };
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export { calculateDateDifference, capitalizeFirstLetter };
