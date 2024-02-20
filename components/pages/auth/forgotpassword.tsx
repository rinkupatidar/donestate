import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { BiChevronRight } from "react-icons/bi"
import { FaCheckCircle } from "react-icons/fa"
import { AXIOS_INSTANCE, EMAIL_VALIDATION_REGEX } from "../../../constants"
import Button from "../../Button/Button"
import Icon from "../../Icon/Icon"
import Input from "../../Input/Input"
import styles from "./index.module.scss"

interface LoginProps {}

interface formInterface {
	email: string
}
const ForgotPassword = ({}: LoginProps) => {
	const [didSendVerificationLink, setDidSendVerificationLink] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<formInterface>()
	const sendToServer = (data: formInterface) => {
		return AXIOS_INSTANCE.post(
			"sendEmailVerificationLink",
			{},
			{
				params: {
					email: data.email,
					isNewUser: false,
				},
			}
		).then(() => {
			setDidSendVerificationLink(true)
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
					{/* <div className="is-size-4">Sign in to your account</div> */}
				</div>
				<div className={styles.info_wrapper}>
					{didSendVerificationLink ? (
						<div className="is-flex is-align-items-center is-flex-direction-column">
							<figure className="image mb-4">
								<FaCheckCircle fill="#0d96f8" size={100} />
							</figure>
							<p className="has-text-grey">Verification Link had been sent to your email. Please check your email and click on the link to verify your email.</p>
						</div>
					) : (
						<form onSubmit={handleSubmit(sendToServer)}>
							<Input
								{...register("email", {
									required: "Email is required",
									pattern: { value: EMAIL_VALIDATION_REGEX, message: "Invalid email address" },
								})}
								label="Email"
								error={errors.email}
							/>

							<Button loading={isSubmitting} type="submit" className="is-info has-tw-bold is-fullwidth mt-5">
								<span>Send Verification Email</span>
								<Icon>
									<BiChevronRight />
								</Icon>
							</Button>
						</form>
					)}
				</div>
			</div>
		</div>
	)
}
export default ForgotPassword
