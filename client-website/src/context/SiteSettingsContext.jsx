import React, { createContext, useContext, useEffect, useState } from 'react'
import { getPublicSettings } from '../services/api'

const DEFAULT_SETTINGS = {
  siteName: 'Viralstan',
  metaTitle: 'Viralstan - Digital Growth Agency',
  metaDescription:
    'We help businesses achieve measurable growth through data-driven strategy, creative execution, and strong digital presence.',
}

const SiteSettingsContext = createContext({
  settings: DEFAULT_SETTINGS,
  isLoading: false,
})

const ensureMetaDescription = () => {
  let tag = document.querySelector('meta[name="description"]')

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', 'description')
    document.head.appendChild(tag)
  }

  return tag
}

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getPublicSettings()
        setSettings((current) => ({ ...current, ...data }))
      } catch (error) {
        setSettings(DEFAULT_SETTINGS)
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  useEffect(() => {
    document.title = settings.metaTitle || DEFAULT_SETTINGS.metaTitle
    ensureMetaDescription().setAttribute(
      'content',
      settings.metaDescription || DEFAULT_SETTINGS.metaDescription,
    )

    if (settings.primaryColor) {
      document.documentElement.style.setProperty('--brand-pink', settings.primaryColor)
    }

    if (settings.secondaryColor) {
      document.documentElement.style.setProperty('--brand-blue', settings.secondaryColor)
      document.documentElement.style.setProperty('--brand-indigo', settings.secondaryColor)
    }
  }, [settings])

  return (
    <SiteSettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export const useSiteSettings = () => useContext(SiteSettingsContext)
