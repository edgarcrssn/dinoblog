import React from 'react';
import DinoCard from '../DinoCard/DinoCard';
import { Dinosaur } from '@/pages/dinosaurs';
import Grid from '../Grid/Grid';

interface Props {
  dinosaurs: Dinosaur[];
}

const DinosaursGrid = ({ dinosaurs }: Props) => {
  return (
    <>
      {dinosaurs.length ? (
        <Grid>
          {dinosaurs.map((dinosaur) => (
            <DinoCard key={dinosaur.name} dinosaur={dinosaur} />
          ))}
        </Grid>
      ) : (
        <span>Oups, no dinosaur found!</span>
      )}
    </>
  );
};

export default DinosaursGrid;
