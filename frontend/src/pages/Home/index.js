import React from 'react'
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap'
import * as Yup from 'yup'

import vars from '../../configs/vars'
import { ContentContainer, Form, AdsBlock } from './styles'
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

    try {
      const schema = Yup.string()
        .required('Informe uma URL para encurtar')
        .url('Formato inválido')

      await schema.validate(url, {
        abortEarly: false
      })
    } catch (err) {
      console.log(err.message)
      this.setState({ isLoading: false, errorMessage: err.message})
      return
    }

    try {
      
      const service = new ShortenerService()
      const result = await service.generate({ url })

      this.setState({ isLoading: false, code: result.code })
    } catch (err) {
      this.setState({ isLoading: false, errorMessage: 'Ocorreu um erro neste processo. Favor tentar novamente.'})
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
                placeholder="Digite a URL para encurtar - não esqueça o http:// ou https:// no início"
                onChange={evt => this.setState({ url: evt.target.value })}
              />
              <InputGroup.Append>
                <Button variant="success" type="submit">Encurtar</Button>
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
                      defaultValue={vars.HOST_APP + code}
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
                <p>Para acompanhar as estatísticas deste link, acesse <a href={`${vars.HOST_APP + code}/stats`} alt="stats link">{`${vars.HOST_APP + code}/stats`}</a></p>
                </>
              ) 
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </Form>
        </ContentContainer>
        <ContentContainer>
          <AdsBlock>AdSense here!</AdsBlock>
        </ContentContainer>
      </Container>
    )
  }
}

export default Home