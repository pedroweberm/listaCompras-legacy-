const INITIAL_STATE = {
  activeSession: null,
  sessions: [],
};

export default function marketSession(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_SESSION':
      return {
        ...state,
        sessions: [
          ...state.sessions,
          {id: uniqueId(), title: action.payload.title, items: []},
        ],
      };
    case 'REMOVE_SESSION':
      return {
        ...state,
        sessions: state.sessions.filter(
          session => session.id !== action.payload.id,
        ),
      };
    case 'SET_ACTIVE_SESSION':
      return {
        ...state,
        activeSession: state.sessions.findIndex(
          session => session.id === action.payload.id,
        ),
      };
    case 'ADD_ITEM':
      let newSessionsAdd = [...state.sessions];
      newSessionsAdd[state.activeSession].items.push({
        id: uniqueId(),
        title: action.payload.title,
        checked: false,
        image: null
      });
      return {
        ...state,
        sessions: newSessionsAdd,
      };
    case 'REMOVE_ITEM':
      const newSessionsRemove = [...state.sessions];
      newSessionsRemove[state.activeSession].items = newSessionsRemove[
        state.activeSession
      ].items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        sessions: newSessionsRemove,
      };
    case 'CHECK_ITEM':
      const newSessionsCheck = [...state.sessions];
      newSessionsCheck[state.activeSession].items = newSessionsCheck[
        state.activeSession
      ].items.map(item => {
        if (item.id === action.payload.id) {
          return {...item, checked: !item.checked};
        } else return item;
      });
      return {
        ...state,
        sessions: newSessionsCheck,
      };
    case 'ADD_ITEM_IMAGE':
        const newSessionsAddImage = [...state.sessions];
        newSessionsAddImage[state.activeSession].items = newSessionsAddImage[
          state.activeSession
        ].items.map(item => {
          if (item.id === action.payload.id) {
            return {...item, image: action.payload.image};
          } else return item;
        });
        return {
          ...state,
          sessions: newSessionsAddImage,
        };
    default:
      return state;
  }
}

const uniqueId = () => {
  const now = new Date();

  const substringDate = now.getMilliseconds().toString();

  return (
    Math.random()
      .toString(36)
      .substr(2, 9) + substringDate
  );
};
