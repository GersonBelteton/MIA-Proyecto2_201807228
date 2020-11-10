const express = require('express');

const router = express.Router();
const BD = require('../config/bd');


router.get('/',(req,res)=>{
    res.send('Hola mundo');
});

///////////////////////////////USUARIOS//////////////////////////////////////////

router.get('/p', async (req, res) => {
    sql = "select * from tabla";

    let result = await BD.Open(sql, [], false);
    prueba = [];

    result.rows.map(user => {
        let userSchema = {
            "columna1": user[0],
            "columna2": user[1]
        
        }

        prueba.push(userSchema);
    })

    res.json(prueba);
})


router.get('/getUsers', async (req, res) => {
    sql = "select * from Usuario";

    let result = await BD.Open(sql, [], false);
    users = [];

    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "apellido": user[2],
            "correo": user[3],
            "contrasena": user[4],
            "fecha_nacimiento": user[5],
            "pais": user[6],
            "foto":user[7],
            "credito":user[9]
        
        }

        users.push(userSchema);
    })

    res.json(users);
})

router.get('/existeUsuario/:correo',async (req,res)=>{
    const correo = req.params.correo
    sql = 'select count(*) from Usuario where correo = :correo'
    let result = await BD.Open(sql,[correo],false);
    res.send(result.rows.toString())
})

router.post('/addUser', async (req, res) => {
    const { correo, contrasena, nombre, apellido, fecha_nacimiento, pais } = req.body;
    
    sql = "insert into Usuario(correo, contrasena, nombre, apellido,fecha_nacimiento,pais,foto,credito) values (:correo,:contrasena,:nombre,:apellido,:fecha_nacimiento,:pais,'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',500)";
    await BD.Open(sql, [ correo, contrasena, nombre, apellido, fecha_nacimiento, pais ], true);
    res.status(200).json({
        "correo": correo,
        "contrasena": contrasena,
        "nombre": nombre,
        "apellido":apellido,
        "fecha": fecha_nacimiento,
        "pais": pais
    })
})


router.patch('/updateUser',async(req,res)=>{
    const{idUsuario,correo,contrasena,nombre,apellido,fecha_nacimiento,pais} = req.body
    sql = "update Usuario set correo = :correo, contrasena = :contrasena, nombre = :nombre, apellido = :apellido, fecha_nacimiento = :fecha_nacimiento, pais = :pais where idUsuario = :idUsuario"
    console.log(idUsuario);
    console.log(correo);
    await BD.Open(sql, [correo,contrasena,nombre,apellido,fecha_nacimiento,pais,idUsuario],true);
    res.status(200).json({
        "id":idUsuario,
        "correo": correo,
        "contrasena": contrasena,
        "nombre": nombre,
        "apellido":apellido,
        "fecha_nacimiento":fecha_nacimiento,
        "pais": pais
    })
})



router.delete('/usuario/:id',async(req,res)=>{
    res.json({text:'eliminando usuario' + req.params.id});
    const id  = req.params.id
    await BD.Open('DELETE FROM Usuario WHERE idUsuario = :id',[id],true);
})



router.put('/usuario/insertarImagen/:id',async(req,res)=>{
    const id = req.params.id
    const{foto} = req.body;
    sql = 'update Usuario set foto = :foto where idUsuario = :id'
    await BD.Open(sql,[foto,id],true);
    res.send('insertando imagen')
})



router.post('/login', async (req,res)=>{
    const { correo,contrasena } = req.body;

    sql = 'SELECT * FROM Usuario WHERE correo = :correo and contrasena = :contrasena'
    let result= await BD.Open(sql, [correo,contrasena],false);
    users = []
    result.rows.map(user => {
        let userSchema = {
            "id":user[0],
            "nombre": user[1],
            "apellido": user[2],
            "correo": user[3],
            "contrasena": user[4],
            "fecha_nacimiento": user[5],
            "pais": user[6],
            "foto":user[7],
            "credito":user[9]
        }

        users.push(userSchema);
    })
    res.json(users)
})


//////////////////////////////PRODUCTOS////////////////////////////////////////////
router.post('/addProduct', async (req, res) => {
    const { nombre_producto, detalle, precio,idUsuario} = req.body;
    
    sql = "insert into Producto(nombre_producto, detalle, precio, likes,dislikes,idUsuario,idCompra) values (:nombre_producto,:detalle,:precio,0,0,:idUsuario,0)";
    await BD.Open(sql, [ nombre_producto, detalle, precio,idUsuario], true);
    res.status(200).json({
        "nombre_producto": nombre_producto,
        "detalle": detalle,
        "precio": precio
    })
})


