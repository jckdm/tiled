$(() => setup() );

let leftselected = false;
let leftselectedColor = null;
let leftselectedButton = null;

let rightselected = false;
let rightselectedShape = null;
let rightselectedButton = null;

let selectedScheme;

const SCHEMES = {
       'classic': ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'],
       'vintage': ['#91A16A', '#B36154', '#738986', '#DDC173', '#8E8680', '#B29576', '#C3BDCE'],
     'grayscale': ['#EEEEEE', '#CCCCCC', '#999999', '#777777', '#555555', '#333333', '#111111'],
        'pastel': ['#F0CAD6', '#F8E0DE', '#FCF5DB', '#E8F1DE', '#D9E4FB', '#E0D3E3', '#FFF0F3'],
    'protanopia': ['#001159', '#2F437F', '#576696', '#848895', '#AEA17A', '#EAC243', '#FFD429'],
  'deuteranopia': ['#081951', '#2C3E7A', '#3E5294', '#636F97', '#878581', '#DFBE50', '#FFE138'],
    'tritanopia': ['#274750', '#007E7A', '#00A698', '#00C3A9', '#9EC8AC', '#FFC6AD', '#4E061A']
}

let text;
let starting = true;

setup = () => {
  color('classic');
  $('#inp')[0].attributes.cols.value = $(window).width() / 12.5;
  $('#inp')[0].attributes.rows.value = $(window).height() / 25;
}

go = () => {
  if (!starting) {
    // technically this fails if you go to edit the placeholder text and don't actually edit it, but why would you do that
    if (text.join('\n') === $('#inp')[0].value) {
      cancel();
      return;
    }
  }
  const val = $('#inp')[0].value.split('\n');
  text = (val[0] === "" && val.length === 1) ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a magna ante. Morbi ut ligula enim. Phasellus vulputate dapibus molestie. Integer tristique nisl sed libero elementum, eget pretium velit varius. Donec rhoncus tellus sed eros laoreet semper. Curabitur ultrices turpis id tortor mollis hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque sodales nunc eget elit iaculis tempor.'.split('\n') : val;
  if (text !== '') {
    cancel();
    if (starting) { $('.overlay3').css('visibility', 'visible'); }
    else { id(text); }
  }
}

gogogo = () => {
  $('.overlay3').css('visibility', 'hidden');
  id(text);
}

cancel = () => {
  $('.overlay2').css('visibility', 'hidden');
  $('#cancel')[0].style.visibility = 'hidden';
}

edit = (x) => {
  $('.overlay2').css('visibility', 'visible');
  $('#enthead')[0].innerText = 'Edit text.';
  $('#sub')[0].value = 'Update Text';
  if (starting) {
    $('#editme')[0].remove();
    $('#cancel')[0].innerHTML += ('<br>');
    $('#cancel')[0].insertAdjacentHTML('beforebegin', '<br>');
    $('#cancel')[0].style.visibility = 'visible';
  }
  else { $('#cancel')[0].style.visibility = 'visible'; }
  if (x) { starting = false; }
}

randomly = () => {
  const alltext = $('p text');
  const swatches = $('#left-menu circle');
  const shapez = $('#shapes')[0].children;
  $('.box').remove();

  const rs = $('#rs')[0].value;
  const rc = $('#rc')[0].value;

  if (rs === 'all' && rc === 'all') {
    for (letter of alltext) {
      leftcolor(swatches[Math.floor(Math.random() * 7)]);
      rightshape(shapez[Math.floor(Math.random() * 7)]);
      letter.click();
      letter.style.color = c;
    }
  }
  else if (rs === 'all') {
    for (letter of alltext) {
      leftcolor(swatches[+rc]);
      rightshape(shapez[Math.floor(Math.random() * 7)]);
      letter.click();
      letter.style.color = c;
    }
  }
  else if (rc === 'all') {
    for (letter of alltext) {
      leftcolor(swatches[Math.floor(Math.random() * 7)]);
      rightshape(shapez[+rs]);
      letter.click();
      letter.style.color = c;
    }
  }
  else {
    for (letter of alltext) {
      leftcolor(swatches[+rc]);
      rightshape(shapez[+rs]);
      letter.click();
      letter.style.color = c;
    }
  }
  $('#unhide')[0].value = (alltext.css('color') === 'rgb(38, 38, 38)') ? 'Hide letters' : 'Show hidden letters';
}

