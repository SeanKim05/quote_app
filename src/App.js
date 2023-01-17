import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllQuotes from './pages/AllQuotes';
import NewQuotes from './pages/NewQuotes';
import QuoteDetail from './pages/QuoteDetail';
import Comments from './components/comments/Comments';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path='*' element={<Navigate to='/quotes' replace />} /> */}
          <Route path='*' element={<NotFound />} />
          <Route path='/quotes' element={<AllQuotes />} />
          <Route path='quotes/:quoteId/' element={<QuoteDetail />}>
            <Route path='comments' element={<Comments />} />
          </Route>
          <Route path='/new-quote' element={<NewQuotes />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