router.get('/getProducts', async (req, res) => {
    sql = "select * from Producto inner join Usuario on Producto.idUsuario = Usuario.idUsuario where Producto.idCompra = 0";

    let result = await BD.Open(sql, [], false);
    products = [];

    result.rows.map(product => {
        let productSchema = {
            "id":product[0],
            "nombre": product[1],
            "detalle": product[2],
            "precio": product[3],
            "likes": product[4],
            "dislikes": product[5],
            "idUsuario": product[6],
            "idCategoria":product[7],
            "idCompra":product[8],
            "idUsuario":product[9],
            "nombreU":product[10],
            "apellido":product[11]
        }

        products.push(productSchema);
    })

    res.json(products);
})


router.get('/getProduct/:id', async (req, res) => {
    const id = req.params.id
    sql = "select * from Producto inner join Usuario on Producto.idUsuario = Usuario.idUsuario where idProducto = :id";

    let result = await BD.Open(sql, [id], false);
    products = [];

    result.rows.map(product => {
        let productSchema = {
            "id":product[0],
            "nombre": product[1],
            "detalle": product[2],
            "precio": product[3],
            "likes": product[4],
            "dislikes": product[5],
            "idUsuario": product[6],
            "idCategoria":product[7],
            "idCompra":product[8],
            "idUsuario":product[9],
            "nombreU":product[10],
            "apellido":product[11]
        }

        products.push(productSchema);
    })

    res.json(products);
})

router.post('/addLike', async (req, res) => {
    const { idUsuario, idProducto} = req.body;
    
    sql = "insert into likes(idUsuario, idProducto) values (:idUsuario,:idProducto)";
    await BD.Open(sql, [ idUsuario, idProducto], true);
    res.status(200).json({
        "idUsuario": idUsuario,
        "idProducto": idProducto
        
    })
})
router.get('/getLikes/:id', async (req, res) => {
    const id = req.params.id
    sql = "select count(*) from likes  where idProducto = :id";

    let result = await BD.Open(sql, [id], false);
    likes = [];

    result.rows.map(like => {
        let likeSchema = {
            "numLikes":like[0],
        }

        likes.push(likeSchema);
    })

    res.json(likes);
})
router.get('/existeLike',async (req,res)=>{
    const idUsuario = req.query.idU
    const idProducto = req.query.idP
    sql = 'select count(*) from Likes where idUsuario = :idUsuario and idProducto = :idProducto'
    let result = await BD.Open(sql,[idUsuario,idProducto],false);
    res.send(result.rows.toString())
})

router.get('/existeDislike',async (req,res)=>{
    const idUsuario = req.query.idU
    const idProducto = req.query.idP
    sql = 'select count(*) from Dislikes where idUsuario = :idUsuario and idProducto = :idProducto'
    let result = await BD.Open(sql,[idUsuario,idProducto],false);
    res.send(result.rows.toString())
})

router.get('/getDislikes/:id', async (req, res) => {
    const id = req.params.id
    sql = "select count(*) from dislikes  where idProducto = :id";

    let result = await BD.Open(sql, [id], false);
    dislikes = [];

    result.rows.map(dislike => {
        let dislikeSchema = {
            "numDislikes":dislike[0],
        }

        dislikes.push(dislikeSchema);
    })

    res.json(dislikes);
})

router.post('/addDislike', async (req, res) => {
    const { idUsuario, idProducto} = req.body;
    
    sql = "insert into dislikes(idUsuario, idProducto) values (:idUsuario,:idProducto)";
    await BD.Open(sql, [ idUsuario, idProducto], true);
    res.status(200).json({
        "idUsuario": idUsuario,
        "idProducto": idProducto

    })
})

router.delete('/deleteLike',async(req,res)=>{
    const idUsuario = req.query.idU
    const idProducto = req.query.idP 

    
    await BD.Open('DELETE FROM Likes WHERE idUsuario = :idUsuario and idProducto = :idProducto',[idUsuario,idProducto],true);
    res.json({text:'eliminando like'});
})

router.delete('/deleteDislike',async(req,res)=>{
    const idUsuario = req.query.idU
    const idProducto = req.query.idP 

    
    await BD.Open('DELETE FROM Dislikes WHERE idUsuario = :idUsuario and idProducto = :idProducto',[idUsuario,idProducto],true);
    res.json({text:'eliminando like'});
})



