$(() => resize() );

resize = () => {
  $('#inp')[0].attributes.cols.value = $(window).width() / 15;
  $('#inp')[0].attributes.rows.value = $(window).height() / 25;
}

let j = 0;
let leftselected = false;
let leftselectedColor = 'white';
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
  $('text').mouseenter(function() { $(this).css('color', leftselectedColor) });
  $('text').mouseout(function() { $(this).css('color', 'white') });

  $('text').click(function() {
    if (leftselected && rightselected) {
      $('body').prepend('<div id="box"><svg id="cement"></svg></div>');

      $('#box').css('top', this.offsetTop);
      $('#box').css('left', this.offsetLeft);
      $('#box').attr('class', this.id);

      $('#cement').attr('class', this.id);
      $('#cement').attr('width', this.offsetWidth);
      $('#cement').attr('height', this.offsetHeight);

      $('#box').attr('onClick', 'this.remove();')

      if (rightselectedShape == 'rect') {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        rect.setAttribute('stroke', 'white');
        rect.setAttribute('stroke-width', 1);
        rect.setAttribute('height', this.offsetHeight);
        rect.setAttribute('width', this.offsetWidth);
        rect.setAttribute('fill', leftselectedColor);
        rect.setAttribute('class', this.id);

        $('#cement').append(rect);
      }
      if (rightselectedShape == 'ellipse') {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

        ellipse.setAttribute('stroke', 'white');
        ellipse.setAttribute('stroke-width', 1);
        ellipse.setAttribute('cy', this.offsetHeight / 2.0);
        ellipse.setAttribute('cx', this.offsetWidth / 2.0);
        ellipse.setAttribute('rx', this.offsetWidth / 2.0);
        ellipse.setAttribute('ry', this.offsetHeight / 2.0);
        ellipse.setAttribute('fill', leftselectedColor);
        ellipse.setAttribute('class', this.id);

        $('#cement').append(ellipse);
      }
    }
  })

  $('#left-menu circle').click(function() {
    if (!leftselected) { leftselected = true; }
    else {
      leftselectedButton.setAttribute('r', 15);
      leftselectedButton.setAttribute('stroke', 'none');
    }

    $(this)[0].setAttribute('r', 19);
    leftselectedButton = this;
    leftselectedColor = this.attributes.fill.value;
    $(this)[0].setAttribute('stroke', 'white');
    $(this)[0].setAttribute('stroke-width', '1.5px');
  })

  $('#right-menu polygon, #right-menu circle, #right-menu rect').click(function() {
    if (!rightselected) { rightselected = true; }
    else {
      rightselectedButton.setAttribute('stroke', 'none');
    }

    rightselectedButton = this;
    rightselectedShape = this.attributes.class.value;
    $(this)[0].setAttribute('stroke', 'white');
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

    $('rect' + '.' + box.attributes.class.value)[0].setAttribute('width', letter.offsetWidth);
    $('rect' + '.' + box.attributes.class.value)[0].setAttribute('height', letter.offsetHeight);
  }
})
