import { action as ImageEditorAction } from '../../components/ImageEditor';
import { action as ImageUploaderAction } from '../../components/PostUploader/ImageUploader';

const action = {
  ...ImageEditorAction,
  ...ImageUploaderAction
};

export default action;
