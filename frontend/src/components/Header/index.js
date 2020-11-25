import React from 'react'

import { Logo, HeaderContainer } from './styles'
import urlIcon from '../../assets/url_icon.png'

function Header({ children }){
  return (
    <>
      <HeaderContainer>
        <Logo src={urlIcon} alt='MyUrl - URL Shortener' />
        <h1>MyURL</h1>
        <p>{children}</p>
      </HeaderContainer>
    </>
  )
}

export default Header