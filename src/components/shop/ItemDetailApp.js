import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  media: {
    backgroundSize: "contain",
    height: 240,
  },
});

const ItemDetailApp = ({ id, image, title, description, addItemToCart }) => {
  const classes = useStyles();

  const sliceTitleText = (text) => {
    if (text.length < 10) {
      return text;
    } else {
      return `${text.slice(0, 16)}...`;
    }
  };

  const sliceDescriptionText = (text) => {
    if (text.length < 18) {
      return text;
    } else {
      return `${text.slice(0, 55)}...`;
    }
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {sliceTitleText(title)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {sliceDescriptionText(description)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => addItemToCart(id)} variant="contained" size="large" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemDetailApp;
