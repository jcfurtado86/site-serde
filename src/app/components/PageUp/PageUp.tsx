'use client'
import { useEffect, useState } from 'react'

export default function PageUp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop
      setVisible(scrolled > 300)
    }

    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-700 rounded-full p-4 text-white shadow-xl hover:bg-gray-800 transition-all z-50 animate-fade-in duration-300"
          style={{ opacity: visible ? '1' : '0' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      )}
    </>
  )
}