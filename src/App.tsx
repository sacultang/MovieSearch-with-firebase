import IndexRouter from './router';

import useTransPageScroll from './hooks/useTransPageScroll';

function App() {
  useTransPageScroll();

  return <IndexRouter />;
}

export default App;
