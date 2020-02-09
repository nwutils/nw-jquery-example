$('body').append('<button id="openDevTools">Show DevTools</button>');

$('#openDevTools').click(function () {
  nw.Window.get().showDevTools();
});



$('body').append('<button id="showDir">Read Files</button>');
$('body').append('<div><output id="contents"></output></div>');

$('#showDir').click(function () {
  const fs = require('fs');
  const data = fs.readdirSync('.');
  $('#contents').html(data.join('<br>'));
});

$('body').append('<div><a href="https://nwjs.io" class="external-link">Open link in default browser</a>');

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

$('.external-link').click(function (evt) {
  evt.preventDefault();
  const url = $(this).attr('href');
  if (url) {
    nw.Shell.openExternal(url);
  }
});
