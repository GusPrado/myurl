import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from 'react-bootstrap'

import ShortenerService from '../../services/shortenerService'

import Header from '../../components/Header'
import { StatsContainer, StatsBox, StatsBoxTitle, StatsRow } from './styles'


class Stats extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      shortenedURL: {},
      errorMessage: ''
    }
  }

  render() {
    const {errorMessage, shortenedURL} = this.state
    return (
      <Container>
        <Header>Estatísticas:</Header>
        {errorMessage ? (
          <StatsContainer className="text-center">
            <FontAwesomeIcon 
              size="3x" 
              color="#f8d7da" 
              icon="exclamation-triangle" 
            />
            <p className="mb-3">{errorMessage}</p>
            <a className="btn btn-primary" href="/">Encurtar nova URL</a>
          </StatsContainer>
        ) : (
          <StatsContainer className="text-center">
            <p><strong>https://myurl.tk/{shortenedURL.code}</strong></p>
            <p>Redireciona para: <br/>{shortenedURL.code}</p>
            <StatsRow>
              <StatsBox>
                <strong>{shortenedURL.hits}</strong>
                <StatsBoxTitle>Visitas</StatsBoxTitle>
              </StatsBox>
              <StatsBox>
                <strong>{shortenedURL.relativeDate}</strong>
                <StatsBoxTitle>Última visita</StatsBoxTitle>
              </StatsBox>
            </StatsRow>
            <a className="btn btn-primary" href="/">Encurtar nova URL</a>
          </StatsContainer>
        )}
      </Container>
    )
  }

}

export default Stats