import Link from 'next/link';
import styles from '@/styles/Home.module.scss';
import { Button } from 'antd';

const Index = () => {
  return (
    <>
      <h1 className={styles.title}>Welcome on Dinoblog!</h1>
      <p className={styles.text}>
        Here, you will find all sorts of information about these magnificent
        prehistoric creatures. From the towering T-Rex to the gentle
        Stegosaurus, we&apos;ve got it all. <br />
        <br />
        Our blog is more than just a place to read about dinosaurs - it&apos;s
        also a community of people who share a love for these incredible
        creatures. You can post your own comments and join in on the discussion
        with other dinosaur enthusiasts. <br />
        <br />
        Explore our pages to learn about the different types of dinosaurs, their
        unique features, and how they lived millions of years ago. Our team of
        experts has carefully curated each post to provide you with accurate and
        fascinating information. <br />
        <br />
        Whether you&apos;re a long-time dinosaur lover or just discovering these
        creatures for the first time, our blog is the perfect place to satisfy
        your curiosity and connect with like-minded individuals. So come on in
        and join the fun!
      </p>
      <Button type="link" block style={{ fontSize: '1.5rem' }}>
        <Link href={'/dinosaurs'}>See dinosaurs 🦕🗿</Link>
      </Button>
    </>
  );
};

export default Index;
