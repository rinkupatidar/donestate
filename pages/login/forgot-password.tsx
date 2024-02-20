import ForgotPassword from "../../components/pages/auth/forgotpassword"

interface LoginProps {}

interface formInterface {
	email: string
	password: string
}
const Index = ({}: LoginProps) => <ForgotPassword />
export default Index
