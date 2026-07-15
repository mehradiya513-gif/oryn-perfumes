'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import posts from '@/lib/posts'

export default function BlogLandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const heroRef = useRef<HTMLDivElement | null>(null)
  const postsGridRef = useRef<HTMLDivElement | null>(null)

  // Extract unique categories
  const categories = useMemo(() => {
    const allCats = posts.map((post) => post.category)
    return ['All', ...Array.from(new Set(allCats))]
  }, [])

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  const featuredPost = useMemo(() => {
    return posts[0]
  }, [])

  // GSAP animation
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
      )
    }

    gsap.fromTo(
      '.blog-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' },
    )
  }, [selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-transparent pb-32 text-olive">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-10 text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand border border-stone/30">
          <span className="text-xs">📚</span>
          <p className="mono-tag text-[9px] font-bold text-stone">ORYN Chronicles</p>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-olive tracking-wide lowercase italic leading-tight">
          fragrance, craft & <span className="text-stone font-normal">purpose</span>
        </h1>
        <p className="text-xs sm:text-sm text-olive/75 max-w-2xl mx-auto leading-relaxed font-sans">
          Step into our brand blog. Discover the slow formulation process, ecological choices, and design processes behind our timeless fragrances.
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto pt-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, notes, tags..."
            className="w-full rounded-full border border-stone/35 bg-sand/65 px-6 py-3 pl-12 text-xs text-olive outline-none transition focus:border-olive focus:ring-4 focus:ring-stone/10 shadow-xs"
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-stone/50">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-olive/75 hover:text-stone bg-sand border border-stone/30 rounded-full p-1 w-5 h-5 flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>
      </section>

      {/* Featured Post Banner */}
      {searchQuery === '' && selectedCategory === 'All' && featuredPost && (
        <section className="mx-auto max-w-7xl px-6 sm:px-10 mb-24">
          <a
            href={`/blog/${featuredPost.slug}`}
            className="group block overflow-hidden rounded-wabi-1 border border-stone/25 bg-sand/65 shadow-soft hover:border-stone/40 hover:bg-sand transition-all duration-500"
          >
            <div className="grid lg:grid-cols-12 gap-0">
              <div className="relative h-64 lg:h-auto lg:col-span-7 overflow-hidden bg-sand min-h-[340px] border-r border-stone/15">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover filter saturate-[0.8] soft-focus-img"
                  priority
                />
              </div>
              <div className="p-8 sm:p-12 lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-sand text-[9px] font-bold text-stone border border-stone/30 uppercase tracking-wider font-mono">
                      {featuredPost.category}
                    </span>
                    <span className="text-[10px] text-stone/75 font-medium">{featuredPost.date}</span>
                  </div>
                  <h2 className="font-serif text-3xl font-normal text-olive group-hover:text-stone transition duration-300 leading-snug">
                    {featuredPost.title}
                  </h2>
                  <p className="text-olive/75 text-xs leading-relaxed font-sans line-clamp-4">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-stone/20">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{featuredPost.author.avatar}</span>
                    <div>
                      <p className="text-[10px] font-bold text-olive uppercase tracking-wider font-mono">{featuredPost.author.name}</p>
                      <p className="text-[8px] text-stone/60 uppercase tracking-widest font-mono">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-stone group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1 font-mono">
                    Read Story <span className="text-sm">→</span>
                  </span>
                </div>
              </div>
            </div>
          </a>
        </section>
      )}

      {/* Category Tabs */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10 mb-12 flex items-center justify-between border-b border-stone/20 pb-5 overflow-x-auto gap-4 scrollbar-none">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-[9px] font-bold uppercase tracking-widest transition duration-300 font-mono ${
                selectedCategory === cat
                  ? 'bg-olive text-oatmeal shadow-xs'
                  : 'bg-sand/65 border border-stone/30 text-olive/80 hover:border-olive hover:text-olive'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-[9px] text-stone/75 tracking-widest font-bold uppercase font-mono shrink-0">
          {filteredPosts.length} stor{filteredPosts.length !== 1 ? 'ies' : 'y'} found
        </div>
      </section>

      {/* Cards Grid */}
      <section ref={postsGridRef} className="mx-auto max-w-7xl px-6 sm:px-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-stone/30 bg-sand/35 space-y-3">
            <span className="text-4xl">⚜️</span>
            <h3 className="font-serif text-xl font-bold text-olive">No chronicles found</h3>
            <p className="text-stone/75 text-xs max-w-md mx-auto font-sans leading-relaxed">
              We couldn't find any articles matching your search query. Try typing something else or select another category tab.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="mt-4 rounded-full bg-olive text-oatmeal px-6 py-2.5 text-xs font-bold uppercase tracking-wider font-mono hover:bg-stone hover:text-oatmeal transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="blog-card group rounded-wabi-2 border border-stone/20 bg-sand/60 overflow-hidden transition-all duration-500 hover:shadow-subtle hover:border-stone/40 hover:bg-sand flex flex-col h-full shadow-xs"
              >
                <a href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden bg-sand border-b border-stone/10">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover filter saturate-[0.8] soft-focus-img"
                    />
                  </div>
                  
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[9px] text-stone font-bold font-mono uppercase tracking-wider">
                        <span className="text-olive">{post.category}</span>
                        <span>{post.date}</span>
                      </div>
                      
                      <h3 className="font-serif text-lg font-normal tracking-wide text-olive group-hover:text-stone transition leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-xs text-olive/80 leading-relaxed font-sans line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
 
                    <div className="flex items-center justify-between pt-4 border-t border-stone/15 mt-auto text-xs font-semibold text-olive/80">
                      <div className="flex items-center gap-2 text-stone/75 font-mono text-[9px]">
                        <span>{post.author.avatar}</span>
                        <span className="ml-1">{post.author.name}</span>
                      </div>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 text-stone font-mono">
                        Read <span className="text-sm">→</span>
                      </span>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
