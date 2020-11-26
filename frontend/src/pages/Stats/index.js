import React from 'react'
import { parseISO, formatRelative } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from 'react-bootstrap'

import vars from '../../configs/vars'
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

  async componentDidMount() {
    const {code} = this.props.match.params

    try {
      const service = new ShortenerService()
      const shortenedURL = await service.getStats(code)

      const parsedDate = parseISO(shortenedURL.updatedAt)
      const currentDate = new Date()

      const relativeDate = formatRelative(parsedDate, currentDate, {
        locale: ptBR
      })

      shortenedURL.relativeDate = relativeDate

      this.setState({ isLoading: false, shortenedURL})
    } catch (err) {
      this.setState({ isLoading: false, errorMessage: 'A URL encurtada solicitada não existe'})
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
            <p><strong>{vars.HOST_APP + shortenedURL.code}</strong></p>
            <p>Redireciona para: <br/>{shortenedURL.url}</p>
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