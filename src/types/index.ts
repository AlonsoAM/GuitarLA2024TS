export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type GuitarProps = {
    guitar: Guitar
    addToCart: (arg0: Guitar) => void
}

export type CartItem = Guitar & {
    quantity: number
}

export type GuitarID = Guitar['id']