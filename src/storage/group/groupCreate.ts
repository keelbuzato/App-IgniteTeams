import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';
import { GroupsGetAll } from './groupsGetAll';

export async function groupCreate(newGroup: string) {
  try {
    const storedGrups = await GroupsGetAll();

    const groupAlreadyExists = storedGrups.includes(newGroup);
    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo cadastrado com esse nome.');
    }

    const storage = JSON.stringify([...storedGrups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
