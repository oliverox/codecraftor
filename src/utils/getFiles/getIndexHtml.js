export default ({ projectTitle = 'App made with Codecraftor' }) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <link rel="favicon" href="%PUBLIC_URL%/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
  <title>${projectTitle}</title>
</head>

<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root" class="root"></div>
</body>

</html>`;
