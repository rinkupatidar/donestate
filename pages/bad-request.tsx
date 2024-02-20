import Link from "next/link";
import { BiErrorCircle } from "react-icons/bi";
import Button from "../components/Button/Button";
import { ROUTES } from "../constants";

const BadRequest = () => {
	return (
		<div className="section is-large is-flex is-flex-direction-column is-align-items-center">
			<BiErrorCircle size={128} />
			<p className="mt-3 is-size-4">Bad Request</p>
			<br />
			<Link href={ROUTES.LANDING_PAGE}>
				<Button className="is-info">Click here to go home</Button>
			</Link>
		</div>
	);
};
export default BadRequest;
