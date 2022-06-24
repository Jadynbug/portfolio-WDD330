import QuakesController from './team/QuakeController.js';
import buildNavigation from './routing.js';

const navElement = document.getElementById('mainNav');
buildNavigation(navElement);

const myQuakesController = new QuakesController('#quakeList');
myQuakesController.getQuakesByRadius();
