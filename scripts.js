// SE OBTIENE EL NOMBRE DEL JUGADOR
let nameInput = document.getElementById("nombre");
// SE ASIGNA EVENTO CUANDO SE PRESIONA UNA TECLA
nameInput.onkeydown = (e) => {
    // SE VERIFICA QUE LA TECLA PRESIONADA ES ENTER
    if (e.key === "Enter") {
        // Se obtiene el nombre ingresado y se valida que sólo haya letras
        let nombreIngresado = nameInput.value;
        var validate = /^[A-Za-z]+$/;
        if(!validate.test(nombreIngresado)){
            return
        }
        // Se almacena en el localStorage
        localStorage.setItem('nombreUsuario', nombreIngresado);
        // Se reemplaza input por un p que incluye el nombre ingresado
        let labelBienvenida = document.createElement("p");
        labelBienvenida.className = "paragraph";
        labelBienvenida.innerHTML = `Hola ${nombreIngresado} podes jugar al memotest o aprender sobre pokemones con la Pokedex. Elegi lo que prefieras`;
        let mainDiv = document.getElementById("mainDiv");
        mainDiv.insertBefore(labelBienvenida, mainDiv.firstChild);
        // Se elimina el input
        mainDiv.removeChild(nameInput);
    }
};
