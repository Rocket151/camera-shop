import React, { useState, useEffect, useRef, RefObject, MutableRefObject, LegacyRef} from 'react';
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

const inpArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,25,24,42,42,2,42,42,24,2,4];

export default function Header(): JSX.Element {
  const { markRef } = useKeyboardNavigator({
    eventCallback: (evt) => evt.preventDefault()
  });
  const camerasData = useAppSelector(getCamerasDataFromServer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [highlightBlockIndex, setHighlightBockIndex] = useState(-1);
  const [data, setData] = useState<SearchItemState[] | never[]>([initialState]);
  const refs: MutableRefObject<RefObject<HTMLLIElement>[]> = useRef(inpArr.map(() => React.createRef()));
  const inpRef: LegacyRef<HTMLInputElement> | undefined = useRef(null);
  const closeBtnRef: LegacyRef<HTMLButtonElement> | undefined = useRef(null);

  useEffect(() => {
    if(highlightBlockIndex === -1) {
      inpRef.current?.focus();

      return;
    }

    if(highlightBlockIndex === -2) {
      closeBtnRef.current?.focus();

      return;
    }

    refs?.current[highlightBlockIndex]?.current?.focus();

  }, [highlightBlockIndex]);

  const onKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter' && refs?.current[highlightBlockIndex]?.current !== undefined && data[0].name !== '') {
      navigate(`${AppRoute.Product} + ${refs?.current[highlightBlockIndex]?.current?.id || '0'} + ${TabsHash.Description}`);
      handleRedirectToProductPage(Number(refs?.current[highlightBlockIndex]?.current?.id));
    }

    if (evt.key === 'ArrowUp' && highlightBlockIndex > -2) {
      evt.preventDefault();
      setHighlightBockIndex((prev) => prev - 1);
    }

    if (evt.key === 'ArrowDown' && highlightBlockIndex < (data.length - 1)) {
      evt.preventDefault();
      setHighlightBockIndex((prev) => prev + 1);
    }

    if (evt.key === 'Tab' && highlightBlockIndex < (data.length - 1)) {
      evt.preventDefault();
      setHighlightBockIndex((prev) => prev + 1);
    }

    if (evt.key === 'Tab' && highlightBlockIndex === (data.length - 1)) {
      evt.preventDefault();
      setHighlightBockIndex(-2);
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
    setHighlightBockIndex(-1);
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
      threshold: 0.4,
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
        <FocusLock disabled={data[0].name === ''} className={`form-search ${data[0]?.name !== '' ? 'list-opened' : ''}`}>
          <form>
            <label>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input ref={inpRef} className="form-search__input" type="text" value={inputValue} autoComplete="off" placeholder="Поиск по сайту" onChange={(evt) => {
                setInputValue(evt.target.value);
                searchData(evt.target.value);
                setHighlightBockIndex(-1);
              }}
              />
            </label>
            <KeyboardNavigatorBoard
              as="ul"
              markRef={markRef} active={data[0].name !== ''} className="form-search__select-list scroller"
            >
              {data.map((item, index) => (
                <KeyboardNavigatorElement markRef={markRef} key={item.id} className="form-search__select-item" onClick={() => {
                  navigate(AppRoute.Product + item.id.toString() + TabsHash.Description);
                  handleRedirectToProductPage(item.id);
                }} ref={refs?.current[index]} id={item.id.toString()} tabIndex={0} as='li' active={index === highlightBlockIndex}
                >{item.name}
                </KeyboardNavigatorElement>
              ))}
            </KeyboardNavigatorBoard>
          </form>
          <button className="form-search__reset" ref={closeBtnRef} type="reset" onClick={resetData}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
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
