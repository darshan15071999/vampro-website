import type { BlogPost } from './types';
import { lean_editing_practices } from './lean-editing-practices';
import { editing_with_your_eyes_closed } from './editing-with-your-eyes-closed';

export const allBlogPosts: BlogPost[] = [
  lean_editing_practices,
  editing_with_your_eyes_closed,
];
export { lean_editing_practices } from './lean-editing-practices';
export { editing_with_your_eyes_closed } from './editing-with-your-eyes-closed';
