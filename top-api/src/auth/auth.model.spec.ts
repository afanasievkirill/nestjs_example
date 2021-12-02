import { UserModel } from './user.model';

describe('AuthModel', () => {
  it('should be defined', () => {
    expect(new UserModel()).toBeDefined();
  });
});
