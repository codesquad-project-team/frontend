import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import DetailPage from './pages/DetailPage/DetailPage';
import ProfileEditPage from './pages/ProfileEditPage/ProfileEditPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PostUploadPage from './pages/PostUploadPage/PostUploadPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginContextProvider from './contexts/LoginContext';

const Root = () => {
  return (
    <Router>
      <LoginContextProvider>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/profile/edit" component={ProfileEditPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/post/upload" component={() => <PostUploadPage />} />
          <Route path="/post/edit" component={() => <PostUploadPage />} />
          <Route path="/post/:postId" component={DetailPage} />
          <Route path="/signup" component={SignupPage} />
        </Switch>
      </LoginContextProvider>
    </Router>
  );
};

export default hot(Root);
