import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'
import { FromAnnotation, ProfileBox } from './styles'
import { useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const UpdateProfileSchema = z.object({
  bio: z.string(),
})

interface UpdateProfileData extends z.infer<typeof UpdateProfileSchema> {}

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({})
  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfileSubmit(data: UpdateProfileData) {
    try {
      await api.put('/users/profile', { bio: data.bio })
      await router.push(`/schedule/${session.data?.user.username}`)
    } catch (error) {}
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfileSubmit)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar src={session.data?.user.avatar_url} />
        </label>

        <label>
          <Text>Sobre você</Text>
          <TextArea {...register('bio')} />
          <FromAnnotation size="sm">
            Fale um pouco sobre você. Isso será exibido em sua página pessoal.
          </FromAnnotation>
        </label>

        <Button disabled={isSubmitting}>
          Finalizar <ArrowRight size={24} weight="bold" />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
