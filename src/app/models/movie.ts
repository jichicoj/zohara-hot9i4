/* eslint-disable */
export class Movie {
  private _actors;
  private _budget;
  private _genres;
  private _directors;
  private _countries;
  private _favorite;
  private _imdbId;
  private _imdbRating;
  private _imdbVotes;
  private _languages;
  private _movieId;
  private _plot;
  private _poster;
  private _released;
  private _revenue;
  private _runtime;
  private _title;
  private _tmdbId;
  private _url;
  private _year;

  constructor(actors, budget, genres, directors, countries, favorite, imdbId, imdbRating, imdbVotes, languages, movieId, plot, poster, released, revenue, runtime, title, tmdbId, url, year) {
    this._actors = actors;
    this._budget = budget;
    this._genres = genres;
    this._directors = directors;
    this._countries = countries;
    this._favorite = favorite;
    this._imdbId = imdbId;
    this._imdbRating = imdbRating;
    this._imdbVotes = imdbVotes;
    this._languages = languages;
    this._movieId = movieId;
    this._plot = plot;
    this._poster = poster;
    this._released = released;
    this._revenue = revenue;
    this._runtime = runtime;
    this._title = title;
    this._tmdbId = tmdbId;
    this._url = url;
    this._year = year;
  }

  get actors() {
    return this._actors;
  }

  set actors(value) {
    this._actors = value;
  }

  get budget() {
    return this._budget;
  }

  set budget(value) {
    this._budget = value;
  }

  get genres() {
    return this._genres;
  }

  set genres(value) {
    this._genres = value;
  }

  get directors() {
    return this._directors;
  }

  set directors(value) {
    this._directors = value;
  }

  get countries() {
    return this._countries;
  }

  set countries(value) {
    this._countries = value;
  }

  get favorite() {
    return this._favorite;
  }

  set favorite(value) {
    this._favorite = value;
  }

  get imdbId() {
    return this._imdbId;
  }

  set imdbId(value) {
    this._imdbId = value;
  }

  get imdbRating() {
    return this._imdbRating;
  }

  set imdbRating(value) {
    this._imdbRating = value;
  }

  get imdbVotes() {
    return this._imdbVotes;
  }

  set imdbVotes(value) {
    this._imdbVotes = value;
  }

  get languages() {
    return this._languages;
  }

  set languages(value) {
    this._languages = value;
  }

  get movieId() {
    return this._movieId;
  }

  set movieId(value) {
    this._movieId = value;
  }

  get plot() {
    return this._plot;
  }

  set plot(value) {
    this._plot = value;
  }

  get poster() {
    return this._poster;
  }

  set poster(value) {
    this._poster = value;
  }

  get released() {
    return this._released;
  }

  set released(value) {
    this._released = value;
  }

  get revenue() {
    return this._revenue;
  }

  set revenue(value) {
    this._revenue = value;
  }

  get runtime() {
    return this._runtime;
  }

  set runtime(value) {
    this._runtime = value;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
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

  get year() {
    return this._year;
  }

  set year(value) {
    this._year = value;
  }
}
