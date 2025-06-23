import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const user = await loginUser(username, password);
    return NextResponse.json({ message: 'Login successful', user });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}
