import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import DetailPage from './pages/DetailPage/DetailPage';
import ProfileEditPage from './pages/ProfileEditPage/ProfileEditPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PostUploadPage from './pages/PostUploadPage/PostUploadPage';
import SignupPage from './pages/SignupPage/SignupPage';

const Root = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <MainPage />} />
          <Route path="/profile/edit" render={() => <ProfileEditPage />} />
          <Route path="/profile" render={() => <ProfilePage />} />
          <Route path="/post/upload" render={() => <PostUploadPage />} />
          <Route
            path="/post/:postId"
            render={({ match }) => <DetailPage postId={match.params.postId} />}
          />
          <Route path="/signup" render={() => <SignupPage />} />
        </Switch>
      </Router>
    </>
  );
};

export default hot(Root);
