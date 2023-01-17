import { useEffect, useState } from 'react';
import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

import HighlightedQuote from '../components/quotes/HighlightedQuote';

const QuoteDetail = () => {
  const [show, setShow] = useState(true);
  const parmas = useParams();
  const location = useLocation();

  const { quoteId } = parmas;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p>내용을 찾지 못했습니다!</p>;
  }

  if (!loadedQuote.text) {
    return <p>내용이 없어요 ㅜㅜ</p>;
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <div className='centered'>
        {show && (
          <Link
            onClick={() => {
              setShow(false);
            }}
            className='btn--flat'
            to={`${location.pathname}/comments`}
          >
            댓글 가져오기
          </Link>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default QuoteDetail;
