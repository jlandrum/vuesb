export default class Icon {
  static MENU = new Icon('menu', 'ellipses');

  constructor(public readonly label: string, public readonly klass: string) {}
};

