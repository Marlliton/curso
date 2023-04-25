import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import React from 'react'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalDay,
  IntervalErrors,
  IntervalInputs,
  IntervalsContainer,
  IntervalsItem,
} from './styles'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { getWeekDay } from '@/utils/getWeekDay'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const timeIntervalsSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enable: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enable))
    .refine((intervals) => intervals.length > 0, {
      message: 'Selecione pelo menos um dia da semana',
    }),
})
interface TimeIntervalsData extends z.infer<typeof timeIntervalsSchema> {}

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(timeIntervalsSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enable: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enable: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enable: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })
  const weekDays = getWeekDay()
  const intervals = watch('intervals')

  function handleSetTimeIntervals(data: TimeIntervalsData) {
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => {
            return (
              <IntervalsItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enable`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={intervals[index].enable === false}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={intervals[index].enable === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalsItem>
            )
          })}
        </IntervalsContainer>
        {errors.intervals && (
          <IntervalErrors size="sm">{errors.intervals.message}</IntervalErrors>
        )}

        <Button disabled={isSubmitting} type="submit">
          Próximo passo <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
