import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';
import {
  CategoryItem,
  Container,
  Divider,
  Footer,
  Header,
  Icon,
  Name,
  Title,
} from './styles';

type Category = {
  key: string;
  name: string;
};

interface CategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) {
  function handleCategorySelect(category: Category) {
    setCategory(category);
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        style={{ flex: 1, width: '100%' }}
        renderItem={({ item }) => (
          <CategoryItem
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </CategoryItem>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
