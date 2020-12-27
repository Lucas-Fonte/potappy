context = c.getContext('2d');

const potato = new Image();
potato.src = 'potato.png';
potatoX = potatoDY = score = bestScore = 0;
interval = potatoSize = pipeWidth = topPipeBottomY = 24;
potatoY = pipeGap = 200;
canvasSize = pipeX = 400;

c.onclick = () => (potatoDY = 9);
setInterval(() => {
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvasSize, canvasSize); // Draw sky
  potatoY -= potatoDY -= 0.5; // Gravity
  context.drawImage(
    potato,
    potatoX,
    potatoY,
    potatoSize * (524 / 374),
    potatoSize
  ); // Draw potato
  context.fillStyle = 'black';
  pipeX -= 8; // Move pipe
  pipeX < -pipeWidth && // Pipe off screen?
    ((pipeX = canvasSize), (topPipeBottomY = pipeGap * Math.random())); // Reset pipe and randomize gap.
  context.fillRect(pipeX, 0, pipeWidth, topPipeBottomY); // Draw top pipe
  context.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSize); // Draw bottom pipe
  context.fillStyle = 'black';

  context.fillText(score++, 9, 25); // Increase and draw score
  bestScore = bestScore < score ? score : bestScore; // New best score?
  context.fillText(`Best: ${bestScore}`, 9, 50); // Draw best score

  (((potatoY < topPipeBottomY || potatoY > topPipeBottomY + pipeGap) &&
    pipeX < potatoSize * (524 / 374)) || // potato hit pipe?
    potatoY > canvasSize) && // potato falls off screen
    ((potatoDY = 0), (potatoY = 200), (pipeX = canvasSize), (score = 0)); // Potato died
}, interval);
