type ChangeStateAction = {
  type: 'mapModal/CHANGE';
  payload: boolean;
};

const changeState = (value: boolean): ChangeStateAction => ({
  type: 'mapModal/CHANGE',
  payload: value,
});

export const actions = { changeState };

type State = boolean;

const mapModalReducer = (
  state: State = false,
  action: ChangeStateAction,
): State => {
  switch (action.type) {
    case 'mapModal/CHANGE':
      state = action.payload;
      return state;

    default:
      return state;
  }
};

export default mapModalReducer;
