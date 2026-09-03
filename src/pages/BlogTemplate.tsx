import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, User, ArrowLeft, Play, Pause, Square, Share2, Check } from 'lucide-react';
import SEO from '../components/SEO';
import HomeFooter from '../components/HomeFooter';
import { blogMetadata } from '../seo/metadata';
import { useSignup } from '../context/SignupContext';

import { allBlogPosts as blogPosts } from '../data/blogs';

const BlogTemplate = () => {
  const { slug } = useParams();
  const isPost = !!slug;
  const [speechState, setSpeechState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [activeHeading, setActiveHeading] = useState<string>('overview');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { openSignup } = useSignup();
  const [copied, setCopied] = useState(false);

  // Filter and Sort State
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Extract unique topics and authors
  const uniqueProducts = useMemo(() => ['All', 'Universal Paste', 'Voice Generator'], []);
  const uniqueTopics = useMemo(() => ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))], []);
  const uniqueAuthors = useMemo(() => ['All', ...Array.from(new Set(blogPosts.map(p => p.author)))], []);

  // Filtered and Sorted Posts
  const filteredPosts = useMemo(() => {
    let result = [...blogPosts];

    if (selectedProduct !== 'All') {
      result = result.filter(p => {
        if (selectedProduct === 'Universal Paste') return p.product === 'Universal Paste';
        if (selectedProduct === 'Voice Generator') return p.product === 'Voice Generator' || !p.product;
        return true;
      });
    }

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
  }, [selectedProduct, selectedTopic, selectedAuthor, sortOrder]);

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
      utteranceRef.current = utterance; // Prevent Safari garbage collection
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

    const handleScroll = () => {
      const headingElements = post.toc.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
      if (headingElements.length === 0) return;

      let currentActive = headingElements[0].id;
      const scrollPosition = window.scrollY + 200;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        const elementTop = el.getBoundingClientRect().top + window.scrollY;
        
        if (scrollPosition >= elementTop) {
          currentActive = el.id;
          break;
        }
      }

      setActiveHeading(prev => prev !== currentActive ? currentActive : prev);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  if (isPost && !post) {
    return <Navigate to="/blog" replace />;
  }

  if (!isPost) {
    return (
      <div className="sketchbook-bg min-h-screen pt-32 flex flex-col relative">
        <SEO {...blogMetadata} />
        <main className="flex-grow w-full max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 2xl:px-24 z-10 pb-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
              Vampro Blogs
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              Insights, updates, tutorials, and editing best practices for Adobe Premiere Pro.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 mb-10 gap-5 shadow-sm">
            <div className="flex flex-wrap gap-5 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">Plugin</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 min-w-[140px]"
                >
                  {uniqueProducts.map(prod => (
                    <option key={prod} value={prod}>{prod === 'All' ? 'All Plugins' : prod}</option>
                  ))}
                </select>
              </div>

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
                onClick={() => { setSelectedProduct('All'); setSelectedTopic('All'); setSelectedAuthor('All'); setSortOrder('newest'); }}
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
                    {blogPost.product && (
                      <div className={`absolute top-4 right-4 z-10 px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full shadow-sm ${
                        blogPost.product === 'Universal Paste'
                          ? 'bg-[#ffd437] text-[#07080b] border border-black/30'
                          : 'bg-indigo-600 text-white'
                      }`}>
                        {blogPost.product}
                      </div>
                    )}
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
  const isUniversalPaste = currentPost.product === 'Universal Paste';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": currentPost.title,
    "description": currentPost.summary,
    "image": `https://vampro.in${currentPost.image}`,
    "author": {
      "@type": "Person",
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
    "dateModified": new Date(currentPost.date).toISOString().split('T')[0],
    "articleSection": currentPost.category,
    "keywords": [
      currentPost.category,
      currentPost.product || 'Video Editing',
      'Adobe Premiere Pro',
      'Video Editing Workflow',
      'Premiere Pro Plugins',
      'Vampro'
    ],
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
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 2xl:px-24 mt-4 mb-8 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-500 transition-colors mb-4 font-medium">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div className="rounded-3xl overflow-hidden aspect-video sm:aspect-[21/9] lg:aspect-[3840/1116] w-full relative border border-slate-200 shadow-xl mb-6">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 opacity-70"></div>
            <img src={currentPost.image} alt={currentPost.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md border border-indigo-200 text-indigo-600 text-xs font-semibold rounded-full shadow-sm">
                {currentPost.category}
              </span>
              {currentPost.product && (
                <span className={`px-3 py-1 text-xs font-extrabold rounded-full shadow-sm ${
                  isUniversalPaste
                    ? 'bg-[#ffd437] text-[#07080b] border border-black/30'
                    : 'bg-indigo-600 text-white'
                }`}>
                  {currentPost.product}
                </span>
              )}
            </div>
          </div>

          <header className="w-full text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tight">
              {currentPost.title}
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              {currentPost.summary}
            </p>
          </header>

          <div className="flex flex-wrap items-center justify-between gap-4 p-5 md:px-8 md:py-6 bg-white/60 backdrop-blur-md border border-indigo-100 shadow-sm rounded-3xl mb-12">
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-3">
                <img src={currentPost.authorImage || "/author.jpg"} alt={currentPost.author} className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" />
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
              <button
                type="button"
                onClick={async () => {
                  if (!currentPost) return;
                  const url = window.location.href;
                  const shareData = {
                    title: currentPost.title,
                    text: currentPost.summary,
                    url: url
                  };

                  if (navigator.share) {
                    try {
                      await navigator.share(shareData);
                      return;
                    } catch (err: any) {
                      if (err.name === 'AbortError') return;
                    }
                  }

                  try {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      await navigator.clipboard.writeText(url);
                    } else {
                      const textarea = document.createElement('textarea');
                      textarea.value = url;
                      textarea.style.position = 'fixed';
                      textarea.style.opacity = '0';
                      document.body.appendChild(textarea);
                      textarea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textarea);
                    }
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  } catch (err) {
                    console.error('Failed to copy', err);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all shadow-sm ${
                  copied
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                }`}
                title={copied ? "Link copied to clipboard!" : "Share article"}
                aria-label="Share article"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={16} />
                    <span className="text-xs font-medium">Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 2xl:px-24 flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-20 2xl:gap-28 relative z-10 pb-20">
          {/* TOC Sidebar & Left Ad Callout */}
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
                      className={`text-sm transition-colors block ${activeHeading === item.id ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-indigo-600'}`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Left Sidebar Ad Callout */}
            {isUniversalPaste ? (
              <div className="rounded-2xl bg-amber-500/10 border-2 border-[#ffd437] overflow-hidden shadow-sm relative group block hover:shadow-md transition-shadow">
                <div className="absolute top-2 right-2 bg-[#ffd437] text-[#07080b] text-[10px] uppercase font-black px-2 py-0.5 rounded z-10 border border-black/20">
                  Universal Paste
                </div>
                <div className="h-36 overflow-hidden relative">
                  <img src="/banner-screenshot-workflow-premiere.jpg" alt="Vampro Universal Paste" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h5 className="font-extrabold text-slate-900 mb-1 text-sm leading-tight">Paste Directly Into Premiere Pro</h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">Copy images, screenshots, videos, and URLs and drop them straight onto your timeline without file clutter.</p>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => openSignup({
                        product: 'Universal Paste',
                        source: 'Blog Left Sidebar',
                        title: 'Join Universal Paste Waitlist',
                        subtitle: 'Get early access to native clipboard pasting in Premiere Pro.',
                        buttonText: 'Join Waitlist',
                        successTitle: "You're on the early access list!",
                        successMessage: "We'll notify you as soon as early access builds are ready.",
                        alwaysShow: true
                      })}
                      className="w-full py-2 bg-[#ffd437] hover:bg-[#ffdf6b] text-[#07080b] text-center text-xs font-black rounded-xl transition-all border-2 border-[#07080b] shadow-[2px_2px_0_#07080b]"
                    >
                      ★ JOIN WAITLIST
                    </button>
                    <Link
                      to="/plugins/universal-paste"
                      className="text-center text-[11px] font-bold text-slate-700 hover:text-black underline underline-offset-2"
                    >
                      Explore Plugin Features ➔
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/plugins/voice-generator" className="rounded-2xl bg-indigo-50 border border-indigo-100 overflow-hidden shadow-sm relative group cursor-pointer block hover:shadow-md transition-shadow">
                <div className="absolute top-2 right-2 bg-slate-900/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded z-10">Plugin</div>
                <div className="h-32 overflow-hidden relative">
                  <img src="/reason1.png" alt="Voice Generator" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h5 className="font-bold text-indigo-900 mb-1 text-sm leading-tight">Generate Instant AI Voiceovers</h5>
                  <p className="text-xs text-indigo-700 leading-relaxed mb-3">Just type your script, select voice profile, generate and modify voiceovers all within your Adobe Premiere Pro timeline.</p>
                  <span className="text-xs font-semibold text-indigo-600 group-hover:text-indigo-500 flex items-center gap-1">
                    Learn More <ArrowLeft size={12} className="rotate-180" />
                  </span>
                </div>
              </Link>
            )}
          </aside>

          {/* Article Body */}
          <article className="flex-1 min-w-0 mx-auto order-1 lg:order-2 text-slate-800 w-full flex flex-col gap-8">

            {/* Overview Box */}
            <div id="overview" className={`rounded-3xl p-8 shadow-sm border relative overflow-hidden ${
              isUniversalPaste
                ? 'bg-amber-50/50 border-amber-200/80'
                : 'bg-indigo-50/50 border-indigo-100'
            }`}>
              <div className={`absolute top-0 left-0 w-1.5 h-full ${
                isUniversalPaste ? 'bg-[#ffd437]' : 'bg-indigo-400'
              }`}></div>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-wide text-sm ${
                isUniversalPaste ? 'text-amber-950' : 'text-indigo-900'
              }`}>
                Overview
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: currentPost.overview }} />
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-2 ${
                isUniversalPaste
                  ? 'bg-gradient-to-r from-[#ffd437] via-[#ed1c24] to-[#07080b]'
                  : 'bg-gradient-to-r from-indigo-500 to-blue-500'
              }`}></div>
              <div className="prose prose-slate lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: currentPost.content }} />
            </div>
          </article>

          {/* Right Sidebar (Ads) */}
          <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky top-32 h-fit order-3 flex flex-col gap-6">
            {isUniversalPaste ? (
              <>
                {/* Right Ad 1: Universal Paste Feature Highlight */}
                <div className="rounded-2xl bg-slate-950 border border-slate-800 text-white overflow-hidden shadow-md relative group block">
                  <div className="absolute top-2 right-2 bg-[#ffd437] text-[#07080b] text-[10px] uppercase font-black px-2 py-0.5 rounded z-10">
                    New Plugin
                  </div>
                  <div className="h-40 overflow-hidden relative">
                    <img src="/banner-browser-bridge-premiere.jpg" alt="Universal Paste Feature" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h5 className="font-extrabold text-white mb-1 text-sm leading-tight">Turn Clipboard Into an Editing Bridge</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">Eliminate the save-and-import loop. Instant web and screen snips directly into Premiere Pro.</p>
                    <Link
                      to="/plugins/universal-paste"
                      className="w-full py-2 bg-[#ffd437] hover:bg-[#ffdf6b] text-[#07080b] text-center text-xs font-black rounded-xl transition-all block border-2 border-[#07080b] shadow-[2px_2px_0_#07080b]"
                    >
                      Explore Universal Paste ➔
                    </Link>
                  </div>
                </div>

                {/* Right Ad 2: Universal Paste Waitlist Card */}
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-[#ffd437] overflow-hidden shadow-sm relative group block hover:shadow-md transition-shadow">
                  <div className="absolute top-2 right-2 bg-slate-900 text-[#ffd437] text-[10px] uppercase font-black px-2 py-0.5 rounded z-10">
                    Early Access
                  </div>
                  <div className="h-36 overflow-hidden relative">
                    <img src="/banner-downloading-images-premiere.jpg" alt="Universal Paste Waitlist" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h5 className="font-extrabold text-slate-900 mb-1 text-sm leading-tight">Be First in Line</h5>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">Join the private beta. Get early access builds, release updates, and creator perks.</p>
                    <button
                      type="button"
                      onClick={() => openSignup({
                        product: 'Universal Paste',
                        source: 'Blog Right Sidebar',
                        title: 'Join Universal Paste Waitlist',
                        subtitle: 'Get early access to native clipboard pasting in Premiere Pro.',
                        buttonText: 'Join Waitlist',
                        successTitle: "You're on the early access list!",
                        successMessage: "We'll notify you as soon as early access builds are ready.",
                        alwaysShow: true
                      })}
                      className="w-full py-2.5 bg-[#07080b] hover:bg-slate-800 text-[#ffd437] text-center text-xs font-black rounded-xl transition-all border border-[#07080b] shadow-sm"
                    >
                      ★ JOIN WAITLIST NOW
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
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
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">Witness the stories behind every successful build.</p>
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
              </>
            )}
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
