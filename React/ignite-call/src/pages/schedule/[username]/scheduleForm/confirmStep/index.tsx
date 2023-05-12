import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const confirmFromSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa de pelo menos 3 letras' }),
  email: z.string().email('Digite um email válido'),
  observations: z.string().nullable(),
})

interface ConfirmFormData extends z.infer<typeof confirmFromSchema> {}

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmStep(): void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmStep,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFromSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function confirmScheduling(data: ConfirmFormData) {
    const { email, name, observations } = data
    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    onCancelConfirmStep()
  }

  const describedDate = dayjs(schedulingDate).format(
    'DD [ de ] MMMM [ de ] YYYY',
  )
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(confirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput
          {...register('name')}
          prefix="cal.com/"
          placeholder="seu-nome"
        />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>
      <label>
        <Text size="sm">Endereço de email</Text>
        <TextInput placeholder="johndoe@gmail.com" {...register('email')} />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button onClick={onCancelConfirmStep} type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button disabled={isSubmitting} type="submit" variant="primary">
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
