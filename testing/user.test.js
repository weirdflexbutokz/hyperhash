import { expect } from 'chai';
import sinon from 'sinon';
import { User } from '../models/users.js';

describe('User Model', () => {
  let pool;

  beforeEach(() => {
    pool = {
      execute: sinon.stub()
    };
  });

  it('should create a user', async () => {
    pool.execute.resolves([{ insertId: 1 }]);
    const user = await User.create(pool, 'testuser', 'password');
    expect(user).to.deep.equal({ id: 1, name: 'testuser', password: 'password' });
  });

  it('should find user by name', async () => {
    pool.execute.resolves([[{ id: 1, name: 'testuser', password: 'password' }]]);
    const user = await User.findByName(pool, 'testuser');
    expect(user).to.include({ name: 'testuser' });
  });

  it('should return null if user not found by name', async () => {
    pool.execute.resolves([[]]);
    const user = await User.findByName(pool, 'nouser');
    expect(user).to.be.null;
  });

  // Puedes agregar más tests para authenticate, findById, deleteAll, etc.
});
