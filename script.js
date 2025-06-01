document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');

  const boldBtn = document.getElementById('boldButton');
  const italicBtn = document.getElementById('italicButton');
  const underlineBtn = document.getElementById('underlineButton');
  const colorInput = document.getElementById('color');

  const leftAlignBtn = document.getElementById('leftAlign');
  const centerAlignBtn = document.getElementById('centerAlign');
  const rightAlignBtn = document.getElementById('rightAlign');
  const justifyAlignBtn = document.getElementById('justifyAlign');

  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');

  function clearAlignActive() {
    [leftAlignBtn, centerAlignBtn, rightAlignBtn, justifyAlignBtn].forEach(btn => {
      btn.classList.remove('active');
    });
  }

  function execCommandWithUpdate(command, value = null) {
    document.execCommand(command, false, value);
    editor.focus();
    updateToolbar();
  }

  boldBtn.addEventListener('click', () => execCommandWithUpdate('bold'));
  italicBtn.addEventListener('click', () => execCommandWithUpdate('italic'));
  underlineBtn.addEventListener('click', () => execCommandWithUpdate('underline'));
  colorInput.addEventListener('input', (e) => execCommandWithUpdate('foreColor', e.target.value));

  leftAlignBtn.addEventListener('click', () => execCommandWithUpdate('justifyLeft'));
  centerAlignBtn.addEventListener('click', () => execCommandWithUpdate('justifyCenter'));
  rightAlignBtn.addEventListener('click', () => execCommandWithUpdate('justifyRight'));
  justifyAlignBtn.addEventListener('click', () => execCommandWithUpdate('justifyFull'));

  undoBtn.addEventListener('click', () => execCommandWithUpdate('undo'));
  redoBtn.addEventListener('click', () => execCommandWithUpdate('redo'));

  function updateToolbar() {
    boldBtn.classList.toggle('active', document.queryCommandState('bold'));
    italicBtn.classList.toggle('active', document.queryCommandState('italic'));
    underlineBtn.classList.toggle('active', document.queryCommandState('underline'));

    
    clearAlignActive();
    if (document.queryCommandState('justifyLeft')) leftAlignBtn.classList.add('active');
    else if (document.queryCommandState('justifyCenter')) centerAlignBtn.classList.add('active');
    else if (document.queryCommandState('justifyRight')) rightAlignBtn.classList.add('active');
    else if (document.queryCommandState('justifyFull')) justifyAlignBtn.classList.add('active');
  }

  editor.addEventListener('keyup', updateToolbar);
  editor.addEventListener('mouseup', updateToolbar);
  editor.addEventListener('focus', updateToolbar);

  updateToolbar();
});
