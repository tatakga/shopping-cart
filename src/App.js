import { useState, useEffect } from "react";
import "./App.css";
// Material UIs
import Container from "@material-ui/core/Container";
import HeaderApp from "./components/layout/HeaderApp";
import Grid from "@material-ui/core/Grid";
import ItemDetailApp from "./components/shop/ItemDetailApp";
import CircularProgress from "@material-ui/core/CircularProgress";
//Components

const App = () => {
  const [shopItems, setShopItems] = useState(null);
  const [numberItem, setNumberItem] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fecthItems = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setIsLoading(false);
        setShopItems([...data]);
      } catch (err) {
        console.log(err);
      }
    };
    fecthItems();
  }, []);

  useEffect(() => {
    if (numberItem <= 0) {
      setNumberItem(0);
    }
    const totalOfPrice = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount * currentItem.price;
    }, 0);
    setTotalPrice(totalOfPrice);
  }, [numberItem]);

  const addItemToCart = (id) => {
    const checkItemCart = cartItems.some((item) => item.id === id);
    if (!checkItemCart) {
      const selectedItem = shopItems
        .filter((item) => item.id === id)
        .map((item) => {
          return { ...item, amount: 1 };
        });
      selectedItem.forEach((item) => {
        setCartItems([...cartItems, { ...item }]);
        setNumberItem(numberItem + item.amount);
      });
    } else {
      const selectedItem = cartItems.find((item) => item.id === id);
      selectedItem.amount = selectedItem.amount + 1;
      setNumberItem(numberItem + 1);
      setCartItems([...cartItems]);
    }
  };

  const removeItemToCart = (id) => {
    const selectedItem = cartItems.find((item) => item.id === id);
    setNumberItem(numberItem - 1);
    if (selectedItem.amount <= 1) {
      const newCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems([...newCartItems]);
    } else {
      selectedItem.amount = selectedItem.amount - 1;
      setCartItems([...cartItems]);
    }
  };

  return (
    <div className="App">
      <HeaderApp cartItems={cartItems} numberItem={numberItem} removeItemToCart={removeItemToCart} addItemToCart={addItemToCart} totalPrice={totalPrice} />
      <Container maxWidth="xl" style={{ paddingTop: 24 }}>
        <Grid container spacing={3}>
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexGrow: 1 }}>
              <CircularProgress />
            </div>
          ) : null}
          {shopItems &&
            shopItems.map((item, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} lg={3}>
                  <ItemDetailApp id={item.id} image={item.image} title={item.title} description={item.description} addItemToCart={addItemToCart} />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
