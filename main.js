(function() {
  class PeekJWT {
    constructor() {
      this.bindEvent();
    }
    
    bindEvent() {
      const peek = this.peek.bind(this);
      window.addEventListener('mouseup', function(e) {
        const selected = window.getSelection().toString();
        if (selected.length == 0) {
          return;
        }
        peek(selected);
      }, false);
    }

    peek(str) {
      const decoded = this._decodeJWT(str);
      if (decoded === null) {
        console.log("not valid jwt: " + str);
        return;
      }

      const header = decoded[0];
      const payload = decoded[1];

      console.log("header: " + JSON.stringify(header, null, 2));
      console.log("payload: " + JSON.stringify(payload, null, 2));
    }

    _decodeJWT(str) {
      const splited = str.split('.');
      if (splited.length != 3) {
        return null;
      }
      const header = splited[0];
      const payload = splited[1];
      const _sig = splited[2];

      try {
        const decodedHeader = window.atob(header.replace('-', '+').replace('_', '/'));
        const decodedPayload = window.atob(payload.replace('-', '+').replace('_', '/'));
        return [JSON.parse(decodedHeader), JSON.parse(decodedPayload)];
      } catch (err) {
        return null;
      }
    }
  }

  new PeekJWT();
}());
