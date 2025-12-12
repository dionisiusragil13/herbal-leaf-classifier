import React from 'react'
import InputTestImage from '../components/InputTestImage'
import ModelList from '../components/ModelList'
import LoadModelButton from '../components/LoadModelButton'

function TestPage() {
  return (
    <div className='flex flex-col  items-center'>
      <ModelList/>
      <LoadModelButton/>
      <InputTestImage/>
    </div>
  )
}

export default TestPage