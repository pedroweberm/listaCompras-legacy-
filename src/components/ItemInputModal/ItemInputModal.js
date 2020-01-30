import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch} from 'react-redux';

import * as SessionItem from '../../store/actions/sessionItem';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 250,
    marginTop: 100,
    elevation: 10,
  },
  confirmButton: {
    backgroundColor: '#333',
    width: '100%',
    aspectRatio: 10 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
  },
  confirmButtonText: {
    fontSize: 20,
    color: '#f0f0f0',
    fontWeight: 'bold',
  },
});

const ItemInputModal = ({showModal, setShow}) => {
  const [textValue, onChangeText] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    onChangeText(null);
  }, [showModal]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShow(!showModal);
      }}>
      <View style={styles.modal}>
        <View style={{flex: 2, alignSelf: 'stretch'}} />
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              minWidth: 100,
              maxWidth: 200,
              alignSelf: 'center',
              marginBottom: 50,
            }}
            placeholder={'Novo item'}
            onChangeText={text => onChangeText(text)}
            value={textValue}
          />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            testID={'cancelButton'}
            style={styles.confirmButton}
            onPress={() => {
              setShow(!showModal);
            }}>
            <Text style={styles.confirmButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={'confirmButton'}
            style={styles.confirmButton}
            onPress={() => {
              dispatch(SessionItem.addItem(textValue));
              setShow(!showModal);
            }}>
            <Text style={styles.confirmButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ItemInputModal;
