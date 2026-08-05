'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import property from '@/config/property.json'

const pages = property.navigation.filter((p) => p.enabled)

export function Navigation() {
  const pathname = usePathname()
  // The menu is open only while we are still on the route it was opened from,
  // so any navigation closes it without an effect.
  const [openedFrom, setOpenedFrom] = useState<string | null>(null)
  const isOpen = openedFrom === pathname

  const openMenu = () => setOpenedFrom(pathname)
  const closeMenu = () => setOpenedFrom(null)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Top navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-white shadow-sm flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/logo-domustua.png"
              alt="DomusTua Immobiliare"
              width={110}
              height={36}
              className="object-contain"
              priority
            />
          </Link>
        </div>
        <button
          onClick={openMenu}
          aria-label="Apri menu di navigazione"
          className="flex flex-col gap-1.5 p-2 cursor-pointer"
        >
          <span className="block w-6 h-0.5 bg-[#333333]" />
          <span className="block w-6 h-0.5 bg-[#333333]" />
          <span className="block w-6 h-0.5 bg-[#333333]" />
        </button>
      </header>

      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Slide-out sidebar */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Menu di navigazione"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="font-bold text-[#CC1414] uppercase tracking-wide text-sm">
            Navigazione
          </span>
          <button
            onClick={closeMenu}
            aria-label="Chiudi menu"
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex-1 overflow-y-auto py-4">
          {pages.map((page) => {
            const isActive = pathname === page.href
            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  onClick={closeMenu}
                  className={`flex items-center px-6 py-3 text-sm transition-colors hover:bg-red-50 hover:text-[#CC1414] ${
                    isActive
                      ? 'font-bold text-[#CC1414] bg-red-50'
                      : 'text-[#333333]'
                  }`}
                >
                  {page.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
