import React, { Fragment, useState } from 'react'
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

  const switchImage = (data) => {
    switch (data.type) {
      case 'next':
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

