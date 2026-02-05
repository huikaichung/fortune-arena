import { DetailPage } from '@/components/DetailPage';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Details({ params }: Props) {
  const { id } = await params;
  return <DetailPage manualId={id} />;
}
