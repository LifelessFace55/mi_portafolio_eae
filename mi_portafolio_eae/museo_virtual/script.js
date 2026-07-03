document.addEventListener("DOMContentLoaded", () => {
    
    
    // 1. CONTROLADORES AUTOMÁTICOS 3D PARA LOS CARRUSELES
    
    const containers = document.querySelectorAll(".carousel-container");

    containers.forEach(container => {
        const cards = container.querySelectorAll(".card");
        const prevBtn = container.querySelector(".prev");
        const nextBtn = container.querySelector(".next");
        let currentIndex = 0; // Índice de la tarjeta central en esta sección

        // Función encargada de asignar las clases matemáticas a cada tarjeta
        function updateCarousel() {
            cards.forEach((card, index) => {
                card.className = "card"; // Limpia las posiciones anteriores

                if (index === currentIndex) {
                    card.classList.add("active"); // Al centro
                } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                    card.classList.add("prev-shadow"); // A la izquierda inclinado
                } else if (index === (currentIndex + 1) % cards.length) {
                    card.classList.add("next-shadow"); // A la derecha inclinado
                } else if (index < currentIndex) {
                    card.classList.add("far-prev"); // Escondido a la izquierda profunda
                } else {
                    card.classList.add("far-next"); // Escondido a la derecha profunda
                }
            });
        }

        // Listener para girar hacia adelante
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        });

        // Listener para girar hacia atrás
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        });

        // Dispara la colocación inicial al abrir la página
        updateCarousel();
    });

    // 2. SISTEMA DE ESTRELLAS INTERACTIVO Y FORMULARIO
    
    const stars = document.querySelectorAll(".star-btn");
    const ratingMessage = document.getElementById("ratingMessage");
    const starInput = document.getElementById("starInput");
    let selectedRating = 0;

    stars.forEach(star => {
        // Al hacer click, fija la calificación
        star.addEventListener("click", (e) => {
            selectedRating = parseInt(e.target.getAttribute("data-value"));
            starInput.value = selectedRating; // Pasa el valor numérico al campo de envío
            highlightStars(selectedRating);
            
            // Textos cambiantes de estado
            const messages = {
                1: "No me gustó (1/5)",
                2: "Puede mejorar (2/5)",
                3: "Aceptable y bien (3/5)",
                4: "¡Muy bonito trabajo! (4/5)",
                5: "¡Excelente portafolio! (5/5)"
            };
            ratingMessage.textContent = messages[selectedRating];
            ratingMessage.style.color = "#ffd700";
        });

        // Al pasar el mouse por encima genera un efecto temporal
        star.addEventListener("mouseover", (e) => {
            const hoverValue = parseInt(e.target.getAttribute("data-value"));
            highlightStars(hoverValue);
        });
    });

    // Si retira el mouse, vuelve a brillar solo lo que se dio click real
    document.getElementById("starRating").addEventListener("mouseleave", () => {
        highlightStars(selectedRating);
    });

    // Función auxiliar para pintar las estrellas de dorado
    function highlightStars(value) {
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute("data-value"));
            if (starValue <= value) {
                star.classList.remove("fa-regular");
                star.classList.add("fa-solid", "active");
            } else {
                star.classList.remove("fa-solid", "active");
                star.classList.add("fa-regular");
            }
        });
    }
});