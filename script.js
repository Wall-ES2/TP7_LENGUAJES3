document.addEventListener("DOMContentLoaded", () => {
    const btnBuscar = document.getElementById("btnBuscar");
    const inputBusqueda = document.getElementById("busqueda");
    const divResultado = document.getElementById("resultado");

    btnBuscar.addEventListener("click", () => {
        const valor = inputBusqueda.value.trim();

        if (valor === "") {
            mostrarMensaje("Por favor, ingresá un nombre o un ID", "⚠️");
            return;
        }

        let urlAPI = "";
        
        if (!isNaN(valor)) {
            urlAPI = `https://rickandmortyapi.com/api/character/${valor}`;
        } else {
            urlAPI = `https://rickandmortyapi.com/api/character/?name=${valor}`;
        }

        fetch(urlAPI)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Personaje no encontrado");
                }
                return response.json();
            })
            .then(data => {
                let personajeEncontrado;

                if (data.results && data.results.length > 0) {
                    personajeEncontrado = data.results[0];
                } else {
                    personajeEncontrado = data;
                }

                renderizarCard(personajeEncontrado);
            })
            .catch(error => {
                mostrarMensaje("Personaje no encontrado", "👽");
            });
    });

    function renderizarCard(personaje) {
        let claseEstado = "unknown";
        if (personaje.status === "Alive") {
            claseEstado = "alive";
        } else if (personaje.status === "Dead") {
            claseEstado = "dead";
        }

        divResultado.innerHTML = `
            <div class="personaje-card ${claseEstado}">
                <img src="${personaje.image}" alt="${personaje.name}" class="card-img-personaje">
                <div class="card-body-rm">
                    <h2 class="card-nombre">${personaje.name}</h2>
                    
                    <div class="badge-estado badge-${claseEstado} mb-3">
                        ${personaje.status}
                    </div>
                    
                    <div class="info-row">
                        <div class="info-label">Especie</div>
                        <div class="info-value">${personaje.species}</div>
                    </div>
                    
                    <div class="info-row">
                        <div class="info-label">Última ubicación conocida</div>
                        <div class="info-value">${personaje.location.name}</div>
                    </div>
                </div>
            </div>
        `;
    }

    function mostrarMensaje(texto, icono) {
        divResultado.innerHTML = `
            <div class="msg-box">
                <span class="msg-icon">${icono}</span>
                <span class="msg-texto">${texto}</span>
            </div>
        `;
    }
});