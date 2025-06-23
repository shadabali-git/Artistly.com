import { NextResponse } from 'next/server';
import { signupUser } from '@/lib/auth';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    await signupUser(username, password);
    return NextResponse.json({ message: 'User created successfully' });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
