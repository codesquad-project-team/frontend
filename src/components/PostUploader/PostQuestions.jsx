import React from 'react';
import './PostQuestions.scss';

const PostQuestions = () => {
  return (
    <div className="post-questions">
      <div className="post-questions-group">
        <div>* 이 장소의 분위기는 어땠어요?</div>
        <div className="post-questions-answers">
          <button>아늑한</button>
          <button>모던한</button>
          <button>아기자기한</button>
          <button>초록초록한</button>
        </div>
      </div>
      <div className="post-questions-group">
        <div>* 그 때 감정은 어땠어요?</div>
        <div className="post-questions-answers">
          <button>좋아</button>
          <button>별로</button>
        </div>
      </div>
      <div className="post-questions-group">
        <div>* ???</div>
        <div className="post-questions-answers">
          <button>???</button>
          <button>???</button>
        </div>
      </div>
    </div>
  );
};

export default PostQuestions;
