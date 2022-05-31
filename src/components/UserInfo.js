export class UserInfo {
  constructor({ nameSelector, profiSelector }) {
    this._name = document.querySelector(nameSelector);
    this._profi = document.querySelector(profiSelector);
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      profi: this._profi.textContent,
    };

    return data;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._profi.textContent = data.profi;
  }
}
