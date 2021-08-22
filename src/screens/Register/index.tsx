import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';
import * as yup from 'yup';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { useAuth } from '../../hooks/useAuth';
import { CategorySelect } from '../CategorySelect';
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionType,
} from './styles';

type RegisterFormData = {
  name: string;
  amount: string;
};

type NavigationProps = {
  navigate: (screen: string) => void;
};

const schema = yup.object().shape({
  name: yup.string().required('Informe o nome da transação'),
  amount: yup
    .number()
    .typeError('Esse campo aceita apenas números')
    .required('Informe o valor da transação')
    .positive('O valor não pode ser negativo'),
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const { user } = useAuth();

  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelect(type: 'in' | 'out') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setIsCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setIsCategoryModalOpen(false);
  }

  async function handleRegister({ name, amount }: RegisterFormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione uma categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name,
      amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const collectionKey = `gofinances:transactions_user:${user.id}`;

      const transactions = await AsyncStorage.getItem(collectionKey);
      const currentTransactions = transactions ? JSON.parse(transactions) : [];

      const formattedTransactions = [...currentTransactions, newTransaction];

      await AsyncStorage.setItem(
        collectionKey,
        JSON.stringify(formattedTransactions)
      );

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível cadastrar a transação');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionType>
              <TransactionTypeButton
                type="in"
                title="Entrada"
                onPress={() => handleTransactionTypeSelect('in')}
                isActive={transactionType === 'in'}
              />
              <TransactionTypeButton
                type="out"
                title="Saída"
                onPress={() => handleTransactionTypeSelect('out')}
                isActive={transactionType === 'out'}
              />
            </TransactionType>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={isCategoryModalOpen} animationType="slide">
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
