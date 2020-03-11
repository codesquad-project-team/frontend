import { action as ImageEditorAction } from '../../components/ImageEditor';
import { action as ImageUploaderAction } from '../../components/PostUploader/ImageUploader';
import { createActionCreator } from '../../utils/utils';

const action = createActionCreator({
  ...ImageEditorAction,
  ...ImageUploaderAction
});

export default action;
