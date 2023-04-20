import { TextInput, Button, Text } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username tem que ter no mínimo de 3 letras' })
    .regex(/^([a-z\\-]+)/i, {
      message: 'Não é permitido número ou caracteres especiais',
    })
    .transform((username) => username.toLowerCase()),
})

interface ClaimUsernameFromData
  extends z.infer<typeof ClaimUsernameFormSchema> {}

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFromData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })
  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFromData) {
    const { username } = data
    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          {...register('username')}
          size={'md'}
          prefix="ignite.com/"
          placeholder="seu-usuário"
        />
        <Button disabled={isSubmitting} size={'sm'} type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text>
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
