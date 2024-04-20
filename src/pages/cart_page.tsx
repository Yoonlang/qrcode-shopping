const CartPage = ({
  toNextPage,
  scannedItems,
}: {
  toNextPage: Function;
  scannedItems: Object;
}) => {
  return (
    <div>
      <h1>Cart</h1>
      <button onClick={() => toNextPage()}>Next</button>
    </div>
  );
};

export default CartPage;
