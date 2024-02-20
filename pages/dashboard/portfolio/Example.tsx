import { motion } from 'framer-motion';
import { useState } from 'react';
import { AiOutlineStock, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../constants';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Icon from 'components/Icon/Icon';
import { BiSave } from 'react-icons/bi';
import Modal from 'components/Modal/Modal';
import { TOP_TO_BOTTOM_MENU_VARIANT } from 'utils/variants';
import { AXIOS_INSTANCE } from '../../../constants';
// import styles from './example.module.scss';

interface MenuProps {
    closeMenu: () => void;
    responseData: object;
}

const Example = ({ closeMenu, responseData }: MenuProps) => {
    const [showModal, setShowModal] = useState(false);
    const [typedText, setTypedText] = useState('');
    const router = useRouter();

    const openModal = () => {
        setShowModal(true);
    };

    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEditPortfolio = () => {
        openModal();
    };

    const renamePortfolio = async () => {
        const token = localStorage.getItem('token');

        try {
       
            const response = await AXIOS_INSTANCE.post(
                'createPortFolio',
                { portfolio_name: typedText },
                {
                  headers: {
                    X_AUTH_TOKEN: token,
                    'Content-Type': 'application/json',
                  },
                }
              );

            console.log('Post successful:', response.data);
            // Update responseData or take any other necessary action
            //   setResponseData(response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div >
            aaaaaa
            {/* <div className={styles.menu_wrapper}>
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={TOP_TO_BOTTOM_MENU_VARIANT}
                    className={styles.menu}
                >
                    <div
                        role="button"
                        className={styles.menu_item}
                        onClick={() => deletePortfolioItem(responseData.portfolio_id)}
                    >
                        <AiOutlineDelete />
                        Delete
                    </div>

                    <div
                        role="button"
                        className={styles.menu_item}
                        onClick={handleEditPortfolio}
                    >
                        <AiOutlineEdit />
                        Edit
                    </div>
                </motion.div>
            </div>

            {showModal && (
                <div style={{position:"absolute",right:3}}>
                    <Modal close={handleCloseModal} isSmall >
                        <p className="is-size-5 has-text-weight-bold has-text-grey">
                            Rename Portfolio
                        </p>
                        <br />

                        <div className={styles.inputPortfolio}>
                            <Input
                                type="text"
                                cSize="small"
                                label="Enter Portfolio"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.displayBtn}>
                            <Button size="small" className="is-warning" onClick={renamePortfolio}>
                                <Icon>
                                    <BiSave />
                                </Icon>
                                <span>Rename </span>
                            </Button>
                        </div>
                    </Modal>
                </div>
            )} */}
        </div>
    );
};

export default Example;
