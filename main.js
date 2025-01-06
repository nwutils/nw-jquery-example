// Add button to page
$('body').append('<button id="openDevTools">Show DevTools</button>');
// When you click the button, it open's the Chromium Dev Tools
$('#openDevTools').click(function () {
  nw.Window.get().showDevTools();
});

// Add a button and output zone to the page
$('body').append('<button id="showDir">Read Files</button>');
$('body').append('<div><output id="contents"></output></div>');
// When you click the button, use the file system to read the contents
// of the current directory and list them in the output on the page.
$('#showDir').click(function () {
  const fs = require('fs');
  const data = fs.readdirSync('.');
  $('#contents').html(data.join('<br>'));
});

// Add a link to the page that should open externally. Use the "external-link" class to identify these.
$('body').append('<div><a href="https://nwjs.io" class="external-link">Open link in default browser</a>');

// Add a title attribute to all eternal links so when you hover them, it shows you the URL
$('.external-link').each(function (index, link) {
  const url = $(link).attr('href');
  const title = $(link).attr('title');
  if (url && !title) {
    // { href: 'https://nwjs.io/a?b=c', protocol: 'https:' }
    const parsed = require('url').parse(url);
    // 'nwjs.io/a?b=c'
    let readableUrl = parsed.href.replace(parsed.protocol + '//', '');
    if (readableUrl.endsWith('/')) {
      // 'nwjs.io/' => 'nwjs.io'
      readableUrl = readableUrl.slice(0, readableUrl.length - 1);
    }
    $(link).attr('title', readableUrl);
  }
});

// When you click on anything with a class of "external-link", prevent navigating to the url
// in the desktop app, and instead open the link in the user's default browser.
$('.external-link').click(function (evt) {
  evt.preventDefault();
  const url = $(this).attr('href');
  if (url) {
    nw.Shell.openExternal(url);
  }
});
