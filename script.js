$(() => setup() );

let leftselected = false;
let leftselectedColor = null;
let leftselectedButton = null;

let rightselected = false;
let rightselectedShape = null;
let rightselectedButton = null;

let selectedScheme;

const classic = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];
const vintage = ['#91A16A', '#B36154', '#738986', '#DDC173', '#8E8680', '#B29576', '#C3BDCE'];
const grayscale = ['#EEEEEE', '#CCCCCC', '#999999', '#777777', '#555555', '#333333', '#111111'];
const pastel = ['#F0CAD6', '#F8E0DE', '#FCF5DB', '#E8F1DE', '#D9E4FB', '#E0D3E3', '#FFF0F3'];
const protanopia = ['#001159', '#2F437F', '#576696', '#848895', '#AEA17A', '#EAC243', '#FFD429'];
const deuteranopia = ['#081951', '#2C3E7A', '#3E5294', '#636F97', '#878581', '#DFBE50', '#FFE138'];
const tritanopia = ['#274750', '#007E7A', '#00A698', '#00C3A9', '#9EC8AC', '#FFC6AD', '#4E061A'];

let text;
let starting = true;

setup = () => {
  color('classic');
  $('#inp')[0].attributes.cols.value = $(window).width() / 12.5;
  $('#inp')[0].attributes.rows.value = $(window).height() / 25;
}

go = () => {
  if (!starting) {
    if (text.join('\n') == $('#inp')[0].value) {
      cancel();
      return;
    }
  }
  text = $('#inp')[0].value.split('\n');
  if (text != '') {
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
  $('#enthead')[0].innerText = 'Edit text below.';
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
  const shapes = $('#shapes')[0].children;
  $('.box').remove();

  for (letter of alltext) {
    leftcolor(swatches[Math.floor(Math.random() * 7)]);
    rightshape(shapes[Math.floor(Math.random() * 7)]);
    letter.click();
  }
}

color = (sc) => {
  selectedScheme = eval(sc);
  const swatches = $('#scheme circle');
  for (let i = 0; i < 7; i++) {
    swatches[i].attributes.fill.value = selectedScheme[i];
  }
  if (leftselected) {
    leftselected = false;
    leftselectedColor = null;
    leftselectedButton.setAttribute('stroke-width', 0.5);
    leftselectedButton = null;
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
    $('body').append('<p id="_p' + i + '"></p>');
    const sentence = text[i].split(' ');
    for (word of sentence) {
      w = word.split('');
      for (c of w) {
        $('#_p' + i).append('<text id="_' + j + '">' + c + '</text>');
        j++;
      }
      $('#_p' + i).append(' ')
    }
  }

  $('text').click(function() {
    if (leftselected && rightselected) {

      $('body').prepend('<div style="top:' + this.offsetTop + 'px; left:' + this.offsetLeft + 'px;" id="' + this.id + '" class="box" onclick="letvis(this.id)"><svg id="cement"></svg></div>');

      $('#cement').attr('class', this.id);
      $('#cement').attr('width', this.offsetWidth);
      $('#cement').attr('height', this.offsetHeight);

      const h = this.offsetHeight;
      const w = this.offsetWidth;
      const midH = this.offsetHeight / 2.0;
      const midW = this.offsetWidth / 2.0;

      if ($('#hidetext')[0].checked) { this.style.color = '#fffaf0'; }

      if (rightselectedShape == 'rect') {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        rect.setAttribute('stroke', '#262626');
        rect.setAttribute('stroke-width', 0.5);
        rect.setAttribute('height', h);
        rect.setAttribute('width', w);
        rect.setAttribute('fill', leftselectedColor);
        rect.setAttribute('class', this.id);

        $('#cement').append(rect);
      }
      else if (rightselectedShape == 'ellipse') {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

        ellipse.setAttribute('stroke', '#262626');
        ellipse.setAttribute('stroke-width', 0.5);
        ellipse.setAttribute('cy', midH);
        ellipse.setAttribute('cx', midW);
        ellipse.setAttribute('rx', midW);
        ellipse.setAttribute('ry', midH);
        ellipse.setAttribute('fill', leftselectedColor);
        ellipse.setAttribute('class', this.id);

        $('#cement').append(ellipse);
      }
      else if (rightselectedShape == 'pentagon') {
        $('#cement').html('<polygon name="pentagon" class="' + this.id + '" points="' + pentagon(h, w, midW, midH) + '" stroke="#262626" stroke-width="0.5" fill="' + leftselectedColor +'"/>');
      }
      else if (rightselectedShape == 'hexagon') {
        $('#cement').html('<polygon name="hexagon" class="' + this.id + '" points="' + hexagon(h, w, midW, midH) + '" stroke="#262626" stroke-width="0.5" fill="' + leftselectedColor +'"/>');
      }
      else if (rightselectedShape == 'triangle') {
        $('#cement').html('<polygon name="triangle" class="' + this.id + '" points="' + triangle(h, w, midW) + '" stroke="#262626" stroke-width="0.5" fill="' + leftselectedColor +'"/>');
      }
      else if (rightselectedShape == 'chevron') {
        $('#cement').html('<polygon name="chevron" class="' + this.id + '" points="' + chevron(h, w, midW) + '" stroke="#262626" stroke-width="0.5" fill="' + leftselectedColor +'"/>');
      }
      else if (rightselectedShape == 'octagon') {
        $('#cement').html('<polygon name="octagon" class="' + this.id + '" points="' + octagon(h, w) + '" stroke="#262626" stroke-width="0.5" fill="' + leftselectedColor +'"/>');
      }
    }
  })
}

letvis = (i) => {
  if ($('#hidetext')[0].checked || (!$('#hidetext')[0].checked && $('text#' + i)[0].style.color == 'rgb(255, 250, 240)')) {
    $('text#' + i)[0].style.color = '#262626';
  }
  $('div#' + i)[0].remove();
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
    const letter = $('text#' + box.attributes.id.value)[0];

    $(box).css('top', letter.offsetTop);
    $(box).css('left', letter.offsetLeft);
    $(box).css('height', letter.offsetHeight);
    $(box).css('width', letter.offsetWidth);

    $('#cement' + '.' + box.attributes.id.value)[0].setAttribute('width', letter.offsetWidth);
    $('#cement' + '.' + box.attributes.id.value)[0].setAttribute('height', letter.offsetHeight);

    polyresize($('#cement' + '.' + box.attributes.id.value)[0].firstChild.tagName, box.attributes.id.value, letter.offsetWidth, letter.offsetHeight);
  }
})

