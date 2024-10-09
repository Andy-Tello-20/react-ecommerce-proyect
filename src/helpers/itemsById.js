


export const getProduct = (list,id) =>{

    const item = list.filter( (i) => i.id === id )

    return item
}