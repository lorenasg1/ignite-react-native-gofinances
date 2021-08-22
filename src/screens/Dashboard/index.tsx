import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { HighlightCard } from '../../components/HighlightCard';
import { Transaction, TransactionCard } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/useAuth';
import {
  Container,
  Header,
  HighLightCards,
  Icon,
  Loading,
  LogoutButton,
  Photo,
  Title,
  Transactions,
  TransactionsList,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from './styles';

export interface TransactionProps extends Transaction {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightDataProps {
  in: HighlightProps;
  out: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightDataProps>(
    {} as HighlightDataProps
  );

  const { signOut, user } = useAuth();

  const theme = useTheme();

  function getLastTransactionDate(
    transactions: TransactionProps[],
    type: 'in' | 'out'
  ) {
    const filteredTransaction = transactions.filter(
      (transaction) => transaction.type === type
    );

    if (filteredTransaction.length === 0) return 0;

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        filteredTransaction.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      { month: 'long' }
    )}`;
  }

  async function loadTransactions() {
    setIsLoading(true);
    const collectionKey = `gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(collectionKey);
    const currentTransactions = response ? JSON.parse(response) : [];

    let inTotal = 0;
    let outTotal = 0;

    const formattedTransactions: TransactionProps[] = currentTransactions.map(
      (transaction: TransactionProps) => {
        if (transaction.type === 'in') {
          inTotal += Number(transaction.amount);
        } else {
          outTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          .replace('R$', 'R$ ');

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          type: transaction.type,
          category: transaction.category,
          amount,
          date,
        };
      }
    );

    setTransactions(formattedTransactions);

    const lastIncomeTransactionDate = getLastTransactionDate(
      currentTransactions,
      'in'
    );
    const lastOutcomeTransactionDate = getLastTransactionDate(
      currentTransactions,
      'out'
    );

    const totalInterval =
      lastIncomeTransactionDate && lastOutcomeTransactionDate === 0
        ? 'Não há transações'
        : `01 a ${lastOutcomeTransactionDate || lastIncomeTransactionDate}`;
    const total = inTotal - outTotal;

    setHighlightData({
      in: {
        amount: inTotal
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          .replace('R$', 'R$ '),
        lastTransaction:
          lastIncomeTransactionDate === 0
            ? 'Não há transações'
            : `Última entrada dia ${lastIncomeTransactionDate}`,
      },
      out: {
        amount: outTotal
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          .replace('R$', 'R$ '),
        lastTransaction:
          lastOutcomeTransactionDate === 0
            ? 'Não há transações'
            : `Última saída dia ${lastOutcomeTransactionDate}`,
      },
      total: {
        amount: total
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          .replace('R$', 'R$ '),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }

  async function handleSignOut() {
    await signOut();
  }

  useEffect(() => {
    loadTransactions();

    // const collectionKey = `gofinances:transactions_user:${user.id}`;
    // AsyncStorage.removeItem(collectionKey);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <Loading color={theme.colors.secondary} size="large" />
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={handleSignOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighLightCards>
            <HighlightCard
              type="in"
              title="Entradas"
              amount={highlightData?.in?.amount}
              lastTransaction={highlightData?.in?.lastTransaction}
            />
            <HighlightCard
              type="out"
              title="Saídas"
              amount={highlightData?.out?.amount}
              lastTransaction={highlightData?.out?.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData?.total?.lastTransaction}
            />
          </HighLightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
