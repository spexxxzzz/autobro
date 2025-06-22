import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isFlagEnabled } from '@/lib/feature-flags';

export const metadata: Metadata = {
  title: 'Create Agent | AutoBro',
  description: 'Interactive agent playground powered by AutoBro',
  openGraph: {
    title: 'Agent Playground | AutoBro',
    description: 'Interactive agent playground powered by AutoBro',
    type: 'website',
  },
};

export default async function NewAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const agentPlaygroundEnabled = await isFlagEnabled('custom_agents');
  if (!agentPlaygroundEnabled) {
    redirect('/dashboard');
  }
  return <>{children}</>;
}
