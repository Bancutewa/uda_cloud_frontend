import loadable from '@loadable/component'

// Admin router
export const HomeAdminPage = loadable(() => import('../../pages/site-admin/pages/HomePage/AdminHomePage'));
export const LoginAdminPage = loadable(() => import('../../pages/site-admin/pages/LoginPage/AdminLoginPage'));

export const UsersAdminPage = loadable(() => import('../../pages/site-admin/pages/Users/UsersAdminPage/UsersAdminPage'));
export const UserAdminCreatePage = loadable(() => import('../../pages/site-admin/pages/Users/UserAdminCreatePage/UserAdminCreatePage'));
export const UserAdminEditPage = loadable(() => import('../../pages/site-admin/pages/Users/UserAdminEditPage/UserAdminEditPage'));

export const ProductAdminPage = loadable(() => import('../../pages/site-admin/pages/Products/ProductsAdminPage/ProductsAdminPage'));
export const ProductCreateAdminPage = loadable(() => import('../../pages/site-admin/pages/Products/ProductCreateAdminPage/ProductCreateAdminPage'));
export const ProductEditAdminPage = loadable(() => import('../../pages/site-admin/pages/Products/ProductEditAdminPage/ProductEditAdminPage'));

export const CartAdminPage = loadable(() => import('../../pages/site-admin/pages/Carts/CartsAdminPage/CartsAdminPage'));
export const CartCreateAdminPage = loadable(() => import('../../pages/site-admin/pages/Carts/CartCreateAdminPage/CartCreateAdminPage'));
export const CartEditAdminPage = loadable(() => import('../../pages/site-admin/pages/Carts/CartEditAdminPage/CartEditAdminPage'));

export const CartItemsAdminPage = loadable(() => import('../../pages/site-admin/pages/CartItems/CartItemsAdminPage/CartItemsAdminPage'));
export const CartItemCreateAdminPage = loadable(() => import('../../pages/site-admin/pages/CartItems/CartItemCreateAdminPage/CartItemCreateAdminPage'));
export const CartItemEditAdminPage = loadable(() => import('../../pages/site-admin/pages/CartItems/CartItemsEditAdminPage/CartItemsEditAdminPage'));
