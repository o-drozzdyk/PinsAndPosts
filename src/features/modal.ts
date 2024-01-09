type ChangeStateAction = {
  type: 'modal/CHANGE';
  payload: boolean;
};

const changeState = (value: boolean): ChangeStateAction => ({
  type: 'modal/CHANGE',
  payload: value,
});

export const actions = { changeState };

type State = boolean;

const modalReducer = (
  state: State = false,
  action: ChangeStateAction,
): State => {
  switch (action.type) {
    case 'modal/CHANGE':
      state = action.payload;
      return state;

    default:
      return state;
  }
};

export default modalReducer;
