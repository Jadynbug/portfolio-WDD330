import QuakesController from './quakeController.js';
import buildNavigation from './router.js';

const navElement = document.getElementById('mainNav');
buildNavigation(navElement);

const myQuakesController = new QuakesController('#quakeList');
myQuakesController.getQuakesByRadius();
// myQuakesController.init();