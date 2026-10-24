(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const assembly = $('.assembly');
  const stack = $('.assembly-stack');
  const toggle = $('#assembly-toggle');
  const descriptions = [
    '课件、课堂转写与笔记，成为回答问题的依据。',
    'Agent 根据问题调用读取工具，获取相关课程材料。',
    '回答附带材料来源，方便逐条回到原文核对。'
  ];
  $$('[data-layer]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.layer);
    $$('[data-layer]').forEach(item => item.setAttribute('aria-pressed', String(Number(item.dataset.layer) === index)));
    $('#assembly-description').textContent = descriptions[index];
    $('#assembly-description').animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:300,easing:'ease-out'});
  }));
  toggle.addEventListener('click', () => {
    const compact = assembly.classList.toggle('is-compact');
    toggle.setAttribute('aria-pressed', String(!compact));
    toggle.textContent = compact ? '展开分层 ↗' : '收起分层 ↙';
  });
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  $('.assembly-stage').addEventListener('pointermove', event => {
    if (!fine.matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    stack.style.setProperty('--pointer-x', ((event.clientX - rect.left) / rect.width - .5) * 9 + 'deg');
    stack.style.setProperty('--pointer-y', ((event.clientY - rect.top) / rect.height - .5) * -7 + 'deg');
  });
  $('.assembly-stage').addEventListener('pointerleave', () => {
    stack.style.removeProperty('--pointer-x'); stack.style.removeProperty('--pointer-y');
  });
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('page-hidden', document.hidden));
  document.body.classList.toggle('page-hidden', document.hidden);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    assembly.classList.toggle('scene-paused', !entries[0].isIntersecting);
  }, {rootMargin:'80px'}).observe(assembly);
})();
