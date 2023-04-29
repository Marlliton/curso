import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const confirmFromSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa de pelo menos 3 letras' }),
  email: z.string().email('Digite um email válido'),
  observations: z.string().nullable(),
})

interface ConfirmFormData extends z.infer<typeof confirmFromSchema> {}

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFromSchema),
  })

  function confirmScheduling(data: ConfirmFormData) {
    console.log(data)
  }
  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(confirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00
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
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button disabled={isSubmitting} type="submit" variant="primary">
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
