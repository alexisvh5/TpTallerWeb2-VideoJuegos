import { prisma } from "../prisma.js";

export class CompraRepository {

    async createCompraConItems(idUsuario, items, totalPagado, idCarrito?){
        return await prisma.$transaction(async (tx) => {
            const compra = await tx.compra.create({
                data: {
                    idUsuario,
                    totalPagado,
                    ItemCompra: {
                        create: items.map(item => ({
                            idJuego: item.idJuego,
                            precioAlComprar: item.precio
                        }))
                    }
                },
                include: {ItemCompra: true}
            });

            if(idCarrito) {
                await tx.carritoJuego.deleteMany({where: {A: idCarrito}})
            }

            return compra;
        });
    }

    async getAll(){
        return await prisma.compra.findMany({
            include: {ItemCompra: true}
        })
    }

    async getComprasByUsuario(idUsuario:number){
        return await prisma.compra.findMany({
            where: {idUsuario},
            include: {
                ItemCompra: {
                    include: {
                        Juego: true
                    }
                }
            },
            orderBy: {
                fecha: 'desc'
            }
        });
    }
}