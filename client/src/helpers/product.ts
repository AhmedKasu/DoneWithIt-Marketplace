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

const getPreviousPrice = (
  priceHistories: { price: number; createdAt: string }[] | undefined
) => {
  const sortedPriceHistories = priceHistories?.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const priceHistoriesLength = sortedPriceHistories?.length ?? 0;
  const priceChanged: boolean = priceHistoriesLength > 1;
  const prevPriceIndex = priceHistoriesLength - 2;

  const prevPrice: number | undefined = priceChanged
    ? sortedPriceHistories?.[prevPriceIndex].price
    : undefined;

  return { prevPrice };
};

export { calculateDateDifference, capitalizeFirstLetter, getPreviousPrice };
