import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, User, ArrowLeft, Play, Pause, Square, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { blogMetadata } from '../seo/metadata';

import { allBlogPosts as blogPosts } from '../data/blogs';

const BlogTemplate = () => {
  const { slug } = useParams();
  const isPost = !!slug;
  const [speechState, setSpeechState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [activeHeading, setActiveHeading] = useState<string>('overview');

  // Filter and Sort State
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Extract unique topics and authors
  const uniqueTopics = useMemo(() => ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))], []);
  const uniqueAuthors = useMemo(() => ['All', ...Array.from(new Set(blogPosts.map(p => p.author)))], []);

  // Filtered and Sorted Posts
  const filteredPosts = useMemo(() => {
    let result = [...blogPosts];

    if (selectedTopic !== 'All') {
      result = result.filter(p => p.category === selectedTopic);
    }

    if (selectedAuthor !== 'All') {
      result = result.filter(p => p.author === selectedAuthor);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [selectedTopic, selectedAuthor, sortOrder]);

  const post = isPost ? blogPosts.find(p => p.slug === slug) : null;

  const handleReadAloud = () => {
    if (!window.speechSynthesis || !post) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (speechState === 'playing') {
      window.speechSynthesis.pause();
      setSpeechState('paused');
    } else if (speechState === 'paused') {
      window.speechSynthesis.resume();
      setSpeechState('playing');
    } else {
      window.speechSynthesis.cancel();
      const textToRead = post.content.replace(/<[^>]+>/g, ' ');
      const utterance = new SpeechSynthesisUtterance(post.title + ". " + post.summary + ". " + textToRead);
      utterance.onend = () => setSpeechState('idle');
      utterance.onerror = () => setSpeechState('idle');
      window.speechSynthesis.speak(utterance);
      setSpeechState('playing');
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      window.scrollTo(0, 0);
    };
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const elements = post.toc.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -40% 0px' }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [post]);

  if (isPost && !post) {
    return <Navigate to="/blog" replace />;
  }

  if (!isPost) {
    return (
      <div className="sketchbook-bg min-h-screen pt-32 flex flex-col relative">
        <SEO {...blogMetadata} />
        <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 z-10 pb-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 font-space">
              Vampro Blogs
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              Insights, updates, tutorials and best practices.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 mb-10 gap-5 shadow-sm">
            <div className="flex flex-wrap gap-5 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 min-w-[140px]"
                >
                  {uniqueTopics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Author</label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 min-w-[140px]"
                >
                  {uniqueAuthors.map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto border-t md:border-t-0 border-indigo-200/50 pt-4 md:pt-0">
              <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Sort by</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 min-w-[140px]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-indigo-100">
              <p className="text-xl text-slate-500 font-medium">No posts found matching your criteria.</p>
              <button
                onClick={() => { setSelectedTopic('All'); setSelectedAuthor('All'); setSortOrder('newest'); }}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((blogPost) => (
                <Link key={blogPost.slug} to={`/blog/${blogPost.slug}`} className="group rounded-2xl border border-indigo-200/60 bg-white/60 backdrop-blur-md overflow-hidden hover:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col">
                  <div className="h-48 overflow-hidden relative shrink-0">
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md border border-indigo-200 text-indigo-600 text-xs font-semibold rounded-full shadow-sm">
                      {blogPost.category}
                    </div>
                    <img src={blogPost.image} alt={blogPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">{blogPost.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed grow">{blogPost.summary}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        {blogPost.authorImage ? <img src={blogPost.authorImage} alt={blogPost.author} className="w-5 h-5 rounded-full object-cover shadow-sm" /> : <User size={14} />}
                        <span className="font-medium">{blogPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock size={14} className="text-indigo-400" /> {blogPost.readingTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
        <div className="mt-auto relative z-20">
          <HomeFooter />
        </div>
      </div>
    );
  }

  // We know post exists here because of the Navigate check above
  const currentPost = post!;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": currentPost.title,
    "description": currentPost.summary,
    "image": currentPost.image,
    "author": {
      "@type": "Organization",
      "name": currentPost.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Vampro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vampro.in/favicon.png"
      }
    },
    "datePublished": new Date(currentPost.date).toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://vampro.in/blog/${currentPost.slug}`
    }
  };

  return (
    <div className="sketchbook-bg min-h-screen pt-28 flex flex-col relative">
      <SEO
        {...blogMetadata}
        title={`${currentPost.title} | Vampro Blog`}
        description={currentPost.summary}
        canonical={`https://vampro.in/blog/${currentPost.slug}`}
        image={currentPost.image}
        type="article"
        schema={articleSchema}
      />

      <div className="flex-grow">
        {/* Banner */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mt-8 mb-12 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-500 transition-colors mb-8 font-medium">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div className="rounded-3xl overflow-hidden h-64 md:h-96 relative border border-slate-200 shadow-xl mb-10">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 opacity-70"></div>
            <img src={currentPost.image} alt={currentPost.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 z-20 px-3 py-1 bg-white/90 backdrop-blur-md border border-indigo-200 text-indigo-600 text-xs font-semibold rounded-full shadow-sm">
              {currentPost.category}
            </div>
          </div>

          <header className="max-w-4xl mx-auto text-center px-4 mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
              {currentPost.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {currentPost.summary}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
                {currentPost.authorImage ? <img src={currentPost.authorImage} alt={currentPost.author} className="w-5 h-5 rounded-full object-cover" /> : <User size={16} className="text-indigo-600" />}
                <span className="text-slate-700">{currentPost.author}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
                <Clock size={16} className="text-indigo-600" />
                <span className="text-slate-700"><time dateTime={new Date(currentPost.date).toISOString().split('T')[0]}>{currentPost.date}</time> &bull; {currentPost.readingTime}</span>
              </div>
            </div>
          </header>

          <div className="flex flex-wrap items-center justify-between gap-4 p-5 md:px-8 md:py-6 bg-white/60 backdrop-blur-md border border-indigo-100 shadow-sm rounded-3xl mb-12">
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-3">
                <img src={currentPost.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"} alt={currentPost.author} className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" />
                <span className="font-semibold text-slate-800">{currentPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} /> <time dateTime={new Date(currentPost.date).toISOString().split('T')[0]}>{currentPost.date}</time> &middot; {currentPost.readingTime}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReadAloud}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full border border-indigo-200 transition-all shadow-sm"
              >
                {speechState === 'playing' ? <Pause size={14} /> : <Play size={14} />}
                {speechState === 'playing' ? "Pause Reading" : speechState === 'paused' ? "Resume Reading" : "Read Aloud"}
              </button>
              {speechState !== 'idle' && (
                <button
                  onClick={() => { window.speechSynthesis.cancel(); setSpeechState('idle'); }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-full border border-slate-200 transition-all shadow-sm"
                >
                  <Square size={14} /> Stop
                </button>
              )}
              <button className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-600 rounded-full border border-slate-200 transition-all shadow-sm">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row gap-8 xl:gap-12 relative z-10 pb-20">
          {/* TOC Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky top-32 h-fit order-2 lg:order-1 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200 shadow-sm">
              <h4 className="text-slate-900 font-semibold mb-4 text-sm tracking-wide uppercase">Table of Contents</h4>
              <ul className="space-y-3">
                {currentPost.toc.map((item, index) => (
                  <li key={index}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.id);
                        setActiveHeading(item.id);
                        if (element) {
                          const y = element.getBoundingClientRect().top + window.scrollY - 140;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                      className={`text-sm transition-colors ${activeHeading === item.id ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-indigo-600'}`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* PPC Ad Placeholder */}
            <Link to="/voice-generator" className="rounded-2xl bg-indigo-50 border border-indigo-100 overflow-hidden shadow-sm relative group cursor-pointer block hover:shadow-md transition-shadow">
              <div className="absolute top-2 right-2 bg-slate-900/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded z-10">Plugin</div>
              <div className="h-32 overflow-hidden relative">
                <img src="/reason1.png" alt="Promotional Content" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h5 className="font-bold text-indigo-900 mb-1 text-sm leading-tight">Generate Instant AI Voiceovers</h5>
                <p className="text-xs text-indigo-700 leading-relaxed mb-3">Just type your script, select voice profile, generate and modify voiceovers all within your Adobe Premiere Pro timeline.</p>
                <span className="text-xs font-semibold text-indigo-600 group-hover:text-indigo-500 flex items-center gap-1">
                  Learn More <ArrowLeft size={12} className="rotate-180" />
                </span>
              </div>
            </Link>
          </aside>

          {/* Article Body */}
          <article className="flex-1 max-w-prose mx-auto order-1 lg:order-2 text-slate-800 w-full flex flex-col gap-8">

            {/* Overview Box */}
            <div id="overview" className="bg-indigo-50/50 rounded-3xl p-8 shadow-sm border border-indigo-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400"></div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2 uppercase tracking-wide text-sm">
                Overview
              </h3>
              <div className="prose prose-slate prose-indigo max-w-none text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: currentPost.overview }} />
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
              <div className="prose prose-slate lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: currentPost.content }} />
            </div>
          </article>

          {/* Right Sidebar (Ads) */}
          <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky top-32 h-fit order-3 flex flex-col gap-6">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-sm relative group block hover:shadow-md transition-shadow">
              <div className="absolute top-2 right-2 bg-slate-900/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded z-10 pointer-events-none">Video</div>
              <div className="h-40 overflow-hidden relative">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/RSolWxyzn2c"
                  title="YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h5 className="font-bold text-slate-900 mb-1 text-sm leading-tight">Explore our YouTube Channel</h5>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">Witness the stories behind every every successful build.</p>
                <a href="https://youtube.com/@vamprotech?si=uC4oGsUcVknjpfF9" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 flex items-center gap-1 w-fit">
                  Visit Channel <ArrowLeft size={12} className="rotate-180" />
                </a>
              </div>
            </div>

            <Link to="/plugins/voice-generator" className="rounded-2xl bg-[#2b5be3]/5 border border-[#2b5be3]/15 overflow-hidden shadow-sm relative group cursor-pointer block hover:shadow-md transition-shadow">
              <div className="absolute top-2 right-2 bg-slate-900/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded z-10">Plugin</div>
              <div className="h-40 overflow-hidden relative">
                <img src="/reason2.png" alt="Voice Generator" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h5 className="font-bold text-[#183078] mb-1 text-sm leading-tight">AI Voiceovers in Premiere Pro</h5>
                <p className="text-xs text-[#2548ab] leading-relaxed mb-3">Type your script, choose a voice profile, and generate natural voiceovers directly inside your timeline.</p>
                <div className="w-full py-2 bg-[#2b5be3] hover:bg-[#2548ab] text-white text-center text-xs font-semibold rounded-xl transition-colors">Explore Plugin</div>
              </div>
            </Link>
          </aside>
        </div>
      </div>

      <div className="mt-auto relative z-20">
        <HomeFooter />
      </div>
    </div>
  );
};

export default BlogTemplate;
