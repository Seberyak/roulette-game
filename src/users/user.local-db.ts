import { User } from './dto/user.entity';

export const UserLocalDb: { users: User[] } = {
  users: [
    {
      id: '1',
      username: 'admin',
      password: 'admin',
      balance: 100,
    },
    {
      id: '2',
      username: 'null',
      password: 'null',
      balance: 1,
    },

    {
      id: '3',
      username: 'test',
      password: 'test',
      balance: -1,
    },
    {
      id: '4',
      username: 'half',
      password: 'half',
      balance: 50,
    },
  ],
};
