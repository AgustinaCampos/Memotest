// Traigo el nombre y lo uso para el titulo
let nombreIngresado = localStorage.getItem("nombreUsuario");

let tituloMemotest = document.getElementById("tituloMemotest");
if (tituloMemotest) {
    tituloMemotest.className = "title";
    tituloMemotest.innerHTML = `Hola ${nombreIngresado}`;
}

// Array con las imagenes
let imagenes = [
    './img/bulbasaur.jpg',
    './img/Pikachu.jpg',
    './img/Hitmonlee.jpg',
    './img/charizard.jpg',
    './img/Squirtle.jpg',
    './img/Togepi.jpg',
]

// Declaración de variables
let choice1 = "";
let choice2 = "";
let contadorIntento = 0;
let idImageChoice1 = "";
let idImageChoice2 = "";
const maxIntentos = 6;

// Funciones

function click_carta(indiceImagen, fila){
    // FUNCIÓN QUE ASIGNA UN VALOR A LAS VARIABLES CHOICE1 Y CHOICE2 SEGÚN LO QUE SE CLICKEA
    // Y SE DESCUBREN LAS IMÁGENES REALES.
    const idImagen = `#${fila}-${indiceImagen}`;
    // SE DETIENE LA EJECUCIÓN DE LA FUNCION SI LA CARTA SELECCIONADA YA TIENE SU PAREJA ASIGNADA.
    if ($(idImagen).hasClass("borderImage")){
        return
    }
    if (!choice1){
        choice1 = cartas[indiceImagen];
        idImageChoice1 = idImagen;
        // SE REVELA LA IMAGEN REAL.
        $(idImageChoice1).attr("src", choice1);
        $(idImageChoice1).hide();
        $(idImageChoice1).fadeIn();
    } else {
        // SE EVITA QUE SE SELECCIONE DOS VECES LA MISMA CARTA.
        if (idImageChoice1 === idImagen){
            return
        }
        choice2 = cartas[indiceImagen];
        idImageChoice2 = idImagen;
        // SE REVELA LA IMAGEN REAL.
        $(idImageChoice2).attr("src", choice2);
        // SE VERIFICAN LAS CARTAS SELECCIONADAS
        check_choices();
    }
}

function check_choices(){
    // FUNCION QUE COMPRUEBA SI LAS CARTAS ELEGIDAS SON IGUALES.
    if (choice1 === choice2){
        // SE AGREGA UN BORDE VERDE A LAS IMAGENES QUE SEAN IGUALES.
        $(idImageChoice1).addClass("borderImage");
        $(idImageChoice2).addClass("borderImage");
        // SE VERIFICA SI SE COMPLETÓ EL JUEGO
        check_juego_completo();
    } else {
        // SE OCULTAN LAS IMAGENES ELEGIDAS QUE NO SON IGUALES.
        $(idImageChoice1).fadeOut();
        $(idImageChoice2).fadeOut();
        setTimeout(() => {
            $(idImageChoice1).attr("src", "./img/question_mark.png");
            $(idImageChoice2).attr("src", "./img/question_mark.png");
            $(idImageChoice1).show();
            $(idImageChoice2).show();
        }, 450);
        // SE VERIFICA LA CANTIDAD DE INTENTOS PERMITIDOS
        check_intentos();
    }
    // SE VACIAN LAS VARIABLES PARA VOLVER A ELEGIR DOS CARTAS.
    choice1 = "";
    choice2 = "";
}

function check_intentos(){
    // SE CUENTAN LOS INTENTOS, SE PONE UN FIN SI LLEGA A MAX INTENTOS Y PODES VOLVER A JUGAR.
    contadorIntento++;
    // ACTUALIZO EN EL DOM LA CANTIDAD DE INTENTOS
    $('#intentos').html(contadorIntento);
    // SE MUESTRA UN MODAL SI LLEGAMOS AL MÁXIMO
    if(contadorIntento === maxIntentos){
        var modalLose = new bootstrap.Modal(document.getElementById("modalLose"), {
            backdrop: "static", 
            keyboard: false,
        })
        modalLose.show();
    }
}

function check_juego_completo(){
    // SE CHEQUEA QUE TODAS LAS IMÁGENES ESTÉN ACERTADAS, AVISA QUE GANASTE Y PODES VOLVER A JUGAR.
    const cartasAcertadas = document.getElementsByClassName("borderImage");
    // SE MUESTRA UN MODAL SI COMPLETAMOS TODAS LAS CARTAS
    if (cartasAcertadas.length === 12){
        var modalWin = new bootstrap.Modal(document.getElementById("modalWin"), {
            backdrop: "static", 
            keyboard: false,
        })
        modalWin.show();
    }
}

function mezclar_cartas(array) {
    // MEZCLAR LAS CARTAS DE FORMA ALEATORIA (SOLUCIÓN TOMADA DE STACKOVERFLOW)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// SE MEZCLAN LAS CARTAS PARA AGREGARLAS AL HTML
const cartas = mezclar_cartas(imagenes.concat(imagenes));
let indices_utilizados = [];

// SE AGREGAN LAS IMÁGENES AL HTML
for (let fila = 0; fila <= 2; fila++) {
    // SE TOMAN DE A 4 CARTAS SEGÚN NÚMERO DE FILA PARA MOSTRARLAS
    const cartasFila = cartas.slice(fila*4, fila*4 +4);
    // SE ITERA ESE NUEVO ARRAY
    for (let i = 0; i < cartasFila.length; i++) {
        // SE BUSCA EL INDICE DE ESA IMAGEN EN EL ARRAY DE CARTAS ORIGINAL
        let imgIndex = cartas.indexOf(cartasFila[i]);
        // SI EL INDICE YA FUE UTILIZADO EN LA MISMA FILA, NOS DUPLICARÁ EL ID ENTONCES
        // BUSCAMOS EL SIGUIENTE, ASÍ AMBAS SE PODRÁN CLICKEAR.
        if (indices_utilizados.includes(imgIndex)){
            imgIndex = cartas.indexOf(cartasFila[i], imgIndex + 1);
        }
        indices_utilizados.push(imgIndex);
        $(`#fila${fila}`).append(`<div class='col-3'><img onclick="click_carta(${imgIndex}, ${fila})" id="${fila}-${imgIndex}" style="height: 150px; margin-right: 20px;" src="./img/question_mark.png" alt=""></div>`)
    }
}