//////////////////////////////////COMENTARIO/////////////////////////////////////

router.post('/addComent',async(req,res)=>{
    const {idUsuario,idProducto,descripcion,tipo} = req.body
    sql = 'insert into Comentario(idUsuario,idProducto,descripcion,tipo)values(:idUsuario,:idProducto,:descripcion,:tipo)'
    await BD.Open(sql,[idUsuario,idProducto,descripcion,tipo],true)

    res.status(200).json({
        "idUsuario": idUsuario,
        "idProducto": idProducto,
        "descripcion":descripcion,
        "tipo":tipo
    })
})
router.get('/getComents', async (req, res) => {
    
    sql = "select * from Comentario ";

    let result = await BD.Open(sql, [], false);
    comentarios = [];

    result.rows.map(comentario => {
        let comentariosSchema = {
            "idComentario":comentario[0],
            "idUsuario":comentario[2],
            "idProducto":comentario[1],
            "descripcion":comentario[3],
            "tipo":comentario[4],
        }

        comentarios.push(comentariosSchema);
    })

    res.json(comentarios);
})

router.get('/getComents/:id', async (req, res) => {
    id = req.params.id 
    sql = "select * from Comentario inner join Usuario on Comentario.idUsuario = Usuario.idUsuario where idProducto = :id and comentario.tipo = \'C\'";

    let result = await BD.Open(sql, [id], false);
    comentarios = [];

    result.rows.map(comentario => {
        let comentariosSchema = {
            "idComentario":comentario[0],
            "idUsuario":comentario[2],
            "idProducto":comentario[1],
            "descripcion":comentario[3],
            "tipo":comentario[4],
            "nombre":comentario[8],
            "apellido":comentario[9]
        }

        comentarios.push(comentariosSchema);
    })

    res.json(comentarios);
})


router.post('/addComentChat',async(req,res)=>{
    const {idUsuario,idProducto,descripcion,tipo,idUsuariod} = req.body
    sql = 'insert into Comentario(idUsuario,idProducto,descripcion,tipo,idUsuariod)values(:idUsuario,:idProducto,:descripcion,:tipo,:idUsuariod)'
    await BD.Open(sql,[idUsuario,idProducto,descripcion,tipo,idUsuariod],true)

    res.status(200).json({
        "idUsuario": idUsuario,
        "idProducto": idProducto,
        "descripcion":descripcion,
        "tipo":tipo,
        "idUsuariod":idUsuariod
    })
})
router.get('/getChat', async (req, res) => {
    idv = req.query.idV
    idc = req.query.idC
    console.log(idc)
    console.log(idv)
    
    sql = "select u1.nombre,u1.apellido,u2.nombre,u2.apellido,descripcion from comentario inner join usuario u1 on comentario.idusuario = u1.idusuario inner join usuario u2 on comentario.idusuariod = u2.idusuario where((comentario.idusuario = :idv and idusuariod = :idc)or(comentario.idusuario = :idc and idusuariod = :idv)) order by idComentario desc";

    let result = await BD.Open(sql, [idv,idc,idc,idv], false);
    comentarios = [];

    result.rows.map(comentario => {
        let comentariosSchema = {
            "nombreOr":comentario[0],
            "apellidoOr":comentario[1],
            "nombreDes":comentario[2],
            "apellidoDes":comentario[3],
            "descripcion":comentario[4]
        }

        comentarios.push(comentariosSchema);
    })

    res.json(comentarios);
})



router.post('/addChat', async (req, res) => {
    const { idEmisor, idReceptor} = req.body;
    
    sql = "insert into Chat(idEmisor,idReceptor) values (:idEmisor,:idReceptor)";
    await BD.Open(sql, [ idEmisor,idReceptor], true);
    res.status(200).json({
        "idEmisor": idEmisor,
        "idReceptor": idReceptor
    })
})


router.get('/getChatList/:id', async (req, res) => {
    id = req.params.id 
    sql = "select idChat, idEmisor,idReceptor,u1.nombre,u1.apellido,u2.nombre,u2.apellido from Chat inner join usuario u1 on u1.idUsuario = Chat.idEmisor inner join usuario u2 on u2.idUsuario = Chat.idReceptor where idEmisor = :id or idReceptor = :id";

    let result = await BD.Open(sql, [id], false);
    comentarios = [];

    result.rows.map(comentario => {
        let comentariosSchema = {
            "idChat":comentario[0],
            "idEmisor":comentario[1],
            "idReceptor":comentario[2],
            "nombre1":comentario[3],
            "apellido1":comentario[4],
            "nombre2":comentario[5],
            "apellido2":comentario[6]

        }

        comentarios.push(comentariosSchema);
    })

    res.json(comentarios);
})


