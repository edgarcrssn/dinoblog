import React from 'react';
import styles from './DinoCard.module.scss';
import { Dinosaur } from '@/pages/dinosaurs/index';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { formatName } from '@/utils/formatName';
import Link from 'next/link';

interface Props {
  dinosaur: Dinosaur;
}

const { Meta } = Card;

const DinoCard = ({ dinosaur }: Props) => {
  return (
    <li className={styles.dinoCard}>
      <Card
        style={{ width: '100%' }}
        cover={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={`Representation of a ${formatName(dinosaur.name)}`}
            src={dinosaur.image}
          />
        }
        actions={[
          <Link key={dinosaur.name} href={`/dinosaurs/${dinosaur.name}`}>
            Read more
          </Link>,
        ]}
      >
        <Meta
          title={formatName(dinosaur.name)}
          description={
            <span className={styles.shortDescription}>
              {dinosaur.description}
            </span>
          }
        />
      </Card>
    </li>
  );
};

export default DinoCard;
