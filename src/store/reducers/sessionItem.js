const INITIAL_STATE = {
  sessions: [],
};

export default function sessionItem(state = INITIAL_STATE, action) {
  switch (action.type) {
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
