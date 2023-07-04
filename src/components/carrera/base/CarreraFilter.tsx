import React, { useState } from 'react'

/** components */

/** styles */
import { HelperRedux } from '../../../@redux'
import { Actions } from '../../../@redux/carreras'
import { getCarreras } from '../../../domain/carreras'
import { Button } from 'react-bootstrap'
import { TextInput } from '../../../app/components/TextInput'

/** redux */


const CarreraFilter: React.FC<{ onClosed: (isActive: boolean) => void }> = ({ onClosed }) => {
  const dispatch = HelperRedux.useDispatch()
  const { filter } = HelperRedux.useSelector(state => state.carreras)

  const handlerClearFilter = () => {

    getCarreras().then(x => { dispatch(Actions.setCarrerasStore(x.data.value)) })
    dispatch(Actions.setFilterCarreraStore(0, ''))

    onClosed(false)
  }
  const handlerFilter = () => {

    dispatch(Actions.getCarreras(filter.id, filter.descripcion))

    console.log(filter.id, "funca xd")

    onClosed(true)
  }

  return (
    <div className='container-filter' style={{ width: '270px' }} >

      <TextInput
        value={filter.id}
        onChange={(event) => dispatch(Actions.setFilterCarreraStore(event.target.value, filter.descripcion))}
        label='Codigo de Carrera'
      />
      <TextInput
        value={filter.descripcion}
        onChange={(event) => dispatch(Actions.setFilterCarreraStore(filter.id, event.target.value,))}
        label='Descripcion'
      />


      <footer className='d-flex justify-content-between mt-3'>
        <div className='d-flex'>
          <Button
            className='btn mx-1'
            title='Limpiar'
            onClick={handlerClearFilter}
          >
            Limpiar
          </Button>

          <Button
            className='btn'
            title='Aplicar'
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