import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, TabsHash } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasDataFromServer } from '../../store/cameras-data/selectors';
import Fuse from 'fuse.js';
import { fetchProductDataAction, fetchReviewsDataAction, fetchSimilarCamerasDataAction } from '../../store/api-actions';
import FocusLock from 'react-focus-lock';
import { useNavigate } from 'react-router-dom';
import { KeyboardNavigatorBoard , KeyboardNavigatorElement, useKeyboardNavigator } from 'react-keyboard-navigator';

type SearchItemState = {
  id: number;
  name: string;
}

const initialState = {
  id:0,
  name: '',
};

export default function Header(): JSX.Element {
  const { markRef } = useKeyboardNavigator({
    eventCallback: (evt) => evt.preventDefault()
  });
  const camerasData = useAppSelector(getCamerasDataFromServer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [highlightBlockIndex, setHighlightBockIndex] = useState(0);
  const [data, setData] = useState<SearchItemState[] | never[]>([initialState]);

  const onKeydown = ({ key }: KeyboardEvent) => {
    if (key === '38') {
      setHighlightBockIndex(highlightBlockIndex - 1);
    }
    if (key === '40') {
      setHighlightBockIndex(highlightBlockIndex + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  });

  const resetData = () => {
    setData([initialState]);
    setInputValue('');
  };

  const handleRedirectToProductPage = (id: number) => {
    dispatch(fetchProductDataAction(id.toString()));
    dispatch(fetchSimilarCamerasDataAction(id.toString()));
    dispatch(fetchReviewsDataAction(id.toString()));
  };

  const searchData = (pattern: string) => {
    if (!pattern) {
      setData([initialState]);
      return;
    }

    const fuse = new Fuse(camerasData, {
      keys: ['name'],
      threshold: 0.6,
    });

    const result = fuse.search(pattern);
    const matches: SearchItemState[] = [];
    if (!result.length) {
      setData([initialState]);
    } else {
      result.forEach(({item}) => {
        matches.push({
          name: item.name,
          id: item.id,
        });
      });
      setData(matches);
    }
  };
  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.Root}>Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <FocusLock disabled={data[0].name === ''}>
          <div className={`form-search ${data[0]?.name !== '' ? 'list-opened' : ''}`}>
            <form>
              <label>
                <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-lens"></use>
                </svg>
                <input className="form-search__input" type="text" value={inputValue} autoComplete="off" placeholder="Поиск по сайту" onChange={(evt) => {
                  setInputValue(evt.target.value);
                  searchData(evt.target.value);
                }}
                />
              </label>
              <KeyboardNavigatorBoard
                as="ul"
                markRef={markRef} active={true} className="form-search__select-list scroller"
              >
                {data.map((item, index) => (
                  <KeyboardNavigatorElement markRef={markRef} key={item.id} className="form-search__select-item" onClick={() => {
                    navigate(AppRoute.Product + item.id.toString() + TabsHash.Description);
                    handleRedirectToProductPage(item.id);
                  }} tabIndex={0} as='li' active={index === highlightBlockIndex} onActiveChange={() => setHighlightBockIndex(index)}
                  >{item.name}
                  </KeyboardNavigatorElement>
                ))}
              </KeyboardNavigatorBoard>
            </form>
            <button className="form-search__reset" type="reset" onClick={resetData}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg><span className="visually-hidden">Сбросить поиск</span>
            </button>
          </div>
        </FocusLock>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}
