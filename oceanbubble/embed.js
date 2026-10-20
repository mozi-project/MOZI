import fs from 'fs';

const appJsx = fs.readFileSync('app.jsx', 'utf8');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<script type="text\/babel"[^>]*>[\s\S]*?<\/script>/;
if (regex.test(html)) {
  html = html.replace(regex, '<script type="text/babel">\n' + appJsx + '\n</script>');
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Successfully bundled inline app into index.html! File size:', fs.statSync('index.html').size);
} else {
  console.log('Error: <script type="text/babel"> tag not found in index.html.');
}
