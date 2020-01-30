export function addItem(title) {
  return {
    type: 'ADD_ITEM',
    payload: {
      title,
    },
  };
}

export function removeItem(id) {
  return {
    type: 'REMOVE_ITEM',
    payload: {
      id,
    },
  };
}

export function checkItem(id) {
  return {
    type: 'CHECK_ITEM',
    payload: {
      id,
    },
  };
}

export function addItemImage(id, image) {
  return {
    type: 'ADD_ITEM_IMAGE',
    payload: {
      id,
      image,
    },
  };
}
