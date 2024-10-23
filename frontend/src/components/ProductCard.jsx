import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent style={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
      </CardContent>
      <Button
        component={Link}
        to={`/product/${product.id}`}
        variant="contained"
        color="primary"
        style={{ margin: '10px' }}
      >
        View Details
      </Button>
    </Card>
  );
}

export default ProductCard;