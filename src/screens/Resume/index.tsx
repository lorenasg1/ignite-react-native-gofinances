import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/core';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import { useAuth } from '../../hooks/useAuth';
import { categories } from '../../utils/categories';
import {
  ChartContainer,
  Container,
  Content,
  Header,
  Loading,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title,
} from './styles';

type TransactionData = {
  id: string;
  type: 'in' | 'out';
  name: string;
  amount: string;
  category: string;
  date: string;
};

interface CategoryData {
  name: string;
  total: number;
  formattedTotal: string;
  color: string;
  percentage: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategoires] = useState<CategoryData[]>(
    []
  );

  const { user } = useAuth();

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'previous') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  let formattedDate = format(selectedDate, 'MMMM, yyyy', { locale: ptBR });

  async function loadHistory() {
    setIsLoading(true);
    const collectionKey = `gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(collectionKey);
    const transactions = response ? JSON.parse(response) : [];

    const outcome = transactions.filter(
      (transaction: TransactionData) =>
        transaction.type === 'out' &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
    );

    const outComeTotal = outcome.reduce((acc: number, out: TransactionData) => {
      return acc + Number(out.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categoryTotal = 0;

      outcome.forEach((out: TransactionData) => {
        if (out.category === category.key) {
          categoryTotal += Number(out.amount);
        }
      });

      if (categoryTotal > 0) {
        const formattedTotal = categoryTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percentage = `${((categoryTotal / outComeTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          name: category.name,
          total: categoryTotal,
          formattedTotal,
          color: category.color,
          percentage,
        });
      }
    });

    setTotalByCategoires(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <Loading color={theme.colors.secondary} size="large" />
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('previous')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>{formattedDate}</Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x="percentage"
              y="total"
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              padding={16}
              height={250}
            />
          </ChartContainer>

          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.name}
              color={item.color}
              title={item.name}
              amount={item.formattedTotal}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
