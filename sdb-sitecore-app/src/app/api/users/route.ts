import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';
import { UserService } from '@/services/user.service';

export async function GET() {
  try {
    await initDB();

    const service = new UserService();
    const users = await service.getUsers();

    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
