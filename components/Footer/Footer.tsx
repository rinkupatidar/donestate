import { useRouter } from "next/router";
import { AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Icon from "../Icon/Icon";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  const router = useRouter();
  const path = router.pathname;
  const isDashboard = path.includes("dashboard");

  const [currentDay, setcurrentDay] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const currentDate = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = days[currentDate.getUTCDay()];
      const date = currentDate.getUTCDate();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[currentDate.getUTCMonth()];
      const year = currentDate.getUTCFullYear();

      const timeFormatted = `${day} ${date}${getDaySuffix(date)} ${month} ${year}`;
      setcurrentDay(timeFormatted);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getDaySuffix = (day: number) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };


  if (isDashboard) {
    return (
      <footer className={styles.footer}>
        <div className={styles.icons}>
          <Icon src="linkedin.svg" className="is-small" />
          <Icon src="twitter.svg" className="is-small" />
          <Icon src="facebook.svg" className="is-small" />
          <Icon src="instagram.svg" className="is-small" />
        </div>
        <div>
          <p className="is-size-7">{currentDay} | 24°C, Malad, Mumbai</p>
        </div>
      </footer>
    );
  }

	return (
    <div className={styles.Maxwidth}  style={{padding:'3rem 3rem'}}>
		<footer>
			<div className={styles.footerrow}>
      <div className="mb-4 mr-4" style={{width:"25%"}} >
      <div className={styles.logoContainer} style={{width:'150px'}} >
            <img src="/icons/done.png" alt="donestat" />
          </div>
          </div>
				<div className={styles.footercol} style={{width:"25%"}}>
					<p className="has-text-grey">
						<b>Company</b>
					</p>
					<br />
					<p className={styles.white}>Customer Testimonial</p>
					<p className={styles.white}>Executive Team</p>
				</div>
				<div className={styles.footercol} style={{width:"25%"}}>
					<p className="has-text-grey">
						<b>Resources</b>
					</p>
					<br />
					<p className={styles.white}>Help centre</p>
					<p className={styles.white}>Academy</p>
				</div>
				<div className={styles.footercol1}>
					<p className="has-text-grey">
						<b>Contact us</b>
					</p>
					<br />
					<p className={styles.white}>
						Write to ous at <br />
						<a href="mainto:support@donestat.co" className="is-underlined">
							support@donestat.co
						</a>
					</p>
					<div className="buttons mt-3" style={{flexWrap: 'inherit'}}>
						<div className="button" style={{backgroundColor:"#0d96f8"}}>
							<div className="icon" style={{color:'#fff'}}>
								<AiOutlineTwitter />
							</div>
						</div>
						<div className="button" style={{backgroundColor:"#0d96f8"}}>
							<div className="icon" style={{color:'#fff'}}>
								<AiFillYoutube />
							</div>
						</div>
						<div className="button" style={{backgroundColor:"#0d96f8"}}>
							<div className="icon" style={{color:'#fff'}}>
								<AiFillInstagram />
							</div>
						</div>
						<div className="button" style={{backgroundColor:"#0d96f8"}}>
							<div className="icon" style={{color:'#fff'}}>
								<BsFacebook />
							</div>
						</div>
				
					</div>
				</div>
			</div>
      <div className={styles.white}>
			<p className="is-size-7 ">copyright © 2023 DoneStat WLL. All Rights Reserved Terms of Service | Privacy Policy</p>
      </div>
    </footer>
    </div>
	);
};
export default Footer;
