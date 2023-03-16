export const buildLabels = ({
  proximity,
  totalPages,
  currentPageIndex,
}: {
  proximity: number;
  totalPages: number;
  currentPageIndex: number;
}) => {
  const start = 1;
  const end = totalPages;
  const current = currentPageIndex + 1;
  const getNext = (anchor: number, offset: number) =>
    Math.min(totalPages, anchor + offset);
  const getPrev = (anchor: number, offset: number) =>
    Math.max(1, anchor - offset);

  const items = [
    ...new Set([
      start,
      ...Array.from({ length: proximity }, (_item, i) => {
        return getNext(start, i + 1);
      }),
      ...Array.from({ length: proximity }, (_item, i) => {
        return getPrev(current, proximity - (i + 1));
      }),
      current,
      ...Array.from({ length: proximity }, (_item, i) => {
        return getNext(current, i + 1);
      }),
      ...Array.from({ length: proximity }, (_item, i) => {
        return getPrev(end, proximity - (i + 1));
      }),
      end,
    ]),
  ];
  return items.reduce((acc, item) => {
    const [lastItem] = acc.slice(-1);
    if (!lastItem) {
      return [...acc, item];
    }
    const isNext = item - lastItem === 1;
    if (isNext) return [...acc, item];
    return [...acc, 0, item];
  }, [] as number[]);
};
