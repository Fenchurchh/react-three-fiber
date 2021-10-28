 (() => new EventSource("/esbuild").onmessage = () => location.reload())();
(() => {
  // src/app.jsx
  console.log("HELLO WORLD 52");
})();
