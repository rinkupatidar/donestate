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
import {
    shareToFacebook,
    shareToLInkdin,
    shareToTwitter
} from './ShareChartUtils'

interface ShareChartModalProps {
  close: () => void
  chartsRef: RefObject<HighchartsReact.RefObject>
}

interface formInterface {
  title: string
  description: string
}
const ShareChartModal = ({ close, chartsRef }: ShareChartModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formInterface>()
  const [imgLink, setImgLink] = useState('')

  const uploadChartImageMutation = useMutation(uploadChartImage)

  const handleClick = () => {
    const svg = chartsRef.current?.chart.getSVG()

    const svg_url = new Blob([svg], { type: 'image/svg+xml' })

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const height = chartsRef.current?.chart.chartHeight!
    const width = chartsRef.current?.chart.chartWidth!

    canvas.width = width
    canvas.height = height

    const svgBlob = new Blob([svg!], { type: 'image/svg+xml' })
    const svgObjectUrl = URL.createObjectURL(svgBlob)

    const tempImage = new Image()
    tempImage.src = svgObjectUrl
    tempImage.onload = () => {
      ctx?.drawImage(tempImage, 0, 0)

      canvas.toBlob((blob) => {
        if (!blob) return null

        const formdata = new FormData()
        formdata.append('file', blob, 'chart.png')
        uploadChartImageMutation.mutate(formdata, {
          onSuccess: (res) => {
            setImgLink(res.response_message)
          },
        })
      }, 'image/png')
    }
  }
  useEffect(() => {
    handleClick()
  }, [chartsRef.current])

  const title = watch('title')
  const description = watch('description')
  return (
    <Modal isSmall close={close}>
      {/* <AnimatePresence>
        {(uploadChartImageMutation.isLoading || !imgLink) && <LoaderOverlay />}
      </AnimatePresence> */}
      <p className="is-size-5 has-text-weight-bold has-text-grey">
        Share Chart
      </p>
      <br />
      <img src={imgLink}  alt="donestat" />
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
          onClick={() => shareToLInkdin(imgLink, title, description)}
          className="is-warning is-small has-text-weight-semibold"
        >
          <Icon>
            <FaLinkedin />
          </Icon>
          <span>LinkedIn</span>
        </Button>
        <Button
          onClick={() => shareToFacebook(imgLink, title, description)}
          className="is-warning is-small has-text-weight-semibold"
        >
          <Icon>
            <FaFacebook />
          </Icon>
          <span>Facebook</span>
        </Button>
        <Button
          onClick={() => shareToTwitter(imgLink, title, description)}
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
