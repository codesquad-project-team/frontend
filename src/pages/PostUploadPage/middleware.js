import { middleware as ImageEditorMiddleware } from '../../components/ImageEditor';
import { middleware as ImageUploaderMiddleware } from '../../components/PostUploader/ImageUploader';

const middleware = {
  ...ImageEditorMiddleware,
  ...ImageUploaderMiddleware
};

export default middleware;
