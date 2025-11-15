// User Functions
export const createUser = (username, role) => ({ username, role });

export const getUser = () => {
    let user = localStorage.getItem('current_user');
    user = !!user ? JSON.parse(user) : '';
    return user;
};

export const pushUserLocal = (name) => {
    localStorage.setItem('current_user', JSON.stringify(name));
}

export const checkUserLocal = () => localStorage.getItem('current_user');

export const deleteUserLocal = () => {
    localStorage.removeItem('token');
};

// Cart User Functions
export const createUserCart = (user, products) => ({ user, products });

export const pushUserCartLocal = (obj) => {
    localStorage.setItem('user_cart', JSON.stringify(obj));
}

export const checkUserCartLocal = () => localStorage.getItem('user_cart');

export const deleteUserCartLocal = () => {
    localStorage.removeItem('user_cart');
};
