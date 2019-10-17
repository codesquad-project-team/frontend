import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import DetailPage from '../src/pages/DetailPage/DetailPage';
import ProfileEditPage from '../src/pages/ProfileEditPage/ProfileEditPage';

const Root = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <MainPage />}></Route>
          <Route path="/post" render={() => <DetailPage />}></Route>
          <Route
            path="/profile-edit"
            render={() => <ProfileEditPage />}
          ></Route>
        </Switch>
      </Router>
    </>
  );
};

export default hot(Root);
