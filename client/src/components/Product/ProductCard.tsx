import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Props {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  onSelect: (id: number) => void;
}

export default function ProductCard({
  id,
  title,
  price,
  imageUrl,
  onSelect,
}: Props) {
  return (
    <Card elevation={0}>
      <CardActionArea
        onClick={() => onSelect(id)}
        sx={{
          maxHeight: 370,
          backgroundColor: 'appBg.main',
          overflow: 'hidden',
        }}>
        <CardMedia
          component='img'
          image={imageUrl}
          alt={title}
          sx={{ height: { xs: 180, sm: 255 }, borderRadius: '6px' }}
        />
        <CardContent
          sx={{
            padding: 0,
            paddingTop: 1,
          }}>
          <Typography
            gutterBottom
            variant='h6'
            sx={{
              padding: 0,
              margin: 0,
              fontSize: '1rem',
            }}>
            {`€${price}`}
          </Typography>
          <Typography
            sx={{
              fontSize: '.9rem',
              padding: 0,
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
            variant='h6'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
