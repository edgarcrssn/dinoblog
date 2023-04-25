import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Index = () => {
  return (
    <>
      <Link href={'/dinosaurs'}>See dinosaurs</Link>
    </>
  );
};

export default Index;
