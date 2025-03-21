document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("modo-toggle");
    const body = document.body;

    // Verificar si hay un modo guardado en localStorage
    if (localStorage.getItem("modo") === "oscuro") {
        body.classList.add("dark-mode");
        toggleButton.textContent = "Modo Claro";
    }

    toggleButton.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("modo", "oscuro");
            toggleButton.textContent = "Modo Claro";
        } else {
            localStorage.setItem("modo", "claro");
            toggleButton.textContent = "Modo Oscuro";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const climaTemperatura = document.getElementById("clima-temperatura");
    const climaIcon = document.getElementById("clima-icon");

    // Coordenadas de la ciudad (ejemplo: Santiago, Chile)
    const latitud = -33.4489;
    const longitud = -70.6693;

    // Función para obtener el clima
    async function obtenerClima() {
        try {
            const respuesta = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true`
            );
            const datos = await respuesta.json();

            if (datos.current_weather) {
                const temperatura = datos.current_weather.temperature;
                const codigoTiempo = datos.current_weather.weathercode;

                // Mostrar la temperatura
                climaTemperatura.textContent = `${temperatura}°C`;

                // Cambiar el ícono según el código del tiempo
                if (codigoTiempo === 0) {
                    climaIcon.textContent = "☀️"; // Soleado
                } else if (codigoTiempo > 0 && codigoTiempo <= 3) {
                    climaIcon.textContent = "🌤️"; // Parcialmente nublado
                } else if (codigoTiempo > 3 && codigoTiempo <= 9) {
                    climaIcon.textContent = "🌥️"; // Nublado
                } else if (codigoTiempo >= 10 && codigoTiempo <= 99) {
                    climaIcon.textContent = "🌧️"; // Lluvia o nieve
                }
            } else {
                climaTemperatura.textContent = "No disponible";
            }
        } catch (error) {
            console.error("Error al obtener el clima:", error);
            climaTemperatura.textContent = "Error";
        }
    }

    // Llamar a la función para obtener el clima
    obtenerClima();
});