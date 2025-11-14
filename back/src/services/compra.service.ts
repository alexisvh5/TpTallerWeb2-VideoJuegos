import { CompraRepository } from "../repository/compra.repository.js";
import { CarritoRepository } from "../repository/carrito.repository.js";

export class CompraService{

    constructor(private compraRepository:CompraRepository, private carritoRepository:CarritoRepository){}

    async realizarCompra(idUsuario:number){
        const carrito = await this.carritoRepository.getCarritoByUsuario(idUsuario);

        if(!carrito || carrito.CarritoJuego.length === 0){
            throw new Error('El carrito esta vacio.')
        }

        const items = carrito.CarritoJuego.map(cj => ({
            idJuego: cj.Juego.id,
            precio: cj.Juego.precio
        }));

        const totalAPagar = items.reduce(
            (acc, item) => acc + Number(item.precio), 0
        );

        const compra = await this.compraRepository.createCompraConItems(
            idUsuario, items, totalAPagar, carrito.id
        );
        return compra;
    }

}


    
