import React from 'react';
import ProductCard from '../components/ProductCard';
import { Container, Typography, Grid2 } from '@mui/material';

const products = [
  { id: 1, name: 'Laptop', description: 'High performance laptop', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Smartphone', description: 'Latest smartphone', image: 'https://via.placeholder.com/150' },
];

const insurances = [
  { id: 1, name: 'Laptop Insurance', details: 'Covers accidental damage' },
  { id: 2, name: 'Smartphone Insurance', details: 'Covers loss and damage' },
];

function Home() {
  return (
    <Container maxWidth="lg" style={{ paddingTop: '40px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>
      <Grid2 container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}

export default Home;
