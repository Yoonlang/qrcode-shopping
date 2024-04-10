function CartPage({ toNextPage }: { toNextPage: Function }) {
  return (
    <div>
      <h1>Cart</h1>
      <button onClick={() => toNextPage()}>Next</button>
    </div>
  );
}

export default CartPage;
