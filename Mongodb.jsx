1-----
Primer paso
si tenemos linux ya seguramente
tengamos mongo db en nuestro sistema, igualmente ingresamos estos comandos

COMANDOS MONGODB

para instalar mongo db en linux
sudo apt-get install mongodb
sudo apt-get update
sudo service mongodb start
mongo 
abre ya mongo db activo en nuestro caso no debemos abrir mongod porque al escribir mongo abre la terminal y la conecta
deberia aparecer esto en la terminal

***
connecting to: mongodb://127.0.0.1:27017
Implicit session: session { "id" : UUID("02de05b5-4b6d-46b9-a57b-5dfb4250cbab") }
MongoDB server version: 3.6.8
Server has startup warnings: 
2020-12-08T14:29:57.775-0300 I STORAGE  [initandlisten] 
2020-12-08T14:29:57.775-0300 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2020-12-08T14:29:57.775-0300 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2020-12-08T14:30:00.528-0300 I CONTROL  [initandlisten] 
2020-12-08T14:30:00.529-0300 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2020-12-08T14:30:00.529-0300 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2020-12-08T14:30:00.529-0300 I CONTROL  [initandlisten]
***

para crear nuestra primera base escribimos 
use "NOMBRE DE LA BASE QUE QUERAMOS" por ejemplo
use store

los comandos
comando INSERT
Se utiliza para insertar documents en nuestras collections
como se observa se utiliza formato JSON.

db.products.insert({
	"nombre": "laptop",
	"precio": "40.2",
	"active": false,
	"createdAt": new Date("08/12/2020"),
	"someData": [1,"a",[]],
	"inc": {
		"name": "Monster Inc"
	}
})

db.products.insert([{
   "name":"mouse",
   "description": "razer",
   "tags":["computers", "gaming"],
   "quantity": 14,
   "createdAt": new Date()
},{
   "name":"monitor",
   "description": "lg",
   "tags":["gaming"],
   "quantity": 4,
   "createdAt": new Date()
}])


comando find()
Para poder ver las collections de documents
que tenemos en mongo escribimos el comando
db.products.find().pretty()

para encontrar documentos especificos debemos buscar
sus propiedades por ejemplo
db.products.find({name:"mouse"}).pretty()

para encontrar documentos por multiples atributos
//TRAE TODOS LOS PRODUCTOS Q COINCIDEN CON ESA BUSQUEDA
db.products.find({"tags":"gaming"}).pretty()
//trae las collections que coinciden con ambos valores
db.products.find({"tags":"gaming","name":"mouse"}).pretty()
//Si quisieramos buscar solamente el primer resultado de toda la lista usaremos 
db.products.findOne({"tags":"gaming"})
//Si quisiera traer solamente algun atributo del documento
db.products.findOne({"tags":"gaming"},{"name":1,"description":1})
//Si quisiera traer solamente algun atributo del documento excluyendo por ejemplo el id observen que _ es importante ponerlo
db.products.findOne({"tags":"gaming"},{"name":1,"description":1,"_id":0})
//Si quisiera que la respuesta llegue por ejemplo en forma ordenada alfabeticamente
db.products.find({"tags":"gaming"}).sort({"name":1})
//Si quisiera que me devuelva datos pero indicandole la cantidad 
db.products.find().limit(2)
//Para ver todos los datos podemos contar los documentos con
db.products.count()
//Si quisieramos recorrer los productos e imprimir como hacemos con la consola en javascript
db.products.find().forEach(product => print("Product Name: "+ product.name))
//Cuando nuestros datos no tenga el atributo que pedimos dira undefined
db.products.find().forEach(product => print("Product Name: "+ product.price))
/*para actualizar informacion 
  primero le pasaremos el objeto que queremos buscar
  y en el segundo objeto lo que queremos actualizar
  la respuesta deberia ser 
  WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
  modified nos informa que el producto fue modificado siempre es importante ver 
  la respuesta.
  Cuidado que lo que indiquemos en el 2do objeto sera lo que reemplaza a lo ya existente
  por eso si quisieramos actualizar los datos debemos pasarle el existente y el que queremos modificar
  o agregar.
*/
db.products.update({"name":"keyboard"}, {"price":99.99})
db.products.update({"name":"keyboard"}, {"name":"keyboard","price":99.99})
//si quisieramos agregar información ya existente debemos indicarle de la siguiente manera con set
db.products.update({"name": "keyboard"},{"$set": {"description":"tech"}})
//Si lo que queremos guardar no existe tambien podemos usar update de la siguiente forma insertandolo al final con upsert
db.products.update({"name":"desktop"},{"$set": {"description":"Gaming Desktop"}},{upsert:true})
//Para aumentar los precios de productos o cosas en valores numericos
db.products.update({"name":"keyboard"},{$inc: {"price":0.01}})
//Si queremos modificar el nombre de los atributos podemos renombrar
db.products.update({"name":"keyboard"},{$rename: {"name":"nombre"}})
//Si queremos eliminar documentos elegimos el metodo remove
db.products.remove({"nombre":"keyboard"})
//si queremos eliminar todos los documentos de la base de datos
db.products.remove({})