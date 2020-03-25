import { middleware as ImageEditorMiddleware } from '../../components/ImageEditor';
import { middleware as ImageUploaderMiddleware } from '../../components/PostUploader/ImageUploader';
import { createMiddleware } from '../../hooks/useReducerMiddleware';

const middleware = createMiddleware({
  ...ImageEditorMiddleware,
  ...ImageUploaderMiddleware
});

export default middleware;
