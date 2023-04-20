import React, { useEffect } from 'react'
import { Container, Form, FormErrors, Header } from './styles'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username tem que ter no mínimo de 3 letras' })
    .regex(/^([a-z\\-]+)/i, {
      message: 'Não é permitido número ou caracteres especiais',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, 'O nome precisa term i no mínimo 3 letras'),
})

interface RegisterFormData extends z.infer<typeof registerFormSchema> {}

export default function Register() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })
  const { query } = useRouter()

  useEffect(() => {
    if (!query?.username) return
    setValue('username', String(query.username))
  }, [query?.username, setValue])

  function handleRegisterSubmit(data: RegisterFormData) {
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegisterSubmit)}>
        <label>
          <Text>Nome de usuário</Text>
          <TextInput
            {...register('username')}
            prefix="ignite.com/"
            placeholder="seu-usuário"
          />
          {errors.username && (
            <FormErrors size={'sm'}>{errors.username.message}</FormErrors>
          )}
        </label>

        <label>
          <Text>Nome completo</Text>
          <TextInput {...register('name')} placeholder="Seu nome" />
          {errors.name && (
            <FormErrors size={'sm'}>{errors.name.message}</FormErrors>
          )}
        </label>

        <Button disabled={isSubmitting}>
          Próximo passo <ArrowRight size={24} weight="bold" />
        </Button>
      </Form>
    </Container>
  )
}
