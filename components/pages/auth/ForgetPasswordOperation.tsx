import Link from "next/link"
import { useForm } from "react-hook-form"
import { BiChevronRight } from "react-icons/bi"
import { AXIOS_INSTANCE } from "../../../constants"
import Button from "../../Button/Button"
import Icon from "../../Icon/Icon"
import Input from "../../Input/Input"
import styles from "./index.module.scss"

interface ForgetPasswordOperationProps {
	requestId: string
	email: string
}

interface formInterface {
	password: string
	confirmPassword: string
}

const ForgetPasswordOperation = ({ requestId, email }: ForgetPasswordOperationProps) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<formInterface>()

	const sendToServer = (data: formInterface) => {
		if (data.password !== data.confirmPassword) {
			setError("confirmPassword", {
				type: "manual",
				message: "Passwords do not match",
			})
			return
		}
		// @ts-ignore
		delete data.confirmPassword
		return AXIOS_INSTANCE.post(
			"resetPassword",
			{ ...data, email, user_type: "FREE" },
			{
				headers: { X_REQUEST_ID: requestId },
			}
		)
	}
	return (
		<div className={styles.container}>
			<div className="column is-12 is-flex is-flex-direction-column is-justify-content-center is-align-items-center fill-height ">
				<div className="is-flex is-align-items-center mb-4 has-text-grey">
					<div className="image mr-4">
						<Link href="/">
							<img src="/icons/logo.svg" alt="donestat" />
						</Link>
					</div>
				</div>
				<form style={{ width: "30vw" }} onSubmit={handleSubmit(sendToServer)}>
					<Input
						{...register("password", {
							required: "password is required",
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters",
							},
						})}
						label="Password"
						type="password"
						error={errors.password}
					/>
					<Input
						{...register("confirmPassword", {
							required: "Password's do not match",
						})}
						label="Confirm Password"
						type="password"
						error={errors.confirmPassword}
					/>
					<Button loading={isSubmitting} type="submit" className="is-info has-tw-bold is-fullwidth mt-5">
						<span>Sign up</span>
						<Icon>
							<BiChevronRight />
						</Icon>
					</Button>
				</form>
			</div>
		</div>
	)
}
export default ForgetPasswordOperation
