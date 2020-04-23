import React, { createContext, useReducer, useEffect } from 'react'
import store from 'store'
import { IntlProvider } from 'react-intl'
// helpers
import has from 'lodash/has'
import get from 'lodash/get'
import languages from './definition'

export const keyLanguage = 'language'
const navLang = get(navigator, 'language')
const prevLang = store.get(keyLanguage)

const defaultLang =
  prevLang && has(languages, prevLang)
    ? prevLang
    : has(languages, navLang)
    ? navLang
    : 'en-US'

export const ContextLang = createContext(defaultLang)

function reducer(state, action) {
  if (action.type === 'set') return action.lang
  else throw new Error()
}

const LangProvider = ({ children }) => {
  const [locale, dispatch] = useReducer(reducer, defaultLang)

  useEffect(() => {
    store.set(keyLanguage, locale)
  }, [locale])

  const messages = languages[locale].messages
  const propsIntlProvider = { locale, children, messages }
  const propsContextProvider = {
    value: { locale, dispatch },
    children: <IntlProvider {...propsIntlProvider} />
  }

  return <ContextLang.Provider {...propsContextProvider} />
}

export default LangProvider
