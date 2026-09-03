export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  author: string;
  authorImage?: string;
  date: string;
  readingTime: string;
  category: string;
  product?: string;
  image: string;
  overview: string;
  content: string;
  toc: { id: string; title: string; }[];
}
