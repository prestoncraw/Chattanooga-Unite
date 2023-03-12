import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/images/graph.png"
        title="metrics "
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Metrics
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Metrics for non-matching services and county searches
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
}