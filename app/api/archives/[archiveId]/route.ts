import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

import { getArchive, deleteArchive } from '@/lib/kv';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET(
  _req: NextRequest,
  { params }: { params: { archiveId: string } }
) {
  const archive = await getArchive(params.archiveId);
  if (!archive) {
    return NextResponse.json({ error: 'Archive not found.' }, { status: 404 });
  }
  return NextResponse.json(archive);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { archiveId: string } }
) {
  if (req.headers.get('authorization') !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await deleteArchive(params.archiveId);
  return NextResponse.json({ success: true });
}
