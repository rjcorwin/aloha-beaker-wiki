Aloha.ready( function() {
    Aloha.jQuery('#content').aloha();
});

var selfArchive = new DatArchive('' + window.location)
var state = (document.getElementById('content')).outerHTML
// Counter for the number of state changes thus commits.
var i = 0
async function saveIt() {
  // Check if state is stale.
  if (state !== (document.getElementById('content')).outerHTML) {
    state = (document.getElementById('content')).outerHTML
    await selfArchive.writeFile('/index.html', docTop + state + docBottom, 'utf8')
    console.log('write')
    await selfArchive.commit()
    console.log('commit')
    i++
    console.log(i)
  }
  // Debounce as to not overload network on very fast key strokes.
  // setTimeout(saveIt, 500)
}
setInterval(saveIt, 5000)

// Templates
var docTop = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <title>Getting Started with Aloha Editor</title>
      <link rel="stylesheet" href="index.css" type="text/css">
      <!-- Load Aloha Editor css and js -->
      <link rel="stylesheet" href="/javascripts/aloha/css/aloha-common-extra.css" type="text/css">
      <link rel="stylesheet" href="/javascripts/aloha/css/aloha-core.css" type="text/css">
      <link rel="stylesheet" href="/javascripts/aloha/css/aloha-reset.css" type="text/css">
      <link rel="stylesheet" href="/javascripts/aloha/css/aloha-sidebar.css" type="text/css">
      <script src="/javascripts/aloha/lib/require.js"></script>
      <script src="/javascripts/aloha/lib/aloha.js"
        data-aloha-plugins="common/ui,common/format,common/highlighteditables,common/link"></script>
  </head>
  <body>
`;

var docBottom = `
  <script src="/editor.js"></script>
  </body>
  </html>
`;
