export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameNode = document.querySelector(nameSelector);
    this.aboutNode = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._nameNode.textContent,
      about: this._aboutNode.textContent,
    };
  }
  SetUserInfo(name, about) {
    this.this._nameNode.textContent = name;
    this._aboutNode.textContent = about;
  }
}
