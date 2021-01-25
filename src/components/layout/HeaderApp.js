import { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const HeaderApp = ({ numberItem, cartItems, removeItemToCart, addItemToCart, totalPrice }) => {
  const [openShoppingItems, setOpenShoppingItems] = useState(false);
  const drawer = useRef(null);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h4">
            TukuTuku
          </Typography>
          <IconButton ref={drawer} aria-label="show 4 new mails" color="inherit" onClick={() => setOpenShoppingItems(true)}>
            <Badge badgeContent={numberItem} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer ref={drawer} anchor="right" open={openShoppingItems} onClose={() => setOpenShoppingItems(false)}>
        <Typography style={{ margin: 8 }} variant="h3">
          Total : $ {totalPrice}
        </Typography>
        {cartItems.length === 0 ? (
          <div className="cart__container">
            <Typography variant="h4">No item in the Cart</Typography>
          </div>
        ) : (
          <div className="cart__container">
            {cartItems.map((item, index) => {
              return (
                <div style={{ paddingTop: 12, paddingBottom: 12, borderBottom: "solid 1px #000" }} key={index}>
                  <div className="cart__image">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="cart__action">
                    <Button onClick={() => removeItemToCart(item.id)} variant="contained" size="large" color="primary">
                      {item.amount <= 1 ? "x" : "-"}
                    </Button>
                    <input type="text" value={item.amount} readOnly />
                    <Button onClick={() => addItemToCart(item.id)} variant="contained" size="large" color="primary">
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default HeaderApp;
