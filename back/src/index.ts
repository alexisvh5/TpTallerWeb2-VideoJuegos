import 'dotenv/config';
import express, {type Request, type Response} from "express";
import { AppRoutes } from "./routes/routes.js";
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(AppRoutes.routes);

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Imágenes disponibles en http://localhost:${PORT}/public/images/juegos`);
})