import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import config from '../config';

function TabItem({
  href,
  isActive,
  title,
}: {
  href: string;
  isActive: boolean;
  title: string;
}) {
  if (isActive)
    return (
      <span className={`text-white font-semibold underline`}>{title}</span>
    );

  return (
    <Link href={href}>
      <a className={`text-white text-opacity-60`}>{title}</a>
    </Link>
  );
}

function HomeTab() {
  const router = useRouter();
  const tab = router.query.tab;
  const tabs = ['register', 'resend-instruction', 'test-webhook'];
  const baseUrl = config.publicBaseURL;

  useEffect(() => {
    if (tab === undefined && !router.pathname.includes('test-webhook'))
      router.replace(`?tab=${tabs[0]}`);
  }, [tab]);

  return (
    <div className="flex space-x-2">
      <TabItem
        href={`${baseUrl}/?tab=${tabs[0]}`}
        isActive={tab === tabs[0]}
        title="Register"
      />
      <TabItem
        href={`${baseUrl}/?tab=${tabs[1]}`}
        isActive={tab === tabs[1]}
        title="Resend Instruction"
      />
      <TabItem
        href={`${baseUrl}/${tabs[2]}`}
        isActive={router.pathname.includes('test-webhook')}
        title="Test Webhook"
      />
    </div>
  );
}

export default HomeTab;
