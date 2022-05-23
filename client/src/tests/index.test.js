import axios from 'axios';
import getByName from './index';

test('testing the api get method', async () => {
  jest.spyOn(axios, 'get').mockRejectedValue(new Error('error'));
  await expect(getByName('pikacu')).rejects.toThrow('error');  // Success!
});