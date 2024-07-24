import './main-page.scss';
import List from '../components/ListBlock/ListBlock';
import Loader from '../components/Loader/Loader';
import { Outlet, useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { useGetAllPersonsQuery } from '../redux/services/api.ts';
import { useEffect } from 'react';
import  { addPage } from '../redux/slices/currentPageSlice.ts';

function MainPage() {
  const dispatch = useDispatch();
  const { detailedCard } = useSelector((state: RootState) => state.detailedCard);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { data, isLoading } = useGetAllPersonsQuery({ currentPage: page });

  useEffect(() => {
    if (data) {
      const pageParams = {
        pages: data.info.pages,
        currentPage: Number(page),
        currentPageCards: data.results,
      };
      dispatch(addPage(pageParams));
    }
  }, [data, page, dispatch]);

  return (
    <div className={`page ${Object.keys(detailedCard).length !== 0 ? 'no-scroll' : ''}`}>
      <Header />
      <main
        className={`page__main main ${Object.keys(detailedCard).length !== 0 ? 'no-scroll' : ''}`}
      >
        <div className="container">
          <div className="main__content cards">
            <div className="cards__list">
              {isLoading ? <Loader /> : <List cardsList={data?.results} />}
            </div>
            {Object.keys(detailedCard).length !== 0 ? <Outlet /> : ''}
          </div>
        </div>
      </main>
    </div>
  );
}
export default MainPage;
