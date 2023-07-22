import React, { useState } from 'react'
import { HelperRedux } from '../../../@redux'
import { Actions } from '../../../@redux/carreras'

/** components */
import { TextInput } from '../../../app/components/TextInput'

/** styles */
import { getCarreras } from '../../../domain/carreras'
import { Button } from 'react-bootstrap'

const CarreraFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
  const dispatch = HelperRedux.useDispatch()
  const [descripcion, setDescripcion] = useState('')

  const handlerClearFilter = () => {

    getCarreras().then(x => { dispatch(Actions.setCarrerasStore(x.data.value)) })
    dispatch(Actions.setFilterCarreraStore(''))
    setDescripcion('')
    onClosed(false)
  }
  const handlerFilter = () => {
    dispatch(Actions.setFilterCarreraStore(descripcion))
    onClosed(true)
  }

  return (
    <div className='container-filter' style={{ width: '260px' }} >

      <TextInput
        value={descripcion}
        onChange={(event) => setDescripcion(event.target.value)}
        label='Nombre de la Carrera'
      />

      <footer className='d-flex justify-content-between mt-3'>
        <div className='d-flex'>
          <Button
            className='btn mx-1'
            title='Limpiar'
            onClick={handlerClearFilter}
            variant='outline-danger'
          >
            Limpiar
          </Button>

          <Button
            className='btn mx-5'
            title='Aplicar'
            variant= 'outline-success'
            onClick={handlerFilter}
          >
            Aplicar
          </Button>
        </div>

      </footer>
    </div>
  )
}

export default CarreraFilter;