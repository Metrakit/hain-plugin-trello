# hain-plugin-trello

A [Hain](https://github.com/appetizermonster/hain) plugin for find your Tello cards.

This plugin allow you to find your cards from [Trello](http://trello.com) in Hain. 
/!\ An important step, it's to fill your private and public keys in the settings.json file.

## Install

-  Type this command in the Hain input :
```
/hpm install trello
```

- Set your private key and public key in the settings.json file from the plugins folder (on Windows : C:\Users\XX\AppData\Local\hain-user\plugins\hain-plugin-trello\settings.json).
Example :
```
{
  "public_key": "your-public-key",
  "private_key": "your-private-key"
}
```
- Then restart Hain :
```
/restart
```

## Usage

```
/trello a card
```