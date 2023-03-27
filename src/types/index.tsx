export interface Dispatch {
  dispatchNumber: number;
  dispatchName: string;
  dispatchTerminal: string;
  driverName: string;
  dispatchTime: {
    startDate: string;
    endDate: string;
  };
}

export interface Parent {
  id: string;
  cardName: string;
  cardCount: number;
  color?: string;
  isDefault: boolean;
  dispatches: Dispatch[] | [];
}
