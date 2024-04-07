export default function MainPage({ toNextPage }: { toNextPage: Function }) {
  return (
    <div>
      <h1>Main</h1>
      <button onClick={() => toNextPage()}>Next</button>
    </div>
  );
}
