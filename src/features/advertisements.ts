import { Advertisement } from "../types/Advertisement";

type AddItemAction = {
  type: 'advertisements/ADD';
  payload: Advertisement;
};

const addItem = (advertisement: Advertisement): AddItemAction => ({
  type: 'advertisements/ADD',
  payload: advertisement,
});

export const actions = { addItem };

type State = Advertisement[];

const advertisementReducer = (
  state: State = [],
  action: AddItemAction,
): State => {
  switch (action.type) {
    case 'advertisements/ADD':
      state.push(action.payload);
      return state;

    default:
      return state;
  }
};

export default advertisementReducer;
