const { diffObject, diffArray, deepDiff, strictDeepDiff } = require('./diff');

//테스트
const origin = {
  location: { name: '독일주택!' },
  post: {
    place: '독일주택',
    companion: '친구랑',
    activity: '포트와인 한잔',
    description: '포트와인 캬~!',
    images: [
      { url: '1', isRepresentative: false },
      { url: '2', isRepresentative: true },
      { url: '3', isRepresentative: false },
      { url: '4', isRepresentative: false }
    ]
  }
};
const updated = {
  location: { name: '독일주택' },
  post: {
    place: '독일주택',
    companion: '친구들이랑',
    activity: '포트와인 한잔',
    description: '',
    images: [
      { url: '1', isRepresentative: false },
      { url: '2', isRepresentative: false },
      { url: '4', isRepresentative: true },
      { url: '5', isRepresentative: false }
    ]
  }
};
const imagesNotChanged = {
  location: { name: '독일주택' },
  post: {
    place: '독일주택',
    companion: '친구들이랑',
    activity: '포트와인 한잔',
    description: '',
    images: [
      { url: '1', isRepresentative: false },
      { url: '2', isRepresentative: true },
      { url: '3', isRepresentative: false },
      { url: '4', isRepresentative: false }
    ]
  }
};
const imagesDeleted = {
  location: { name: '독일주택' },
  post: {
    place: '독일주택',
    companion: '친구들이랑',
    activity: '포트와인 한잔',
    description: '',
    images: [
      { url: '1', isRepresentative: false },
      { url: '2', isRepresentative: true },
      { url: '4', isRepresentative: false }
    ]
  }
};

const Reset = '\x1b[0m';
const Bright = '\x1b[1m';
const FgYellow = '\x1b[33m';
const logs = (label, param) => {
  console.log(FgYellow, Bright, '<<', label, '>>');
  console.log(Reset, JSON.stringify(param, null, 2));
};

// logs('shallow diff: object', diffObject(origin.post, updated.post));
// logs('shallow diff: array', diffArray(origin.post.images, updated.post.images));
//strict diff not supported, yet.
// logs('strict: updated', strictDeepDiff(origin, updated));
// logs('strict: images not changed', strictDeepDiff(origin, imagesNotChanged));
// logs('strict: images deleted', strictDeepDiff(origin, imagesDeleted));
logs('images updated, returns 1, 2, 4, 5', deepDiff(origin, updated));
logs(
  'images not changed, returns no images',
  deepDiff(origin, imagesNotChanged)
);
logs('images deleted, returns 1, 2, 4', deepDiff(origin, imagesDeleted));

logs(
  'if unchanged, returns empty object',
  diffObject(origin.post.images[0], imagesNotChanged.post.images[0])
);
