import React from 'react';

import '@testing-library/jest-native/extend-expect';
import {render, fireEvent} from 'react-native-testing-library';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import ItemInputModal from './ItemInputModal';

const middlewares = [];
const mockStore = configureStore(middlewares);

const INITIAL_STATE = {
  activeSession: 0,
  sessions: [{id: '1', title: 'Sessao 1', items: []}],
};

describe('Modal show behaviour', () => {
  test('Close modal by confirm', () => {
    const mockSetShow = jest.fn(show => {
      return true;
    });
    const store = mockStore(INITIAL_STATE);

    const {getByTestId} = render(
      <Provider store={store}>
        <ItemInputModal setShow={mockSetShow} showModal={true} />
      </Provider>,
    );

    const confirmButton = getByTestId('confirmButton');
    fireEvent(confirmButton, 'press');

    expect(mockSetShow).toBeCalledTimes(1);
    expect(mockSetShow).toBeCalledWith(false);
  });

  test('Close modal by cancel', () => {
    const mockSetShow = jest.fn(show => {
      return true;
    });
    const store = mockStore(INITIAL_STATE);

    const {getByTestId} = render(
      <Provider store={store}>
        <ItemInputModal setShow={mockSetShow} showModal={true} />
      </Provider>,
    );

    const confirmButton = getByTestId('cancelButton');
    fireEvent(confirmButton, 'press');

    expect(mockSetShow).toBeCalledTimes(1);
    expect(mockSetShow).toBeCalledWith(false);
  });

  test('Open modal', () => {
    const spy = jest.fn();
    React.useState = _ => [_, spy];

    const mockSetShow = jest.fn(show => {
      return true;
    });
    const store = mockStore(INITIAL_STATE);

    const {getByTestId} = render(
      <Provider store={store}>
        <ItemInputModal setShow={mockSetShow} showModal={false} />
      </Provider>,
    );

    const confirmButton = getByTestId('confirmButton');
    fireEvent(confirmButton, 'press');

    expect(mockSetShow).toBeCalledTimes(1);
    expect(mockSetShow).toBeCalledWith(true);
  });
});
