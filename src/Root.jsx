import { hot } from 'react-hot-loader/root';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoginContextProvider from './contexts/LoginContext';

const ProfileEditPage = lazy(() =>
  import(/* webpackChunkName: "profile-edit-page" */ './pages/ProfileEditPage')
);
const ProfilePage = lazy(() =>
  import(/* webpackChunkName: "profile-page" */ './pages/ProfilePage')
);
const PostUploadPage = lazy(() =>
  import(/* webpackChunkName: "post-upload-page" */ './pages/PostUploadPage')
);
const DetailPage = lazy(() =>
  import(/* webpackChunkName: "detail-page" */ './pages/DetailPage')
);
const SignupPage = lazy(() =>
  import(/* webpackChunkName: "signup-page" */ './pages/SignupPage')
);

const Root = () => {
  return (
    <Router>
      <LoginContextProvider>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/profile/edit" component={ProfileEditPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/post/upload" component={() => <PostUploadPage />} />
            <Route path="/post/edit" component={() => <PostUploadPage />} />
            <Route path="/post/:postId" component={DetailPage} />
            <Route path="/signup" component={SignupPage} />
          </Switch>
        </Suspense>
      </LoginContextProvider>
    </Router>
  );
};

export default hot(Root);
