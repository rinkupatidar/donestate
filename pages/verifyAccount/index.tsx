import { authContext } from 'context/authContext'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiChevronRight } from 'react-icons/bi'
import { addOpacityAnimation } from '../../animation'
import Button from '../../components/Button/Button'
import Icon from '../../components/Icon/Icon'
import Input from '../../components/Input/Input'
import LoadingSection from '../../components/Loader/LoadingSection'
import ForgetPasswordOperation from '../../components/pages/auth/ForgetPasswordOperation'
import { AXIOS_INSTANCE, IS_CLIENT, ROUTES } from '../../constants'
import styles from './index.module.scss'

interface LoginProps {}

interface formInterface {
  name: string
  password: string
  confirmPassword: string
}
const VerifiyAccount = ({}: LoginProps) => {
  const context = useContext(authContext)
  const router = useRouter()

  const [isTokenValid, setIsTokenValid] = useState<null | boolean>(null)
  const [requestId, setRequestId] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [operation, setOperation] = useState('')
  let token = router.query.token
  if (IS_CLIENT) {
    // 1
    const urlParams = new URLSearchParams(window.location.search)
    const raw = urlParams.toString()
    token = raw?.split('=')[1] || ''
    token = decodeURIComponent(token)
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<formInterface>()

  useEffect(() => {
    if (token) {
      AXIOS_INSTANCE.post('verifyEmailVerificationLink', undefined, {
        params: { token },
      })
        .then((res) => {
          setIsTokenValid(true)
          setRequestId(res.data.request_id)
          setEmail(res.data.email)
          setOperation(res.data.operation)
        })
        .catch(() => {
          setIsTokenValid(false)
        })
    }
  }, [token])

  const sendToServer = (data: formInterface) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      })
      return
    }
    // @ts-ignore
    delete data.confirmPassword
    return AXIOS_INSTANCE.post(
      'registerUser',
      { ...data, email, user_type: 'FREE' },
      {
        headers: { X_REQUEST_ID: requestId },
      }
    ).then((res) => {
      context.login!(res.data.response_message)
      router.push(ROUTES.DASHBOARD)
    })
  }
  if (isTokenValid === null) return <LoadingSection />

  if (operation === 'FORGET_PASSWORD')
    return <ForgetPasswordOperation requestId={requestId} email={email} />
  return (
    <div className={styles.container}>
      <div className="column is-12 is-flex is-flex-direction-column is-justify-content-center is-align-items-center fill-height ">
        <div className="is-flex is-align-items-center mb-4 has-text-grey">
          <div className="image mr-4">
            <Link href="/">
              <img src="/icons/done.png" alt="donestat" />
            </Link>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${isTokenValid}`}
            {...addOpacityAnimation}
            className={styles.info_wrapper}>
            {isTokenValid === false ? (
              <div className="is-flex is-align-items-center is-flex-direction-column">
                <p className="has-text-grey">This link has expired</p>
              </div>
            ) : (
              <>
                <br />
                <form onSubmit={handleSubmit(sendToServer)}>
                  <Input
                    {...register('name', {
                      required: 'name is required',
                    })}
                    label="Name"
                    error={errors.name}
                  />

                  <Input
                    {...register('password', {
                      required: 'password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    label="Password"
                    type="password"
                    error={errors.password}
                  />
                  <Input
                    {...register('confirmPassword', {
                      required: "Password's do not match",
                    })}
                    label="Confirm Password"
                    type="password"
                    error={errors.confirmPassword}
                  />
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className="is-info has-tw-bold is-fullwidth mt-5">
                    <span>Sign up</span>
                    <Icon>
                      <BiChevronRight />
                    </Icon>
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
export default VerifiyAccount
