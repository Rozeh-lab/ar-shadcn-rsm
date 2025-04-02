"use client"

import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'


const HomeFooter = () => {

    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
      const savedTheme = Cookies.get('dark-mode')
      if (savedTheme === 'true') {
        setIsDarkMode(true)
        document.body.classList.add('dark')
      }
    }, [])


    return(
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-8 px-12 text-center text-sm text-muted-foreground">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
        <div>© 2025 더 리치 솔루션. All rights reserved.</div>
        <div className="hidden md:flex items-center gap-2 border px-2 py-1 rounded-full dark:border-gray-600">
          <button
            onClick={() => {
              setIsDarkMode(false)
              document.body.classList.remove('dark')
              Cookies.set('dark-mode', 'false', { expires: 365 })
            }}
            className={`p-1 rounded-full ${!isDarkMode ? 'bg-muted' : ''}`}
          >
            <SunIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setIsDarkMode(true)
              document.body.classList.add('dark')
              Cookies.set('dark-mode', 'true', { expires: 365 })
            }}
            className={`p-1 rounded-full ${isDarkMode ? 'bg-muted' : ''}`}
          >
            <MoonIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
    )
}

export default HomeFooter;