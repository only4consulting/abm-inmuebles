import 'dotenv/config';
import firebase from 'firebase';
import shuffle from 'shuffle-array';

//Configurar con los datos de firebase
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

//Inicializar la app
firebase.initializeApp(config);

//Crear la referencia a la base de datos
const db = firebase.firestore();

const leerInmobiliarias = async () => {

  let arrInmobiliarias = [];

  try {
    //Leer datos de las inmobiliarias
    const inmobiliarias = await db.collection('inmobiliarias').get();

    inmobiliarias.docs.map(doc => {
      arrInmobiliarias.push(doc.data());
    });

  } catch (error) {
    console.log("Error: ", error.message);
  }

  console.log("Inmos: ", arrInmobiliarias);

}

const leerInmuebles = async () => {

  let arrInmuebles = [];

  try {
    //Leer inmuebles
    const inmuebles = await db.collection('inmuebles').get();

    inmuebles.docs.map(doc => {
      arrInmuebles.push(doc.data());
    });

  } catch (error) {
    console.log("Error: ", error.message);
  }

  console.log("Inmuebles: ", arrInmuebles);

}

const agregarInmobiliaria = async (direccion, logo, nombre) => {

  try {

    const inmoData = {
      ciudad: 'San Nicolás',
      cp: 2900,
      direccion: direccion,
      horario: '07:30 A 12:30 / 17:30 A 20:30',
      logo: logo,
      mail: 'inmobiliaria@mail.com.ar',
      movil: '0336-154435465',
      nombre: nombre,
      telefono: '0336-4434373',
      web: 'https://www.cristiandelasota.com.ar'
    };

    try {

      //Agregardocumento
      const doc = await db.collection('inmobiliarias').add(inmoData);

      console.log("Se agregó el documento", doc.id);

    } catch (error) {
      console.log("Error: ", error.message);
    }

  } catch (error) {
    console.log("Error: ", error.message);
  }

}

const agregarInmueble = async (apta_credito, banos, cochera, comedor, comedor_diario, descripcion, direccion, dormitorios, living, operacion, moneda, precio, tipo) => {

  try {

    const fechaExpira = new Date();
    fechaExpira.setDate(fechaExpira.getDate() + 60);
    const fechaHoy = new Date();

    const inmuebleData = {
      apta_credito: apta_credito,
      banos: banos,
      ciudad: 'San Nicolás',
      cochera: cochera,
      comedor: comedor,
      comedor_diario: comedor_diario,
      descripcion: descripcion,
      destacado: true,
      direccion: direccion,
      dormitorios: dormitorios,
      fecha_alta: fechaHoy,
      fecha_expira: fechaExpira,
      imagenes:
        shuffle(['https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/propiedades%2Frental1.jpeg?alt=media',
          'https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/propiedades%2Frental2.jpeg?alt=media',
          'https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/propiedades%2Frental3.jpeg?alt=media',
          'https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/propiedades%2Frental4.jpeg?alt=media',
          'https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/propiedades%2Frental5.jpeg?alt=media']),
      inmobiliaria: '3buXDuLvI2e65A5TCvAn',
      inmobiliaria_nombre: 'Staiger',
      living: living,
      moneda: moneda,
      operacion: operacion,
      precio: precio,
      provincia: 'Buenos Aires',
      superficie: 200,
      tipo: tipo,
      visitas: 2
    };

    try {

      //Agregardocumento
      const doc = await db.collection('inmuebles').add(inmuebleData);

      console.log("Se agregó el documento", doc.id);

    } catch (error) {
      console.log("Error: ", error.message);
    }

  } catch (error) {
    console.log("Error: ", error.message);
  }

}

//Leer todas las inmobiliarias
/*
leerInmobiliarias();
*/

