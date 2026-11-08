// Navigation mobile — breakpoint cohérent avec style.css (800 px)
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  const closeMenu = () => {
    menuButton.classList.remove('active');
    navLinks.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuButton.classList.toggle('active', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.navbar')) closeMenu(); });
  const mq = window.matchMedia('(min-width: 801px)');
  mq.addEventListener('change', event => { if (event.matches) closeMenu(); });
}
/* Révélation des cartes au premier toucher */
document.querySelectorAll('.theme-card.theme-card-image').forEach(card => {
    card.addEventListener('click', function (event) {
        if (!window.matchMedia('(hover: none)').matches) return;

        if (!card.classList.contains('is-revealed')) {
            event.preventDefault();

            document.querySelectorAll('.theme-card.is-revealed')
                .forEach(other => {
                    if (other !== card) other.classList.remove('is-revealed');
                });

            card.classList.add('is-revealed');
        }
    });
});
/* =========================================
   CARTE DU MONDE — POPUP INTERACTIVE
   ========================================= */

(() => {
    const countryData = {
        france: {
            title: "FRANCE",
            description: "Films d'entreprise, événementiel, sport et productions audiovisuelles sur mesure."
        },
        australie: {
            title: "AUSTRALIE",
            description: "Productions sportives et aventures au cœur des grands espaces australiens."
        },
        mongolie: {
            title: "MONGOLIE",
            description: "Documentaires et captation d'expéditions en pleine nature."
        },
        bolivie: {
            title: "BOLIVIE",
            description: "Captation de courses d'ultra-endurance dans les paysages de l'Altiplano."
        },
        canada: {
            title: "CANADA",
            description: "Création de contenus outdoor et exploration de territoires sauvages."
        },
        usa: {
            title: "ÉTATS-UNIS",
            description: "Projets sportifs et récits d'aventure autour de l'endurance."
        },
        suisse: {
            title: "SUISSE",
            description: "Productions audiovisuelles et contenus en environnement alpin."
        }
    };

    const popup = document.getElementById("map-popup");
    const map = document.querySelector(".map-wrapper");

    if (!popup || !map) return;

    const title = document.getElementById("map-popup-title");
    const description = document.getElementById("map-popup-description");
    const closeButton = popup.querySelector(".map-popup-close");

    let previousPin = null;

    function closePopup() {
        popup.hidden = true;

        if (previousPin) {
            previousPin.focus({ preventScroll: true });
            previousPin = null;
        }
    }

    map.querySelectorAll(".map-pin").forEach(pin => {
        pin.addEventListener("click", () => {
            const country = countryData[pin.dataset.country];
            if (!country) return;

            title.textContent = country.title;
            description.textContent = country.description;

            previousPin = pin;

            // Relancer l'animation à chaque ouverture
            popup.hidden = true;
            void popup.offsetWidth;
            popup.hidden = false;

            closeButton.focus({ preventScroll: true });
        });
    });

    closeButton.addEventListener("click", closePopup);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !popup.hidden) {
            closePopup();
        }
    });

    document.addEventListener("pointerdown", event => {
        if (
            !popup.hidden &&
            !popup.contains(event.target) &&
            !event.target.closest(".map-pin")
        ) {
            closePopup();
        }
    });
})();

/* Réseaux sociaux flottants */
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".site-footer");
    const footerSocials = footer?.querySelector(".footer-socials");

    if (!footer || !footerSocials) return;

    // Copier les icônes du footer
    const floatingSocials = footerSocials.cloneNode(true);
    floatingSocials.classList.remove("footer-socials");
    floatingSocials.classList.add("floating-socials");
    floatingSocials.setAttribute("aria-label", "Nos réseaux sociaux");

    document.body.appendChild(floatingSocials);

    // Les masquer lorsque le footer devient visible
    const observer = new IntersectionObserver(
        (entries) => {
            const footerVisible = entries[0].isIntersecting;

            floatingSocials.classList.toggle(
                "is-hidden",
                footerVisible
            );

            floatingSocials.inert = footerVisible;
            floatingSocials.setAttribute(
                "aria-hidden",
                String(footerVisible)
            );
        },
        {
            threshold: 0
        }
    );

    observer.observe(footer);
});
