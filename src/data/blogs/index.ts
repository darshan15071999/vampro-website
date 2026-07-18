import type { BlogPost } from './types';
import { lean_editing_practices } from './lean-editing-practices';
import { editing_with_your_eyes_closed } from './editing-with-your-eyes-closed';
import { folder_management_workflow } from './folder-management-workflow';
import { premiere_workspace_design } from './premiere-workspace-design';

export const allBlogPosts: BlogPost[] = [
  lean_editing_practices,
  editing_with_your_eyes_closed,
  folder_management_workflow,
  premiere_workspace_design,
];
export { lean_editing_practices } from './lean-editing-practices';
export { editing_with_your_eyes_closed } from './editing-with-your-eyes-closed';
export { folder_management_workflow } from './folder-management-workflow';
export { premiere_workspace_design } from './premiere-workspace-design';
