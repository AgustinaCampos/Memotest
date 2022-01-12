// Se obtiene el elemento del DOM
let idPokemonInput = document.getElementById("idPokemon");
// Se asigna evento cuando se presiona una tecla
idPokemonInput.onkeydown = (e) => {
    // Se verifica que la tecla presionada es enter
    if (e.key === "Enter") {
        // Se obtiene el ID de pokemon ingresado.
        let idPokemon = idPokemonInput.value;
        // Oculto los div
        $("#infoPokemon").hide();
        $("#fotoPokemon").hide();
        // Vacio los div
        $("#infoPokemon").empty();
        $("#fotoPokemon").empty();

        // Llamada AJAX - PokeApi
        const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
        $.get(pokeApiUrl, (respuesta, estado) => {
            $("#infoPokemon").append(`<h3 class="text-capitalize">${respuesta.name}</h3>`);
            let types = respuesta.types.map(t => t.type.name);
            $("#infoPokemon").append(`<p class="text-capitalize paragraph mt-4">Types: ${types.join(', ')}</p>`);
            $("#infoPokemon").append(`<p class="paragraph mt-4"">Size: ${respuesta.height *10} cm</p>`);
            $("#infoPokemon").append(`<p class="paragraph mt-4"">Weight: ${respuesta.weight /10} kg</p>`);
            $("#fotoPokemon").append(`<img style="width: 250px" src="https://cdn.traction.one/pokedex/pokemon/${idPokemon}.png" alt="Foto no encontrada">`)
        });
        // Muestro nuevamente los div
        $("#infoPokemon").fadeIn();
        $("#fotoPokemon").fadeIn();
    }
};