router.get('/existeChat',async (req,res)=>{

    idc = req.query.idC 
    idv = req.query.idV
    sql = 'select count(*) from Chat where (idEmisor = :idv and idReceptor = :idc)or(idEmisor = :idc and idReceptor = :idv)'
    let result = await BD.Open(sql,[idv,idc,idc,idv],false);
    res.send(result.rows.toString())
})



//////////////////////////////////////////////Compra/////////////////////////////////////
router.get('/getCompras',async(req,res)=>{
    sql = 'select * from compra'
    let result = await BD.Open(sql,[],false);
    res.send(result.rows.toString())
})



router.get('/getCompra/:id', async (req, res) => {
    id = req.params.id 
    console.log(id)
    sql = "select * from Compra where idUsuario = :id";

    let result = await BD.Open(sql, [id], false);
    comentarios = [];

    result.rows.map(comentario => {
        let comentariosSchema = {
            "idCompra":comentario[0],
            "idUsuario":comentario[1],
            "total":comentario[2],

        }

        comentarios.push(comentariosSchema);
    })

    res.json(comentarios);
})
router.post('/addCompra', async (req, res) => {
    const { idUsuario,total} = req.body;
    
    sql = "insert into Compra(idUsuario,total) values (:idUsuario,:total)";
    await BD.Open(sql, [idUsuario,total], true);
    res.status(200).json({
        "idUsuario": idUsuario,
        "total":total
    })
})

router.put('/setIdCompra', async (req, res) => {
    idCompra = req.query.idC
    idProducto = req.query.idP
    
    sql = "update producto set idCompra = :idCompra where idProducto = :idProducto";
    await BD.Open(sql, [idCompra,idProducto], true);
    res.status(200).json({
        "idCompra": idCompra,
        "idProducto": idProducto
    })
})


router.put('/setTotal/:id', async (req, res) => {
  
    idCompra = req.params.id   
    sql = "update Compra set total = (select sum(precio)from producto where idCompra = :idCompra)where idCompra = :idCompra";
    await BD.Open(sql, [idCompra], true);
    res.status(200).json({
        "idCompra": idCompra,
    })
})
router.put('/limpiarCarro/:id', async (req, res) => {
  
    idCompra = req.params.id   
    sql = "update Producto set idCompra = 0 where idCompra = :id";
    await BD.Open(sql, [idCompra], true);
    res.status(200).json({
        "idCompra": idCompra,
    })
})

sql = "update (select credito from usuario inner join producto on usuario.idusuario = producto.idusuario where producto.idcompra = :idcompra) t set t.credito = (select t.credito + sum(precio) from usuario inner join producto on usuario.isUsuario = producto.idUsuario where producto.idCompra = :idCompra ) "

router.put('/sumarCredito', async (req, res) => {
  
    precio = req.query.precio 
    idV = req.query.idV 

    sql = "update usuario set credito = credito + :precio where idUsuario = :idV";
    await BD.Open(sql, [precio, idV], true);
    res.status(200).json({
        "idCompra": idCompra,
    })
})


router.put('/restarCredito', async (req, res) => {
  
    total = req.query.total 
    idC = req.query.idC

    sql = "update usuario set credito = credito - :total where idUsuario = :idC";
    await BD.Open(sql, [total, idC], true);
    res.status(200).json({
        "idCompra": idCompra,
    })
})

router.delete('/deleteCompras/:id',async(req,res)=>{
    const idUsuario = req.params.id
    await BD.Open('DELETE FROM Compra WHERE idUsuario = :idUsuario ',[idUsuario],true);
    res.json({text:'eliminando Compra'});
})

router.get('/existeCompra/:id',async (req,res)=>{

    id = req.params.id 
    sql = 'select count(*) from Compra where idUsuario = :id'
    let result = await BD.Open(sql,[id],false);
    res.send(result.rows.toString())
})


