import { Metadata } from 'next';
import { ManualPage } from '@/components/ManualPage';

export const metadata: Metadata = {
  title: '我的使用說明書 | 你的使用說明書',
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Manual({ params }: Props) {
  const { id } = await params;
  return <ManualPage manualId={id} />;
}