color = (sc) => {
  selectedScheme = SCHEMES[sc];
  const swatches = $('#scheme circle');
  const randcolmen = $('#rc')[0].children;
  for (let i = 0; i < 7; i++) {
    swatches[i].attributes.fill.value = selectedScheme[i];
    randcolmen[i+1].value = i;
    randcolmen[i+1].text = selectedScheme[i];
    randcolmen[i+1].style.backgroundColor = selectedScheme[i];
  }
  if (leftselected) {
    leftselected = false;
    leftselectedColor = null;
    leftselectedButton.setAttribute('stroke-width', 0.5);
    leftselectedButton = null;
  }
}

settings = () => {
  $('.overlay4').css('visibility', 'visible');
  $('#unhide')[0].value = ($('p text').css('color') === 'rgb(38, 38, 38)') ? 'Hide letters' : 'Show hidden letters';
}

unhide = () => {
  if ($('p text').css('color') === 'rgb(38, 38, 38)') {
    $('p text').css('color', '#FFFAF0');
    $('#unhide')[0].value = 'Show hidden letters';
  }
  else {
    $('p text').css('color', '#262626');
    $('#unhide')[0].value = 'Hide letters';
  }
}

font = (f) => {
  $('.box').remove();
  $('p text').css('font-family', f);
}

id = (text) => {
  $('p').remove();
  $('.box').remove();

  let j = 0;

  for (let i = 0; i < text.length; i++) {
    const pp = document.createElement('p');
    pp.setAttribute('id', `_p${i}`);
    document.body.appendChild(pp);
    const sentence = text[i].split(' ');

    for (word of sentence) {
      w = word.split('');
      for (c of w) {
        const pt = document.createElement('text');
        pt.setAttribute('id', `_${j}`)
        pt.innerText = c;
        pp.appendChild(pt);
        j++;
      }
      pp.append(' ')
    }
  }

  $('text').click(function() {
    if (leftselected && rightselected) {

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('id', 'cement');
      svg.setAttribute('class', this.id);
      svg.setAttribute('width', this.offsetWidth);
      svg.setAttribute('height', this.offsetHeight);

      const div = document.createElement('div');
      div.style.top = this.offsetTop + 'px';
      div.style.left = this.offsetLeft + 'px';
      div.setAttribute('id', this.id);
      div.setAttribute('class', 'box');
      div.setAttribute('onclick', 'letvis(this.id)');

      div.append(svg);
      $('body').prepend(div);

      const h = this.offsetHeight;
      const w = this.offsetWidth;
      const midH = this.offsetHeight / 2.0;
      const midW = this.offsetWidth / 2.0;

      if ($('#hidetext')[0].checked) { this.style.color = '#fffaf0'; }

      if (rightselectedShape === 'rect') {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        rect.setAttribute('stroke', '#262626');
        rect.setAttribute('stroke-width', 0.5);
        rect.setAttribute('height', h);
        rect.setAttribute('width', w);
        rect.setAttribute('fill', leftselectedColor);
        rect.setAttribute('class', this.id);
        rect.setAttribute('name', rightselectedShape);

        svg.append(rect);
      }
      else if (rightselectedShape === 'ellipse') {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

        ellipse.setAttribute('stroke', '#262626');
        ellipse.setAttribute('stroke-width', 0.5);
        ellipse.setAttribute('cy', midH);
        ellipse.setAttribute('cx', midW);
        ellipse.setAttribute('rx', midW);
        ellipse.setAttribute('ry', midH);
        ellipse.setAttribute('fill', leftselectedColor);
        ellipse.setAttribute('class', this.id);
        ellipse.setAttribute('name', rightselectedShape);

        svg.append(ellipse);
      }
      else {
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

        poly.setAttribute('class', this.id);
        poly.setAttribute('points', SHAPES[rightselectedShape](h, w, midW));
        poly.setAttribute('stroke', '#262626');
        poly.setAttribute('stroke-width', 0.5);
        poly.setAttribute('fill', leftselectedColor);
        poly.setAttribute('name', rightselectedShape);

        svg.append(poly);
      }
    }
  })
}

