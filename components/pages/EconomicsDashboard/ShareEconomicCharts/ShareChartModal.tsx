import { useMutation } from '@tanstack/react-query'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import Input from 'components/Input/Input'
import LoaderOverlay from 'components/Loader/LoaderOverlay'
import Modal from 'components/Modal/Modal'
import { AnimatePresence } from 'framer-motion'
import HighchartsReact from 'highcharts-react-official'
import { RefObject, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { uploadChartImage } from 'service/DashboardService/DashboardServices'
import html2canvas from 'html2canvas'
import $ from "jquery";
import {
    shareToFacebook,
    shareToLInkdin,
    shareToTwitter
} from './ShareChartUtils'

interface ShareChartModalProps {
  close: () => void
  // chartsRef: RefObject<HighchartsReact.RefObject>
}

interface formInterface {
  title: string
  description: string
}
const ShareChartModal = ({ close ,imageData}: ShareChartModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formInterface>()
  const [imgLink, setImgLink] = useState('')
  
  const [imgLinkcanvas, setImgLinkcanvas] = useState('')
  const uploadChartImageMutation = useMutation(uploadChartImage)
    const handleClick = async () => {
    const canvas = await html2canvas(imageData, { async: true, logging: true });
    
       canvas.toBlob((blob) => {
     
            var extra_canvas = document.createElement("canvas");
            extra_canvas.setAttribute('width', 1200);
            extra_canvas.setAttribute('height', 650);
            var ctx = extra_canvas.getContext('2d');
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 1200, 650);
            var dataURL = extra_canvas.toDataURL();
            var img = $(document.createElement('img'));
            img.attr('src', dataURL);
    
            setImgLinkcanvas(dataURL);
            setImgLink(dataURL);
      }, 'image/png')
  }
  useEffect(() => {
    handleClick()
  }, [imageData])

  const handleClickButtonfb = async () => {
    const canvas = await html2canvas(imageData, { async: true, logging: true });
    
    canvas.toBlob((blob) => {
  
         var extra_canvas = document.createElement("canvas");
         extra_canvas.setAttribute('width', 1200);
         extra_canvas.setAttribute('height', 650);
         var ctx = extra_canvas.getContext('2d');
         ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 1200, 650);
         var dataURL = extra_canvas.toDataURL();
         var img = $(document.createElement('img'));
         img.attr('src', dataURL);
     setImgLink(dataURL);
     const formdata = new FormData();
       formdata.append('file', blob, 'chart.png');
       uploadChartImageMutation.mutate(formdata, {
         onSuccess: (res) => {
           setImgLink(res.response_message);
           shareToFacebook(res.response_message, title, description);
         },
       })
   
   }, 'image/png')

  }
  const handleClickButtonLInkdin = async () => {
    const canvas = await html2canvas(imageData, { async: true, logging: true });
    
    canvas.toBlob((blob) => {
  
         var extra_canvas = document.createElement("canvas");
         extra_canvas.setAttribute('width', 1200);
         extra_canvas.setAttribute('height', 650);
         var ctx = extra_canvas.getContext('2d');
         ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 1200, 650);
         var dataURL = extra_canvas.toDataURL();
         var img = $(document.createElement('img'));
         img.attr('src', dataURL);
     setImgLink(dataURL);
     const formdata = new FormData();
       formdata.append('file', blob, 'chart.png');
       uploadChartImageMutation.mutate(formdata, {
         onSuccess: (res) => {
           setImgLink(res.response_message);
           shareToLInkdin(res.response_message, title, description);
         },
       })
   
   }, 'image/png')

  }
  const handleClickButtonTwitter = async () => {
    const canvas = await html2canvas(imageData, { async: true, logging: true });
    
    canvas.toBlob((blob) => {
  
         var extra_canvas = document.createElement("canvas");
         extra_canvas.setAttribute('width', 1200);
         extra_canvas.setAttribute('height', 650);
         var ctx = extra_canvas.getContext('2d');
         ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 1200, 650);
         var dataURL = extra_canvas.toDataURL();
         var img = $(document.createElement('img'));
         img.attr('src', dataURL);
     setImgLink(dataURL);
     const formdata = new FormData();
       formdata.append('file', blob, 'chart.png');
       uploadChartImageMutation.mutate(formdata, {
         onSuccess: (res) => {
           setImgLink(res.response_message);
           shareToTwitter(res.response_message, title, description);
         },
       })
   
   }, 'image/png')

  }




  const title = watch('title')
  const description = watch('description')
  return (
    <Modal style={{width:'900px'}} isSmall close={close} >
      <AnimatePresence>
        {(uploadChartImageMutation.isLoading || !imgLinkcanvas) && <LoaderOverlay />}
      </AnimatePresence>
      <p className="is-size-5 has-text-weight-bold has-text-grey">
        Share Chart
      </p>
      <br />
      <img src={imgLinkcanvas} style={{height:'300px'}}  alt="donestat" />
      <br />
      <br />
      <Input
        {...register('title', {
          required: 'Title is required',
        })}
        cSize="small"
        label="Title"
        error={errors.title}
      />

      <label className="label is-size-7 has-text-grey">Description</label>
      <textarea
        rows={4}
        className="textarea"
        {...register('description')}
      ></textarea>
      {errors.description && (
        <p className="is-size-7 has-text-danger">
          {errors.description.message}
        </p>
      )}

      <div className="is-flex is-justify-content-flex-end mt-3 is-gap">
        <Button
          onClick={() => handleClickButtonLInkdin()}
          className="is-warning is-small has-text-weight-semibold"
        >
          <Icon>
            <FaLinkedin />
          </Icon>
          <span>LinkedIn</span>
        </Button>
        <Button
          // onClick={() => shareToFacebook(imgLink, title, description)}
          onClick={() => {
            handleClickButtonfb(); 
          }}
          className="is-warning is-small has-text-weight-semibold"
        >
          <Icon>
            <FaFacebook />
          </Icon>
          <span>Facebook</span>
        </Button>
        <Button
          onClick={() => handleClickButtonTwitter()}
          className="is-warning is-small has-text-weight-semibold"
        >
          <Icon>
            <FaTwitter />
          </Icon>
          <span>Twitter</span>
        </Button>
      </div>
    </Modal>
  )
}
export default ShareChartModal
