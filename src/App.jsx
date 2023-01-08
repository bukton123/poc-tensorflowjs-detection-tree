import { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'
import * as mobilenet from '@tensorflow-models/mobilenet'

// internal
import * as loadingData from './loading/load.json'
import * as successData from './loading/success.json'
import { BtnRed } from './Button'
import List from './List'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: successData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const App = () => {
  const imageRef = useRef()
  const [image, setImage] = useState('')
  const [model, setModel] = useState()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)

  const onUpload = (event) => {
    const { files } = event.target
    if (files.length > 0) {
      setList([])
      setImage(URL.createObjectURL(files[0]))
    } else {
      setImage('')
    }
  }

  const onIdentify = async () => {
    try {
      const result = await model.classify(imageRef.current)
      setList(result)
    } catch (error) {
      console.error(error)
    }
  }

  const onClear = () => {
    document.getElementById('file_input').value = null
    setImage('')
    setList([])
  }

  useEffect(() => {
    const delay = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(), time))
    const init = async () => {
      try {
        const load = await mobilenet.load()
        setModel(load)
        await delay()
        setSuccess(true)
      } catch (error) {
        console.error(error)
      }

      await delay(800)
      setLoading(false)
    }

    init()
  }, [])

  useEffect(() => {
    if (image) {
      onIdentify()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  if (loading) {
    return (
      <header className="App-header">
        <FadeIn>
          <div className="flex items-center">
            <h1>Loading</h1>
            {success ? (
              <Lottie options={defaultOptions2} height={140} width={140} />
            ) : (
              <Lottie options={defaultOptions} height={140} width={140} />
            )}
          </div>
        </FadeIn>
      </header>
    )
  }

  return (
    <>
      <div className="w-full h-11 bg-purple-700 p-2 items-center">
        <h2 className="font-bold text-white"> Image Classification Tree </h2>
      </div>
      <div className="py-2">
        <center>
          <div className="w-3/4 p-4 grid grid-cols-6 gap-2">
            <input
              type="file"
              accept="image/*"
              capture="camera"
              onChange={onUpload}
              id="file_input"
              className="col-span-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
            <BtnRed onClick={onClear} className="w-48">
              Clear Image
            </BtnRed>
          </div>
        </center>
        <div className="grid grid-cols-2 gap-4 mt-10 mx-14">
          <div className={classnames('border rounded-lg flex justify-center', { 'p-1': image })}>
            <img
              src={image || '/image.jpeg'}
              alt=""
              className={classnames('h-auto max-w-lg rounded-lg', { 'my-4': !image })}
              ref={imageRef}
            />
          </div>
          <div className="flex justify-center border rounded-lg">
            <List data={list} image={image} />
            {list.length === 0 && <p className="text-gray-500 my-auto"> No Data </p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
