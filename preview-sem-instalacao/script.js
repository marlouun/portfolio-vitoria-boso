const menuButton = document.querySelector('#menuButton');
const navLinks = document.querySelector('#navLinks');
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();

menuButton.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
