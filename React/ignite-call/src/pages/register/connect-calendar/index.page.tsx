import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import React from 'react'
import { Container, Header } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { ConnectBox, ConnectItem, ErrorAuth } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()
  const hasErrorPermission = !!router.query.error
  const isAuthenticated = session.status === 'authenticated'

  async function handleLoginWithGoogle() {
    signIn('google')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isAuthenticated ? (
            <Button disabled size={'sm'} variant={'secondary'}>
              Conectado
              <Check size={24} />
            </Button>
          ) : (
            <Button
              size={'sm'}
              variant={'secondary'}
              onClick={handleLoginWithGoogle}
            >
              Conectar
              <ArrowRight size={24} />
            </Button>
          )}
        </ConnectItem>

        {hasErrorPermission && (
          <ErrorAuth size={'sm'}>
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </ErrorAuth>
        )}

        <Button disabled={!isAuthenticated}>
          Proximo passo
          <ArrowRight size={24} weight="bold" />
        </Button>
      </ConnectBox>
    </Container>
  )
}
