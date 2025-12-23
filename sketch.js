let stopSheet;
let walkSheet;
let attackSheet;
let questionBank; // 儲存從 CSV 載入的題庫
let questionBank2; // 新增：儲存給小露的第二個題庫
let askSheet;
let runSheet2;
let fallDownSheet2;
let stopSheet3; // 角色3的圖片精靈
let stopSheet4; // 角色4的圖片精靈
let askSheet4; // 角色4的說話圖片精靈
let stopSheet5; // 角色5的圖片精靈
let askSheet5; // 角色5的說話圖片精靈
let bgImage; // 新增：背景圖片
let imagesLoaded = false;
let bgMusic; // 新增：背景音樂
let musicHasStarted = false; // 新增：音樂是否已開始播放的旗標

let leaves = []; // 新增：用來儲存所有葉子物件的陣列
const numLeaves = 100; // 新增：葉子的數量

let charX, charY; // 用來儲存角色的位置
let char2X, char2Y; // 新增角色的位置
let char3X, char3Y; // 角色3的位置
let char4X, char4Y; // 角色4的位置
let char5X, char5Y; // 角色5的位置
let facingDirection = 1; // 角色面向的方向：1 是右邊, -1 是左邊 
let char2FacingDirection = 1; // 角色2的面向：1 是右邊, -1 是左邊
let char4FacingDirection = 1; // 角色4的面向: 1 是右邊, -1 是左邊
let char5FacingDirection = 1; // 角色5的面向: 1 是右邊, -1 是左邊
let char5State = 'idle'; // 角色5的狀態: 'idle', 'asking', 'giving_hint', 'declined_hint'
let char5HintCount = 0; // 新增：記錄角色5提示次數
let char4State = 'idle'; // 角色4的狀態: 'idle', 'asking', 'giving_hint', 'declined_hint'
let bgX = 0; // 新增：背景的 X 座標
let char3FacingDirection = 1; // 角色3的面向，設為圖片原始方向 (朝右)
let charState = 'idle'; // 角色狀態: 'idle', 'walking', 'attacking'
let attackFrameCounter = 0; // 攻擊動畫的計數器
let char2State = 'idle'; // 角色2的狀態: 'idle', 'running'
let hit2FrameCounter = 0; // 角色2受擊動畫的計數器

let nameInput; // 用來儲存 p5.dom 的輸入框元素
let retryButton; // 答錯時顯示的「再作答一次」按鈕
let acceptChallengeButton; // 接受小露考驗的按鈕
let declineChallengeButton; // 拒絕小露考驗的按鈕
let char4AcceptButton; // 角色4的接受按鈕
let char4DeclineButton; // 角色4的拒絕按鈕
let char5AcceptButton; // 角色5的接受按鈕
let char5DeclineButton; // 角色5的拒絕按鈕
let playAgainButton; // 新增：通關後再玩一次的按鈕
let dialogueState = 'none'; // 對話狀態: 'none', 'asking', 'answered', 'battle', 'victory_question', 'quiz_wait', 'quiz_question', 'quiz_feedback', 'quiz_retry', 'challenge_小露', 'quiz_success_final'
let challengeMessageFrame = 0; // 用來計時挑戰失敗訊息的顯示
let playerName = ''; // 用來儲存玩家輸入的名字
let char2MaxHealth = 5; // 角色二的最大血量
let char2CurrentHealth = 5; // 角色二的當前血量
let hasHitThisAttack = false; // 用來防止單次攻擊重複計分
let char5HintText = ''; // 角色5的提示文字
let char5HintFrame = 0; // 角色5提示的計時器
let char4HintText = ''; // 角色4的提示文字
let char4HintFrame = 0; // 角色4提示的計時器
let answeredFrame = 0; // 用來計時對話框的顯示
let victoryFrame = 0; // 用來計時勝利訊息的顯示，以觸發問答
let feedbackFrame = 0; // 用來計時問答回饋的顯示
let textBoxText = ''; // 將 textBoxText 提升為全域變數
let currentQuestion; // 儲存當前抽到的題目物件
let currentQuestion2; // 新增：儲存從小露題庫抽到的題目

// 新增：任務系統變數
let missionStage = 0; // 0: 尋找洛亞, 1: 尋找小露, 2: 完成
let missionCompleted = false; // 當前任務是否完成
let missionTimer = 0; // 任務完成後的計時器
let gameState = 'loading'; // 修改：初始狀態為 loading
let loadingStartTime = 0; // 新增：載入畫面計時
let rulesStartTime = 0; // 新增：規則畫面計時
let gameStartTime = 0; // 新增：遊戲開始計時
let gameEndTime = 0; // 新增：遊戲結束計時
let startButton; // 新增：開始遊戲按鈕
let confettis = []; // 新增：彩帶陣列
let loyaOptionButtons = []; // 新增：洛亞的選項按鈕陣列
let explosionParticles = []; // 新增：爆炸粒子陣列
let sideQuestOpen = false; // 新增：支線任務框是否展開
let sq1Completed = false; // 新增：支線任務1完成狀態 (喵老師)
let sq2Completed = false; // 新增：支線任務2完成狀態 (小熙)
let playerHeadImg; // 新增：玩家頭貼
let screenShake = 0; // 新增：螢幕震動強度
let feedbackOverlayAlpha = 0; // 新增：回饋特效遮罩透明度
let feedbackOverlayColor = [0, 0, 0]; // 新增：回饋特效遮罩顏色

const moveSpeed = 4; // 角色移動速度


// 站立動畫的設定
const stopSpriteWidth = 880; // 站立圖片精靈的總寬度
const stopTotalFrames = 10;
const stopFrameH = 160; // 單一影格的高度

// 走路動畫的設定 (517px / 3 frames = 172.33px)
const walkTotalFrames = 3;
const walkSpriteWidth = 517; // 走路圖片精靈的總寬度
const walkFrameH = 156; // 走路動畫單一影格的高度

// 攻擊動畫的設定 (5275px / 12 frames)
const attackTotalFrames =15;
const attackSpriteWidth = 5275;
const attackFrameH = 198;

// 新增角色(ask)動畫的設定
const askTotalFrames = 12;
const askSpriteWidth = 2260;
const askFrameH = 175;

// 角色2(run)動畫的設定 - 請根據您的 run.png 檔案修改這些值
const run2TotalFrames = 4;
const run2SpriteWidth = 737;
const run2FrameH = 142;

// 角色2(fall-down)動畫的設定
const fallDown2TotalFrames = 5;
const fallDown2SpriteWidth = 1005;
const fallDown2FrameH = 223;

// 角色3(stop)動畫的設定
const stop3TotalFrames = 5;
const stop3SpriteWidth = 235;
const stop3FrameH = 61;

// 角色4(stop)動畫的設定
const stop4TotalFrames = 9;
const stop4SpriteWidth = 391;
const stop4FrameH = 88;

// 角色4(ask)動畫的設定
const ask4TotalFrames = 9;
const ask4SpriteWidth = 553;
const ask4FrameH = 89;

// 角色5(stop)動畫的設定
const stop5TotalFrames = 8;
const stop5SpriteWidth = 419;
const stop5FrameH = 58;

// 角色5(ask)動畫的設定
const ask5TotalFrames = 9;
const ask5SpriteWidth = 610; // 修正為圖片實際寬度
const ask5FrameH = 70;       // 修正為圖片實際高度

const scaleFactor = 2; // 放大倍率，可依喜好調整
const scaleFactor4 = 3; // 角色4的放大倍率
const scaleFactor5 = 3; // 角色5的放大倍率
const animSpeed = 5; // 動畫速度，數字越小動畫越快 (每 4 個 draw() 迴圈換一幀)
const animSpeed3 = 10; // 角色3的動畫速度，數字越大越慢

// --- 新增：葉子粒子類別 ---
class Leaf {
  constructor() {
    // 初始化葉子的隨機位置和屬性
    this.x = random(width);
    this.y = random(-height, 0); // 從畫面上方開始
    this.size = random(5, 15);
    this.speedY = random(1, 3); // 垂直速度
    this.speedX = random(-0.5, 0.5); // 水平飄移速度
    this.rotation = random(TWO_PI); // 初始旋轉角度
    this.rotationSpeed = random(-0.02, 0.02); // 旋轉速度
    // 葉子的顏色 (棕色、橘色、黃色系)
    this.color = color(random(150, 220), random(50, 120), 20, 200); 
  }

  // 更新葉子位置和旋轉
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    // 如果葉子飄出畫面底部，則重置到頂部
    if (this.y > height + this.size) {
      this.reset();
    }
  }

  // 繪製葉子
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    noStroke();
    fill(this.color);
    ellipse(0, 0, this.size, this.size / 2); // 用橢圓形模擬葉片
    pop();
  }

  // 重置葉子到畫面上方
  reset() {
    this.y = random(-100, 0);
    this.x = random(width);
  }
}

// 新增：彩帶類別
class Confetti {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.size = random(5, 10);
    this.color = color(random(255), random(255), random(255));
    this.speedY = random(2, 5);
    this.speedX = random(-2, 2);
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.1, 0.1);
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y > height) {
      this.y = random(-100, 0);
      this.x = random(width);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    noStroke();
    fill(this.color);
    rect(0, 0, this.size, this.size * 1.5); // 長方形彩帶
    pop();
  }
}

