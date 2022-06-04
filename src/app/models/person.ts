/* eslint-disable */
export class Person {
  private _bio;
  private _born;
  private _bornIn;
  private _died;
  private _imdbId;
  private _name;
  private _poster;
  private _url
  private _tmdbId;

  constructor(bio, born, bornIn, died, imdbId, name, poster, tmdbId, url) {
    this._bio = bio;
    this._born = born;
    this._bornIn = bornIn;
    this._died = died;
    this._imdbId = imdbId;
    this._name = name;
    this._poster = poster;
    this._tmdbId = tmdbId;
    this._url = url;
    }

  get bio() {
    return this._bio;
  }

  set actors(value) {
    this._bio = value;
  }

  get born() {
    return this._born;
  }

  set born(value) {
    this._born = value;
  }

  get bornIn() {
    return this._bornIn;
  }

  set bornIn(value) {
    this._bornIn = value;
  }

  get died() {
    return this._died;
  }

  set died(value) {
    this._died = value;
  }

  get imdbId() {
    return this._imdbId;
  }

  set imdbId(value) {
    this._imdbId = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get poster() {
    return this._poster;
  }

  set poster(value) {
    this._poster = value;
  }

  get tmdbId() {
    return this._tmdbId;
  }

  set tmdbId(value) {
    this._tmdbId = value;
  }

  get url() {
    return this._url;
  }

  set url(value) {
    this._url = value;
  }

}
