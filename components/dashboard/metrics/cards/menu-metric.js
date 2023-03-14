import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function MediaCard({link, image, title, description, buttonHref}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={link}>
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        image={image}
        title={title}
      />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={buttonHref}>
        <Button size="small">View</Button>
        </Link>
      </CardActions>
    </Card>
  );
}