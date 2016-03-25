/*jshint esversion: 6 */
/*jshint globalstrict: true */
'use strict';

const _   = require('lodash');
const Trello = require("node-trello");
const settings = require("./settings.json");
var t = new Trello(settings.public_key, settings.private_key);

module.exports = (pluginContext) => {
    const shell = pluginContext.shell;
    const logger = pluginContext.logger;
    const toast = pluginContext.toast;

    function search(query, res) {
      const query_trim = query.trim();
      if (query_trim.length === 0)
      return;

      if (settings.public_key === "" || settings.public_key == "your-public-key") {
        return res.add({
            id: 'error',
            payload: 'open',
            title: 'Public key not found',
            desc: 'You should set your public key in the settings.json file into Trello plugin package'
          });
      }
      if (settings.private_key === "" || settings.private_key == "your-private-key") {
        return res.add({
            id: 'error',
            payload: 'open',
            title: 'Private key not found',
            desc: 'You should set your private key in the settings.json file into Trello plugin package'
          });
      }

      res.add({
        id: '__temp',
        title: 'fetching...',
        desc: 'from Trello',
        icon: '#fa fa-circle-o-notch fa-spin'
      });

      t.get("/1/search?modelTypes=cards&card_fields=url,desc,name&query=" + query_trim, function(err, data) {
        res.remove('__temp');
        if (err) {
          toast.enqueue('Ooops! An error is occured with the Trello plugin.', 2500);
        }
        var cards = data.cards;
        _.take(cards, 5).map((card) => {
          res.add({
            id: card,
            payload: 'open',
            title: card.name,
            desc: card.desc,
            icon: "#fa fa-trello"
          });
        });
      });
    }

    function execute(card, payload) {
        if (payload !== 'open') {
            return;
        }
        if (card !== "error" && card !== "__temp") {
          shell.openExternal(card.url);
        }
    }

    return {search, execute};
};