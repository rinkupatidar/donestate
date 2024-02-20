import { motion } from "framer-motion"
import React from "react"

interface AccordionProps {
	children: React.ReactNode
	value?: boolean
	setState?: (value: string) => void
	state?: string
}

const Accordion = ({ value, state, setState }: AccordionProps) => {
	return (
		<motion.div>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quod hic modi. Excepturi possimus rerum recusandae quasi deleniti a inventore fugiat quia fugit, autem sint? Assumenda enim aut
			quis maxime. Error ex veritatis mollitia odio magnam, obcaecati vitae nobis quos suscipit omnis molestiae necessitatibus cupiditate id similique corrupti! Sapiente eaque tempore vero sunt est,
			odit corrupti vel. Non, accusantium! Temporibus error aliquam, nisi quidem harum nihil deleniti tenetur ex ea doloribus deserunt cumque culpa eligendi consequatur tempora quibusdam. Odit minus
			voluptates tempore excepturi aspernatur! Corrupti ratione, qui autem adipisci voluptatem excepturi! Unde nulla corrupti molestias nam natus provident, numquam tempora.
		</motion.div>
	)
}
export default Accordion
