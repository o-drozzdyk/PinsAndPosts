type AddRegionAction = {
  type: 'regions/ADD';
  payload: string;
};

type RemoveRegionAction = {
  type: 'regions/DELETE';
  payload: string;
};

type ClearRegionsAction = {
  type: 'regions/CLEAR';
};

const addRegion = (region: string): AddRegionAction => ({
  type: 'regions/ADD',
  payload: region,
});

const removeRegion = (region: string): RemoveRegionAction => ({
  type: 'regions/DELETE',
  payload: region,
});

const clearRegions = (): ClearRegionsAction => ({
  type: 'regions/CLEAR',
});

export const actions = { addRegion, removeRegion, clearRegions };

type State = string[];
type Action = AddRegionAction | RemoveRegionAction | ClearRegionsAction;

const regionsReducer = (
  state: State = [],
  action: Action,
): State => {
  switch (action.type) {
    case 'regions/ADD':
      if (!state.includes(action.payload)) {
        return [...state, action.payload];
      } else {
        return state.filter(region => region !== action.payload);
      }

    case 'regions/DELETE':
      return state.filter(region => region !== action.payload);

    case 'regions/CLEAR':
      return [];

    default:
      return state;
  }
};

export default regionsReducer;
