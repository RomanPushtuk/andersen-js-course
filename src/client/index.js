import './styles.css';
import View from './mvc/View';
import Controller from './mvc/Controller';
import Model from './mvc/Model';

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
