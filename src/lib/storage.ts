import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data', 'users.json');

export async function readUsers() {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

export async function writeUsers(users: any[]) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}
