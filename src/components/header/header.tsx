import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCamerasData } from '../../store/cameras-data/selectors';
import Fuse from 'fuse.js';

type SearchItemState = {
  id: number,
  name: string,
}

export default function Header(): JSX.Element {
  const camerasData = useAppSelector(getCamerasData);
  const [data, setData] = useState<SearchItemState[] | never[]>([{
    id:0,
    name: '',
  }]);

  const resetData = () => {
    setData([]);
  };

  const searchData = (pattern: string) => {
    if (!pattern) {
      setData([]);
      return;
    }

    const fuse = new Fuse(camerasData, {
      keys: ['name'],
      threshold: 0,
    });

    const result = fuse.search(pattern);
    const matches: SearchItemState[] = [];
    if (!result.length) {
      setData([]);
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
        <div className={`form-search ${data.length >= 1 ? 'list-opened' : ''}`}>
          <form>
            <label>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" onChange={(evt) => {
                searchData(evt.target.value);
              }}
              />
            </label>
            <ul className="form-search__select-list scroller">
              {data.map((item) => <li className="form-search__select-item" tabIndex={0} key={item.id}>{item.name}</li>)}
            </ul>
          </form>
          <button className="form-search__reset" type="reset" onClick={resetData}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}
