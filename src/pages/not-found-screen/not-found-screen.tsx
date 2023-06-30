import { Link } from 'react-router-dom';

export default function NotFoundScreen(): JSX.Element {
  return (
    <>
      <h1>
          404.
        <br />
        <small>Страница не найдена</small>
      </h1>
      <Link to="/">Вернуться на главную страницу</Link>
    </>
  );
}
