const API_ENDPOINT = 'http://api.connectflavor.cf/v1';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

const TOKEN = { credentials: 'include' };
const BODY = param => ({
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(param)
});

const request = async (method, URI, options) =>
  await fetch(`${API_ENDPOINT}${URI}`, { method, ...options });

const options = (...options) =>
  options.reduce((acc, cur) => ({ ...acc, ...cur }), {});

const authAPI = {
  requestLogout: () => {
    return request(POST, `/auth/logout`, options(TOKEN));
  },
  validateTempToken: () => {
    return request(POST, `/auth/tempToken`, options(TOKEN));
  },
  signup: nickname => {
    return request(POST, `/auth/signup`, options(TOKEN, BODY({ nickname })));
  },
  hasLoggedIn: () => {
    return request(GET, `/auth/has-logged-in`, options(TOKEN));
  }
};

const postAPI = {
  deletePost: postId => {
    return request(DELETE, `/post/${postId}`, options(TOKEN));
  },
  getPosts: (page, writerId) => {
    return request(
      GET,
      `/post?page=${page}${writerId ? `&writerid=${writerId}` : ''}`
    );
  },
  getRelatedPosts: (postId, page) => {
    return request(GET, `/post/related-to?postid=${postId}&page=${page}`);
  },
  uploadPost: (isEditMode, id, postData) => {
    return request(
      isEditMode ? PUT : POST,
      `/post${isEditMode ? `/${id}` : ''}`,
      options(TOKEN, BODY(postData))
    );
  },
  getPostDetail: postId => {
    return request(GET, `/post/${postId}`);
  }
};

const userAPI = {
  getFollowList: (userId, type) => {
    return request(GET, `/user/${userId}/relationship/${type}`);
  },
  getFollowStatus: (userId, isFollowing) => {
    return request(
      isFollowing ? DELETE : POST,
      `/user/follow/${userId}`,
      options(TOKEN)
    );
  },
  getMyProfile: () => {
    return request(GET, `/user/myinfo`, options(TOKEN));
  },

  //db의 primary key는 userId이지만,
  //주소창에 닉네임을 직접 입력하는 경우에도 프로필 불러오기 위해 2가지 쿼리 사용.
  getProfile: (targetId, nickname) => {
    return request(
      GET,
      `/user/profile-content?${
        targetId ? `id=${targetId}` : `nickname=${nickname}`
      }`,
      options(TOKEN)
    );
  },
  updateProfile: userInfo => {
    return request(PUT, `/user/profile`, options(TOKEN, BODY(userInfo)));
  },
  checkNickname: nickname => {
    return request(
      POST,
      `/user/checkNicknameDuplication`,
      options(BODY({ nickname }))
    );
  }
};

export default { ...userAPI, ...postAPI, ...authAPI };
