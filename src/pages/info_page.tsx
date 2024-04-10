function InfoPage({ toNextPage }: { toNextPage: Function }) {
  return (
    <div>
      <h1>Info</h1>
      <button onClick={() => toNextPage()}>Next</button>
    </div>
  );
}

export default InfoPage;
