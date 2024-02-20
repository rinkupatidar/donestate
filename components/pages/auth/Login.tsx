import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiChevronRight } from 'react-icons/bi'
import {
  AXIOS_INSTANCE,
  EMAIL_VALIDATION_REGEX,
  ROUTES,
} from '../../../constants'
import { authContext } from '../../../context/authContext'
import Button from '../../Button/Button'
import Icon from '../../Icon/Icon'
import Input from '../../Input/Input'
import styles from './index.module.scss'

interface LoginProps {}

interface formInterface {
  email: string
  password: string
}
const Login = ({}: LoginProps) => {
  const context = useContext(authContext)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formInterface>()
  const sendToServer = (data: formInterface) => {
    setError(null)
    return AXIOS_INSTANCE.post('login', data, {})
      .then((res) => {
        context.login!(res.data.response_message)
        router.push(ROUTES.DASHBOARD)
      })
      .catch((e) => {
        setError(e.response.data.response_message)
        console.log({ e })
      })
  }
  return (
    <div style={{height: "100vh",backgroundColor: "#fff"}}>
    <div style={{height: "400px",minHeight: "400px",backgroundColor: "#f7f8fa"}}>
    <div className={styles.container}>
      <div className="is-flex is-flex-direction-row is-justify-content-center is-align-items-center fill-height ">
      <div className="is-align-items-center mb-4 has-text-grey">
        <div className="image">
          <Link href="/">
            <img src="/images/DS.png" alt="donestat" />
          </Link>
        </div>
      </div>
        <div className={styles.info_wrapper}>
        <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
        <div style={{width:"200px"}}>
        <div className="is-align-items-center">
        
          <div className="image">
            <Link href="/">
              <img src="/icons/done.png" alt="donestat" />
            </Link>
            </div>
          </div>
          </div>
          <div className="is-align-items-center mb-4 has-text-grey">
          <div className="is-size-4">Sign in to your account</div>
        </div>
        </div>
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
              style={{backgroundColor:"#e8f0fe",color:'#000'
              }}
            />
            <Input
              style={{backgroundColor:"#e8f0fe",color:'#000'
            }}
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                maxLength: {
                  value: 20,
                  message: 'Password must be less than 20 characters',
                },
                minLength: {
                  value: 6,
                  message: 'Password must be more than 6 characters',
                },
                
              })}
              error={errors.password}
            />

            <div className="is-right has-text-right is-size-7 has-text-grey">
              <Link href={ROUTES.FORGOT_PASSWORD}><span>Forgot password</span></Link>
            </div>

            <p className={styles.danger + ' is-left has-text-left is-size-7'}>
              {error}
            </p>
            <Button
              loading={isSubmitting}
              type="submit"
              className="is-info has-tw-bold is-fullwidth mt-5"
            >
              <span>Login</span>
              <Icon>
                <BiChevronRight />
              </Icon>
            </Button>
          </form>
          <p className="mt-3 is-size-7">
            Don't have an account?{' '}
            <Link href={ROUTES.SIGNUP} className="has-text-success">
              Click here to create one
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
export default Login
