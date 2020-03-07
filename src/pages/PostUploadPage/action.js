import { action as ImageEditorAction } from '../../components/ImageEditor';
import { action as ImageUploaderAction } from '../../components/PostUploader/ImageUploader';

const action = async ({ type, payload }) =>
  await {
    ...ImageEditorAction,
    ...ImageUploaderAction
  }[type](payload);

export default action;
