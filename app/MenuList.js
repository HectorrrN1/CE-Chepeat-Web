import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, ProductOutlined,
  TagsOutlined, ShoppingCartOutlined, OrderedListOutlined,
  SettingOutlined, BarsOutlined, BookOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'; // Cambiar a useRouter de Next.js

const MenuList = ({ darkTheme }) => {
  const router = useRouter(); // Cambiar useNavigate por useRouter

  return (
    <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>
      <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => router.push('/')}>
        Home
      </Menu.Item>
      <Menu.Item key="activity" icon={<UserOutlined />} onClick={() => router.push('/autores')}>
        Autores
      </Menu.Item>
      <Menu.SubMenu key='subtasks' icon={<BarsOutlined />} title='Libros'>
        <Menu.Item key='task-1' icon={<BookOutlined />} onClick={() => router.push('/libros')}>
          Libros
        </Menu.Item>
        <Menu.Item key='task-2' icon={<PlusOutlined />} onClick={() => router.push('/libro-form')}>
          Nuevo Libro
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="progress" icon={<TagsOutlined />} onClick={() => router.push('/cupones')}>
        Cupones
      </Menu.Item>
      <Menu.SubMenu key='carritos' icon={<ShoppingCartOutlined />} title='Carrito'>
        <Menu.Item key='carrito-1' icon={<ProductOutlined />} onClick={() => router.push('/carrito')}>
          Productos
        </Menu.Item>
        <Menu.Item key='carrito-2' icon={<OrderedListOutlined />} onClick={() => router.push('/carrito-compra')}>
          Detalle de Compra
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="setting" icon={<SettingOutlined />}>
        Setting
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
