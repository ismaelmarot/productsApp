import type { SidebarSectionProps } from '../../interfaces/SidebarSection.interface';

function SidebarSection({ title, items, onChangeView }: SidebarSectionProps) {
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button
          className='accordion-button'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse-${title}`}
          aria-expanded='true'
          aria-controls={`collapse-${title}`}
        >
          <strong style={{paddingRight:'.5rem'}}>{title}</strong>
        </button>
      </h2>

      <div
        id={`collapse-${title}`}
        className='accordion-collapse collapse not-show'
        data-bs-parent='#accordionExample'
      >
        {items.map((item) => (
          <div className='accordion-body' style={{ padding: '.5rem' }} key={item.view}>
            <button
              className='btn btn-link text-white'
              style={{
                textDecoration: 'none',
                backgroundColor: 'black',
                width: '100%',
              }}
              onClick={() => onChangeView(item.view)}
            >
              {item.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarSection;
