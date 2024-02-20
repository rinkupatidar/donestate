import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiChevronRight } from 'react-icons/bi'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { addOpacityAnimation } from '../../../animation'
import {
    AXIOS_INSTANCE,
    EMAIL_VALIDATION_REGEX,
    ROUTES
} from '../../../constants'
import Button from '../../Button/Button'
import Icon from '../../Icon/Icon'
import Input from '../../Input/Input'
import styles from './index.module.scss'

interface LoginProps {}

interface formInterface {
  email: string
}
const Signup = ({}: LoginProps) => {
  const [didSendVerificationLink, setDidSendVerificationLink] = useState(false)
  const [resendEmail, setResendEmail] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formInterface>()

  const sendToServer = (data: formInterface) => {
    setEmail(data.email)
    AXIOS_INSTANCE.post(
      'sendEmailVerificationLink',
      {},
      {
        params: {
          email: data.email,
          isNewUser: true,
        },
      }
    )
      .then((res) => {
        setDidSendVerificationLink(true)
        setMessage(res.data.response_message)
        setTimeout(() => {
          setResendEmail(true)
        }, 30000)
      })
      .catch((err) => {
        setDidSendVerificationLink(true)
        setMessage(err.response.data.response_message)
        setError(true)
      })
  }

  const resendEmailVerificationLink = () => {
    AXIOS_INSTANCE.post(
      'sendEmailVerificationLink',
      {},
      {
        params: {
          email,
          isNewUser: true,
        },
      }
    ).then(() => {
      setDidSendVerificationLink(true)
      setResendEmail(false)
      setTimeout(() => {
        setResendEmail(true)
      }, 30000)
    })
  }

  return (
    <div className={styles.container}>
      <div className="column is-12 is-flex is-flex-direction-column is-justify-content-center is-align-items-center fill-height ">
        <div className="is-flex is-align-items-center mb-4 has-text-grey">
          <div className="image mr-4">
            <Link href="/">
              <img src="/icons/done.png" alt="donestat" />
            </Link>
          </div>
          {!message && <div className="is-size-4">Sign Up today!</div>}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${didSendVerificationLink}`}
            {...addOpacityAnimation}
            className={styles.info_wrapper}>
            {didSendVerificationLink ? (
              <div className="is-flex is-align-items-center is-flex-direction-column">
                <figure
                  className={`image mb-4  has-text-${
                    error ? 'danger' : 'info'
                  }`}>
                  {error ? (
                    <FaTimesCircle size={100} />
                  ) : (
                    <FaCheckCircle size={100} />
                  )}
                </figure>
                <p className="has-text-grey">{message}</p>
                {resendEmail && (
                  <p className="has-text-grey mt-3">
                    Didn't receive the email?{' '}
                    <span
                      className="has-text-success is-clickable"
                      onClick={resendEmailVerificationLink}>
                      Click here to resend
                    </span>
                  </p>
                )}
              </div>
            ) : (
              <>
                <p className="has-text-grey">
                  Enter your email to get started{' '}
                </p>
                <br />
                <form onSubmit={handleSubmit(sendToServer)}>
                  <Input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: EMAIL_VALIDATION_REGEX,
                        message: 'Invalid email address',
                      },
                    })}
                    label="Email"
                    error={errors.email}
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
                <p className="mt-3 is-size-7">
                  Already have an account?{' '}
                  <Link href={ROUTES.LOGIN} className="has-text-success">
                    Click here to sign in
                  </Link>
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
export default Signup
