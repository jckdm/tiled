$(() => setup() );

let leftselected = false;
let leftselectedColor = null;
let leftselectedButton = null;

let rightselected = false;
let rightselectedShape = null;
let rightselectedButton = null;

const classic = ['#FF0000', '#FFFF00', '#008000', '#0000FF', '#EE82EE'];
const vintage = ['#91A16A', '#B36154', '#738986', '#DDC173', '#8E8680'];
const grayscale = ['#999999', '#777777', '#555555', '#333333', '#111111'];
const pastel = ['#FDDFDF', '#FCF7DE', '#DEFDE0', '#DEF3FD', '#F0DEFD'];
const protanopia = ['#BDB6AB', '#EDE6DE', '#D1D0DE', '#636D97', '#2E2B21'];
const deuteranopia = ['#CDB1AD', '#FADFE2', '#DECBE3', '#5D6E93', '#342A1F'];
const tritanopia = ['#DD4444', '#F48080', '#FFDCDC', '#2D676F', '#194B4F'];

let text;
let starting = true;

setup = () => {
  color('classic');
  $('#inp')[0].attributes.cols.value = $(window).width() / 12.5;
  $('#inp')[0].attributes.rows.value = $(window).height() / 25;
}

go = () => {
  text = $('#inp')[0].value.split('\n');
  if (text != '') {
    $('#cancel')[0].style.visibility = 'hidden';
    $('.overlay').css('visibility', 'hidden');
    if (starting) { $('.overlay-next').css('visibility', 'visible'); }
    else { id(text); }
  }
}

gogogo = () => {
  $('.overlay-next').css('visibility', 'hidden');
  id(text);
}

cancel = () => {
  $('.overlay').css('visibility', 'hidden');
  $('#cancel')[0].style.visibility = 'hidden';
}

edit = (x) => {
  $('.overlay').css('visibility', 'visible');
  $('#enthead')[0].innerText = 'Edit text below.';
  $('#sub')[0].value = 'Update Text';
  if (starting) {
    $('#cancel')[0].innerHTML += ('<br>');
    $('#cancel')[0].insertAdjacentHTML('beforebegin', '<br>');
    $('#cancel')[0].style.visibility = 'visible';
  }
  else { $('#cancel')[0].style.visibility = 'visible'; }
  if (x) { starting = false; }
}

color = (sc) => {
  const swatches = $('#scheme')[0].children;
  for (let i = 0; i < 5; i++) {
    swatches[i].attributes.fill.value = eval(sc)[i];
  }
  if (leftselected) {
    leftselected = false;
    leftselectedColor = null;
    leftselectedButton.setAttribute('stroke-width', '0.5');
    leftselectedButton = null;
  }
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
    }
  })
  $('#left-menu circle').click(function() {
    if (!leftselected) { leftselected = true; }
    else { leftselectedButton.setAttribute('stroke-width', '0.5'); }
    leftselectedButton = this;
    leftselectedColor = this.attributes.fill.value;
    $(this)[0].setAttribute('stroke-width', '2.0');
  })
  $('#right-menu polygon, #right-menu circle, #right-menu rect').click(function() {
    if (!rightselected) { rightselected = true; }
    else { rightselectedButton.setAttribute('stroke-width', '0.5'); }
    rightselectedButton = this;
    rightselectedShape = this.attributes.class.value;
    $(this)[0].setAttribute('stroke-width', '2.0');
  })
}

letvis = (i) => {
  if ($('#hidetext')[0].checked || (!$('#hidetext')[0].checked && $('text#' + i)[0].style.color == 'rgb(255, 250, 240)')) {
    $('text#' + i)[0].style.color = '#262626';
  }
  $('div#' + i)[0].remove();
  ;
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
  }
}

pentagon = (h, w, midW, midH) => {
  const qW = w * 0.3195;
  const pH = h * 0.361
  return String(midW) + ' 0,' + String(w) + ' ' + String(pH) + ',' + String(midW + qW) + ' ' + String(h) + ',' + String(midW - qW) + ' ' + String(h) + ',' + '0 ' + String(pH);
}

hexagon = (h, w, midW, midH) => {
  const hp = h * 0.266;
  return String(midW) + ' 0,' + String(w) + ' ' + String(hp) + ',' + String(w) + ' ' + String(h - hp) + ',' + String(midW) + ' ' + String(h) + ',' + '0 ' + String(h - hp) + ',' + '0 ' + String(hp);
}

triangle = (h, w, midW) => String(midW) + ' 0,' + String(w) + ' ' + String(h) + ', ' + '0 ' + String(h);
