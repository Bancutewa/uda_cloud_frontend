import { SCREEN_URL } from '../../constants/screen/PathScreen';
import { CartPage, CategoriesPage, CheckoutPage, DetailPage, HomePage, LoginPage, PaymentFailPage, PaymentSuccessFail, PaymentSuccessPage, RegisterPage, SearchPage } from '../loadableRoutes/customerLoadable';

// Config layout customer
export const layoutCustomer = [
  {
    path: SCREEN_URL.HOME,
    component: HomePage,
    isHeader: true,
    isFooter: true,
    title: 'Trang chủ',
  },
  {
    path: SCREEN_URL.LOGIN,
    component: LoginPage,
    isHeader: false,
    isFooter: false,
    title: 'Đăng nhập',
  },
  {
    path: SCREEN_URL.REGISTER,
    component: RegisterPage,
    isHeader: false,
    isFooter: false,
    title: 'Đăng ký',
  },
  {
    path: SCREEN_URL.DETAILS,
    component: DetailPage,
    isHeader: true,
    isFooter: true,
    title: 'Chi tiết',
  },
  {
    path: SCREEN_URL.CATEGORY,
    component: CategoriesPage,
    isHeader: true,
    isFooter: true,
    title: 'Danh mục sản phẩm',
  },
  {
    path: SCREEN_URL.CART,
    component: CartPage,
    isHeader: true,
    isFooter: true,
    title: 'Giỏ hàng',
  },
  {
    path: SCREEN_URL.PAYMENT_SUCCESS,
    component: PaymentSuccessPage,
    isHeader: true,
    isFooter: true,
    title: 'Thanh toán thành công',
  },
  {
    path: SCREEN_URL.PAYMENT_FAIL,
    component: PaymentFailPage,
    isHeader: true,
    isFooter: true,
    title: 'Thanh toán thất bại',
  },
  {
    path: SCREEN_URL.SEARCH,
    component: SearchPage,
    isHeader: true,
    isFooter: true,
    title: 'Tìm kiếm sản phẩm',
  },
];
