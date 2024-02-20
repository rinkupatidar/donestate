import DownArrowIcon from '@/icons/down-arrow.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
// import useKeyPress from '../../hooks/useKey';
import useKeyPress from 'hooks/useKey';
// import { TOP_TO_BOTTOM_MENU_VARIANT } from '../../utils/variants';
import { TOP_TO_BOTTOM_MENU_VARIANT } from 'utils/variants';
import styles from './index.module.scss';
import Input from 'components/Input/Input';

interface DropdownProps {
  dataArr: DropdownItemType[];
  className?: string;
  initialIdx?: number;
  disableSelection?: boolean;
  onClick?: (item: any) => void;
  disabled?: boolean;
  value?: string;
  controlKey?: string;
  maxHeight?: string;
  dropdownAlign?: 'left' | 'right';
}

const Countrydropdown = ({
  initialIdx,
  dataArr,
  className = 'is-warning',
  onClick,
  disableSelection,
  disabled,
  value,
  controlKey,
  maxHeight,
  dropdownAlign = 'left',
}: DropdownProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isData, setIsData] = useState(dataArr);
  const [selectedIdx, setSelectedIdx] = useState<undefined | number>(0);



  useEffect(() => {
    if (value === undefined) return;
    const idx = dataArr.findIndex(
      (val) =>
        value ===
        (controlKey
          ? (val as { [key: string]: any })[controlKey]
          : getDisplayValue(val))
    );
    setSelectedIdx(idx);
  }, [value]);

  let idxToRead: number;
  if (selectedIdx !== undefined) idxToRead = selectedIdx;
  else {
    if (initialIdx !== undefined) idxToRead = initialIdx;
    else idxToRead = 0;
  }

  const getDisplayValue = (item: DropdownItemType) => {
    let displayValue;
    if (typeof item === 'string') displayValue = item;
    else if (typeof item === 'object') {
      if (item.displayValue) displayValue = item.displayValue;
      else throw new Error('Data passed does not have a display Value');
    }
    return displayValue;
  };

  const handleChange = (idx: string) => {
    const newid = dataArr.findIndex((item) => item.country_code === idx.country_code);

    if (!disableSelection) setSelectedIdx(newid);
    if (onClick) {
      onClick(dataArr[newid]);
    }
    setIsOpen(false); 
    setSearchTerm(''); 
    setIsData(dataArr)

  };

  const handleChangeTxt = (txt: string) => {
    console.log(txt, 'hhhhhhhhhhhhhhhhhhh');
    setSearchTerm(txt);
  
    const newfilterdata = dataArr.filter((item) =>
      item.country_name.toLowerCase().includes(txt.toLowerCase())
    );
  if(newfilterdata){
    setIsData(newfilterdata);

  }else{
    setIsData(dataArr);
  }
  };
  
  // console.log(dataArr,'==============================================')
  return (
    <button
      disabled={disabled}
      onClick={() => setIsOpen(!isOpen)}
      className={`${styles.container} ${className}`}
    >
      <AnimatePresence>
        {isOpen && (
          // <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <div
              className={styles.dropdown_wrapper}
              style={{ maxHeight: maxHeight, [dropdownAlign]: 0 }}
            >
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={TOP_TO_BOTTOM_MENU_VARIANT}
                className={styles.dropdown}
              >
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => handleChangeTxt(e.target.value)}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.color}
                  onClick={(e)=>e.stopPropagation()}
                  style={{backgroundColor:" hsl(0, 0%, 9%)",width:'100%',borderColor: 'hsl(0, 0%, 86%)',boxShadow: 'inset 0 0.0625em 0.125em rgba(255, 255, 255, 0.05)'}}
                />
                {isData
                  .map((item, idx) => (
                    <div
                      className={styles.dropdown_item}
                      onClick={() => handleChange(item)}
                      key={idx}
                    >

                      {getDisplayValue(item)}
                    </div>
                  ))}
              </motion.div>
            </div>
          // </ClickAwayListener>
        )}
      </AnimatePresence>
      {dataArr && dataArr.length > 0 && (
      <span>{getDisplayValue(dataArr[idxToRead])}</span>
      )}
      <motion.span animate={{ rotateZ: isOpen ? 180 : 0 }} className="icon">
        <DownArrowIcon />
      </motion.span>
    </button>
  );
};

export default Countrydropdown;
