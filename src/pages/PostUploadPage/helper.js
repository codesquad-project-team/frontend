import { deepDiff } from '../../utils/diff';
import { YYYYMMDDHHMMSS } from '../../utils/utils';
import useS3 from '../../hooks/useS3';

const { S3imageUploadHandler } = useS3();

export const uploadImagesToS3 = (loadError, images, nickname) => {
  if (loadError) {
    //업로드 할 때 체크하는건 별로인듯. 로드 실패하면 바로 재시도 할 수 있는 ui 제공 필요.
    return alert(
      `필요한 스크립트를 로드하지 못했습니다. 다음에 다시 시도해주세요.`
    );
  }
  const S3uploadedURLs = S3imageUploadHandler({
    albumName: nickname.concat('_', YYYYMMDDHHMMSS(new Date())).trim(),
    albumNamePrefix: 'post-images/',
    images: images
      .filter(({ previewURL }) => previewURL.startsWith('data'))
      .map(({ forUpload }) => forUpload),
  });
  return S3uploadedURLs;
};

export const hasImagesToUpload = (images) =>
  images.some(({ previewURL }) => previewURL.startsWith('data'));

export function createPostBody({
  isEditMode,
  initialData,
  images,
  state,
  S3uploadedURLs,
}) {
  const URLsForUpload = makeURLsForUpload(isEditMode, images, S3uploadedURLs);
  const mergedData = mergeURLsToState(state, URLsForUpload);
  const postBody = isEditMode
    ? filterUpdatedValues(initialData, mergedData)
    : mergedData;
  return postBody;
}

function makeURLsForUpload(isEditMode, images, S3uploadedURLs) {
  const URLs = isEditMode
    ? mergePreviousImages(images, S3uploadedURLs)
    : S3uploadedURLs;

  return images.map(({ isRepresentative }, idx) => ({
    url: URLs[idx],
    isRepresentative,
  }));
}
const mergePreviousImages = (images, S3uploadedURLs) => {
  return images
    .filter(({ previewURL }) => previewURL.startsWith('http'))
    .map(({ previewURL }) => previewURL)
    .concat(S3uploadedURLs);
};

function mergeURLsToState(state, URLsForUpload) {
  return { ...state, post: { ...state.post, images: URLsForUpload } };
}

const filterUpdatedValues = (initialData, postData) => {
  return deepDiff(initialData, postData);
};
