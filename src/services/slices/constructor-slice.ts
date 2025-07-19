import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        const uniqueId = nanoid();
        return { payload: { id: uniqueId, ...ingredient } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (index > 0) {
        const [moved] = state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, moved);
      }
    },

    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (index < state.ingredients.length - 1) {
        const [moved] = state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, moved);
      }
    },

    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
