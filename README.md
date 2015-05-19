# Request and download files

Basic app to download all links in a json file

***Recursiveness***

![Using Recursiveness](http://img-9gag-fun.9cache.com/photo/aG9Qyp5_700b.jpg)

### How it work's

First things first, install dependencies:

```
npm install
```

And now, you can start passing files for the app, like that:

```
node app.js <path-to-your-json-file>.json
```

### The JSON file

The json file need to have this structure:

```
[{
  "url": "http://upload.wikimedia.org/wikipedia/commons/b/ba/Brown_Tree_Frog_2.jpg",
  "name": "Awesome frog"
},
{
  "url": "http://upload.wikimedia.org/wikipedia/en/7/70/Example.png",
  "name": "My Picture"
}]
```
***ps: you can put any kind of media, just need to absolute path***

From the json above, the downloaded files will be:

```
00-Awesome-frog.jpg
01-My-Pricture.png
```
