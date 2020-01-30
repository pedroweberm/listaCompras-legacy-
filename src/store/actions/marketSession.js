export function addSession(title) {
  return {
    type: 'ADD_SESSION',
    payload: {
      title,
    },
  };
}

export function removeSession(id) {
  return {
    type: 'REMOVE_SESSION',
    payload: {
      id,
    },
  };
}

export function setActiveSession(id) {
  return {
    type: 'SET_ACTIVE_SESSION',
    payload: {
      id,
    },
  };
}
