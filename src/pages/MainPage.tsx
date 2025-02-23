import './main-page.scss';
import List from '../components/ListBlock/ListBlock';
import Loader from '../components/Loader/Loader';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetAllPersonsQuery,
  useGetPersonByIdQuery,
  useGetPersonsByName,
} from '../redux/services/api.ts';
import { useEffect } from 'react';
import { addPage } from '../redux/slices/currentPageSlice.ts';
import useLocalStorage from '../hooks/localStorage.tsx';
import { RootState } from '../redux/store.ts';
import Flyout from '../components/FlyOut/Flyout.tsx';
import { useTheme } from '../ContextProvider/ContextProvider.tsx';

function MainPage() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { detailedCard } = useSelector((state: RootState) => state.detailedCard);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const name = searchParams.get('name') ?? '';

  const [storedValue] = useLocalStorage('person');
  const { id } = useParams();

  const { data: allPersonsData, isLoading: isAllPersonsLoading } = useGetAllPersonsQuery(
    { currentPage: page },
    { skip: !!id },
  );

  const { data: personData, isLoading: isPersonLoading } = useGetPersonByIdQuery(id || '', {
    skip: !id || storedValue === '',
  });

  const { data: personsByNameData, isLoading: isPersonsByNameLoading } = useGetPersonsByName(
    { name, currentPage: page },
    { skip: !name },
  );

  useEffect(() => {
    if (id && personData) {
      dispatch(
        addPage({
          pages: 1,
          currentPage: 1,
          currentPageCards: [personData],
        }),
      );
    } else if (name && personsByNameData) {
      dispatch(
        addPage({
          pages: personsByNameData.info.pages,
          currentPage: Number(page),
          currentPageCards: personsByNameData.results,
        }),
      );
    } else if (!id && !name && allPersonsData) {
      dispatch(
        addPage({
          pages: allPersonsData.info.pages,
          currentPage: Number(page),
          currentPageCards: allPersonsData.results,
        }),
      );
    }
  }, [id, name, page, allPersonsData, personData, personsByNameData, dispatch]);

  const isLoading = isAllPersonsLoading || isPersonLoading || isPersonsByNameLoading;

  const cardsList = id ? [personData] : name ? personsByNameData?.results : allPersonsData?.results;

  return (
    cardsList && (
      <div
        className={`page ${Object.keys(detailedCard).length !== 0 ? 'no-scroll' : ''} page_${theme}`}
      >
        <Header />
        <main
          className={`page__main main ${Object.keys(detailedCard).length !== 0 ? 'no-scroll' : ''}`}
          role="main"
        >
          <div className="container">
            <div className="main__content cards">
              <div className="cards__list">
                {isLoading ? <Loader /> : <List cardsList={cardsList?.filter(Boolean)} />}
              </div>
              {Object.keys(detailedCard).length !== 0 && <Outlet />}
            </div>
          </div>
        </main>
        <Flyout />
      </div>
    )
  );
}
export default MainPage;