const SHAPES = {
  'pentagon': (h, w, midW) => {
    const qW = w * 0.266;
    const pH = h * 0.366;
    return `${midW} 0, ${w} ${pH}, ${midW + qW} ${h}, ${midW - qW} ${h}, 0 ${pH}`
  },
  'hexagon': (h, w, midW) => {
    const hp = h * 0.266;
    return `${midW} 0, ${w} ${hp}, ${w} ${h - hp}, ${midW} ${h}, 0 ${h - hp}, 0 ${hp}`
  },
  'chevron': (h, w, midW) => {
    const pH = h * 0.65;
    return `${midW} 0, ${w} ${h}, ${midW} ${pH}, 0 ${h}`
  },
  'octagon': (h, w) => {
    const w3 = w / 3.0;
    const w23 = w * (2.0 / 3.0);
    const h3 = h / 3.0;
    const h23 = h * (2.0 / 3.0);
    return `${w3} 0, ${w23} 0, ${w} ${h3}, ${w} ${h23}, ${w23} ${h}, ${w3} ${h}, 0 ${h23}, 0 ${h3}`
  },
  'triangle': (h, w, midW) => `${midW} 0, ${w} ${h}, 0 ${h}`
}

letvis = (i) => {
  if ($('#hidetext')[0].checked || (!$('#hidetext')[0].checked && $('text#' + i)[0].style.color === 'rgb(255, 250, 240)')) {
    $(`text#${i}`)[0].style.color = '#262626';
  }
  $(`div#${i}`)[0].remove();
  ;
}

leftcolor = (t) => {
  if (!leftselected) { leftselected = true; }
  else { leftselectedButton.setAttribute('stroke-width', 0.5); }
  leftselectedButton = t;
  leftselectedColor = t.attributes.fill.value;
  $(t)[0].setAttribute('stroke-width', 2.0);
}

rightshape = (t) => {
  if (!rightselected) { rightselected = true; }
  else { rightselectedButton.setAttribute('stroke-width', 0.5); }
  rightselectedButton = t;
  rightselectedShape = t.attributes.class.value;
  $(t)[0].setAttribute('stroke-width', 2.0);
}

$(window).resize(() => {

  $('#inp')[0].attributes.cols.value = $(window).width() / 12.5;
  $('#inp')[0].attributes.rows.value = $(window).height() / 25;

  const boxes = $('div.box');
  for (box of boxes) {
    const id = box.attributes.id.value;
    const letter = $(`text#${id}`)[0];

    $(box).css('top', letter.offsetTop);
    $(box).css('left', letter.offsetLeft);
    $(box).css('height', letter.offsetHeight);
    $(box).css('width', letter.offsetWidth);

    $(`#cement.${id}`)[0].setAttribute('width', letter.offsetWidth);
    $(`#cement.${id}`)[0].setAttribute('height', letter.offsetHeight);

    polyresize($(`#cement.${id}`)[0].firstChild.attributes.name.value, box.attributes.id.value, letter.offsetWidth, letter.offsetHeight);
  }
})

polyresize = (tag, cla, w, h) => {
  const midW = w / 2.0;

  if (tag === 'rect') {
    $(`rect.${cla}`)[0].setAttribute('width', w);
    $(`rect.${cla}`)[0].setAttribute('height', h);
  }
  else if (tag === 'ellipse') {
    const midH = h / 2.0;
    $(`ellipse.${cla}`)[0].setAttribute('cy', midH);
    $(`ellipse.${cla}`)[0].setAttribute('cx', midW);
    $(`ellipse.${cla}`)[0].setAttribute('rx', midW);
    $(`ellipse.${cla}`)[0].setAttribute('ry', midH);
  }
  else {
    $(`polygon.${cla}`)[0].attributes.points.value = SHAPES[tag](h, w, midW);
  }
}