router.get('/getProductsCompra/:id', async (req, res) => {
    id = req.params.id 

    sql = "select * from Producto where idCompra = :id";

    let result = await BD.Open(sql, [id], false);
    products = [];

    result.rows.map(product => {
        let productSchema = {
            "id":product[0],
            "nombre": product[1],
            "detalle": product[2],
            "precio": product[3],
            "idUsuario": product[6],
            "idCategoria":product[7],
            "idCompra":product[8],
        }

        products.push(productSchema);
    })

    res.json(products);
})
router.get('/getCreditos/:id', async (req, res) => {
    id = req.params.id 
    console.log(id)
    sql = "select credito from Usuario where idUsuario = :id";

    let result = await BD.Open(sql, [id], false);
    comentarios = [];

    result.rows.map(comentario => {
        let comentariosSchema = {
            "credito":comentario[0],
    
        }

        comentarios.push(comentariosSchema);
    })

    res.json(comentarios);
})


router.delete('/deleteProducto/:id',async(req,res)=>{
    const idCompra = req.params.id
    await BD.Open('DELETE FROM Producto WHERE idCompra = :idCompra ',[idCompra],true);
    res.json({text:'eliminando Producto'});
})


router.get('/getTotal/:id', async (req, res) => {
    id = req.params.id 
    console.log(id)
    sql = "select total from Compra where idCompra = :id";

    let result = await BD.Open(sql, [id], false);
    comentarios = [];

    result.rows.map(comentario => {
        let comentariosSchema = {
            "total":comentario[0],
        }

        comentarios.push(comentariosSchema);
    })

    res.json(comentarios);
})

//////////////////////////////////////Reportes/////////////////////////////////

router.get('/topLike', async (req, res) => {
    sql = "select count(likes.idProducto) as likes, producto.nombre_producto from  likes inner join producto on producto.idProducto = likes.idProducto group by producto.nombre_producto order by likes desc FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);
    consultas = [];

    result.rows.map(consulta => {
        let consultasSchema = {
            "Likes":consulta[0],
            "Producto":consulta[1]
        }

        consultas.push(consultasSchema);
    })

    res.json(consultas);
})

router.get('/topDislike', async (req, res) => {
    sql = "select count(dislikes.idProducto) as dislikes, producto.nombre_producto from  dislikes inner join producto on producto.idProducto = dislikes.idProducto group by producto.nombre_producto order by dislikes desc FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);
    consultas = [];

    result.rows.map(consulta => {
        let consultasSchema = {
            "Dislikes":consulta[0],
            "Producto":consulta[1]
        }

        consultas.push(consultasSchema);
    })

    res.json(consultas);
})

router.get('/topClienteMasCredito', async (req, res) => {
    sql = "select credito, nombre,apellido from usuario order by credito desc FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);
    consultas = [];

    result.rows.map(consulta => {
        let consultasSchema = {
            "credito":consulta[0],
            "nombre":consulta[1],
            "apellido":consulta[2]
        }

        consultas.push(consultasSchema);
    })

    res.json(consultas);
})

router.get('/topClienteMenosCredito', async (req, res) => {
    sql = "select credito, nombre,apellido from usuario order by credito asc FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);
    consultas = [];

    result.rows.map(consulta => {
        let consultasSchema = {
            "credito":consulta[0],
            "nombre":consulta[1],
            "apellido":consulta[2]
        }

        consultas.push(consultasSchema);
    })

    res.json(consultas);
})

router.get('/topClientePublicacion', async (req, res) => {
    sql = "select count(producto.idusuario) as publicaciones , usuario.nombre from usuario inner join producto on usuario.idusuario = producto.idusuario group by usuario.nombre order by publicaciones desc FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);
    consultas = [];

    result.rows.map(consulta => {
        let consultasSchema = {
            "publicaciones":consulta[0],
            "nombre":consulta[1],
            "apellido":consulta[2]
        }

        consultas.push(consultasSchema);
    })

    res.json(consultas);
})


router.get('/topPaises', async (req, res) => {
    sql = "select sum(credito) as total,count(producto.idProducto)as prod,pais from usuario inner join producto on producto.idUsuario = usuario.idusuario group by pais order by total desc FETCH FIRST 10 ROWS ONLY";

    let result = await BD.Open(sql, [], false);
    consultas = [];

    result.rows.map(consulta => {
        let consultasSchema = {
            "creditos":consulta[0],
            "publicaciones":consulta[1],
            "pais":consulta[2]

        }

        consultas.push(consultasSchema);
    })

    res.json(consultas);
})
module.exports = router

