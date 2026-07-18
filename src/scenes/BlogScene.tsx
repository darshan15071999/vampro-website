import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { allBlogPosts } from '../data/blogs';
import { DimLine } from './wire';

// The waveform becomes text; text becomes organized knowledge.

const BlogScene = forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} className="bp-scene" data-scene="blog">
    <div className="w-full max-w-6xl mx-auto px-6 text-center">
      <div data-anim="blog-head">
        <p className="bp-label mb-5">Blogs</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-wide text-white leading-tight">
          Knowledge from
          <span className="text-white/60"> the build.</span>
        </h2>
      </div>

      <DimLine label={`Blogs · ${allBlogPosts.length} entries`} className="my-10 max-w-2xl mx-auto" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
        {allBlogPosts.slice(0, 3).map(post => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="block group">
            <article data-anim="blog-card" className="bp-card p-6 h-full transition-colors">
              {/* Skeleton "document lines" that write themselves in */}
              <div className="space-y-1.5 mb-5" aria-hidden="true">
                <span data-anim="blog-line" className="block h-px bg-[#00e5ff]/30 origin-left" />
                <span data-anim="blog-line" className="block h-px bg-[#00e5ff]/20 origin-left w-4/5" />
                <span data-anim="blog-line" className="block h-px bg-[#00e5ff]/10 origin-left w-3/5" />
              </div>
              <span className="bp-label">{post.category}</span>
              <h3 className="mt-3 text-base md:text-lg font-bold tracking-wide text-[#00e5ff] leading-snug line-clamp-2 group-hover:text-[#00e5ff]/70 transition-colors">
                {post.title}
              </h3>
              <p className="mt-3 text-xs md:text-sm font-light tracking-wider text-neutral-500 leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </article>
          </Link>
        ))}
      </div>

      <div data-anim="blog-cta" className="mt-10">
        <Link to="/blog" className="bp-btn px-8 py-3.5 text-xs">Explore all blogs</Link>
      </div>
    </div>
  </section>
));

BlogScene.displayName = 'BlogScene';
export default BlogScene;

export const blogTimeline = (root: HTMLElement): gsap.core.Timeline => {
  const q = gsap.utils.selector(root);

  gsap.set(root, { autoAlpha: 0 });
  gsap.set(q('[data-anim="blog-head"]'), { autoAlpha: 0, y: 30 });
  gsap.set(q('[data-anim="blog-card"]'), { autoAlpha: 0, y: 40 });
  gsap.set(q('[data-anim="blog-line"]'), { scaleX: 0 });
  gsap.set(q('[data-anim="blog-cta"]'), { autoAlpha: 0 });

  const tl = gsap.timeline();

  // Documentation assembles into article cards
  tl.to(root, { autoAlpha: 1, duration: 0.08 }, 0)
    .to(q('[data-anim="blog-head"]'), { autoAlpha: 1, y: 0, duration: 0.22 }, 0.04)
    .to(q('[data-anim="blog-card"]'), { autoAlpha: 1, y: 0, duration: 0.26, stagger: 0.08 }, 0.18)
    .to(q('[data-anim="blog-line"]'), { scaleX: 1, duration: 0.18, stagger: 0.03 }, 0.32)
    .to(q('[data-anim="blog-cta"]'), { autoAlpha: 1, duration: 0.14 }, 0.55);

  // Exit: articles shrink toward thumbnails — knowledge becomes content
  tl.to(q('[data-anim="blog-card"]'), { scale: 0.82, autoAlpha: 0, y: -20, duration: 0.22, stagger: 0.05 }, 0.78)
    .to(q('[data-anim="blog-head"], [data-anim="blog-cta"]'), { autoAlpha: 0, duration: 0.16 }, 0.82)
    .to(root, { autoAlpha: 0, duration: 0.08 }, 0.96);

  return tl;
};
