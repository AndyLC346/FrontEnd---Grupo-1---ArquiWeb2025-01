import { Tienda } from "../models/tienda"
import { Usuario } from "../models/usuario"

export class Chats{
    idChat:number=0
    fechaInicioChat:Date =new Date()
    user:Usuario = new Usuario()
    tienda:Tienda= new Tienda()
}