/*select count(likes.idProducto) as likes, producto.nombre_producto from  likes inner join producto on producto.idProducto = likes.idProducto group by producto.nombre_producto order by likes desc FETCH FIRST 10 ROWS ONLY
select count(dislikes.idProducto) as dislikes, producto.nombre_producto from  dislikes inner join producto on producto.idProducto = dislikes.idProducto group by producto.nombre_producto order by dislikes desc FETCH FIRST 10 ROWS ONLY
select * from usuario order by credito desc FETCH FIRST 10 ROWS ONLY
select * from usuario order by credito asc FETCH FIRST 10 ROWS ONLY
select count(producto.idusuario) as publicaciones , usuario.nombre from usuario inner join producto on usuario.idusuario = producto.idusuario group by usuario.nombre order by publicaciones desc FETCH FIRST 10 ROWS ONLY;
select sum(credito) as total,count(producto.idProducto)as prod,pais from usuario inner join producto on producto.idUsuario = usuario.idusuario group by pais order by total desc FETCH FIRST 10 ROWS ONLY;*/ 
//select u1.nombre,u2.nombre,descripcion from comentario inner join usuario u1 on comentario.idusuario = u1.idusuario inner join usuario u2 on comentario.idusuariod = u2.idusuario where((comentario.idusuario = 2 and idusuariod = 21)or(comentario.idusuario = 21 and idusuariod = 2)) and tipo = 'h';
/*create table Usuario(
    idUsuario number GENERATED BY DEFAULT AS- IDENTITY,
    nombre varchar(16) NOT NULL,
    apellido varchar(16) NOT NULL,
    correo varchar(25) NOT NULL,
    contrasena varchar(25) NOT NULL,
    fecha_nacimiento varchar(25),
    pais varchar(16),
    foto long,
    rol varchar(1),
    credito decimal(9,9),
    PRIMARY KEY (idUsuario)

);

drop table Usuario;

insert into Usuario(nombre,apellido,correo)select ('gerson') where not exists select correo from Usuario where Usuario.correo = 'correo1';

update Usuario set correo = 'coorreo', contrasena = '1', nombre = 'mario', apellido = 'fernandez', fecha_nacimiento = 'd' where idUsuario = 1;

select * from Usuario;
create table Categoria(
    idCategoria number GENERATED BY DEFAULT AS IDENTITY,
    nombre_categoria varchar(16),
    primary key (idCategoria)
);

create table Compra(
    idCompra number GENERATED BY DEFAULT AS IDENTITY,
    idUsuario number,
    total decimal(9,9),
    primary key (idCompra),
    foreign key (idUsuario) references Usuario(idUsuario)
);

create table Producto(
    idProducto number GENERATED BY DEFAULT AS IDENTITY,
    nombre_producto varchar(16), 
    detalle varchar(100),
    precio decimal(9,9),
    likes number,
    dislikes number,
    idUsuario number,
    idCategoria number,
    idCompra number,
    primary key (idProducto),
    foreign key (idUsuario) references Usuario(idUsuario),
    foreign key (idCategoria) references Categoria(idCategoria),
    foreign key (idCompra) references Compra(idCompra)
);


create table Comentario (
    idComentario number GENERATED BY DEFAULT AS IDENTITY,
    idProducto number,
    idUsuario number,
    descripcion varchar(100),
    tipo varchar(1),
    fecha date,
    primary key (idComentario),
    foreign key (idProducto) references Producto(idProducto),
    foreign key (idUsuario) references Usuario (idUsuario)

);

create table Palabra_clave(
    idPalabra_clave number GENERATED BY DEFAULT AS IDENTITY,
    palabra varchar(16),
    primary key(idPalabra_clave)
);

create table Detalle_PC (
    idDetalle_PC number GENERATED BY DEFAULT AS IDENTITY,
    idPalabra_clave number,
    idProducto number,
    primary key(idDetalle_PC),
    foreign key (idPalabra_clave) references Palabra_clave(idPalabra_clave),
    foreign key (idProducto) references Producto(idProducto)
);


create table bitacora(
    idBitacora number GENERATED BY DEFAULT AS IDENTITY,
    correo_usuario varchar(25),
    fecha date,
    primary key (idBitacora)

);
insert into usuario (nombre,apellido,correo,contrasena,foto)values('juan','perez','juan@gmail.com','123','data:image/png;base64,iVBOGAAQNQSrFk');
select * from usuario;
commit work*/ 