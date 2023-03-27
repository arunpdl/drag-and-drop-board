interface IReorderList {
  cards: any[];
  sourceIndex: number;
  destinationIndex: number;
}

export const reorderList = ({
  cards,
  sourceIndex,
  destinationIndex,
}: IReorderList) => {
  const result = Array.from(cards);
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
};
