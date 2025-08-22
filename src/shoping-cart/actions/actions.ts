//? lo que quiero es manejar mis cookies de la siguietne manera 
/*cookie
{
    'uuid-123-1':4
    'uuid-123-2':1
    'uuid-123-3':3
}*/

import { getCookie, hasCookie, setCookie } from "cookies-next";

//? para ello voy a primero obtener mis cookies
//? esta funcion lo que va a devolver es las cookies 
//? con la siguiente firma
export const getCookieCart = (): { [id: string]: number } => {

    //? si existe la cookie entonces entonces devuelve un {} con la firma 
    //? lo tomamos como string por que es lo que es o sino devolvemos un {} vacio si no hay nada 
    if (hasCookie('cart')) {
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
        return cookieCart;

    }
    return {};

}

//? funcion para agregar productos al carito de compras
export const addProductToCart = (id: string) => {

    const cookieCart = getCookieCart();

    //? si existe el cookie cart con el id => entonces
    //? lo que pasa es que se sumara uno al numero que apunta con el id
    if (cookieCart[id]) {
        cookieCart[id] += 1;
    } else {
        //? si solo lo 'inicializamos' en 1 
        cookieCart[id] = 1
    }
    //? guardamos la cookie la cookie 
    setCookie('cart', JSON.stringify(cookieCart));
}

//? funcion para eliminar productos al carito de compras
export const removeProductToCart = (id: string) => {

    const cookieCart = getCookieCart();

    // if (!cookieCart[id]) return;
    // cookieCart[id] = 0; 
    //? O
    delete cookieCart[id];
    setCookie('cart', JSON.stringify(cookieCart));
}

export const removeSingleItemFromCart = (id: string) => {

    const cookieCart = getCookieCart();

    if (cookieCart[id]) {
        if (cookieCart[id]>=1) {
            cookieCart[id] -= 1;
        }
        if (cookieCart[id] === 0) {
            delete cookieCart[id]
        }
     
    }
    setCookie('cart', JSON.stringify(cookieCart));

}
