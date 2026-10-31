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