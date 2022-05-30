export class UserInfo {
  constructor({ nameSelector, profiSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._profiSelector = document.querySelector(profiSelector);
  }

  getUserInfo() {
    const data = {
      name: this._nameSelector.textContent,
      profi: this._profiSelector.textContent,
    };

    return data;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._profiSelector.textContent = data.profi;
  }
}
