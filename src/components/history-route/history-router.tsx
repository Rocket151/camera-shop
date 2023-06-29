import { useState, useLayoutEffect } from 'react';
import type { BrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { Router } from '@remix-run/router';

export interface HistoryRouteProps {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}

function HistoryRouter({
  basename,
  children,
  history,
}: HistoryRouteProps) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
   <Router>
  );
}

export default HistoryRouter;
