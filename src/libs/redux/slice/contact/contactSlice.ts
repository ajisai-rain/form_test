import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ContactSliceState } from "./contactSliceState";

const initialState: ContactSliceState = {
  step: 0,
};

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    reset: () => initialState,
    updateStep: (state, { payload }: PayloadAction<"next" | "prev">) => {
      if (payload === "next") {
        state.step += 1;
      } else {
        state.step -= 1;
      }
    },
    updateInputValues: (
      state,
      { payload }: PayloadAction<ContactSliceState["inputValues"]>
    ) => {
      state.inputValues = payload
    },
  },
});
