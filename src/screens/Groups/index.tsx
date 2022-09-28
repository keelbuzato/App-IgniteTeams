import { Container } from './style';
import { Header } from '@components/Header';
import React, { useState, useCallback } from 'react';
import { HighLight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { Alert, FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GroupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';
export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fechGroups() {
    try {
      setIsLoading(true);
      const data = await GroupsGetAll();
      setGroups(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turmas');
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(
    useCallback(() => {
      fechGroups();
    }, []),
  );

  return (
    <Container>
      <Header />
      <HighLight title="Turmas" subtitle="Jogue com a sua turma" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button title={'Criar nova turma'} onPress={handleNewGroup} />
    </Container>
  );
}
