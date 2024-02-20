import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getTopWorldCommoditiesInfo } from 'service/DashboardService/DashboardServices'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import style from './portfolio.module.scss'
import Modal from 'components/Modal/Modal'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { BsTrash } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { TbMinus } from 'react-icons/tb'
import { MdDateRange } from 'react-icons/md'
const ModalPortfolio = () => {
    const [showAddStock,setAddStock] = useState(false);
    const AddStock=()=>{

    }
    
  return (
  
    <div>
      Portfolio Created
      <button onClick={AddStock}>
        save
      </button>
      {showAddStock &&  <ModalPortfolio/>}
 
    </div>
  )
}
export default ModalPortfolio
