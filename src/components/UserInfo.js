export class UserInfo {
  constructor(nameSelector, profiSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._profi = document.querySelector(profiSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      about: this._profi.textContent,
      avatar: this._avatar.src,
    };
    return data;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._profi.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
