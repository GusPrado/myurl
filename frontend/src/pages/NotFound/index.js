import React from 'react'

import {Container, Image} from './styles'

import notFound from '../../assets/not_found.png'

class NotFound extends React.Component {
 
  render() {
    return (
      <Container>
        <Image src={notFound} alt="Não encontrado"/>
      </Container>
    )
  }
}

export default NotFound