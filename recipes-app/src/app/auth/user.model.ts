export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  //Use a getter here so we can add code when gettin the property for checks
  //Also not allow users to change property (thats why it`s private)
  get token () {

    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
    }

    return this._token;
  }
}
