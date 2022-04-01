import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useIntl } from 'react-intl';

import { User } from '../modules/auth';
import { Timeline } from '../scenes/Timeline';
import { getUserInfo } from '../server/auth';

export default function HomePage() {
  const { formatMessage } = useIntl();
  return (
    <>
      <Head>
        <title>{formatMessage({ id: 'timeline.title' })}</title>
      </Head>
      <Timeline />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ user: User }> = async ({ req, res }) => {
  const user = await getUserInfo({ req, res });
  return {
    props: { user },
    redirect: !user ? { destination: '/', permanent: false } : undefined,
  };
};
