import { ADD_RECORD, DELETE_RECORD, CHANGE_RECORD } from './constants';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on(ADD_RECORD, this.addHostel.bind(this));
    view.on(CHANGE_RECORD, this.changeHostel.bind(this));
    view.on(DELETE_RECORD, this.deleteHostel.bind(this));

    view.showTable(model.hostels());
  }

  async addHostel(hostel) {
    const record = await this.model.addHostel(hostel);
    this.view.addRecord(record);
  }

  async changeHostel(hostel) {
    const record = await this.model.changeHostel(hostel);
    this.view.changeRecord(record);
  }

  async deleteHostel(obj) {
    const record = await this.model.deleteHostel(obj);
    this.view.deleteRecord(record);
  }
}

export default Controller;
