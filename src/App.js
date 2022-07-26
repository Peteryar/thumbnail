import React, { Fragment, useEffect, useState, useCallback } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [catalogs] = useState([...catalogsList])
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideTimer, setSlideTimer] = useState(null)
  const [slideDuration] = useState(3000);

  const switchImage = (data) => {
    console.log('data', data)
    switch (data.type) {
      case 'next':
        setActiveIndex(activeIndex + 1)
        if (activeIndex < catalogsList.length - 1) {
          setActiveIndex(activeIndex + 1)
        } else {
          setActiveIndex(0)
        }
        break;
      case 'prev':
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        } else {
          setActiveIndex(catalogsList.length - 1)
        }
        break;
      default:
        setActiveIndex(data.index)
    }
  }

  let counter = 0;
  const startSlideShow = (e) => {
    if (e.target.checked) {
      setSlideTimer(setInterval(() => {
        if (counter < catalogsList.length - 1) {
          switchImage({ index: counter + 1 })
          counter += 1
        } else {
          switchImage({ index: 0 })
          counter = 0;
        }
      }, slideDuration))
    } else {
      clearInterval(slideTimer);
      setSlideTimer(null);
      counter = activeIndex;
    }
  }

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className='layout-row justify-content-center align-items-center mt-20'>
              <button
                onClick={() => switchImage({ type: 'prev' })}
                className="icon-only outlined"
                data-testid="prev-slide-btn"
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                switchImage={(index) => switchImage({ index })}
                items={catalogs}
                currentIndex={activeIndex}
              />
              <button
                onClick={() => switchImage({ type: 'next' })}
                className="icon-only outlined"
                data-testid="next-slide-btn"
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input
            onClick={startSlideShow}
            type='checkbox'
            data-testid='toggle-slide-show-button'
          />
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

