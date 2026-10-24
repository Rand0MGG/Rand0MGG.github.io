(() => {
  'use strict';
  const d = window.RESUME;
  if (!d) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const el = (tag, text, className) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node; };
  const splitBullet = value => { const at = value.indexOf('：'); return at < 0 ? ['', value] : [value.slice(0, at), value.slice(at + 1)]; };
  $$('[data-field]').forEach(node => { node.textContent = d[node.dataset.field] || ''; if (node.dataset.field === 'role') node.hidden = !d.role; });
  $('#hero-title').setAttribute('aria-label', `${d.englishName} ${d.name}`);
  $$('.pdf-link').forEach(link => { link.href = d.pdf; link.download = '耿锐-简历.pdf'; });
  $('#email-link').textContent = d.email; $('#email-link').href = `mailto:${d.email}`;
  $('#phone-link').textContent = d.phone; $('#phone-link').href = `tel:${d.phone}`;
  $('#footer-github').href = d.github;
  for (const project of d.projects) {
    $(`[data-description="${project.id}"]`).textContent = project.description;
    $(`[data-label="${project.id}"]`).textContent = project.label;
    $(`[data-repo="${project.id}"]`).href = project.github;
    const tags = $(`[data-tags="${project.id}"]`);
    project.tags.forEach(tag => tags.append(el('span', tag)));
    const points = $(`[data-points="${project.id}"]`);
    (project.presentationBullets || project.bullets).forEach(([title, text]) => { const row = el('div'); row.append(el('dt', title), el('dd', text)); points.append(row); });
    const description = $(`[data-description="${project.id}"]`);
    const meta = el('div', undefined, 'project-meta');
    meta.append(el('span', '我的工作'), el('p', project.contribution));
    if (project.period) meta.append(el('span', project.period, 'project-period'));
    description.after(meta);
    const highlight = el('div', undefined, 'project-highlight');
    highlight.append(el('strong', project.highlight), el('span', project.highlightNote));
    meta.after(highlight);
    const screenshot = $(`[data-image="${project.id}"]`);
    const image = $('img', screenshot);
    const gallery = el('div', undefined, 'gallery-selectors');
    gallery.setAttribute('role', 'group'); gallery.setAttribute('aria-label', `${project.name} 界面截图`);
    const selectScreenshot = index => {
      const shot = project.screenshots[index];
      image.src = shot.src; image.alt = shot.alt; image.width = shot.width; image.height = shot.height;
      screenshot.dataset.caption = `${project.name} / ${shot.label}`;
      screenshot.setAttribute('aria-label', `放大 ${project.name} ${shot.label}截图`);
      $$('.gallery-choice', gallery).forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    };
    project.screenshots.forEach((shot, index) => {
      const button = el('button', `${String(index + 1).padStart(2, '0')} / ${shot.label}`, 'gallery-choice');
      button.type = 'button'; button.addEventListener('click', () => selectScreenshot(index)); gallery.append(button);
    });
    screenshot.after(gallery); selectScreenshot(0);
  }
  d.education.forEach(item => {
    const row = el('div', undefined, 'journey-entry');
    row.append(el('span', item.period, 'entry-period'), el('h3', item.school), el('p', item.degree));
    if (item.detail) row.append(el('p', item.detail, 'education-detail'));
    $('#education-list').append(row);
  });
  $('#internship-period').textContent = d.internship.period;
  $('#internship-company').textContent = d.internship.company;
  $('#internship-team').textContent = `${d.internship.team} · ${d.internship.role}`;
  d.internship.bullets.forEach(value => {
    const [title, text] = splitBullet(value); const row = el('li');
    if (title) row.append(el('strong', title + '：'));
    row.append(document.createTextNode(text)); $('#internship-bullets').append(row);
  });
  d.skills.forEach(group => {
    const row = el('div', undefined, 'skill-row'); const heading = el('div');
    heading.append(el('span', group.group, 'skill-path'), el('h3', group.label));
    const items = el('div', undefined, 'skill-items'); group.items.forEach(item => items.append(el('span', item)));
    row.append(heading, items); $('#skills-list').append(row);
  });

  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
    }), { threshold: .03 });
    $$('.reveal').forEach(node => reveal.observe(node));
    const sections = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) $$('nav a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }), { rootMargin: '-15% 0px -55% 0px' });
    ['home', 'projects', 'journey', 'skills', 'contact'].forEach(id => sections.observe(document.getElementById(id)));
  }
  let scrollPending = false;
  const updateScroll = () => { const max = document.documentElement.scrollHeight - innerHeight; $('.scroll-progress').style.width = `${max > 0 ? Math.min(100, scrollY / max * 100) : 0}%`; scrollPending = false; };
  addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  addEventListener('resize', updateScroll); updateScroll();

  // Browser-local navigation only; typed input is rendered as text and never executed.
  const output = $('#terminal-output'); const input = $('#terminal-input');
  const history = []; let historyPosition = 0;
  const appendOutput = (text, className = 'terminal-result') => output.append(el('div', text, className));
  const appendLink = (text, href, download = false) => {
    const row = el('div', undefined, 'terminal-result'); const link = el('a', text); link.href = href;
    if (download) link.download = '耿锐-简历.pdf';
    else if (href.startsWith('https:')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    row.append(link); output.append(row);
  };
  const runCommand = raw => {
    const command = raw.trim(); if (!command) return;
    history.push(command); if (history.length > 30) history.shift(); historyPosition = history.length;
    if (command.toLowerCase() === 'clear') { output.replaceChildren(); input.value = ''; return; }
    appendOutput(`~ ❯ ${command}`, 'terminal-command-echo');
    switch (command.toLowerCase()) {
      case 'help': appendOutput('about / whoami · 个人信息'); appendOutput('projects · 项目   skills · 技能'); appendOutput('journey · 经历   contact · 联系'); appendOutput('resume · PDF    github · 仓库'); appendOutput('clear · 清屏   ↑/↓ · 历史命令'); break;
      case 'about': case 'whoami': appendOutput(`${d.name} / ${d.englishName}`); if (d.role) appendOutput(d.role); appendOutput(d.introduction); break;
      case 'projects': case 'ls': d.projects.forEach(project => appendLink(`${project.name} / ${project.label} ↗`, `#${project.id}`)); break;
      case 'skills': d.skills.forEach(group => appendOutput(`${group.label}：${group.items.join(' · ')}`)); break;
      case 'journey': appendOutput(`${d.internship.company} / ${d.internship.period}`); appendLink('查看教育与实习经历 ↓', '#journey'); break;
      case 'contact': appendLink(d.email, `mailto:${d.email}`); break;
      case 'resume': appendLink('↓ 下载最新 PDF 简历', d.pdf, true); break;
      case 'github': appendLink('github.com/Rand0MGG ↗', d.github); break;
      default: appendOutput(`未识别的命令：${command.slice(0, 50)}`); appendOutput('输入 help 查看可用命令。');
    }
    while (output.childElementCount > 45) output.firstElementChild.remove();
    output.scrollTop = output.scrollHeight; input.value = '';
  };
  $('#terminal-form').addEventListener('submit', event => { event.preventDefault(); runCommand(input.value); });
  $$('[data-command]').forEach(button => button.addEventListener('click', () => runCommand(button.dataset.command)));
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') { event.preventDefault(); historyPosition = Math.max(0, historyPosition - 1); input.value = history[historyPosition] || ''; }
    if (event.key === 'ArrowDown') { event.preventDefault(); historyPosition = Math.min(history.length, historyPosition + 1); input.value = history[historyPosition] || ''; }
  });

  // Fixed illustrative course material: no model, microphone or external service is used.
  const example = d.agentExample; let agentStep = 0;
  const demo = $('.agent-demo');
  const graph = el('div', undefined, 'agent-graph'); graph.setAttribute('aria-hidden', 'true');
  const graphSources = el('div', undefined, 'graph-sources');
  ['SLIDES', 'TRANSCRIPT', 'NOTES'].forEach((name, index) => { const node = el('span', name, 'graph-source'); node.dataset.node = index; graphSources.append(node); });
  const wires = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  wires.setAttribute('viewBox', '0 0 300 56'); wires.setAttribute('preserveAspectRatio', 'none');
  ['M50 0 C50 38 150 12 150 56', 'M150 0 L150 56', 'M250 0 C250 38 150 12 150 56'].forEach(path => {
    for (const kind of ['wire', 'packet']) { const node = document.createElementNS(wires.namespaceURI, 'path'); node.setAttribute('d', path); node.setAttribute('class', kind); wires.append(node); }
  });
  graph.append(graphSources, wires, el('div', '✳', 'graph-core'), el('span', 'COURSE AGENT', 'graph-core-label'));
  $('.agent-steps').before(graph);
  const playback = el('div', undefined, 'agent-playback');
  const runStatus = el('span', '准备就绪', 'run-status'); runStatus.setAttribute('role', 'status');
  const replay = el('button', '▶ 播放完整流程', 'agent-replay'); replay.type = 'button';
  playback.append(runStatus, replay); $('.agent-steps').before(playback);
  let demoTimers = []; let streamFrame = 0; let running = false; let autoPlayed = false;
  const cancelPlayback = () => {
    demoTimers.forEach(clearTimeout); demoTimers = []; cancelAnimationFrame(streamFrame); running = false;
    demo.classList.remove('is-running', 'is-streaming');
    replay.textContent = '↻ 重播完整流程';
    $('#agent-panel').setAttribute('aria-busy', 'false');
  };
  const schedule = (callback, delay) => demoTimers.push(setTimeout(callback, delay));
  $('#agent-question').textContent = example.question;
  const renderAgentStep = step => {
    agentStep = step;
    demo.dataset.stage = step;
    $$('.graph-source').forEach(node => node.classList.toggle('is-read', step === 2));
    $$('[data-step]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.step) === step)));
    const panel = $('#agent-panel'); panel.replaceChildren();
    if (step === 0) {
      panel.append(el('p', '先确定问题，再读取相关材料。', 'panel-kicker'), el('p', '这个示例围绕同一个课堂问题，展示课件、转写和笔记如何为回答提供依据。'));
      const list = el('div', undefined, 'source-list');
      example.sources.forEach(source => { const row = el('div', undefined, 'source-item'); row.append(el('span', source.name), el('span', '待读取')); list.append(row); });
      panel.append(list);
    } else if (step === 1) {
      panel.append(el('p', '工具读取 · 展开查看示例原文', 'panel-kicker'));
      example.sources.forEach(source => {
        const detail = el('details'); detail.className = 'tool-detail';
        const summary = el('summary', `${source.tool} / ${source.id}`);
        const quote = el('p', source.text); detail.append(summary, quote); panel.append(detail);
      });
    } else {
      panel.append(el('p', example.answer, 'answer-text'));
      const tabs = el('div', undefined, 'source-tabs'); tabs.setAttribute('role', 'group'); tabs.setAttribute('aria-label', '查看回答引用的材料');
      const quote = el('blockquote', undefined, 'source-quote');
      const showSource = source => {
        $$('button', tabs).forEach(button => button.setAttribute('aria-pressed', String(button.dataset.source === source.id)));
        quote.replaceChildren(document.createTextNode(source.text), el('cite', `${source.name} / ${source.id}`));
      };
      example.sources.forEach((source, index) => { const button = el('button', `[${index + 1}] ${source.name}`); button.type = 'button'; button.dataset.source = source.id; button.addEventListener('click', () => showSource(source)); tabs.append(button); });
      panel.append(tabs, quote); showSource(example.sources[0]);
    }
    $('#agent-next').textContent = ['查看读取工具 →', '查看回答与引用 →', '重新查看流程 ↻'][step];
    panel.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)' });
  };
  const manuallySelectStep = step => { autoPlayed = true; cancelPlayback(); renderAgentStep(step); runStatus.textContent = ['查看问题', '查看工具与原文', '回答与引用就绪'][step]; };
  $$('[data-step]').forEach(button => button.addEventListener('click', () => manuallySelectStep(Number(button.dataset.step))));
  $('#agent-next').addEventListener('click', () => manuallySelectStep((agentStep + 1) % 3)); renderAgentStep(0);
  const playAgent = () => {
    autoPlayed = true; cancelPlayback(); running = true; demo.classList.add('is-running');
    replay.textContent = '↻ 重新播放'; runStatus.textContent = '01 / 理解问题'; renderAgentStep(0);
    schedule(() => {
      renderAgentStep(1); runStatus.textContent = '02 / 读取课程材料';
      example.sources.forEach((source, index) => schedule(() => {
        $$('.graph-source')[index].classList.add('is-read');
        const detail = $$('.tool-detail')[index]; detail.open = true; detail.classList.add('tool-read');
        runStatus.textContent = `02 / ${source.tool} ✓`;
      }, index * 720 + 180));
    }, 950);
    schedule(() => {
      renderAgentStep(2); demo.classList.add('is-streaming'); runStatus.textContent = '03 / 组织回答与引用';
      const answer = $('.answer-text'); const start = performance.now();
      answer.textContent = '';
      $('#agent-panel').setAttribute('aria-busy', 'true');
      const stream = now => {
        const progress = Math.min(1, (now - start) / 2300);
        answer.textContent = example.answer.slice(0, Math.floor(example.answer.length * progress));
        if (progress < 1) streamFrame = requestAnimationFrame(stream);
        else { cancelPlayback(); runStatus.textContent = '完成 / 点击引用，核对原文'; }
      };
      streamFrame = requestAnimationFrame(stream);
    }, 3600);
  };
  replay.addEventListener('click', playAgent);
  if ('IntersectionObserver' in window) {
    const demoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting && !autoPlayed && !document.hidden) playAgent();
      else if (!entry.isIntersecting && running) { cancelPlayback(); renderAgentStep(2); runStatus.textContent = '回答与引用就绪'; }
    }), { threshold: .35 }); demoObserver.observe(demo);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden && running) { cancelPlayback(); renderAgentStep(2); runStatus.textContent = '回答与引用就绪'; } });

  const counters = new Map();
  const animateValue = (node, value) => {
    cancelAnimationFrame(counters.get(node)); const from = Number(node.textContent) || 0; const start = performance.now();
    const frame = now => {
      const p = Math.min(1, (now - start) / 850); node.textContent = (from + (value - from) * (1 - (1 - p) ** 4)).toFixed(2);
      if (p < 1) counters.set(node, requestAnimationFrame(frame)); else counters.delete(node);
    }; counters.set(node, requestAnimationFrame(frame));
  };
  const selectModel = key => {
    const model = d.experiment[key]; if (!model) return;
    $$('[data-model]').forEach(button => { const active = button.dataset.model === key; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    animateValue($('#map-number'), model.map); animateValue($('#minp-number'), model.minp);
    $('#map-bar').style.width = `${model.map}%`; $('#minp-bar').style.width = `${model.minp}%`;
    $('#metric-delta').textContent = key === 'improved' ? `mAP +${(d.experiment.improved.map - d.experiment.baseline.map).toFixed(2)} pp / mINP +${(d.experiment.improved.minp - d.experiment.baseline.minp).toFixed(2)} pp` : 'M0-F0 · SBS 基线 / 对照结果';
  };
  $$('[data-model]').forEach(button => button.addEventListener('click', () => selectModel(button.dataset.model))); selectModel('improved');
  const dialog = $('#image-dialog'); let previousFocus;
  $$('[data-image]').forEach(button => button.addEventListener('click', () => {
    previousFocus = button; const img = $('img', button);
    $('#lightbox-image').src = img.getAttribute('src'); $('#lightbox-image').alt = img.alt;
    $('#image-dialog-title').textContent = button.dataset.caption; dialog.showModal();
  }));
  $('#close-image').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
  dialog.addEventListener('close', () => previousFocus?.focus());
  let copyTimer;
  $('#copy-email').addEventListener('click', async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(d.email);
      else { const field = el('textarea', d.email); field.style.cssText = 'position:fixed;top:0;left:-9999px'; document.body.append(field); field.select(); const ok = document.execCommand('copy'); field.remove(); if (!ok) throw new Error('copy unavailable'); }
      $('#copy-feedback').textContent = '已复制';
    } catch (_) { $('#copy-feedback').textContent = '请选中邮箱手动复制'; }
    clearTimeout(copyTimer); copyTimer = setTimeout(() => { $('#copy-feedback').textContent = ''; }, 3500);
  });

  // Project lab tabs share the same source-backed examples as the project descriptions.
  const labTabs = $$('[data-lab]');
  const selectLab = key => {
    if (!['agent', 'vision'].includes(key)) return;
    if (key === 'vision' && running) { cancelPlayback(); renderAgentStep(2); runStatus.textContent = '回答与引用就绪'; }
    labTabs.forEach(button => {
      const active = button.dataset.lab === key;
      button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1;
    });
    $$('.lab-panel').forEach(panel => { panel.hidden = panel.id !== 'lab-' + key; });
  };
  labTabs.forEach((button, index) => {
    button.addEventListener('click', () => selectLab(button.dataset.lab));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? labTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + labTabs.length) % labTabs.length;
      selectLab(labTabs[next].dataset.lab); labTabs[next].focus();
    });
  });
  $$('[data-open-lab]').forEach(button => button.addEventListener('click', () => {
    selectLab(button.dataset.openLab); $('#lab').scrollIntoView({behavior:'smooth',block:'start'});
    $('#tab-' + button.dataset.openLab).focus({preventScroll:true});
  }));
  const commandDialog = $('#command-dialog');
  const openCommand = () => { if (!commandDialog.open && !dialog.open) { commandDialog.showModal(); input.focus(); } };
  $('.command-open').addEventListener('click', openCommand);
  $('#close-command').addEventListener('click', () => commandDialog.close());
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); commandDialog.open ? commandDialog.close() : openCommand();
    }
  });
  commandDialog.addEventListener('click', event => {
    const rect = commandDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) commandDialog.close();
    if (event.target.closest('a[href^="#"]')) commandDialog.close();
  });
})();
