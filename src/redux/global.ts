import { DropResult } from "@hello-pangea/dnd";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { DEFAULT_CARD_COLOR, DRAG_TYPES } from "../constants";
import { Parent } from "../types";
import { reorderList } from "../utils/reorder";
import { RootState } from "./store";

interface GlobalState {
  dndData: {
    [key: string]: Parent;
  };
  orderedKeys: string[];
}

const initialState: GlobalState = {
  dndData: {
    "1AXBY": {
      id: "1AXBY",
      cardName: "Active",
      cardCount: 2,
      color: "grey",
      isDefault: true,
      dispatches: [
        {
          dispatchNumber: 1,
          dispatchName: "Dispatch 1",
          dispatchTerminal: "Terminal 1",
          driverName: "Driver 1",
          dispatchTime: {
            startDate: "2021-01-01",
            endDate: "2021-01-02",
          },
        },
        {
          dispatchNumber: 2,
          dispatchName: "Dispatch 2",
          dispatchTerminal: "Terminal 2",
          driverName: "Driver 2",
          dispatchTime: {
            startDate: "2021-01-01",
            endDate: "2021-01-02",
          },
        },
      ],
    },
    "7BDSEQ": {
      id: "7BDSEQ",
      cardName: "Completed",
      cardCount: 0,
      color: "green",
      isDefault: true,
      dispatches: [],
    },
    P9T3SD: {
      id: "P9T3SD",
      cardName: "Verified",
      cardCount: 1,
      color: "blue",
      isDefault: true,
      dispatches: [
        {
          dispatchNumber: 3,
          dispatchName: "Dispatch 3",
          dispatchTerminal: "Terminal 3",
          driverName: "Driver 3",
          dispatchTime: {
            startDate: "2021-01-01",
            endDate: "2021-01-02",
          },
        },
      ],
    },
  },
  orderedKeys: ["1AXBY", "7BDSEQ", "P9T3SD"],
};

const handleDragAndDropChildCard = (
  state: GlobalState,
  action: PayloadAction<{
    result: DropResult;
  }>
) => {
  const { source, destination } = action.payload.result;

  if (!destination) return; // Check if destination exists

  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  )
    return; // Check if source and destination cards are the same and dispatch index is also same

  const sourceCard = state.dndData[source.droppableId];
  const destinationCard = state.dndData[destination.droppableId];

  if (sourceCard === destinationCard) {
    // If dispatch is moved within the same card, just reorder the dispatches
    const newDispatches = reorderList({
      cards: sourceCard.dispatches,
      sourceIndex: source.index,
      destinationIndex: destination.index,
    });

    const newSourceCard = {
      ...sourceCard,
      dispatches: newDispatches,
    };

    state.dndData[newSourceCard.id] = newSourceCard;
  } else {
    // If dispatch is moved to a different card
    const newSourceDispatches = sourceCard?.dispatches?.filter(
      (x, idx) => idx !== source.index
    ); // Filter out the dispatch that is being moved

    const newSourceCard = {
      ...sourceCard,
      dispatches: newSourceDispatches,
    }; // Create a new source card with the filtered dispatches

    const newDestinationDispatches = [...destinationCard.dispatches]; // Create a new array of dispatches for the destination card

    newDestinationDispatches.splice(
      destination.index,
      0,
      sourceCard.dispatches[source.index]
    ); // Insert the new dispatch at end of the array

    const newDestinationCard = {
      ...destinationCard,
      dispatches: newDestinationDispatches,
    }; // Create a new destination card with the new dispatches

    state.dndData[newSourceCard.id] = newSourceCard; // Update the source card
    state.dndData[newDestinationCard.id] = newDestinationCard; // Update the destination card
  }
  Object.keys(state.dndData).forEach((key) => {
    state.dndData[key].cardCount = state.dndData[key].dispatches.length;
  }); // Update the card count for all cards
  return state;
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    addNewCard: (
      state,
      action: PayloadAction<{ cardName: string; color?: string }>
    ) => {
      const newCard = {
        id: nanoid(),
        cardName: action.payload.cardName,
        cardCount: 0,
        color: action.payload.color || DEFAULT_CARD_COLOR,
        isDefault: false,
        dispatches: [],
      };
      state.dndData[newCard.id] = newCard;
      state.orderedKeys.push(newCard.id);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      delete state.dndData[action.payload];
    },
    editCard: (
      state,
      action: PayloadAction<{ id: string; cardName: string; color?: string }>
    ) => {
      state.dndData[action.payload.id].cardName = action.payload.cardName;
      state.dndData[action.payload.id].color =
        action.payload.color || DEFAULT_CARD_COLOR;
    },

    dragAndDrop: (
      state,
      action: PayloadAction<{
        result: DropResult;
      }>
    ) => {
      const { source, destination, type } = action.payload.result;

      if (!destination) return; // Check if destination exists

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return; // Check if source and destination cards are the same and dispatch index is also same

      if (type === DRAG_TYPES.PARENT_CARD) {
        const orderedKeys = reorderList({
          cards: state.orderedKeys,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });
        state.orderedKeys = orderedKeys;
        return;
      } else {
        handleDragAndDropChildCard(state, action);
      }
    },
  },
});

export const { dragAndDrop, addNewCard, editCard, removeCard } =
  globalSlice.actions;

export const globalState = (state: RootState) => state.global;

export default globalSlice.reducer;
