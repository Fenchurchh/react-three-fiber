 (() => new EventSource("/esbuild").onmessage = () => location.reload())();
(() => {
  // src/app.js
  console.log("HELLO WORLD 52");
})();
