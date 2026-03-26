import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

import { deleteVote } from '@/lib/kv';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function DELETE(
  req: NextRequest,
  { params }: { params: { voteId: string } }
) {
  if (req.headers.get('authorization') !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await deleteVote(params.voteId);
  return NextResponse.json({ success: true });
}
