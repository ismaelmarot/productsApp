import type { View } from '../../App'

interface Props {
  onChangeView: (view: View) => void;
}

function Sidebar({ onChangeView }: Props) {
  return (
    <div className="bg-dark text-white p-3" style={{ width: '18rem' }}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <button
            className="btn btn-link text-white"
            onClick={() => onChangeView('addProduct')}
          >
            Agregar Producto
          </button>
        </li>

        <li className="nav-item">
          <button
            className="btn btn-link text-white"
            onClick={() => onChangeView('deleteProduct')}
          >
            Eliminar Producto
          </button>
        </li>

        <li className="nav-item">
          <button
            className="btn btn-link text-white"
            onClick={() => onChangeView('detailsProduct')}
          >
            Ver Detalles Producto
          </button>
        </li>





        <li className="nav-item">
          <button
            className="btn btn-link text-white"
            onClick={() => onChangeView("personas")}
          >
            PERSONAS
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-link text-white"
            onClick={() => onChangeView("lugares")}
          >
            LUGARES
          </button>
        </li>
      </ul>


    {/* <div className='accordion' id='accordionPanelsStayOpenExample'>

        <div className='accordion-item'>
        <h2 className='accordion-header' id='panelsStayOpen-headingThree'>
            <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseThree' aria-expanded='false' aria-controls='panelsStayOpen-collapseThree'>
                PRODUCTOS
            </button>
        </h2>
        <div id='panelsStayOpen-collapseThree' className='accordion-collapse collapse' aria-labelledby='panelsStayOpen-headingThree'>
            <div className='accordion-body'>
                <div className='nav-item'>
                    <button 
                        className='btn btn-link'
                        onClick={() => onChangeView('productos')}
                    >
                        + Agregar
                    </button>
                </div>
            </div>
        </div>
    </div>




        <div className='accordion-item'>
            <h2 className='accordion-header' id='panelsStayOpen-headingThree'>
                <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseThree' aria-expanded='false' aria-controls='panelsStayOpen-collapseThree'>
                    LUGARES
                </button>
            </h2>
            <div id='panelsStayOpen-collapseThree' className='accordion-collapse collapse' aria-labelledby='panelsStayOpen-headingThree'>
                <div className='accordion-body'>
                    text
                </div>
            </div>
        </div>
    </div> */}
    </div>
  );
}

export default Sidebar;
