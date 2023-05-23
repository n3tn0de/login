import React from 'react';
import { useHistory } from "react-router-dom";
import { useAppDispatch } from '../../redux/hooks';
import { invalidateSession } from '../../redux/slices/user';
import { RoutesPaths } from '../../constants';
import './Dashboard.css';

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  return (
    <div className="App">
      <header className="App-header">
        Dashboard
        <button
          onClick={() => {
            dispatch(invalidateSession())
            history.push(RoutesPaths.Login)
          }}
        >
          Log Out
        </button>
      </header>
    </div>
  );
}
