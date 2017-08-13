const app_dropdown = function() {
  let btn = document.getElementById('menu-button');
  let menu = document.getElementById('menu-container');
  let mask = document.getElementById('mask');

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    menu.classList.toggle('is-active');
    mask.classList.toggle('is-active');
  });

  mask.addEventListener('click', function(e) {
    e.preventDefault();
    menu.classList.toggle('is-active');
    mask.classList.toggle('is-active');
  });
};

document.addEventListener('DOMContentLoaded', app_dropdown);
