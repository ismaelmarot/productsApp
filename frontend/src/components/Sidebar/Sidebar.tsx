import SidebarSection from '../SidebarSection/SidebarSection';
import { producerItems, productItems } from '../SidebarItems/SidebarItems';
import type { SidebarProps } from '../../interfaces/Sidebar.interface';

function Sidebar({ onChangeView }: SidebarProps) {
  return (
    <div className='accordion' id='accordionExample'>
      <SidebarSection title='Productos' items={productItems} onChangeView={onChangeView} />
      <SidebarSection title='Productores' items={producerItems} onChangeView={onChangeView} />
    </div>
  );
}

export default Sidebar;
