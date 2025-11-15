import { SCREEN_URL } from '../../constants/screen/PathScreen';
import { CartAdminPage, CartCreateAdminPage, CartEditAdminPage, CartItemCreateAdminPage, CartItemEditAdminPage, CartItemsAdminPage, HomeAdminPage, LoginAdminPage, ProductAdminPage, ProductCreateAdminPage, ProductEditAdminPage, UserAdminCreatePage, UserAdminEditPage, UsersAdminPage } from '../loadableRoutes/adminLoadable';


// Config layout admin
export const layoutAdmin = [
  {
    path: SCREEN_URL.ADMIN_HOME,
    component: HomeAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Trang chủ',
  },
  {
    path: SCREEN_URL.ADMIN_LOGIN,
    component: LoginAdminPage,
    isHeader: false,
    isSidebar: false,
    title: 'Admin Đăng nhập',
  },
  {
    path: SCREEN_URL.ADMIN_USERS,
    component: UsersAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Tài khoản người dùng',
  },
  {
    path: SCREEN_URL.ADMIN_CREATE_USER,
    component: UserAdminCreatePage,
    isHeader: true,
    isSidebar: true,
    title: 'Tạo thông tin người dùng',
  },
  {
    path: SCREEN_URL.ADMIN_EDIT_USER,
    component: UserAdminEditPage,
    isHeader: true,
    isSidebar: true,
    title: 'Cập nhật thông tin người dùng',
  },
  {
    path: SCREEN_URL.ADMIN_PRODUCT,
    component: ProductAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Quản lý sản phẩm',
  },
  {
    path: SCREEN_URL.ADMIN_CREATE_PRODUCT,
    component: ProductCreateAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Tạo thông tin sản phẩm',
  },
  {
    path: SCREEN_URL.ADMIN_EDIT_PRODUCT,
    component: ProductEditAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Chỉnh sửa thông tin sản phẩm',
  },

  // Cart
  {
    path: SCREEN_URL.ADMIN_CARTS,
    component: CartAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Quản lý giỏ hàng',
  },
  {
    path: SCREEN_URL.ADMIN_EDIT_CART,
    component: CartEditAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Chỉnh sửa giỏ hàng',
  },
  {
    path: SCREEN_URL.ADMIN_CREATE_CART,
    component: CartCreateAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Thêm giỏ hàng',
  },

  // Cart Items
  {
    path: SCREEN_URL.ADMIN_CART_ITEMS,
    component: CartItemsAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Quản lý Đơn Hàng',
  },
  {
    path: SCREEN_URL.ADMIN_EDIT_CART_ITEM,
    component: CartItemEditAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Chỉnh sửa đơn hàng',
  },
  {
    path: SCREEN_URL.ADMIN_CREATE_CART_ITEM,
    component: CartItemCreateAdminPage,
    isHeader: true,
    isSidebar: true,
    title: 'Thêm đơn hàng',
  },

];
