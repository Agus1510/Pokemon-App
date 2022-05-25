import axios from 'axios';
import getByName from '../actions/index';

test('testing the api get method', async () => {
  jest.spyOn(axios, 'get').mockRejectedValue(new Error('error'));
  await expect(getByName('pikachuu')).rejects.toThrow('error');  // Success!
});