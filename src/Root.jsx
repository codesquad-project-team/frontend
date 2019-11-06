import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import DetailPage from '../src/pages/DetailPage/DetailPage';
import ProfileEditPage from '../src/pages/ProfileEditPage/ProfileEditPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const Root = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <MainPage />} />
          <Route
            path="/post/:postId"
            render={({ match }) => <DetailPage postId={match.params.postId} />}
           />
          <Route
            path="/profile/edit"
            render={() => <ProfileEditPage />}
           />
          <Route path="/profile" render={() => <ProfilePage />} />
        </Switch>
      </Router>
    </>
  );
};

export default hot(Root);
