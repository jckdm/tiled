$(() => resize() );

resize = () => {
  $('#inp')[0].attributes.cols.value = $(window).width() / 15;
  $('#inp')[0].attributes.rows.value = $(window).height() / 25;
}

let j = 0;
let leftselected = false;
let leftselectedColor = '#fffaf0';
let leftselectedButton = null;

let rightselected = false;
let rightselectedShape = null;
let rightselectedButton = null;

go = () => {
  const text = $('#inp')[0].value.split('\n');
  $('.overlay').css('visibility', 'hidden');
  id(text);
}

id = (text) => {
  $('p').remove();
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
  // doesn't work with hiding text, ugh
  // $('text').mouseenter(function() { $(this).css('color', leftselectedColor) });
  // $('text').mouseout(function() { $(this).css('color', '#fffaf0') });

  $('text').click(function() {
    if (leftselected && rightselected) {
      $('body').prepend('<div id="box"><svg id="cement"></svg></div>');

      $('#box').css('top', this.offsetTop);
      $('#box').css('left', this.offsetLeft);
      $('#box').attr('class', this.id);

      $('#cement').attr('class', this.id);
      $('#cement').attr('width', this.offsetWidth);
      $('#cement').attr('height', this.offsetHeight);

      $('#box').attr('onClick', 'if ($("#hidetext")[0].checked) { $("#" + this.className)[0].style.color = "#fffaf0"; } this.remove();')


      const h = this.offsetHeight;
      const w = this.offsetWidth;
      const midH = this.offsetHeight / 2.0;
      const midW = this.offsetWidth / 2.0;

      if ($('#hidetext')[0].checked) { this.style.color = '#1f1f1f'; }

      if (rightselectedShape == 'rect') {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        rect.setAttribute('stroke', '#fffaf0');
        rect.setAttribute('stroke-width', 1);
        rect.setAttribute('height', h);
        rect.setAttribute('width', w);
        rect.setAttribute('fill', leftselectedColor);
        rect.setAttribute('class', this.id);

        $('#cement').append(rect);
      }
      else if (rightselectedShape == 'ellipse') {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

        ellipse.setAttribute('stroke', '#fffaf0');
        ellipse.setAttribute('stroke-width', 1);
        ellipse.setAttribute('cy', midH);
        ellipse.setAttribute('cx', midW);
        ellipse.setAttribute('rx', midW);
        ellipse.setAttribute('ry', midH);
        ellipse.setAttribute('fill', leftselectedColor);
        ellipse.setAttribute('class', this.id);

        $('#cement').append(ellipse);
      }
      else if (rightselectedShape == 'pentagon') {
        $('#cement').html('<polygon name="pentagon" class="' + this.id + '" points="' + pentagon(h, w, midW, midH) + '" stroke="#fffaf0" stroke-width="1" fill="' + leftselectedColor +'"/>');
      }
      else if (rightselectedShape == 'hexagon') {
        $('#cement').html('<polygon name="hexagon" class="' + this.id + '" points="' + hexagon(h, w, midW, midH) + '" stroke="#fffaf0" stroke-width="1" fill="' + leftselectedColor +'"/>');
      }
      else if (rightselectedShape == 'triangle') {
        $('#cement').html('<polygon name="triangle" class="' + this.id + '" points="' + triangle(h, w, midW) + '" stroke="#fffaf0" stroke-width="1" fill="' + leftselectedColor +'"/>');
      }
    }
  })

  $('#left-menu circle').click(function() {
    if (!leftselected) { leftselected = true; }
    else { leftselectedButton.setAttribute('stroke', 'none'); }
    leftselectedButton = this;
    leftselectedColor = this.attributes.fill.value;
    $(this)[0].setAttribute('stroke', '#fffaf0');
    $(this)[0].setAttribute('stroke-width', '1.5px');
  })

  $('#right-menu polygon, #right-menu circle, #right-menu rect').click(function() {
    if (!rightselected) { rightselected = true; }
    else { rightselectedButton.setAttribute('stroke', 'none'); }
    rightselectedButton = this;
    rightselectedShape = this.attributes.class.value;
    $(this)[0].setAttribute('stroke', '#fffaf0');
    $(this)[0].setAttribute('stroke-width', '1.5px');
  })

}

$(window).resize(() => {

  $('#inp')[0].attributes.cols.value = $(window).width() / 15;
  $('#inp')[0].attributes.rows.value = $(window).height() / 25;

  const boxes = $('div#box');
  for (box of boxes) {
    const letter = $('#' + box.attributes.class.value)[0];

    $(box).css('top', letter.offsetTop);
    $(box).css('left', letter.offsetLeft);
    $(box).css('height', letter.offsetHeight);
    $(box).css('width', letter.offsetWidth);

    $('#cement' + '.' + box.attributes.class.value)[0].setAttribute('width', letter.offsetWidth);
    $('#cement' + '.' + box.attributes.class.value)[0].setAttribute('height', letter.offsetHeight);

    polyresize($('#cement' + '.' + box.attributes.class.value)[0].firstChild.tagName, box.attributes.class.value, letter.offsetWidth, letter.offsetHeight);
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