polyresize = (tag, cla, w, h) => {
  const midW = w / 2.0;
  const midH = h / 2.0;

  if (tag == 'rect') {
    $('rect' + '.' + cla)[0].setAttribute('width', w);
    $('rect' + '.' + cla)[0].setAttribute('height', h);
  }
  else if (tag == 'ellipse') {
    $('ellipse' + '.' + cla)[0].setAttribute('cy', midH);
    $('ellipse' + '.' + cla)[0].setAttribute('cx', midW);
    $('ellipse' + '.' + cla)[0].setAttribute('rx', midW);
    $('ellipse' + '.' + cla)[0].setAttribute('ry', midH);
  }
  else if (tag == 'polygon') {
    const name = $('polygon' + '.' + cla)[0].attributes.name.value;
    const points = $('polygon' + '.' + cla)[0].attributes.points.value;
    if (name == 'pentagon') {
      const qW = w * 0.3195;
      $('polygon' + '.' + cla)[0].attributes.points.value = pentagon(h, w, midW, midH);
    }
    else if (name == 'hexagon') {
      const hp = h * 0.266;
      $('polygon' + '.' + cla)[0].attributes.points.value = hexagon(h, w, midW, midH);
    }
    else if (name == 'triangle') {
      $('polygon' + '.' + cla)[0].attributes.points.value = triangle(h, w, midW);
    }
    else if (name == 'chevron') {
      $('polygon' + '.' + cla)[0].attributes.points.value = chevron(h, w, midW);
    }
    else if (name == 'octagon') {
      $('polygon' + '.' + cla)[0].attributes.points.value = octagon(h, w);
    }
  }
}

pentagon = (h, w, midW, midH) => {
  const qW = w * 0.266;
  const pH = h * 0.366;
  return String(midW) + ' 0,' + String(w) + ' ' + String(pH) + ',' + String(midW + qW) + ' ' + String(h) + ',' + String(midW - qW) + ' ' + String(h) + ',' + '0 ' + String(pH);
}

hexagon = (h, w, midW, midH) => {
  const hp = h * 0.266;
  return String(midW) + ' 0,' + String(w) + ' ' + String(hp) + ',' + String(w) + ' ' + String(h - hp) + ',' + String(midW) + ' ' + String(h) + ',' + '0 ' + String(h - hp) + ',' + '0 ' + String(hp);
}

chevron = (h, w, midW) => {
  const pH = h * 0.65;
  return String(midW) + ' 0,' + String(w) + ' ' + String(h) + ',' + String(midW) + ' ' + String(pH) + ',' + '0 ' + String(h);
}

octagon = (h, w) => {
  const w3 = w / 3.0;
  const w23 = w * (2.0 / 3.0);
  const h3 = h / 3.0;
  const h23 = h * (2.0 / 3.0);
  return String(w3) + ' 0,' + String(w23) + ' 0,' + String(w) + ' ' + String(h3) + ',' + String(w) + ' ' + String(h23) + ',' + String(w23) + ' ' + String(h) + ',' + String(w3) + ' ' + String(h) + ',' + '0 ' + String(h23) + ',' + '0 ' + String(h3);
}

triangle = (h, w, midW) => String(midW) + ' 0,' + String(w) + ' ' + String(h) + ',' + '0 ' + String(h);
