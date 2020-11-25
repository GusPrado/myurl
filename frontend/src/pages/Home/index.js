import React from 'react'
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap'

import { ContentContainer, Form } from './styles'
import Header from '../../components/Header'
import ShortenerService from '../../services/shortenerService'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      url: '',
      code: '',
      errorMessage: ''
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const { url } = this.state

    this.setState({ isLoading: true, errorMessage: ''})

    if (!url) {
      this.setState({ isLoading: false, errorMessage: 'Informe uma URL para encurtar'}
      )
    } else {
      try {
        const service = new ShortenerService()
        const result = await service.generate({ url })

        this.setState({ isLoading: false, code: result.code })
      } catch (err) {
        this.setState({ isLoading: false, errorMessage: 'Ocorreu um erro neste processo. Favor tentar novamente.'})
      }
    }
  }

  copyToClipboard = () => {
    const element = this.inputURL
    element.select()
    document.execCommand('copy')
  }

  render() {
    const { isLoading, errorMessage, code } = this.state
    return (
      <Container>
        <Header>Seu novo encurtador de URL</Header>
        <ContentContainer>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Digite a URL para encurtar"
                defaultValue=""
                onChange={evt => this.setState({ url: evt.target.value })}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">Encurtar</Button>
              </InputGroup.Append>
            </InputGroup>
            { isLoading ? (
              <Spinner animation="border" />
            ) : (
              code && (
                <>
                  <InputGroup className="mb-3">
                    <FormControl
                      autoFocus={true}
                      defaultValue={`http://myurl.tk/${code}`}
                      ref={(input) => this.inputURL = input}
                    />
                    <InputGroup.Append>
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => this.copyToClipboard()}
                      >
                        Copiar
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <p>Para acompanhar as estatísticas deste link, acesse htps://myurl.tk/{code}</p>
                </>
              ) 
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </Form>
        </ContentContainer>
      </Container>
    )
  }
}

export default Home