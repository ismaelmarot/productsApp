import type { View } from '../../App'

interface Props {
  onChangeView: (view: View) => void;
}

function Sidebar({ onChangeView }: Props) {
  return (
    <div className='accordion' id='accordionExample'>
      {/*  Products Section */}
      <div className='accordion-item'>
        <h2 className='accordion-header' id='headingOne'>
          <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
            <strong>Productos</strong>
          </button>
        </h2>

        <div id='collapseOne' className='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>
          <div className='accordion-body' style={{ padding:'.5rem'}}>                  
            <button
              className='btn btn-link text-white'
              style={{  textDecoration: 'none', backgroundColor: 'black', width: '100%' }}
              onClick={() => onChangeView('detailsProduct')}
            >
              Ver Producto
            </button>
          </div>
        </div>
        
        <div id='collapseOne' className='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>
          <div className='accordion-body' style={{ padding:'.5rem'}}>
            <button
              className='btn btn-link text-white'
              style={{ textDecoration: 'none', backgroundColor: 'black', width: '100%' }}
              onClick={() => onChangeView('addProduct')}
            >
              Agregar Producto
            </button>
          </div>
        </div>

        <div id='collapseOne' className='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>
          <div className='accordion-body' style={{ padding:'.5rem'}}>  
            <button
              className='btn btn-link text-white'
              style={{  textDecoration: 'none', backgroundColor: 'black', width: '100%' }}
              onClick={() => onChangeView('deleteProduct')}
            >
              Eliminar Producto
            </button>
          </div>
        </div>
      </div>

      {/*  People Section */}
      {/* <div className='accordion-item'>
        <h2 className='accordion-header' id='headingOne'>
          <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>
            <strong>Persona</strong>
          </button>
        </h2>

        <div id='collapseOne' className='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>
          <div className='accordion-body' style={{ padding:'.5rem'}}>                  
            <button
              className='btn btn-link text-white'
              style={{  textDecoration: 'none', backgroundColor: 'black', width: '100%' }}
              onClick={() => onChangeView('detailsProduct')}
            >
              Ver Persona
            </button>
          </div>
        </div>
        
        <div id='collapseOne' className='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>
          <div className='accordion-body' style={{ padding:'.5rem'}}>
            <button
              className='btn btn-link text-white'
              style={{ textDecoration: 'none', backgroundColor: 'black', width: '100%' }}
              onClick={() => onChangeView('addProduct')}
            >
              Agregar Persona
            </button>
          </div>
        </div>

        <div id='collapseOne' className='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>
          <div className='accordion-body' style={{ padding:'.5rem'}}>  
            <button
              className='btn btn-link text-white'
              style={{  textDecoration: 'none', backgroundColor: 'black', width: '100%' }}
              onClick={() => onChangeView('deleteProduct')}
            >
              Eliminar Persona
            </button>
          </div>
        </div>
      </div> */}

    </div>
  );
}

export default Sidebar;