// 新增：爆炸粒子類別
class ExplosionParticle {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.color = col;
    const angle = random(TWO_PI);
    const speed = random(2, 10);
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;
    this.alpha = 255;
    this.decay = random(2, 5);
    this.gravity = 0.2;
    this.size = random(3, 8);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= this.decay;
  }

  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

function preload() {
  // 載入題庫 CSV，並指定有 header
  questionBank = loadTable(
    'questions.csv', 'csv', 'header',
    () => { checkAllImagesLoaded(); },
    (err) => { console.error('載入 questions.csv 失敗，請確認路徑與檔案是否存在：', err); }
  );
  // 新增：載入小露的題庫
  questionBank2 = loadTable(
    'questions2.csv', 'csv', 'header',
    () => { checkAllImagesLoaded(); },
    (err) => { console.error('載入 questions2.csv 失敗，請確認路徑與檔案是否存在：', err); }
  );
  // 使用載入成功/失敗回呼並把回傳的 img 指定回全域變數，確保取得正確的寬度/高度
  stopSheet = loadImage(
    '1/stop/stop.png',
    (img) => { stopSheet = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 stop.png 失敗，請確認路徑：', '1/stop/stop.png', err); }
  );
  walkSheet = loadImage(
    '1/walk/walk.png',
    (img) => { walkSheet = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 walk.png 失敗，請確認路徑：', '1/walk/walk.png', err); }
  );
  attackSheet = loadImage(
    '1/attrack/attrack.png',
    (img) => { attackSheet = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 attrack.png 失敗，請確認路徑：', '1/attrack/attrack.png', err); }
  );
  askSheet = loadImage(
    '2/ask/ask.png',
    (img) => { askSheet = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 ask.png 失敗，請確認路徑：', '2/ask/ask.png', err); }
  );
  runSheet2 = loadImage(
    '2/run/run.png',
    (img) => { runSheet2 = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 run.png 失敗，請確認路徑：', '2/run/run.png', err); }
  );
  fallDownSheet2 = loadImage(
    '2/fall-down/fall-down.png',
    (img) => { fallDownSheet2 = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 fall-down.png 失敗，請確認路徑：', '2/fall-down/fall-down.png', err); }
  );
  stopSheet3 = loadImage(
    '3/stop/stop.png',
    (img) => { stopSheet3 = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 stop.png (角色3) 失敗，請確認路徑：', '3/stop/stop.png', err); }
  );
  stopSheet4 = loadImage(
    '4/stop/stop.png',
    (img) => { stopSheet4 = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 stop.png (角色4) 失敗，請確認路徑：', '4/stop/stop.png', err); }
  );
  askSheet4 = loadImage(
    '4/ask/ask.png',
    (img) => { askSheet4 = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 ask.png (角色4) 失敗，請確認路徑：', '4/ask/ask.png', err); }
  );
  stopSheet5 = loadImage(
    '5/stop/stop.png',
    (img) => { stopSheet5 = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 stop.png (角色5) 失敗，請確認路徑：', '5/stop/stop.png', err); }
  );
  askSheet5 = loadImage(
    '5/ask/ask.png',
    (img) => { askSheet5 = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 ask.png (角色5) 失敗，請確認路徑：', '5/ask/ask.png', err); }
  );
  // 新增：載入背景圖片
  bgImage = loadImage(
    'background_1.png',
    (img) => { bgImage = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 background_1.png 失敗，請確認路徑：', 'background_1.png', err); }
  );
  // 新增：載入玩家頭貼
  playerHeadImg = loadImage(
    '1/head/0.png',
    (img) => { playerHeadImg = img; checkAllImagesLoaded(); },
    (err) => { console.error('載入 0.png (玩家頭貼) 失敗，請確認路徑：', '1/head/0.png', err); }
  );
  // 新增：載入背景音樂
  bgMusic = loadSound(
    'game-gaming-minecraft-background-music-362185.mp3',
    () => { console.log('音樂載入成功'); },
    (err) => { console.error('載入音樂失敗，請確認檔名與路徑', err); }
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  imageMode(CENTER);
  noSmooth(); // 讓像素風格的圖片放大後保持清晰，不會模糊
  charX = width / 2; // 角色初始 X 位置 (固定在畫面中央)
  charY = height / 2; // 角色初始 Y 位置
  char2X = width * 0.33; // 新角色初始 X 位置
  char2Y = height / 2; // 新角色初始 Y 位置
  char3X = width * 1; // 角色3初始 X 位置 (畫布右方)
  char3Y = height / 2; // 角色3初始 Y 位置
  char4X = width * 0.05; // 角色4初始 X 位置 (再往左移)
  char4Y = height / 2; // 角色4初始 Y 位置
  char5X = width * 0.75; // 角色5初始 X 位置 (在角色4左邊)
  char5Y = height / 2; // 角色5初始 Y 位置

  // 創建輸入框並在初始時隱藏
  nameInput = createInput();
  nameInput.position(-width, -height); // 先移出畫面避免閃爍
  nameInput.size(150);
  nameInput.hide();

  // 創建「再作答一次」按鈕並在初始時隱藏
  retryButton = createButton('再作答一次');
  retryButton.position(-width, -height);
  retryButton.mousePressed(retryQuestion); // 綁定點擊事件
  retryButton.hide();

  // 創建小露的考驗按鈕
  acceptChallengeButton = createButton('沒問題');
  acceptChallengeButton.position(-width, -height);
  acceptChallengeButton.mousePressed(acceptChallenge);
  // 新增：設定按鈕樣式
  acceptChallengeButton.style('background-color', '#D2B48C');
  acceptChallengeButton.style('color', '#4a2c2a');
  acceptChallengeButton.style('border', '2px solid #8B4513');
  acceptChallengeButton.style('border-radius', '5px');
  acceptChallengeButton.style('padding', '5px 10px');
  acceptChallengeButton.hide();

  declineChallengeButton = createButton('嗯...我再想想');
  declineChallengeButton.position(-width, -height);
  declineChallengeButton.mousePressed(declineChallenge);
  // 新增：設定按鈕樣式
  declineChallengeButton.style('background-color', '#D2B48C');
  declineChallengeButton.style('color', '#4a2c2a');
  declineChallengeButton.style('border', '2px solid #8B4513');
  declineChallengeButton.style('border-radius', '5px');
  declineChallengeButton.style('padding', '5px 10px');
  declineChallengeButton.hide();

  // 創建角色4的選項按鈕
  char4AcceptButton = createButton('好哇，她感覺很善良');
  char4AcceptButton.position(-width, -height);
  char4AcceptButton.mousePressed(char4Accept);
  // 新增：設定按鈕樣式
  char4AcceptButton.style('background-color', '#D2B48C'); // 棕褐色背景
  char4AcceptButton.style('color', '#4a2c2a');           // 深棕色文字
  char4AcceptButton.style('border', '2px solid #8B4513'); // 邊框顏色
  char4AcceptButton.style('border-radius', '5px');       // 圓角
  char4AcceptButton.style('padding', '5px 10px');        // 內邊距
  char4AcceptButton.hide();

  char4DeclineButton = createButton('不要好了...');
  char4DeclineButton.position(-width, -height);
  char4DeclineButton.mousePressed(char4Decline);
  // 新增：設定按鈕樣式
  char4DeclineButton.style('background-color', '#D2B48C');
  char4DeclineButton.style('color', '#4a2c2a');
  char4DeclineButton.style('border', '2px solid #8B4513');
  char4DeclineButton.style('border-radius', '5px');
  char4DeclineButton.style('padding', '5px 10px');
  char4DeclineButton.hide();

  // 創建角色5的選項按鈕
  char5AcceptButton = createButton('好');
  char5AcceptButton.position(-width, -height);
  char5AcceptButton.mousePressed(char5Accept);
  char5AcceptButton.style('background-color', '#ffccd5'); // 淡粉色背景
  char5AcceptButton.style('color', '#da627d');           // 深粉色文字
  char5AcceptButton.style('border', '2px solid #da627d'); // 邊框顏色
  char5AcceptButton.style('border-radius', '5px');       // 圓角
  char5AcceptButton.style('padding', '5px 10px');        // 內邊距
  char5AcceptButton.hide();

  char5DeclineButton = createButton('不了');
  char5DeclineButton.position(-width, -height);
  char5DeclineButton.mousePressed(char5Decline);
  char5DeclineButton.style('background-color', '#ffccd5');
  char5DeclineButton.style('color', '#da627d');
  char5DeclineButton.style('border', '2px solid #da627d');
  char5DeclineButton.style('border-radius', '5px');
  char5DeclineButton.style('padding', '5px 10px');
  char5DeclineButton.hide();

  // 新增：創建「再遊玩一次」按鈕
  playAgainButton = createButton('再遊玩一次');
  playAgainButton.position(-width, -height);
  playAgainButton.mousePressed(() => location.reload()); // 點擊後重新載入頁面
  playAgainButton.style('background-color', '#a2d2ff');
  playAgainButton.style('color', '#003049');
  playAgainButton.style('border', '2px solid #003049');
  playAgainButton.style('border-radius', '8px');
  playAgainButton.style('padding', '10px 20px');
  playAgainButton.hide();

  // 新增：創建「開始遊戲」按鈕
  startButton = createButton('開始遊戲');
  startButton.position(width / 2 - 50, height / 2 + 50);
  startButton.size(100, 40);
  startButton.mousePressed(() => {
    gameState = 'rules_screen';
    rulesStartTime = millis();
    startButton.hide();
  });
  startButton.style('font-size', '18px');
  startButton.style('background-color', '#D2B48C');
  startButton.style('color', '#8B4513');
  startButton.style('border-radius', '8px');
  startButton.hide();

  // 新增：創建洛亞的選項按鈕
  for (let i = 0; i < 4; i++) {
    let btn = createButton('');
    btn.position(-width, -height);
    btn.mousePressed(() => checkLoyaAnswer(i));
    btn.style('background-color', '#D2B48C');
    btn.style('color', '#4a2c2a');
    btn.style('border', '2px solid #8B4513');
    btn.style('border-radius', '5px');
    btn.style('padding', '5px 10px');
    btn.style('width', '300px');
    btn.style('text-align', 'left');
    btn.hide();
    loyaOptionButtons.push(btn);
  }

  loadingStartTime = millis();

  // --- 新增：初始化葉子 ---
  for (let i = 0; i < numLeaves; i++) {
    leaves.push(new Leaf());
  }
}

// 新增：觸發答錯特效 (震動 + 紅色閃爍)
function triggerWrongEffect() {
  screenShake = 10; // 設定震動強度
  feedbackOverlayColor = [255, 0, 0]; // 紅色
  feedbackOverlayAlpha = 100; // 初始透明度
}

// 新增：觸發答對特效 (綠色閃爍)
function triggerCorrectEffect() {
  feedbackOverlayColor = [0, 255, 0]; // 綠色
  feedbackOverlayAlpha = 100;
}

function checkAllImagesLoaded() {
  if (stopSheet?.width && walkSheet?.width && attackSheet?.width && askSheet?.width && runSheet2?.width && fallDownSheet2?.width && stopSheet3?.width && stopSheet4?.width && askSheet4?.width && stopSheet5?.width && askSheet5?.width && questionBank?.columns && questionBank2?.columns && bgImage?.width && playerHeadImg?.width) imagesLoaded = true;
}

function draw() {
  // 新增：檢查遊戲是否已通關
  if (gameState === 'completed') {
    drawCompletionScreen();
    return; // 如果已通關，只繪製通關畫面，並停止後續所有遊戲邏輯
  }

  // --- 新增：震動特效邏輯 ---
  if (screenShake > 0) {
    translate(random(-screenShake, screenShake), random(-screenShake, screenShake));
    screenShake *= 0.9; // 震動衰減
    if (screenShake < 1) screenShake = 0;
  }

  // --- 繪製連續捲動背景 ---
  // 計算縮放後的背景寬高，使其填滿畫布高度
  const bgScaledHeight = height;
  const bgScale = bgScaledHeight / bgImage.height;
  const bgScaledWidth = floor(bgImage.width * bgScale); // 使用 floor() 將寬度取為整數，避免浮點數誤差

  // 使用取餘數 (%) 的方式來實現無限循環捲動，效果更平滑
  // offsetX 會在 0 到 bgScaledWidth 之間循環
  // 修正負數取餘數的問題，確保 offsetX 永遠是正數，避免捲動時產生 1px 的縫隙
  let offsetX = bgX % bgScaledWidth;
  if (offsetX < 0) { offsetX += bgScaledWidth; }

  // 繪製三張圖片：中間、左邊、右邊
  image(bgImage, offsetX, height / 2, bgScaledWidth, bgScaledHeight);
  image(bgImage, offsetX - bgScaledWidth, height / 2, bgScaledWidth, bgScaledHeight);
  image(bgImage, offsetX + bgScaledWidth, height / 2, bgScaledWidth, bgScaledHeight);
  // --- 背景繪製結束 ---

  // --- 新增：繪製並更新落葉 ---
  for (let leaf of leaves) {
    leaf.update();
    leaf.display();
  }
  // --- 落葉繪製結束 ---

  if (!imagesLoaded) {
    push();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    text('圖片尚未載入或路徑錯誤。請檢查 Console 的 404/Network。', width/2, height/2);
    pop();
    return;
  }

  // 新增：處理開場流程 (載入 -> 開始 -> 規則)
  if (gameState === 'loading') {
    drawLoadingScreen();
    return;
  } else if (gameState === 'start_screen') {
    drawStartScreen();
    return;
  } else if (gameState === 'rules_screen') {
    drawRulesScreen();
    return;
  }

  // --- 角色1狀態管理 ---
  let currentSheet, frameW, frameH, totalFrames;

  // 如果正在攻擊，就不能被走路中斷
  if (charState !== 'attacking') {
    if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
      charState = 'walking';
    } else if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
      charState = 'walking';
    } else {
      charState = 'idle';
    }
  }

  // 根據狀態設定動畫和行為
  if (charState === 'attacking') {
    currentSheet = attackSheet;
    frameW = Math.floor(attackSpriteWidth / attackTotalFrames);
    frameH = attackFrameH;
    totalFrames = attackTotalFrames;

    // 當動畫播放完畢
    if (attackFrameCounter >= totalFrames * animSpeed) {
      attackFrameCounter = 0; // 重置計數器給下一個動畫
      charState = 'idle'; // ***攻擊結束後，回到站立狀態***
    } else {
      attackFrameCounter++;
    }
  } else if (charState === 'walking') {
    if (keyIsDown(RIGHT_ARROW)) {
      currentSheet = walkSheet;
      frameW = Math.floor(walkSpriteWidth / walkTotalFrames);
      frameH = walkFrameH;
      totalFrames = walkTotalFrames;
      bgX -= moveSpeed; // 背景向左移動
      facingDirection = 1;
    } else if (keyIsDown(LEFT_ARROW)) {
      currentSheet = walkSheet;
      frameW = Math.floor(walkSpriteWidth / walkTotalFrames);
      frameH = walkFrameH;
      totalFrames = walkTotalFrames;
      bgX += moveSpeed; // 背景向右移動
      facingDirection = -1;
    }
  } else { // idle
    currentSheet = stopSheet;
    frameW = Math.floor(stopSpriteWidth / stopTotalFrames);
    frameH = stopFrameH;
    totalFrames = stopTotalFrames;
  }

  // --- 角色2狀態管理 (位置會受背景移動影響) ---
  // 'hit' 狀態有最高優先級，動畫播放完前不能被打斷
  if (char2State === 'hit') {
    if (hit2FrameCounter >= fallDown2TotalFrames * animSpeed) {
      hit2FrameCounter = 0;
      char2State = 'idle'; // 受擊動畫結束後，回到待機狀態
    } else {
      hit2FrameCounter++;
    }
  } else { // 只有在非受擊狀態下，才能移動或待機
    if (keyIsDown(68) && !keyIsDown(65)) { // 'D' key
      char2State = 'running';
      char2FacingDirection = 1; // 角色2的移動不受背景影響，保持獨立
      char2X += moveSpeed;
    } else if (keyIsDown(65) && !keyIsDown(68)) { // 'A' key
      char2State = 'running';
      char2FacingDirection = -1; // 角色2的移動不受背景影響，保持獨立
      char2X -= moveSpeed;
    } else {
      char2State = 'idle';
    }
  }

  // --- 繪製左邊的新角色 ---
  let char2Sheet, char2FrameW, char2TotalFrames, char2FrameH;
  let char2CurrentFrame;

  if (char2State === 'hit') {
    char2Sheet = fallDownSheet2;
    char2FrameW = Math.floor(fallDown2SpriteWidth / fallDown2TotalFrames);
    char2TotalFrames = fallDown2TotalFrames;
    char2FrameH = fallDown2FrameH;
    char2CurrentFrame = floor(hit2FrameCounter / animSpeed);
  } else if (char2State === 'running') {
    char2Sheet = runSheet2;
    char2FrameW = Math.floor(run2SpriteWidth / run2TotalFrames);
    char2TotalFrames = run2TotalFrames;
    char2FrameH = run2FrameH;
  } else {
    char2Sheet = askSheet;
    char2FrameW = Math.floor(askSpriteWidth / askTotalFrames);
    char2TotalFrames = askTotalFrames;
    char2FrameH = askFrameH;

    // 只有在待機時，才根據角色1的位置自動轉向
    if (charX < (char2X + bgX)) {
      char2FacingDirection = -1; // 角色1在左邊，角色2朝左
    } else {
      char2FacingDirection = 1; // 角色1在右邊，角色2朝右 (恢復原狀)
    }
  }

  // 如果不是受擊狀態，則使用通用的循環動畫計算方式
  if (char2State !== 'hit') {
    char2CurrentFrame = floor(frameCount / animSpeed) % char2TotalFrames;
  }
  const char2Sx = char2CurrentFrame * char2FrameW;
  const char2Sy = 0;

  push();
  translate(char2X + bgX, char2Y); // 角色2的位置需要加上背景的偏移量
  scale(char2FacingDirection, 1); // 根據面向翻轉角色2
  image(
    char2Sheet,
    0, 0, // 因為已經 translate，所以在新原點 (0,0) 繪製
    char2FrameW * scaleFactor,
    char2FrameH * scaleFactor,
    char2Sx, char2Sy,
    char2FrameW, char2FrameH
  );
  pop();
  // --- 新角色繪製結束 ---

  // --- 繪製角色2的名稱 ---
  push();
  const nameYOffset2 = - (askFrameH * scaleFactor) / 2 - 20; // 使用固定高度避免跳動
  textSize(22);
  textAlign(CENTER, CENTER);
  stroke(0);
  strokeWeight(4);
  fill('#c77dff');
  text('洛亞', char2X + bgX - 50, char2Y + nameYOffset2);
  pop();

  // --- 繪製角色3 (位置會受背景移動影響) ---
  const char3Sheet = stopSheet3;
  const char3FrameW = Math.floor(stop3SpriteWidth / stop3TotalFrames);
  const char3FrameH = stop3FrameH;
  const char3CurrentFrame = floor(frameCount / animSpeed3) % stop3TotalFrames;
  const char3Sx = char3CurrentFrame * char3FrameW;
  const char3Sy = 0;

  push();
  translate(char3X + bgX, char3Y); // 角色3的位置需要加上背景的偏移量
  scale(char3FacingDirection, 1); // 直接使用 scale 翻轉
  image(
    char3Sheet,
    0, 0, // 因為是 CENTER 模式，在原點繪製即可
    char3FrameW * scaleFactor,
    char3FrameH * scaleFactor,
    char3Sx, char3Sy,
    char3FrameW, char3FrameH
  );
  pop();
  // --- 角色3繪製結束 ---

  // --- 繪製角色3的名稱 (位置會受背景移動影響) ---
  push();
  // 計算文字應該在的位置 (角色3頭頂上方)
  const nameYOffset = - (char3FrameH * scaleFactor) / 2 - 20;

  // 設定文字樣式
  textSize(22);
  textAlign(CENTER, CENTER);
  stroke(0);       // 黑色外框
  strokeWeight(4); // 外框粗細

  // 使用 HSB 色彩模式來產生彩虹效果
  colorMode(HSB, 360, 100, 100);
  const hue = frameCount % 360; // 色相隨時間變化 (0-360)
  fill(hue, 90, 100); // 設定飽和度和亮度都較高的顏色

  // 在角色3頭上繪製文字
  text('小露', char3X + bgX, char3Y + nameYOffset);
  pop(); // 恢復原本的繪圖設定 (包含色彩模式會變回 RGB)
  // --- 角色3名稱繪製結束 ---

  // --- 角色4狀態管理 ---
  const proximityThreshold4 = 150; // 觸發角色4動畫切換的距離
  const distance4 = abs(charX - (char4X + bgX)); // 計算距離時要考慮背景位移
  const char4ScreenX = char4X + bgX;
  const textYOffset4 = - (ask4FrameH * scaleFactor4) / 2 - 120; // 將對話框再往上移，避免與名字重疊

  if (distance4 < proximityThreshold4) {
    if (char4State === 'idle') {
      char4State = 'asking';
    }

    if (char4State === 'asking') {
      drawTextBox('我來考你幾題幫你練習吧!', char4ScreenX, char4Y, textYOffset4);

      // 在角色4下方顯示選項按鈕
      const buttonY = char4Y + (ask4FrameH * scaleFactor4) / 2 + 10;
      char4AcceptButton.position(char4ScreenX - char4AcceptButton.width - 5, buttonY);
      char4DeclineButton.position(char4ScreenX + 5, buttonY);
      char4AcceptButton.show();
      char4DeclineButton.show();
    } else if (char4State === 'quiz_question') {
      drawTextBox(currentQuestion2.getString('題目'), char4ScreenX, char4Y, textYOffset4);
      nameInput.position(char4ScreenX - nameInput.width / 2, char4Y + textYOffset4 + 40);
      nameInput.show();
    } else if (char4State === 'quiz_feedback') {
      drawTextBox(textBoxText, char4ScreenX, char4Y, textYOffset4, '#155724', '#d4edda'); // 答對顯示綠色系
      // 顯示回饋 3 秒後，重置狀態
      if (frameCount > feedbackFrame + 180) {
        char4State = 'idle';
      }
    } else if (char4State === 'quiz_retry') {
      drawTextBox(textBoxText, char4ScreenX, char4Y, textYOffset4, '#721c24', '#f8d7da'); // 答錯顯示紅色系
      const buttonX = char4ScreenX - retryButton.width / 2;
      const buttonY = char4Y + textYOffset4 - 35;
      retryButton.position(buttonX, buttonY);
      retryButton.show();
    }
  } else {
    char4State = 'idle';
    // 離開時隱藏按鈕
    char4AcceptButton.hide();
    char4DeclineButton.hide();
    nameInput.hide();
    retryButton.hide();
  }

  // 根據角色1的位置自動轉向
  if (charX < (char4X + bgX)) {
    char4FacingDirection = -1; // 角色1在左邊，角色4朝左
  } else {
    char4FacingDirection = 1; // 角色1在右邊，角色4朝右
  }

  // --- 繪製角色4 (位置會受背景移動影響) ---
  let char4Sheet, char4FrameW, char4FrameH, char4TotalFrames;

  // 當小熙在互動時 (提問、給提示、被拒絕)，都使用 'ask' 動畫
  if (char4State.startsWith('quiz_') || char4State === 'asking' || char4State === 'declined_hint') {
    char4Sheet = askSheet4;
    char4FrameW = Math.floor(ask4SpriteWidth / ask4TotalFrames);
    char4FrameH = ask4FrameH;
    char4TotalFrames = ask4TotalFrames;
  } else { // idle
    char4Sheet = stopSheet4;
    char4FrameW = Math.floor(stop4SpriteWidth / stop4TotalFrames);
    char4FrameH = stop4FrameH;
    char4TotalFrames = stop4TotalFrames;
  }

  const char4CurrentFrame = floor(frameCount / animSpeed) % char4TotalFrames;
  const char4Sx = char4CurrentFrame * char4FrameW;
  const char4Sy = 0;

  push();
  translate(char4X + bgX, char4Y); // 角色4的位置需要加上背景的偏移量
  scale(char4FacingDirection, 1); // 根據面向翻轉角色4
  image(
    char4Sheet,
    0, 0, // 因為是 CENTER 模式，在原點繪製即可
    char4FrameW * scaleFactor4,
    char4FrameH * scaleFactor4,
    char4Sx, char4Sy,
    char4FrameW, char4FrameH
  );
  pop();
  // --- 角色4繪製結束 ---

  // --- 繪製角色4的名稱 (位置會受背景移動影響) ---
  push();
  // 計算文字應該在的位置 (角色4頭頂上方)
  const nameYOffset4 = - (char4FrameH * scaleFactor4) / 2 - 20;

  // 設定文字樣式
  textSize(22);
  textAlign(CENTER, CENTER);
  stroke(0);       // 黑色外框
  strokeWeight(4); // 外框粗細

  // 使用 HSB 色彩模式來產生彩虹效果
  colorMode(HSB, 360, 100, 100);
  // 加上 180 的偏移，讓顏色變化與小露錯開
  const hue4 = (frameCount + 180) % 360; 
  fill(hue4, 90, 100); // 設定飽和度和亮度都較高的顏色

  // 在角色4頭上繪製文字
  text('小熙', char4X + bgX, char4Y + nameYOffset4);
  pop(); // 恢復原本的繪圖設定 (包含色彩模式會變回 RGB)
  // --- 角色4名稱繪製結束 ---

  // --- 繪製角色5 (位置會受背景移動影響) ---
  // 根據角色1的位置自動轉向
  if (charX < (char5X + bgX)) {
    char5FacingDirection = -1; // 角色1在左邊，角色5朝左
  } else {
    char5FacingDirection = 1; // 角色1在右邊，角色5朝右
  }

  // 檢查距離並管理狀態
  const proximityThreshold5 = 150;
  const distance5 = abs(charX - (char5X + bgX));
  const char5ScreenX = char5X + bgX;
  const textYOffset5 = - (ask5FrameH * scaleFactor5) / 2 - 120; 

  if (distance5 < proximityThreshold5) {
    // 只有在閒置時才觸發對話
    if (char5State === 'idle') {
      if (char5HintCount >= 2) {
        char5State = 'no_more_hints';
      } else {
        char5State = 'asking';
      }
    }

    if (char5State === 'asking') {
      // 顯示提問對話框
      drawTextBox('需要我提示嗎喵', char5ScreenX, char5Y, textYOffset5, '#da627d', '#ffccd5');
      
      // 顯示選項按鈕
      const buttonY = char5Y + textYOffset5 + 40; // 放在對話框下方
      char5AcceptButton.position(char5ScreenX - char5AcceptButton.width - 5, buttonY);
      char5DeclineButton.position(char5ScreenX + 5, buttonY);
      char5AcceptButton.show();
      char5DeclineButton.show();
    } else if (char5State === 'giving_hint') {
      // 顯示提示文字
      drawTextBox(char5HintText, char5ScreenX, char5Y, textYOffset5, '#da627d', '#ffccd5');
      // 顯示 3 秒後回到 asking 狀態
      if (frameCount > char5HintFrame + 180) {
        char5State = 'asking';
      }
    }
    else if (char5State === 'declined_hint') {
      if (frameCount < char5HintFrame + 180) {
        drawTextBox('好吧，這是你的損失喵', char5ScreenX, char5Y, textYOffset5, '#da627d', '#ffccd5');
      }
    } else if (char5State === 'no_more_hints') {
      drawTextBox('我已經幫不了你了，自己加油喵', char5ScreenX, char5Y, textYOffset5, '#f12c0e', '#ffb3c1');
    }
  } else {
    // 玩家離開範圍，重置所有狀態和UI
    char5State = 'idle';
    char5AcceptButton.hide();
    char5DeclineButton.hide();
  }

  let char5Sheet, char5FrameW, char5FrameH, char5TotalFrames;
  // 當貓咪在互動時 (提問、給提示、被拒絕)，都使用 'ask' 動畫
  if (char5State === 'asking' || char5State === 'giving_hint' || char5State === 'declined_hint' || char5State === 'no_more_hints') {
    char5Sheet = askSheet5;
    char5FrameW = Math.floor(ask5SpriteWidth / ask5TotalFrames);
    char5FrameH = ask5FrameH;
    char5TotalFrames = ask5TotalFrames;
  } else {
    char5Sheet = stopSheet5;
    char5FrameW = Math.floor(stop5SpriteWidth / stop5TotalFrames);
    char5FrameH = stop5FrameH;
    char5TotalFrames = stop5TotalFrames;
  }

  const char5CurrentFrame = floor(frameCount / animSpeed) % char5TotalFrames;
  const char5Sx = char5CurrentFrame * char5FrameW;
  const char5Sy = 0;

  push();
  translate(char5X + bgX, char5Y); // 角色5的位置需要加上背景的偏移量
  scale(char5FacingDirection, 1); // 根據面向翻轉角色5
  image(
    char5Sheet,
    0, 0, // 因為是 CENTER 模式，在原點繪製即可
    char5FrameW * scaleFactor5, // 使用角色5專用的放大倍率
    char5FrameH * scaleFactor5,
    char5Sx, char5Sy,
    char5FrameW, char5FrameH
  );
  pop();
  // --- 角色5繪製結束 ---

  // --- 繪製角色5的名稱 (位置會受背景移動影響) ---
  push();
  // 計算文字應該在的位置 (角色5頭頂上方)
  // 使用當前動畫的影格高度來計算
  const nameYOffset5 = - (char5FrameH * scaleFactor5) / 2 - 20;

  // 設定文字樣式
  textSize(22);
  textAlign(CENTER, CENTER);
  stroke(0);       // 黑色外框
  strokeWeight(4); // 外框粗細
  fill('#c77dff'); // 設定為指定的紫色

  // 在角色5頭上繪製文字
  text('喵老師', char5X + bgX, char5Y + nameYOffset5);
  pop();
  // --- 角色5名稱繪製結束 ---

  // --- 檢查距離並顯示對話框 ---
  const proximityThreshold2 = 200; // 觸發與角色2對話框的距離
  const distance2 = abs(charX - (char2X + bgX)); // 計算距離時要考慮背景位移
  const proximityThreshold3 = 150;
  const distance3 = abs(charX - (char3X + bgX)); // 計算與角色3的距離

  // 勝利條件檢查
  if (dialogueState === 'battle' && char2CurrentHealth <= 0) { 
    dialogueState = 'victory_question';
  }
  // --- 與角色2的互動邏輯 ---
  if (distance2 < proximityThreshold2) {
    // 如果當前對話狀態是屬於角色3(小露)的，但玩家靠近了角色2，則重置狀態
    if (dialogueState.startsWith('challenge_') || dialogueState.startsWith('quiz2_')) {
      dialogueState = 'none';
      textBoxText = '';
    }

    if (dialogueState === 'none') {
      dialogueState = 'asking';
    }

    if (dialogueState === 'asking') {
      textBoxText = '你叫什麼名字';
      // 顯示並定位輸入框在角色1頭上
      nameInput.position(charX - nameInput.width / 2, charY - (frameH * scaleFactor) / 2 - 40);
      nameInput.show();
    } else if (dialogueState === 'answered') {
      textBoxText = `${playerName}，久仰大名，來戰鬥吧!`;
      nameInput.hide(); // 確保輸入框被隱藏

      // 在顯示完回答後，等待約3秒 (180幀) 後進入戰鬥狀態
      if (frameCount > answeredFrame + 180) {
        dialogueState = 'battle';
        char2CurrentHealth = char2MaxHealth; // 進入戰鬥時，重置血量
        textBoxText = ''; // 切換到戰鬥時，清空文字框內容
      }
    } else if (dialogueState === 'victory_question') {
      // 血量歸零後，顯示訊息，等待幾秒後再提問
      textBoxText = '接下來考考你頭腦如何';
      nameInput.hide(); // 確保此階段輸入框是隱藏的

      // 如果這是第一次進入此狀態，記錄當前幀數
      if (victoryFrame === 0) {
        victoryFrame = frameCount;
      }

      // 等待 4 秒 (240 幀) 後，再切換到提問狀態
      if (frameCount > victoryFrame + 240) {
        dialogueState = 'quiz_question';
        // 從題庫隨機抽一題
        // 新增：檢查題庫是否有資料，避免崩潰
        if (questionBank.getRowCount() > 0) {
          const questionIndex = floor(random(questionBank.getRowCount()));
          currentQuestion = questionBank.getRow(questionIndex);
          updateLoyaButtons(); // 新增：更新按鈕文字
        } else {
          console.error("題庫為空或載入失敗");
          dialogueState = 'none'; // 若無題目則取消對話
        }
      }
    } else if (dialogueState === 'quiz_question') {
      // 新增：確保 currentQuestion 存在才讀取
      if (currentQuestion) {
        textBoxText = currentQuestion.getString('題目');
      }
      nameInput.hide(); // 隱藏輸入框，改用按鈕

      // 顯示選項按鈕
      let startY = charY + 60;
      for (let i = 0; i < 4; i++) {
        let btn = loyaOptionButtons[i];
        btn.position(charX - 150, startY + i * 45);
        btn.show();
      }
    } else if (dialogueState === 'quiz_feedback') {
      // textBoxText 已經在 keyPressed() 中被設定為回饋文字
      nameInput.hide(); // 在顯示回饋時隱藏輸入框
      // 顯示答對回饋 3 秒 (180 幀) 後，進入最終訊息狀態
      if (frameCount > feedbackFrame + 180) {
        dialogueState = 'quiz_success_final';
        textBoxText = '你就是小露要找的人，快前進吧';
        feedbackFrame = frameCount; // 重置計時器給下一個狀態使用
      }
    } else if (dialogueState === 'quiz_success_final') {
      // 顯示最終訊息 3 秒後，結束對話
      if (frameCount > feedbackFrame + 180) {
        dialogueState = 'none';
        victoryFrame = 0; // 重置勝利計時器，為下一次戰鬥做準備
        textBoxText = '';
      }
    } else if (dialogueState === 'quiz_retry') {
      // 在此狀態下，textBoxText 已被設為答錯回饋
      // 按鈕的位置和顯示將在繪製對話框後處理
      nameInput.hide();
    } else if (dialogueState === 'battle') {
      // --- 繪製血量條 ---
      const healthBarWidth = 80;
      const healthBarHeight = 10;
      const healthBarYOffset = - (askFrameH * scaleFactor) / 2 - 50; // 在角色2頭頂上方 (避開名字)
      const currentHealthWidth = (healthBarWidth * char2CurrentHealth) / char2MaxHealth;

      push();
      translate(char2X + bgX - 50, char2Y); // 血量條跟隨角色2移動
      
      // 繪製血條背景 (紅色)
      fill(255, 0, 0);
      noStroke();
      rect(-healthBarWidth / 2, healthBarYOffset, healthBarWidth, healthBarHeight, 4);

      // 繪製當前血量 (綠色)
      fill(0, 255, 0);
      rect(-healthBarWidth / 2, healthBarYOffset, currentHealthWidth, healthBarHeight, 4);

      pop();
    }
    // 根據狀態繪製對話框
    if (textBoxText) {
      // 對話框Y軸偏移量，使其出現在角色2頭頂上方
      const textYOffset = - (askFrameH * scaleFactor) / 2 - 100;
      
      // 新增：根據狀態決定對話框顏色
      let txtCol = 0;
      let bgCol = null;
      if (dialogueState === 'quiz_feedback' || dialogueState === 'quiz_success_final') {
         txtCol = '#155724'; bgCol = '#d4edda'; // 綠色系
      } else if (dialogueState === 'quiz_retry') {
         txtCol = '#721c24'; bgCol = '#f8d7da'; // 紅色系
      }

      drawTextBox(textBoxText, char2X + bgX - 50, char2Y, textYOffset, txtCol, bgCol);

      // 如果是答錯重試狀態，在文字框上方顯示按鈕
      if (dialogueState === 'quiz_retry') {
        const buttonX = (char2X + bgX - 50) - retryButton.width / 2;
        const buttonY = char2Y + textYOffset - 35 / 2 - 35;
        retryButton.position(buttonX, buttonY);
        retryButton.show();
      }
    }

  // --- 與角色3的互動邏輯 ---
  } else if (dialogueState.startsWith('quiz2_')) {
      // 處理小露的問答流程
      const textYOffset = - (char3FrameH * scaleFactor) / 2 - 100; // 將問答UI再往上移
      
      // 新增：根據狀態決定顏色
      let txtCol = 0;
      let bgCol = null;
      if (dialogueState === 'quiz2_feedback') {
         txtCol = '#155724'; bgCol = '#d4edda';
      } else if (dialogueState === 'quiz2_retry') {
         txtCol = '#721c24'; bgCol = '#f8d7da';
      }
      drawTextBox(textBoxText, char3X + bgX, char3Y, textYOffset, txtCol, bgCol);

      if (dialogueState === 'quiz2_question') {
        // 顯示輸入框讓玩家回答問題
        nameInput.position((char3X + bgX) - nameInput.width / 2, char3Y + textYOffset + 40);
        nameInput.show();
      } else if (dialogueState === 'quiz2_feedback') {
        if (frameCount > feedbackFrame + 180) {
          declineChallenge(); // 結束對話
        }
      } else if (dialogueState === 'quiz2_retry') {
        const buttonX = (char3X + bgX) - retryButton.width / 2;
        const buttonY = char3Y + textYOffset - 35 - 10;
        retryButton.position(buttonX, buttonY);
        retryButton.show();
        // 新增：如果5秒內沒有點擊，則自動結束對話
        if (frameCount > feedbackFrame + 300) { // 5秒 (60fps * 5)
          declineChallenge();
        }
      }
  } else if (dialogueState === 'challenge_declined') {
      const textYOffset = - (char3FrameH * scaleFactor) / 2 - 100; // 將問答UI再往上移
      drawTextBox(textBoxText, char3X + bgX, char3Y, textYOffset); // 對話框位置也要加上背景位移
      // 顯示訊息 3 秒後重置
      if (frameCount > challengeMessageFrame + 180) {
        declineChallenge();
      }
  // --- 與角色3的互動邏輯 ---
  } else if (dialogueState === 'challenge_小露' || (abs(charX - (char3X + bgX)) < 150 && dialogueState === 'none')) {
    if (distance3 < proximityThreshold3 && dialogueState === 'none') { // 觸發條件
      dialogueState = 'challenge_小露';
    } else if (distance3 >= proximityThreshold3 && dialogueState === 'challenge_小露') {
      // 如果玩家在選擇時離開，則重置狀態
      declineChallenge();
    }

    if (dialogueState === 'challenge_小露') {
      // 當狀態為 'challenge_小露' 時，顯示初始提問文字
      const textYOffset = - (char3FrameH * scaleFactor) / 2 - 100;
      drawTextBox('準備好接受考驗了嗎?', char3X + bgX, char3Y, textYOffset);

      // 在角色1下方顯示按鈕
      acceptChallengeButton.position(charX - acceptChallengeButton.width - 5, charY + (frameH * scaleFactor) / 2 + 10);
      declineChallengeButton.position(charX + 5, charY + (frameH * scaleFactor) / 2 + 10);
      acceptChallengeButton.show();
      declineChallengeButton.show();
    }
  // 如果不靠近任何可互動角色 (2, 3, 4)，且不在戰鬥中，則重置狀態
  } else if (distance2 >= proximityThreshold2 && (dialogueState !== 'challenge_小露' && distance3 >= 150) && distance4 >= proximityThreshold4 && dialogueState !== 'battle') { 
    // 隱藏所有可能顯示的UI元素
    nameInput.hide();
    retryButton.hide();
    retryButton.mousePressed(retryQuestion); // 將按鈕事件綁定回原本的問答
    acceptChallengeButton.hide();
    declineChallengeButton.hide();
    textBoxText = ''; // 清空對話框
    loyaOptionButtons.forEach(btn => btn.hide()); // 隱藏洛亞的選項按鈕

    // 將遊戲狀態重設為初始狀態
    dialogueState = 'none';
    char2CurrentHealth = char2MaxHealth; // 重置血量
  }

  // 將繪製文字框的邏輯抽出來變成一個函式，方便重複使用
  function drawTextBox(txt, x, y, yOffset, textColor, bgColor) {
      if (!txt) return;
      push();
      translate(x, y);
      textSize(18);
      textAlign(CENTER, CENTER);
      const textW = textWidth(txt);
      const boxPadding = 10;
      const boxW = textW + boxPadding * 2;
      const boxH = 35;

      if (bgColor) {
        const c = color(bgColor);
        c.setAlpha(220); // 保持與預設樣式一致的透明度
        fill(c);
      } else {
        fill(255, 255, 255, 220); // 預設使用半透明白色
      }
      stroke(0);
      rect(-boxW / 2, yOffset - boxH / 2, boxW, boxH, 8);
      fill(textColor || 0);
      noStroke();
      text(txt, 0, yOffset);
      pop();
  }
  // 計算當前影格
  let currentFrame;
  if (charState === 'attacking') {
    // 讓攻擊動畫的每一幀都按順序播放，這樣角色和技能特效會一起出現並成長
    currentFrame = floor(attackFrameCounter / animSpeed);
  } else {
    currentFrame = floor(frameCount / animSpeed) % totalFrames;
  }
  const sx = currentFrame * frameW;
  const sy = 0;

  // 計算攻擊時的 Y 軸位移
  let yOffset = 0;
  if (charState === 'attacking') {
    // 使用 sin 函式製造一個從 0 -> 峰值 -> 0 的平滑上下移動曲線
    const currentAttackFrame = floor(attackFrameCounter / animSpeed);

    // 當動畫在第 9 幀到第 15 幀時 (索引 8 到 14)，讓角色移動
    if (currentAttackFrame >= 8 && currentAttackFrame < 15) {
      const attackMoveSpeed = moveSpeed * 1.5; // 攻擊時的移動速度可以快一點
      const halfCharWidth = (frameW * scaleFactor) / 2;

      if (facingDirection === 1 && charX < width - halfCharWidth) { // 向右移動
        charX += attackMoveSpeed;
      } else if (facingDirection === -1 && charX > halfCharWidth) { // 向左移動
        charX -= attackMoveSpeed;
      }

      // 在攻擊有效幀內進行碰撞檢測
      const hitDistance = abs(charX - (char2X + bgX)); // 碰撞檢測也要考慮背景位移
      const hitThreshold = (frameW * scaleFactor) / 2 + (char2FrameW * scaleFactor) / 2; // 兩個角色寬度的一半
      
      if (hitDistance < hitThreshold && !hasHitThisAttack && dialogueState === 'battle') {
        char2CurrentHealth = max(0, char2CurrentHealth - 1); // 扣除血量，並確保不低於0
        char2State = 'hit'; // 將角色2狀態設為受擊
        hit2FrameCounter = 0; // 重置受擊動畫計數器
        hasHitThisAttack = true; // 標記本次攻擊已計分
      }
    }

    const attackProgress = (attackFrameCounter / (totalFrames * animSpeed)); // 0.0 ~ 1.0
    yOffset = -sin(attackProgress * PI) * 30; // 向上移動最多 30 像素
  }

  // --- 繪製角色1 ---
  push();
  translate(charX, charY + yOffset);
  scale(facingDirection, 1);

  image(
    currentSheet,
    0, 0,
    frameW * scaleFactor,
    frameH * scaleFactor,
    sx, sy,
    frameW, frameH
  );

  pop();
  // --- 角色1繪製結束 ---

  // 新增：繪製任務提示框
  drawMissionUI();

  // 新增：繪製支線任務框
  drawSideQuestUI();

  // 新增：繪製玩家資訊框
  drawPlayerInfo();

  // --- 新增：答題回饋特效遮罩 ---
  if (feedbackOverlayAlpha > 0) {
    push();
    noStroke();
    fill(feedbackOverlayColor[0], feedbackOverlayColor[1], feedbackOverlayColor[2], feedbackOverlayAlpha);
    rect(-50, -50, width + 100, height + 100); // 確保覆蓋全螢幕 (包含震動位移)
    pop();
    feedbackOverlayAlpha -= 5; // 淡出
  }
}

function keyPressed() {
  startMusicOnce(); // 新增：在第一次使用者互動時啟動音樂
  // 當按下空白鍵且角色不在攻擊狀態時，開始攻擊
  if (key === ' ' && charState !== 'attacking') {
    charState = 'attacking';
    attackFrameCounter = 0; // 重置攻擊動畫計數器
    hasHitThisAttack = false; // 重置攻擊計分標記
  }

  // 當玩家在輸入框中按下 Enter 鍵
  if (keyCode === ENTER && dialogueState === 'asking') {
    playerName = nameInput.value();
    if (playerName.trim() !== '') { // 確保玩家有輸入內容
      dialogueState = 'answered';
      answeredFrame = frameCount; // 記錄當前幀數
      nameInput.value(''); // 清空輸入框
    }
  } else if (keyCode === ENTER && dialogueState === 'quiz2_question') {
    const userAnswer = nameInput.value().trim();
    const correctAnswer = currentQuestion2.getString('答案');

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      textBoxText = currentQuestion2.getString('答對回饋');
      dialogueState = 'quiz2_feedback';
      feedbackFrame = frameCount;
      triggerCorrectEffect(); // 新增：答對特效
    } else {
      textBoxText = `${currentQuestion2.getString('答錯回饋')} ${currentQuestion2.getString('提示')}`;
      dialogueState = 'quiz2_retry';
      feedbackFrame = frameCount; // 開始計時，等待玩家重試
      triggerWrongEffect(); // 新增：答錯特效
      // 將重試按鈕的事件重新綁定到小露的問答
      retryButton.mousePressed(retryChallengeQuestion);
    }

    nameInput.value('');
    nameInput.hide();
  } else if (keyCode === ENTER && char4State === 'quiz_question') {
    const userAnswer = nameInput.value().trim();
    const correctAnswer = currentQuestion2.getString('答案');

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      textBoxText = currentQuestion2.getString('答對回饋');
      char4State = 'quiz_feedback';
      feedbackFrame = frameCount; // 重置回饋計時器
      triggerCorrectEffect(); // 新增：答對特效
    } else {
      textBoxText = `${currentQuestion2.getString('答錯回饋')} ${currentQuestion2.getString('提示')}`;
      char4State = 'quiz_retry';
      triggerWrongEffect(); // 新增：答錯特效
      // 將重試按鈕的事件綁定到小熙的問答
      retryButton.mousePressed(retryChar4Question);
    }

    nameInput.value('');
    nameInput.hide();
  }
}

// 新增：檢查洛亞問答的答案
function checkLoyaAnswer(index) {
  if (!currentQuestion) return;
  
  // 取得選項文字 (嘗試用欄位名稱，若失敗則用索引)
  let optionText = currentQuestion.getString('選項' + (index + 1));
  let correctAnswer = currentQuestion.getString('答案');
  
  // 防呆處理：確保字串存在
  optionText = optionText || '';
  correctAnswer = correctAnswer || '';

  // 移除所有空白字元以進行寬鬆比對，避免因為空格導致比對失敗
  let cleanOption = optionText.replace(/\s/g, '');
  let cleanAnswer = correctAnswer.replace(/\s/g, '');

  // 檢查選項是否包含答案文字
  if (cleanAnswer.length > 0 && cleanOption.includes(cleanAnswer)) {
    // 答對
    let feedback = currentQuestion.getString('答對回饋');
    textBoxText = feedback;
    dialogueState = 'quiz_feedback';
    feedbackFrame = frameCount;
    triggerCorrectEffect(); // 新增：答對特效
  } else {
    // 答錯
    let feedback = currentQuestion.getString('答錯回饋');
    textBoxText = feedback;
    dialogueState = 'quiz_retry';
    triggerWrongEffect(); // 新增：答錯特效
  }

  // 隱藏按鈕
  loyaOptionButtons.forEach(btn => btn.hide());
}

function retryQuestion() {
  // 當「再作答一次」按鈕被點擊時觸發
  dialogueState = 'quiz_question'; // 將狀態切換回提問狀態
  retryButton.hide(); // 隱藏按鈕
  updateLoyaButtons(); // 新增：確保按鈕文字正確
  // textBoxText 會在下一個 draw() 循環中自動更新為題目
}

function retryChallengeQuestion() {
  // 小露問答的重試邏輯
  dialogueState = 'quiz2_question';
  textBoxText = currentQuestion2.getString('題目');
  retryButton.hide();
}

// 新增：更新洛亞選項按鈕的文字
function updateLoyaButtons() {
  if (!currentQuestion) return;
  for (let i = 0; i < 4; i++) {
    let btn = loyaOptionButtons[i];
    // 使用 || '' 確保不會傳入 undefined，避免 p5.js 報錯
    let optionText = currentQuestion.getString('選項' + (i + 1));
    if (optionText === undefined || optionText === null) optionText = '';
    btn.html(optionText);
  }
}

function retryChar4Question() {
  // 小熙問答的重試邏輯
  char4State = 'quiz_question';
  // textBoxText 會在下一個 draw() 循環中自動更新為題目
  retryButton.hide();
}

function acceptChallenge() {
  // 點擊「沒問題」後的行為
  dialogueState = 'quiz2_question';
  const questionIndex = floor(random(questionBank2.getRowCount()));
  currentQuestion2 = questionBank2.getRow(questionIndex);
  textBoxText = currentQuestion2.getString('題目');

  acceptChallengeButton.hide();
  declineChallengeButton.hide();
}

function declineChallenge() {
  // 點擊「嗯...我再想想」或玩家遠離時的行為
  if (dialogueState === 'challenge_小露') {
    // 這是第一次點擊按鈕，切換到顯示訊息的狀態
    dialogueState = 'challenge_declined';
    textBoxText = '機會是留給準備好的人';
    challengeMessageFrame = frameCount;
  } else {
    // 這是訊息顯示完畢後或玩家遠離時的重置行為
    dialogueState = 'none';
    textBoxText = ''; // 清空文字
  }
  acceptChallengeButton.hide();
  declineChallengeButton.hide();
  retryButton.hide(); // 確保重試按鈕也被隱藏
}

// 角色4的互動函式 (目前為空，待擴充)
function char4Accept() {
  console.log("玩家接受了角色4的幫助，準備開始問答");
  char4State = 'quiz_question'; // 立即進入問答狀態
  sq2Completed = true; // 完成與小熙對話的支線任務
  // 立即抽選題目
  const questionIndex = floor(random(questionBank2.getRowCount()));
  currentQuestion2 = questionBank2.getRow(questionIndex);
  
  char4AcceptButton.hide();
  char4DeclineButton.hide();
}

function char4Decline() {
  console.log("玩家拒絕了角色4的幫助");
  // 進入已拒絕狀態，避免重複顯示按鈕，直到玩家離開再回來
  char4State = 'declined_hint';
  char4AcceptButton.hide();
  char4DeclineButton.hide();
}

function char5Accept() {
  console.log("玩家接受了角色5的提示");
  char5State = 'giving_hint';
  sq1Completed = true; // 完成與喵老師對話的支線任務
  char5HintCount++; // 新增：增加提示計數
  // 從題庫2隨機抽一題來當作提示
  const hintIndex = floor(random(questionBank2.getRowCount()));
  const hintQuestion = questionBank2.getRow(hintIndex);
  char5HintText = hintQuestion.getString('教學提示');

  char5HintFrame = frameCount; // 開始計時
  char5AcceptButton.hide();
  char5DeclineButton.hide();
}

function char5Decline() {
  console.log("玩家拒絕了角色5的提示");
  // 進入已拒絕狀態，避免重複顯示按鈕，直到玩家離開再回來
  char5State = 'declined_hint'; 
  char5HintFrame = frameCount; // 開始計時
  char5AcceptButton.hide();
  char5DeclineButton.hide();
}

// 新增：繪製通關畫面的函式
function drawCompletionScreen() {
  // 為了美觀，繼續繪製背景和落葉
  const bgScaledHeight = height;
  const bgScale = bgScaledHeight / bgImage.height;
  const bgScaledWidth = floor(bgImage.width * bgScale);
  let offsetX = bgX % bgScaledWidth;
  if (offsetX < 0) { offsetX += bgScaledWidth; }
  image(bgImage, offsetX, height / 2, bgScaledWidth, bgScaledHeight);
  image(bgImage, offsetX - bgScaledWidth, height / 2, bgScaledWidth, bgScaledHeight);
  image(bgImage, offsetX + bgScaledWidth, height / 2, bgScaledWidth, bgScaledHeight);
  for (let leaf of leaves) {
    leaf.update();
    leaf.display();
  }

  // 繪製半透明黑色遮罩
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  // --- 新增：特效邏輯 ---
  // 1. 彩帶特效
  if (confettis.length < 150) {
    confettis.push(new Confetti());
  }
  for (let c of confettis) {
    c.update();
    c.display();
  }

  // 2. 爆炸特效 (煙火)
  if (frameCount % 30 === 0) { // 每 0.5 秒產生一個爆炸
    const exX = random(width * 0.2, width * 0.8);
    const exY = random(height * 0.2, height * 0.6);
    const col = color(random(255), random(255), random(255));
    for (let i = 0; i < 50; i++) {
      explosionParticles.push(new ExplosionParticle(exX, exY, col));
    }
  }

  for (let i = explosionParticles.length - 1; i >= 0; i--) {
    let p = explosionParticles[i];
    p.update();
    p.display();
    if (p.isDead()) {
      explosionParticles.splice(i, 1);
    }
  }
  // --- 特效結束 ---

  // 繪製華麗的「恭喜通關!」文字
  push();
  textAlign(CENTER, CENTER);
  
  // 特效：文字大小隨時間脈動
  const pulse = sin(frameCount * 0.05) * 10;
  textSize(80 + pulse);
  
  stroke(0);
  strokeWeight(8);
  
  // 特效：彩虹漸變顏色
  colorMode(HSB, 360, 100, 100);
  const hue = frameCount % 360;
  fill(hue, 90, 100);
  
  text('恭喜通關!', width / 2, height / 2 - 50);

  // 新增：顯示通關時間
  let totalSeconds = floor((gameEndTime - gameStartTime) / 1000);
  let minutes = floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let timeString = `通關時間: ${minutes}分${nf(seconds, 2)}秒`;

  textSize(32);
  fill(0, 0, 100); // HSB 模式下的白色
  text(timeString, width / 2, height / 2 + 20);

  pop(); // 恢復繪圖設定

  // 顯示並定位「再遊玩一次」按鈕
  playAgainButton.position(width / 2 - playAgainButton.width / 2, height / 2 + 60);
  playAgainButton.show();
}

// 新增：繪製任務UI的函式
function drawMissionUI() {
  if (missionStage > 1) return; // 所有任務已完成

  let content = '';
  let progress = '0/1';

  if (missionStage === 0) {
    content = '找到洛亞並與她進行互動吧!';
    // 檢查是否完成任務1: 洛亞對話結束 (quiz_success_final)
    if (dialogueState === 'quiz_success_final' && !missionCompleted) {
      missionCompleted = true;
      missionTimer = frameCount;
    }
  } else if (missionStage === 1) {
    content = '通過小露的最終試驗吧!!';
    // 檢查是否完成任務2: 小露對話結束 (quiz2_feedback)
    if (dialogueState === 'quiz2_feedback' && !missionCompleted) {
      missionCompleted = true;
    }
  }

  // 處理任務完成後的狀態
  if (missionCompleted) {
    progress = '1/1';
    
    // 如果是任務1，停留3秒後切換到任務2
    if (missionStage === 0) {
      if (frameCount > missionTimer + 180) { // 3秒 (60fps * 3)
        missionStage = 1;
        missionCompleted = false;
        return; // 這一幀先不繪製，下一幀再顯示新任務
      }
    } else if (missionStage === 1) {
      // 如果是任務2，停留3秒後切換到通關畫面
      if (frameCount > missionTimer + 180) {
        gameState = 'completed';
        gameEndTime = millis(); // 記錄結束時間
        return; // 停止繪製任務UI，下一幀將由 draw() 函式接管並顯示通關畫面
      }
    }
  }

  // 繪製UI
  push();
  translate(20, 20); // 固定在螢幕左上角
  
  // 背景框
  const bgCol = color('#ffddd2');
  bgCol.setAlpha(220);
  fill(bgCol);
  stroke('#540b0e');
  strokeWeight(2);
  rect(0, 0, 350, 50, 10);

  // 文字
  fill('#540b0e');
  noStroke();
  textSize(16);
  textAlign(LEFT, CENTER);
  text(content, 15, 25); // 垂直置中

  // 進度
  textAlign(RIGHT, CENTER);
  text(progress, 335, 25);
  pop();
}

// 新增：繪製支線任務UI的函式
function drawSideQuestUI() {
  // 定義位置與尺寸
  const boxW = 220;
  const boxH = 40;
  const boxX = width - boxW - 20; // 右下角，留一點邊距
  const boxY = height - boxH - 20;

  push();
  
  // 1. 繪製主任務框 (喵老師)
  const bgCol = color('#ffddd2');
  bgCol.setAlpha(220);
  fill(bgCol);
  stroke('#540b0e');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 10);

  fill('#540b0e');
  noStroke();
  textSize(16);
  textAlign(LEFT, CENTER);
  text(`和喵老師對話 ${sq1Completed ? '1/1' : '0/1'}`, boxX + 15, boxY + boxH / 2);

  // 繪製展開/收合箭頭
  textAlign(RIGHT, CENTER);
  text(sideQuestOpen ? "▼" : "▲", boxX + boxW - 10, boxY + boxH / 2);

  // 2. 如果展開，繪製第二個任務框 (小熙)
  if (sideQuestOpen) {
    const secBoxY = boxY - boxH - 10; // 在主框上方
    fill(bgCol);
    stroke('#540b0e');
    strokeWeight(2);
    rect(boxX, secBoxY, boxW, boxH, 10);

    fill('#540b0e');
    noStroke();
    textAlign(LEFT, CENTER);
    text(`與小熙對話 ${sq2Completed ? '1/1' : '0/1'}`, boxX + 15, secBoxY + boxH / 2);
  }
  pop();
}

function windowResized() {
  // 當瀏覽器視窗大小改變時，自動調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  // 同時重置葉子的位置，避免它們集中在舊的畫布範圍內
  for (let leaf of leaves) {
    leaf.x = random(width);
    leaf.y = random(height);
  }
  // 避免角色在視窗縮放後位置跑掉，可以選擇是否要重置位置
  // charX = width / 2;
}

// 新增：處理滑鼠點擊事件
function mousePressed() {
  startMusicOnce(); // 新增：在第一次使用者互動時啟動音樂

  // 新增：在規則畫面點擊任意處進入遊戲 (加入緩衝時間避免誤觸)
  if (gameState === 'rules_screen' && millis() - rulesStartTime > 200) {
    gameState = 'playing';
    gameStartTime = millis(); // 記錄開始時間
    return;
  }

  // 檢查是否點擊了支線任務框 (主框)
  const boxW = 220;
  const boxH = 40;
  const boxX = width - boxW - 20;
  const boxY = height - boxH - 20;

  if (mouseX > boxX && mouseX < boxX + boxW && mouseY > boxY && mouseY < boxY + boxH) {
    sideQuestOpen = !sideQuestOpen; // 切換展開狀態
  }
}

// 新增：啟動音樂的函式 (只會執行一次)
function startMusicOnce() {
  if (!musicHasStarted && bgMusic && bgMusic.isLoaded()) {
    // userStartAudio() 是 p5.sound 的一個函式，它會等待使用者互動後才啟動音訊，
    // 這是為了解決瀏覽器的自動播放限制策略。
    userStartAudio();
    bgMusic.loop();
    musicHasStarted = true;
  }
}

// 新增：繪製玩家資訊UI的函式
function drawPlayerInfo() {
  if (!playerName) return; // 如果還沒輸入名字就不顯示

  const boxW = 200;
  const boxH = 60;
  const boxX = width - boxW - 20; // 右上角
  const boxY = 20;

  push();
  
  // 背景框 (使用與任務框相同的配色)
  const bgCol = color('#ffddd2');
  bgCol.setAlpha(220);
  fill(bgCol);
  stroke('#540b0e');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 10);

  // 頭貼
  if (playerHeadImg) {
    // imageMode 是 CENTER
    image(playerHeadImg, boxX + 35, boxY + 30, 50, 50);
  }

  // 名字
  fill('#540b0e');
  noStroke();
  textSize(18);
  textAlign(LEFT, CENTER);
  text(playerName, boxX + 70, boxY + 30);

  pop();
}

// 新增：繪製載入畫面
function drawLoadingScreen() {
  background('#d5bdaf'); // 使用黑色背景覆蓋原本的遊戲背景
  
  fill('#432818'); // 修改：文字顏色
  textAlign(CENTER, CENTER);
  textSize(32);
  text('Loading...', width / 2, height / 2 - 30);

  // 繪製進度條
  let elapsedTime = millis() - loadingStartTime;
  let progress = constrain(elapsedTime / 3000, 0, 1); // 修改：3秒載入時間
  let barWidth = 300;
  let barHeight = 20;
  
  noFill();
  stroke('#432818'); // 修改：邊框顏色
  strokeWeight(2);
  rect(width / 2 - barWidth / 2, height / 2 + 20, barWidth, barHeight);
  
  fill('#432818'); // 修改：進度條填充顏色
  noStroke();
  rect(width / 2 - barWidth / 2, height / 2 + 20, barWidth * progress, barHeight);

  if (elapsedTime > 3000) { // 修改：3秒後跳轉
    gameState = 'start_screen';
  }
}

// 新增：繪製開始畫面
function drawStartScreen() {
  // 背景已經在 draw() 中繪製了 (捲動背景)，這裡加一個半透明遮罩讓文字更清楚
  fill(0, 0, 0, 100);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  textSize(70); // 修改：加大字體
  textStyle(BOLD); // 新增：設定為粗體
  fill('#D2B48C'); // 修改：文字填充顏色 (與按鈕背景呼應)
  stroke('#432818'); // 修改：文字邊框顏色 (深褐色)
  strokeWeight(8); // 修改：加粗邊框
  text('程式設計小遊戲', width / 2, height / 2 - 60);

  startButton.position(width / 2 - 50, height / 2 + 40); // 確保按鈕位置正確
  startButton.show();
}

// 新增：繪製規則畫面
function drawRulesScreen() {
  fill(0, 0, 0, 180); // 較深的遮罩
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text('遊戲規則', width / 2, height / 2 - 180); // 修改：將標題往上移，增加間距

  textSize(20);
  rectMode(CENTER); // 設定文字框中心點
  text('遊戲中有玩家、提問者三位，分別為小露、小熙、洛亞，\n還有一位提示者為喵老師。\n\n玩家要透過小熙和喵老師以及洛亞的幫助下，\n最終解開小露出的難題。\n\n並且遊戲中要與洛亞戰鬥，解任務與各角色對談互動，\n正確回答所有問題與解完任務後，即可通關!', width / 2, height / 2 + 30, width * 0.8, height * 0.6); // 修改：將說明文字稍微往下移
  rectMode(CORNER); // 恢復預設
}
