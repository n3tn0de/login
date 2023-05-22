# Login
Login page demo

## Install

### Docker
```bash
docker build . -t login
```

### Node
```bash
npm i
```

## Run

### Docker
```bash
docker run -it -v $(pwd)/src:/app/src login npm start
```

### Node
```bash
npm start
```

You can access the app on <http://localhost:3000/>

To reset session token run this command in browser console
```js
localStorage.setItem('token', '')
```
