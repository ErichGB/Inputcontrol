import React, { Fragment, useContext } from 'react'
import Flag from 'react-world-flags'
// antd
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
// helpers
import map from 'lodash/map'
import omit from 'lodash/omit'
import languages from './definition'
// context
import { ContextLang } from './index'

const Pick = () => {
  const { locale, dispatch } = useContext(ContextLang)
  const onClick = ({ key }) => dispatch({ type: 'set', lang: key })

  const Lang = ({ label, flag }) => (
    <Fragment>
      <Flag width={20} code={flag} />
      <span className="ml-2">{label}</span>
    </Fragment>
  )

  const menu = (
    <Menu onClick={onClick}>
      {map(omit(languages, locale), (objLang, key) => (
        <Menu.Item key={key}>
          <Lang {...objLang} />
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Dropdown.Button overlay={menu} className="picker">
      <Lang {...languages[locale]} />
    </Dropdown.Button>
  )
}

export default Pick
