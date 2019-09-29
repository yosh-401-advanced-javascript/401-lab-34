
export default (state = [], { type, payload }) => {
  switch (type) {
    case 'PANTRY_CREATE':
      return [...state, payload];
    case 'PANTRY_UPDATE':
      return state.map((elephant) => (elephant.id === payload.id ? payload : elephant));
    case 'PANTRY_DELETE':
      return state.filter((elephant) => elephant.id !== payload);
    default:
      return state;
  }
};
