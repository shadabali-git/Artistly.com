// lib/auth.ts
import bcrypt from 'bcryptjs';
import { readUsers, writeUsers } from './storage';

export async function signupUser(username: string, password: string) {
  const users = await readUsers();
  const existing = users.find((u: any) => u.username === username);
  if (existing) throw new Error('User already exists');

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashed };
  await writeUsers([...users, newUser]);
  return newUser;
}

export async function loginUser(username: string, password: string) {
  const users = await readUsers();
  const user = users.find((u: any) => u.username === username);
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  return user;
}
