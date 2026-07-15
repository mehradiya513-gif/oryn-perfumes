'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'
import posts from '@/lib/posts'
import products from '@/lib/products'
import { useCart } from '@/context/CartContext'

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  
  const articleRef = useRef<HTMLDivElement | null>(null)
  const sidebarRef = useRef<HTMLDivElement | null>(null)

  // Find current post
  const post = useMemo(() => {
    return posts.find((p) => p.slug === params.slug)
  }, [params.slug])

  // Find related product
  const product = useMemo(() => {
    if (!post) return null
    return products.find((p) => p.id === post.relatedProduct)
  }, [post])

  // Entrance animations
  useEffect(() => {
    if (!post) return

    gsap.fromTo(
      '.animate-fade-up',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
    )

    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' },
      )
    }
  }, [post])

  if (!post) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center space-y-4 text-olive">
        <span className="text-4xl">⚜️</span>
        <h1 className="font-serif text-2xl font-bold">Article Not Found</h1>
        <p className="text-xs text-stone font-sans">The chronicle you are looking for does not exist in the vault.</p>
        <a
          href="/blog"
          className="rounded-full bg-olive text-oatmeal px-6 py-3 text-xs font-bold uppercase tracking-wider font-mono hover:bg-stone hover:text-oatmeal transition duration-300"
        >
          Return to Blog
        </a>
      </div>
    )
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2050)
  }

  return (
    <main className="min-h-screen bg-transparent pb-32 text-olive">
      {/* Cover and details */}
      <article ref={articleRef} className="mx-auto max-w-7xl px-6 sm:px-10 pt-10">
        {/* Breadcrumb / Back button */}
        <div className="mb-8 flex items-center justify-between animate-fade-up text-xs font-mono uppercase tracking-wider">
          <a
            href="/blog"
            className="group inline-flex items-center gap-2 font-bold text-stone hover:text-olive transition"
          >
            <span className="text-sm transition-transform duration-300 group-hover:-translate-x-1">←</span> Back to Blog
          </a>
          <div className="hidden md:flex items-center gap-2 text-stone/60 font-medium">
            <a href="/" className="hover:underline">Home</a>
            <span>/</span>
            <a href="/blog" className="hover:underline">Blog</a>
            <span>/</span>
            <span className="text-olive truncate max-w-[200px]">{post.title}</span>
          </div>
        </div>

        {/* Category & Title */}
        <div className="max-w-4xl space-y-4 mb-10">
          <span className="animate-fade-up inline-block px-3 py-1 rounded-full bg-sand text-[9px] font-bold text-stone border border-stone/30 uppercase tracking-wider font-mono">
            {post.category}
          </span>
          <h1 className="animate-fade-up font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-olive leading-tight tracking-wide lowercase italic">
            {post.title}
          </h1>
          <p className="animate-fade-up text-sm sm:text-base text-olive/75 leading-relaxed font-sans max-w-3xl">
            {post.excerpt}
          </p>

          {/* Author info */}
          <div className="animate-fade-up flex flex-wrap items-center gap-5 pt-5 border-t border-stone/20">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{post.author.avatar}</span>
              <div>
                <p className="text-[10px] font-bold text-olive uppercase tracking-wider font-mono">{post.author.name}</p>
                <p className="text-[8px] text-stone/60 font-bold uppercase tracking-widest font-mono">{post.author.role}</p>
              </div>
            </div>
            <div className="hidden sm:block h-6 w-px bg-stone/20" />
            <div className="text-[10px] text-stone/80 space-y-0.5 font-sans">
              <p className="font-semibold text-olive/80">Published</p>
              <p>{post.date} · {post.readTime}</p>
            </div>
            
            {/* Actions */}
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`rounded-full border p-2 h-9 w-9 flex items-center justify-center transition-all duration-300 ${
                  liked 
                    ? 'bg-rose-50 border-rose-400 text-rose-600' 
                    : 'bg-sand border-stone/30 text-stone hover:bg-stone/10 hover:text-olive'
                }`}
              >
                <span>{liked ? '❤️' : '🤍'}</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="rounded-full border border-stone/30 bg-sand px-4 py-2 text-[10px] font-bold uppercase tracking-wider font-mono text-olive hover:bg-stone/10 transition flex items-center gap-2 shadow-2xs"
              >
                <span>🔗</span>
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="animate-fade-up relative w-full h-[320px] sm:h-[450px] lg:h-[550px] rounded-wabi-1 overflow-hidden bg-sand mb-12 shadow-soft border border-stone/20">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover filter saturate-[0.8] soft-focus-img"
            priority
          />
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Article Text Content */}
          <div className="lg:col-span-8 space-y-6 text-olive/80 leading-relaxed text-sm sm:text-base font-sans">
            {post.content.map((block, idx) => {
              switch (block.type) {
                case 'p':
                  return (
                    <p key={idx} className="font-sans text-olive/75">
                      {block.value as string}
                    </p>
                  )
                case 'h2':
                  return (
                    <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-light text-olive pt-6 tracking-wide">
                      {block.value as string}
                    </h2>
                  )
                case 'quote':
                  return (
                    <blockquote
                      key={idx}
                      className="border-l-2 border-stone bg-sand/65 py-4 px-6 rounded-r-3xl my-6"
                    >
                      <p className="font-serif text-base italic text-stone leading-relaxed">
                        {block.value as string}
                      </p>
                    </blockquote>
                  )
                case 'list':
                  return (
                    <ul key={idx} className="space-y-3 pl-5 list-none my-6">
                      {(block.value as string[]).map((item, i) => (
                        <li key={i} className="relative text-olive/75 text-xs sm:text-sm leading-relaxed pl-6">
                          <span className="absolute left-0 top-1 text-stone text-[10px]">⚜️</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )
                case 'highlight':
                  return (
                    <div
                      key={idx}
                      className="rounded-3xl border border-stone/20 bg-sand/50 p-6 my-6 text-xs sm:text-sm text-olive/75 leading-relaxed font-sans border-l-2 border-l-stone"
                    >
                      {block.value as string}
                    </div>
                  )
                default:
                  return null
              }
            })}
          </div>

          {/* Sidebar Area: Shop the Story */}
          <div className="lg:col-span-4 space-y-8">
            {product && (
              <div
                ref={sidebarRef}
                className="sticky top-28 rounded-wabi-2 border border-stone/20 bg-sand/65 p-6 shadow-soft space-y-5"
              >
                <div className="space-y-1">
                  <span className="inline-block text-[9px] tracking-[0.25em] font-bold text-stone uppercase font-mono">
                    SHOP THE CHRONICLE
                  </span>
                  <h3 className="font-serif text-lg font-normal text-olive tracking-wide">Featured Fragrance</h3>
                  <p className="text-[10px] text-stone/80 leading-relaxed">
                    This chronicle is inspired by the slow formulation behind our signature perfume. Experience the purpose.
                  </p>
                </div>

                {/* Scent Mini-Card */}
                <div className="rounded-2xl border border-stone/15 bg-sand/30 p-4 shadow-xs space-y-4 group">
                  <div className="relative h-44 rounded-xl overflow-hidden bg-sand border border-stone/10 p-2 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain filter saturate-[0.8] transition-transform duration-500 group-hover:scale-103"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] tracking-wider uppercase font-bold text-stone font-mono">
                      {product.fragrance}
                    </p>
                    <h4 className="font-serif text-lg font-normal text-olive group-hover:text-stone transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-olive/75 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-stone/10">
                    <span className="text-base font-serif text-olive">₹{product.price}</span>
                    <button
                      type="button"
                      onClick={() => product && addToCart(product)}
                      className="rounded-full bg-olive text-oatmeal px-5 py-2 text-[9px] font-bold uppercase tracking-widest font-mono transition hover:bg-stone hover:text-oatmeal shadow-xs"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Recommended Articles Section */}
      <section className="mx-auto max-w-7xl px-6 sm:px-10 mt-24 pt-16 border-t border-stone/20">
        <h2 className="font-serif text-2xl sm:text-3xl font-light text-olive mb-8 tracking-wide">Related Scent Chronicles</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 3)
              .map((item) => (
                <article
                  key={item.slug}
                  className="group rounded-wabi-3 border border-stone/25 bg-sand/60 overflow-hidden transition-all duration-500 hover:shadow-subtle hover:border-stone/40 hover:bg-sand flex flex-col h-full shadow-xs"
                >
                  <a href={`/blog/${item.slug}`} className="flex flex-col h-full">
                    <div className="relative h-40 bg-sand border-b border-stone/10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover filter saturate-[0.8] soft-focus-img"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold text-stone uppercase tracking-wider font-mono">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-lg font-normal tracking-wide text-olive group-hover:text-stone transition leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-bold text-stone flex items-center gap-1 mt-auto pt-2 group-hover:translate-x-1 transition-transform font-mono">
                        Read Story <span className="text-sm">→</span>
                      </span>
                    </div>
                  </a>
                </article>
              ))}
        </div>
      </section>
    </main>
  )
}
