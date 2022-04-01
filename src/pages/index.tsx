import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useIntl } from 'react-intl';

import { User } from '../modules/auth';
import { Index } from '../scenes/Index';
import { getUserInfo } from '../server/auth';

export default function IndexPage() {
  const { formatMessage } = useIntl();
  return (
    <>
      <Head>
        <title>{formatMessage({ id: 'login.title' })}</title>
      </Head>
      <Index />
    </>
  );
}
export const getServerSideProps: GetServerSideProps<{ user: User }> = async ({ req, res }) => {
  const user = await getUserInfo({ req, res });
  return {
    props: { user },
    redirect: !user ? undefined : { destination: '/timeline', permanent: false },
  };
};
