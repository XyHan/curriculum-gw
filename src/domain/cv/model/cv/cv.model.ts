export interface CVInterface {
  uuid: string;
  lastname: string;
  firstname: string;
  city: string;
  zipCode: number;
  email: string;
  birthday: string;
  nationality: string;
  githubLink: string;
  title: string;
}

export class CvModel implements CVInterface {
  private _birthday: string;
  private _city: string;
  private _email: string;
  private _firstname: string;
  private _githubLink: string;
  private _lastname: string;
  private _nationality: string;
  private _title: string;
  private _uuid: string;
  private _zipCode: number;

  get birthday(): string {
    return this._birthday;
  }

  set birthday(value: string) {
    this._birthday = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get githubLink(): string {
    return this._githubLink;
  }

  set githubLink(value: string) {
    this._githubLink = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get nationality(): string {
    return this._nationality;
  }

  set nationality(value: string) {
    this._nationality = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  get zipCode(): number {
    return this._zipCode;
  }

  set zipCode(value: number) {
    this._zipCode = value;
  }
}
