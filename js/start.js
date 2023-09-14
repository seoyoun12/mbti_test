const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const a = document.querySelector('.answerBox');
const q = document.querySelector('.qBox');
const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let qIdx = 0;

function calResult() {
  const result = select.indexOf(Math.max(...select));
  return result;
}

function setResult() {
  let point = calResult();
  if (point >= 0 && point < infoList.length) {
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;
    
    const resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    const imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
    
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
  }
}

function addAnswer(answerText, qIdx, idx) {
  const answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('fadeIn');
  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener('click', function () {
    let children = document.querySelectorAll('.answerList');
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.weblitAnimation = 'fadeOut 0.5s';
      children[i].style.animation = 'fadeOut 0.5s';
    }
    setTimeout(() => {
      const target = qnaList[qIdx].a[idx].type;
      for (let j = 0; j < target.length; j++) {
        select[target[j]] += 1;
      }
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 400);
  }, false);
}

function goResult() {
  qna.style.animation = 'fadeOut 1s both';
  setTimeout(() => {
    result.style.animation = 'fadeIn 1s both';
    qna.style.display = 'none';
    result.style.display = 'block';
    setResult(); 
  }, 1000); 
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }

  const q = document.querySelector('.qBox');

  if (qnaList[qIdx]) {
    q.innerHTML = qnaList[qIdx].q;
    const a = document.querySelector('.answerBox');

    for (let i in qnaList[qIdx].a) {
      addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }

    const status = document.querySelector('.statusbar');
    status.style.width = ((100 / endPoint) * (qIdx + 1)) + '%';
  }
}

function begin() {
  main.style.animation = 'fadeOut 1s both';
  setTimeout(() => {
    qna.style.animation = 'fadeIn 1s both';
    setTimeout(() => {
      main.style.display = 'none';
      qna.style.display = 'block';
    }, 500);

    goNext(qIdx);
  }, 500);
}
