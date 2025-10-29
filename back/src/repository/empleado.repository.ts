import { prisma } from "../prisma.js";

export class EmpleadoRepository{

    async findAllEmpleados(){
        return await prisma.empleado.findMany(
            {
                include : {empresa : true}
            }
        )
    }

    async findEmpleadoById(id:number){
        return await prisma.empleado.findUnique(
            {
                where : {id : id},
                include : {
                    empresa : true
                }
            }
        )
    }

    async createEmpleado(data : {nombre : string, id_empresa?:number}){
        return await prisma.empleado.create({
            data
        })
    }

    async updateEmpleado(id:number,  data : {nombre?:string; id_empresa?:number}){
        return await prisma.empleado.update({
            where : {id},
            data
        })
    }

    async deleteEmpleado(id:number){
        return await prisma.empleado.delete({
            where : {id}
        })
    }
    

}