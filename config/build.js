import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ['./src/app.jsx'],
    bundle: true,
    publicPath:"/",
    loader: {
      ".png":"file"
    },
    sourcemap: true,
    outfile: 'dist/bundle.js',
  })
  .catch(() => process.exit(1))