//Agregar una inmobiliaria
/*
agregarInmobiliaria("Calle falsa 1", "https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/logos%2Fthumbimg_pr_000463.jpg", "Heidel de Peralta");
agregarInmobiliaria("Calle falsa 2", "https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/logos%2Fthumbimg_pr_000465.jpg", "FAM");
agregarInmobiliaria("Calle falsa 3", "https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/logos%2Fthumbimg_pr_000468.jpg", "Lagama");
agregarInmobiliaria("Calle falsa 4", "https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/logos%2Fthumbimg_pr_000472.jpg", "Ganduglia");
agregarInmobiliaria("Calle falsa 5", "https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/logos%2Fthumbimg_pr_000476.jpg", "Yosel Cartey");
agregarInmobiliaria("Calle falsa 6", "https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/logos%2Fthumbimg_pr_000481.jpg", "Mariano Heymo");
agregarInmobiliaria("Calle falsa 7", "https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/logos%2Fthumbimg_pr_000494.jpg", "Staiger");
agregarInmobiliaria("Calle falsa 8", "https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/logos%2Fthumbimg_pr_000498jpg", "Puyella");
agregarInmobiliaria("Calle falsa 9", "https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/logos%2Fthumbimg_pr_000501.jpg", "Fincas");
agregarInmobiliaria("Calle falsa 0", "https://firebasestorage.googleapis.com/v0/b/inmuebles-be7c2.appspot.com/o/logos%2Fthumbimg_pr_000507.jpg", "Hugo Largo/María Dávila");
*/

//Leer todas las propiedades
/*
leerInmuebles();
*/

//Agregar inmueble
//agregarInmueble(apta_credito, banos, cochera, comedor, comedor_diario, descripcion, direccion, dormitorios, living, operacion, moneda, precio, tipo)
agregarInmueble(false, 0, 0, false, false, "Terreno 10x63", "Caracas 281", 2, true, "venta", "Dólares", 128000, 'terreno');
agregarInmueble(false, 0, 0, false, false, "Lote 10x20 barrio Güemes", "25 este 989", 3, true, "venta", "Dólares", 75000, 'terreno');
agregarInmueble(false, 0, 0, false, false, "Lote B° Parque Samiento", 2, true, "venta", "Dólares", 14000, 'terreno');
agregarInmueble(false, 0, 0, false, false, "Terreno en L 10 termina en 25x30", "25 este 989", 1, true, "venta", "Dólares", 99000, 'terreno');

agregarInmueble(true, 2, 1, true, true, "Deparamento 4 piso a la calle", "Caracas 281", 2, true, "venta", "Dólares", 128000, 'departamento');
agregarInmueble(false, 1, 0, false, true, "Dpto. a estrenar costanera", "25 este 989", 3, true, "venta", "Dólares", 75000, 'departamento');
agregarInmueble(true, 2, 1, true, true, "Dpto. interno", "Boer 489", 2, true, "venta", "Dólares", 14000, 'departamento');
agregarInmueble(true, 1, 0, true, true, "Duplex barrio Don Bosco", "25 este 989", 1, true, "venta", "Dólares", 99000, 'duplex');

agregarInmueble(true, 2, 1, true, true, "Deparamento interno con cochera", "Caracas 281", 2, true, "alquiler", "Pesos", 12000, 'departamento');
agregarInmueble(false, 1, 0, false, true, "Dpto. 3 habitaciones", "25 este 989", 3, true, "alquiler", "Pesos", 13000, 'departamento');
agregarInmueble(true, 2, 1, true, true, "Duplex nuevo a partir de marzo", "Boer 489", 2, true, "alquiler", "Pesos", 14000, 'duplex');
agregarInmueble(true, 1, 0, true, true, "Alquilo triplex", "25 este 989", 1, true, "alquiler", "Pesos", 11000, 'duplex');

agregarInmueble(true, 2, 1, true, true, "Hermosa casa nueva en venta", "Caracas 281", 2, true, "venta", "Dólares", 128000, 'casa');
agregarInmueble(false, 1, 0, false, true, "Casa a reciclar en B° Somisa", "25 este 989", 3, true, "venta", "Dólares", 75000, 'casa');
agregarInmueble(true, 2, 1, true, true, "Casa a estrenar en B° San Isidro", "Boer 489", 2, true, "venta", "Dólares", 14000, 'casa');
agregarInmueble(true, 1, 0, true, true, "Casa a reciclar en B° Somisa", "25 este 989", 1, true, "venta", "Dólares", 99000, 'casa');

agregarInmueble(true, 2, 1, true, true, "Casa en alquiler fines de marzo", "Caracas 281", 2, true, "alquiler", "Pesos", 12000, 'casa');
agregarInmueble(false, 1, 0, false, true, "Alquilo casa barrio Oest", "25 este 989", 3, true, "alquiler", "Pesos", 13000, 'casa');
agregarInmueble(true, 2, 1, true, true, "Alquilo casa 2 dormitorios y cochera", "Boer 489", 2, true, "alquiler", "Pesos", 14000, 'casa');
agregarInmueble(true, 1, 0, true, true, "Casa con patio y quincho", "25 este 989", 1, true, "alquiler", "Pesos", 11000, 'casa');