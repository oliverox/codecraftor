export default ({projectTitle = 'Codecraftor'}) => `
{
  "short_name": "${projectTitle}",
  "name": "Codecraftor - craft your React app visually",
  "icons": [
    {
      "src": "favicon.png",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/png"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}`;