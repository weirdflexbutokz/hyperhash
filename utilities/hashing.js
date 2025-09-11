import bcrypt from 'bcrypt';

export function bcryptHash(input) {
  const saltRounds = 10;
  return bcrypt.hashSync(input, saltRounds);
}

export function compareBcrypt(input, hash) {
  return bcrypt.compareSync(input, hash);
}
