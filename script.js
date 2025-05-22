 // Elementlarni e'lon qilish: HTML elementlarini JavaScript orqali boshqarish uchun ularga murojaat qilish
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const difficultySelect = document.getElementById('difficulty');
    const gameModeSelect = document.getElementById('gameMode');
    const wallModeSelect = document.getElementById('wallMode');
    const snakeColorSelect = document.getElementById('snakeColor');
    const languageSelect = document.getElementById('languageSelect');
    const wallActionSelect = document.getElementById('wallAction');
    const statsText = document.getElementById('statsText');
    const scoreText = document.getElementById('scoreText');
    const levelText = document.getElementById('levelText');
    const highScoreText = document.getElementById('highScoreText');
    const settingsOffcanvasLabel = document.getElementById('settingsOffcanvasLabel');
    const currentDateElement = document.getElementById('currentDate');
    const gameTitle = document.getElementById('gameTitle');

    // Tarjimalar: O‘yin matnlarini turli tillarga moslashtirish uchun so‘zlar lug‘ati
    const translations = {
      en: {
        gameTitle: 'Snake Game',
        startBtn: 'Start Game',
        pauseBtn: 'Pause',
        resumeBtn: 'Resume',
        scoreText: 'Score: ',
        highScoreText: 'High Score: ',
        levelText: 'Level: ',
        speedLevelText: 'Speed: ',
        instructions: 'Swipe or use arrow keys to control the snake',
        statsText: 'Total Time: {time}s | Total Score: {score} | Avg Level: {level}',
        gameOverScore: 'Score: ',
        gameOverHighScore: 'High Score: ',
        gameOverLevel: 'Level: ',
        gameOverSpeed: 'Speed: ',
        highScores: 'Top Scores: ',
        modes: { classic: 'Classic', endless: 'Endless' },
        wallModes: { open: 'Wall Open', closed: 'Wall Closed' },
        colors: { 0: 'Green', 1: 'Blue', 2: 'Yellow' },
        settingsLabel: 'Settings',
        wallActions: { none: 'Select Action', addWall: 'Add Wall', removeWall: 'Remove Wall' }
      },
      ru: {
        gameTitle: 'Игра Змейка',
        startBtn: 'Начать игру',
        pauseBtn: 'Пауза',
        resumeBtn: 'Продолжить',
        scoreText: 'Очки: ',
        highScoreText: 'Рекорд: ',
        levelText: 'Уровень: ',
        speedLevelText: 'Скорость: ',
        instructions: 'Смахивайте или используйте стрелки на клавиатуре для управления змейкой',
        statsText: 'Общее время: {time}с | Общий счёт: {score} | Средний уровень: {level}',
        gameOverScore: 'Очки: ',
        gameOverHighScore: 'Рекорд: ',
        gameOverLevel: 'Уровень: ',
        gameOverSpeed: 'Скорость: ',
        highScores: 'Лучшие результаты: ',
        modes: { classic: 'Классический', endless: 'Бесконечный' },
        wallModes: { open: 'Стена открыта', closed: 'Стена закрыта' },
        colors: { 0: 'Зелёный', 1: 'Синий', 2: 'Жёлтый' },
        settingsLabel: 'Настройки',
        wallActions: { none: 'Выберите действие', addWall: 'Добавить стену', removeWall: 'Удалить стену' }
      },
      uz: {
        gameTitle: 'Ilon o‘yini',
        startBtn: 'O‘yinni boshlash',
        pauseBtn: 'Pauza',
        resumeBtn: 'Davom etish',
        scoreText: 'Ball: ',
        highScoreText: 'Eng yuqori ball: ',
        levelText: 'Bosqich: ',
        speedLevelText: 'Tezlik: ',
        instructions: 'Ilonni boshqarish uchun suring yoki klaviaturadagi o‘q tugmalarini bosing',
        statsText: 'Umumiy vaqt: {time}s | Umumiy ball: {score} | O‘rtacha bosqich: {level}',
        gameOverScore: 'Ball: ',
        gameOverHighScore: 'Eng yuqori ball: ',
        gameOverLevel: 'Bosqich: ',
        gameOverSpeed: 'Tezlik: ',
        highScores: 'Eng yaxshi natijalar: ',
        modes: { classic: 'Klassik', endless: 'Cheksiz' },
        wallModes: { open: 'Devor ochiq', closed: 'Devor yopiq' },
        colors: { 0: 'Yashil', 1: 'Ko‘k', 2: 'Sariq' },
        settingsLabel: 'Sozlamalar',
        wallActions: { none: 'Amal tanlang', addWall: 'To‘siq qo‘yish', removeWall: 'To‘siq olib tashlash' }
      },
      tr: {
        gameTitle: 'Yılan Oyunu',
        startBtn: 'Oyunu Başlat',
        pauseBtn: 'Duraklat',
        resumeBtn: 'Devam Et',
        scoreText: 'Puan: ',
        highScoreText: 'En Yüksek Puan: ',
        levelText: 'Seviye: ',
        speedLevelText: 'Hız: ',
        instructions: 'Yılanı kontrol etmek için kaydırın veya klavyedeki yön tuşlarını kullanın',
        statsText: 'Toplam Süre: {time}s | Toplam Puan: {score} | Ortalama Seviye: {level}',
        gameOverScore: 'Puan: ',
        gameOverHighScore: 'En Yüksek Puan: ',
        gameOverLevel: 'Seviye: ',
        gameOverSpeed: 'Hız: ',
        highScores: 'En İyi Skorlar: ',
        modes: { classic: 'Klasik', endless: 'Sonsuz' },
        wallModes: { open: 'Duvar Açık', closed: 'Duvar Kapalı' },
        colors: { 0: 'Yeşil', 1: 'Mavi', 2: 'Sarı' },
        settingsLabel: 'Ayarlar',
        wallActions: { none: 'Eylem Seçin', addWall: 'Duvar Ekle', removeWall: 'Duvar Kaldır' }
      }
    };

    // O‘zgaruvchilar: O‘yin holatini boshqarish uchun asosiy o‘zgaruvchilar
    let currentLanguage = 'uz'; // Tanlangan til
    let score = 0; // Joriy ball
    let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0; // Eng yuqori ball, localStorage dan olinadi
    let level = 1; // Joriy bosqich
    let speedLevel = 1; // Tezlik darajasi

    // Tilni yangilash: Tanlangan tilga qarab interfeys matnlarini o‘zgartirish
    function updateLanguage() {
      const lang = languageSelect.value;
      currentLanguage = lang;
      const t = translations[lang];
      gameTitle.textContent = t.gameTitle;
      startBtn.innerHTML = `<i class="fas fa-play"></i> ${t.startBtn}`;
      pauseBtn.innerHTML = isPaused ? `<i class="fas fa-play"></i> ${t.resumeBtn}` : `<i class="fas fa-pause"></i> ${t.pauseBtn}`;
      settingsOffcanvasLabel.textContent = t.settingsLabel;
      document.getElementById('instructions').textContent = t.instructions;
      updateStats();
      updateScoreDisplay();
      difficultySelect.querySelectorAll('option').forEach((opt, index) => {
        opt.textContent = ['Easy', 'Medium', 'Hard'][index];
        if (lang === 'uz') opt.textContent = ['Oson', 'O‘rta', 'Qiyin'][index];
        if (lang === 'ru') opt.textContent = ['Легко', 'Средне', 'Сложно'][index];
        if (lang === 'tr') opt.textContent = ['Kolay', 'Orta', 'Zor'][index];
      });
      gameModeSelect.querySelectorAll('option').forEach(opt => {
        opt.textContent = t.modes[opt.value];
      });
      wallModeSelect.querySelectorAll('option').forEach(opt => {
        opt.textContent = t.wallModes[opt.value];
      });
      snakeColorSelect.querySelectorAll('option').forEach(opt => {
        opt.textContent = t.colors[opt.value];
      });
      wallActionSelect.querySelectorAll('option').forEach(opt => {
        opt.textContent = t.wallActions[opt.value];
      });
    }

    // Statistikani yangilash: O‘yin statistikasini (vaqt, ball, o‘rtacha bosqich) yangilash
    function updateStats() {
      const avgLevel = gameCount > 0 ? (totalLevels / gameCount).toFixed(1) : 0;
      const t = translations[currentLanguage].statsText
        .replace('{time}', totalTime)
        .replace('{score}', totalScore)
        .replace('{level}', avgLevel);
      statsText.textContent = t;
    }

    // Ballni yangilash: Joriy ball, bosqich va eng yuqori ballni ko‘rsatish
    function updateScoreDisplay() {
      const t = translations[currentLanguage];
      scoreText.textContent = `${t.scoreText}${score}`;
      levelText.textContent = `${t.levelText}${level}`;
      highScoreText.textContent = `${t.highScoreText}${highScore}`;
    }

    // O‘yin o‘zgaruvchilari: O‘yin maydoni, ilon, ovqat, bonus va boshqa elementlar
    let gridSize = 15; // Har bir katakning o‘lchami
    let tileCount = 42; // Maydondagi kataklar soni
    let snake = [{ x: 21, y: 21 }]; // Ilonning boshlang‘ich pozitsiyasi
    let food = { x: 31, y: 31, type: 'apple' }; // Ovqatning boshlang‘ich pozitsiyasi va turi
    let bonus = null; // Bonus elementi (boshida yo‘q)
    let walls = []; // To‘siqlar ro‘yxati
    let dx = 0; // Ilonning X yo‘nalishi bo‘yicha harakati
    let dy = 0; // Ilonning Y yo‘nalishi bo‘yicha harakati
    let totalScore = localStorage.getItem('totalScore') ? parseInt(localStorage.getItem('totalScore')) : 0; // Umumiy ball
    let highScores = localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')) : []; // Eng yaxshi ballar ro‘yxati
    let totalLevels = localStorage.getItem('totalLevels') ? parseInt(localStorage.getItem('totalLevels')) : 0; // Umumiy bosqichlar
    let gameCount = localStorage.getItem('gameCount') ? parseInt(localStorage.getItem('gameCount')) : 0; // O‘ynalgan o‘yinlar soni
    let baseGameSpeed = 100; // O‘yin tezligining asosiy qiymati
    let gameSpeed = baseGameSpeed; // Joriy o‘yin tezligi
    let gameLoop; // O‘yin tsiklini boshqaruvchi interval
    let isPaused = false; // O‘yin pauza holatida yoki yo‘qligi
    let colorIndex = 0; // Ilonning rangi indeksi
    let lastColorChange = Date.now(); // Oxirgi rang o‘zgarishi vaqti
    let snakeScale = 0.1; // Ilonning animatsiya o‘lchami
    let isIntroAnimating = false; // Ilonning kirish animatsiyasi holati
    let isGameOver = false; // O‘yin tugagan yoki tugamaganligi
    let gameMode = 'classic'; // O‘yin rejimi (klassik yoki cheksiz)
    let wallMode = 'open'; // Devor rejimi (ochiq yoki yopiq)
    let bonusEffect = null; // Bonusning joriy effekti
    let bonusTimer = 0; // Bonusning qolgan vaqti
    let gameStartTime = 0; // O‘yin boshlangan vaqt
    let totalTime = localStorage.getItem('totalTime') ? parseInt(localStorage.getItem('totalTime')) : 0; // Umumiy o‘ynash vaqti
    let bonusActive = false; // Bonus faol yoki yo‘qligi
    let bonusDuration = 10000; // Bonusning faol vaqti (10 soniya)
    let bonusStartTime = null; // Bonus faollashgan vaqt

    // Ilon ranglari: Ilonning turli rang variantlari
    const snakeColors = [
      { head: ['#15803d', '#22c55e'], body: ['#15803d', '#4ade80'], outline: '#14532d' }, // Yashil
      { head: ['#1e40af', '#3b82f6'], body: ['#1e40af', '#60a5fa'], outline: '#1e3a8a' }, // Ko‘k
      { head: ['#713f12', '#ca8a04'], body: ['#713f12', '#eab308'], outline: '#422006' }  // Sariq
    ];

    // Ovqat turlari: Ovqatning turli ko‘rinishlari va ranglari
    const foodTypes = [
      { type: 'apple', color: ['#f87171', '#b91c1c'], outline: '#7f1d1d' }, // Olma
      { type: 'berry', color: ['#a855f7', '#6b21a8'], outline: '#4c1d95' }, // Meva
      { type: 'pear', color: ['#facc15', '#ca8a04'], outline: '#854d0e' }   // Nok
    ];

    // Bonus turlari: Bonusning turlari, ranglari, effektlari va davomiyligi
    const bonusTypes = [
      { type: 'slow', color: '#00BFFF', effect: () => { gameSpeed = baseGameSpeed * 1.5; }, duration: 5000, points: 5 }, // Se kinlashtiruvchi bonus
      { type: 'double', color: '#FFD700', effect: () => { bonusEffect = 'double'; }, duration: 5000, points: 10 } // Ikki baravar ball beruvchi bonus
    ];

    // Dastlabki holatni yangilash: Statistikani, tilni va ballni yangilash
    updateStats();
    updateLanguage();
    updateScoreDisplay();

    // Canvasni moslashtirish: O‘yin maydonini ekran o‘lchamiga moslashtirish
    function resizeCanvas() {
      const maxWidth = Math.min(window.innerWidth, 550);
      const aspectRatio = 642 / 550;
      canvas.width = maxWidth;
      canvas.height = maxWidth * aspectRatio;
      gridSize = Math.max(14, Math.floor(maxWidth / tileCount));
      tileCount = Math.floor(canvas.width / gridSize);
      generateWalls();
      drawGame();
      updateScoreDisplay();
    }

    // Ekran o‘lchami o‘zgarganda yoki orientatsiya o‘zgarganda canvasni yangilash
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);
    resizeCanvas();

    // Qiyinchilikni sozlash: Tanlangan qiyinchilik darajasiga qarab o‘yin tezligini o‘zgartirish
    function setDifficulty() {
      const difficulty = difficultySelect.value;
      switch (difficulty) {
        case 'easy':
          baseGameSpeed = 150;
          break;
        case 'medium':
          baseGameSpeed = 100;
          break;
        case 'hard':
          baseGameSpeed = 50;
          break;
      }
      gameSpeed = baseGameSpeed * Math.pow(0.9, speedLevel - 1);
      if (!isPaused) {
        clearInterval(gameLoop);
        gameLoop = setInterval(gameUpdate, gameSpeed);
      }
    }

    // To‘siqlarni generatsiya qilish: Har bir bosqichda to‘siqlar qo‘shish
    function generateWalls() {
      walls = [];
      if (gameMode === 'endless') return;
      const numWalls = level * 2;
      for (let i = 0; i < numWalls; i++) {
        let wall;
        do {
          wall = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
        } while (
          snake.some(segment => segment.x === wall.x && segment.y === wall.y) ||
          (wall.x === food.x && wall.y === food.y) ||
          (bonus && wall.x === bonus.x && wall.y === bonus.y)
        );
        walls.push(wall);
      }
    }

    // To‘siq qo‘shish: Yangi to‘siq qo‘yish
    function addWall() {
      if (isGameOver) return;
      let newWall;
      do {
        newWall = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
      } while (
        snake.some(segment => segment.x === newWall.x && segment.y === newWall.y) ||
        (newWall.x === food.x && newWall.y === food.y) ||
        (bonus && newWall.x === bonus.x && newWall.y === bonus.y) ||
        walls.some(wall => wall.x === newWall.x && wall.y === newWall.y)
      );
      walls.push(newWall);
      drawGame();
    }

    // To‘siqni olib tashlash: Oxirgi to‘siqni olib tashlash
    function removeWall() {
      if (isGameOver || walls.length === 0) return;
      walls.pop();
      drawGame();
    }

    // To‘siq bilan ishlash: Tanlangan amalni bajarish (to‘siq qo‘shish yoki olib tashlash)
    function handleWallAction() {
      const action = wallActionSelect.value;
      if (action === 'addWall') {
        addWall();
      } else if (action === 'removeWall') {
        removeWall();
      }
      wallActionSelect.value = 'none';
    }

    // Bonus generatsiya qilish: Bonusni tasodifiy vaqtda va joyda chiqarish
    function generateBonus() {
      if (!bonusActive && Math.random() < 0.05) {
        let newBonus;
        do {
          newBonus = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
            type: bonusTypes[Math.floor(Math.random() * bonusTypes.length)].type
          };
        } while (
          snake.some(segment => segment.x === newBonus.x && segment.y === newBonus.y) ||
          (newBonus.x === food.x && newBonus.y === food.y) ||
          walls.some(wall => wall.x === newBonus.x && wall.y === newBonus.y)
        );
        bonus = newBonus;
      }
    }

    // Ilonning kirish animatsiyasi: O‘yin boshlanganda ilonning o‘lchamini kichikdan kattaga o‘zgartirish
    let animationStart;
    function animateSnakeIntro(timestamp) {
      if (!isIntroAnimating) return;

      const duration = 500;
      const progress = Math.min((timestamp - animationStart) / duration, 1);
      snakeScale = 0.1 + (1.0 - 0.1) * progress;

      drawGame();

      if (progress < 1) {
        requestAnimationFrame(animateSnakeIntro);
      } else {
        isIntroAnimating = false;
        gameLoop = setInterval(gameUpdate, gameSpeed);
      }
    }

    // O‘yinni boshlash: O‘yinni boshlang‘ich holatga keltirish va yangi o‘yin boshlash
    function startGame() {
      const maxSnakeLength = Math.floor((tileCount * tileCount) / (level * 2));
      snake = [{ x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }];
      while (snake.length < Math.min(maxSnakeLength, 5)) {
        const lastSegment = snake[snake.length - 1];
        snake.push({ x: lastSegment.x - 1, y: lastSegment.y });
      }
      food = { x: Math.floor(tileCount * 0.75), y: Math.floor(tileCount * 0.75), type: foodTypes[Math.floor(Math.random() * foodTypes.length)].type };
      bonus = null;
      walls = [];
      generateWalls();
      dx = 0;
      dy = 0;
      score = 0;
      level = 1;
      speedLevel = 1;
      baseGameSpeed = 100;
      setDifficulty();
      gameSpeed = baseGameSpeed;
      isPaused = false;
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      pauseBtn.innerHTML = `<i class="fas fa-pause"></i> ${translations[currentLanguage].pauseBtn}`;
      gameMode = gameModeSelect.value;
      wallMode = 'open';
      colorIndex = parseInt(snakeColorSelect.value);
      clearInterval(gameLoop);
      snakeScale = 0.1;
      isIntroAnimating = true;
      animationStart = performance.now();
      isGameOver = false;
      bonusEffect = null;
      bonusTimer = 0;
      bonusActive = false;
      bonusStartTime = null;
      gameStartTime = Date.now();
      gameCount++;
      localStorage.setItem('gameCount', gameCount);
      requestAnimationFrame(animateSnakeIntro);
    }

    // O‘yinni pauza qilish: O‘yinni to‘xtatish yoki davom ettirish
    function pauseGame() {
      if (!isPaused) {
        isPaused = true;
        clearInterval(gameLoop);
        pauseBtn.innerHTML = `<i class="fas fa-play"></i> ${translations[currentLanguage].resumeBtn}`;
      } else {
        isPaused = false;
        applySettingsDuringPause();
        gameLoop = setInterval(gameUpdate, gameSpeed);
        pauseBtn.innerHTML = `<i class="fas fa-pause"></i> ${translations[currentLanguage].pauseBtn}`;
      }
    }

    // Pauza paytida sozlamalarni qo‘llash: O‘yin rejimi, devor rejimi va rangni yangilash
    function applySettingsDuringPause() {
      gameMode = gameModeSelect.value;
      wallMode = wallModeSelect.value;
      colorIndex = parseInt(snakeColorSelect.value);
      setDifficulty();
      drawGame();
    }

    // O‘yinni yangilash: Har bir kadrda ilon harakati, ovqat yeyish va bonuslarni boshqarish
    function gameUpdate() {
      if (isPaused || isIntroAnimating || isGameOver) return;

      if (Date.now() - lastColorChange > 3000) {
        lastColorChange = Date.now();
      }

      let head = { x: snake[0].x + dx, y: snake[0].y + dy };

      const maxX = Math.floor(canvas.width / gridSize) - 1;
      const maxY = Math.floor(canvas.height / gridSize) - 1;

      if (gameMode === 'endless' || wallMode === 'open') {
        if (head.x < 0) head.x = maxX;
        if (head.x > maxX) head.x = 0;
        if (head.y < 0) head.y = maxY;
        if (head.y > maxY) head.y = 0;
      } else if (head.x < 0 || head.x > maxX || head.y < 0 || head.y > maxY) {
        gameOver();
        return;
      }

      // Bonus faol bo‘lmaganda chegaradan chiqishni tekshirish
      if (!bonusActive) {
        if (wallMode === 'open' && !gameMode === 'endless') {
          for (let segment of snake) {
            if (segment.x < 0 || segment.x > maxX || segment.y < 0 || segment.y > maxY) {
              gameOver();
              return;
            }
          }
        }
      }

      // To‘siqqa urilishni tekshirish
      if (walls.some(wall => wall.x === head.x && wall.y === head.y)) {
        gameOver();
        return;
      }

      // Ilonni yangi pozitsiyaga ko‘chirish
      snake.unshift(head);

      // Ovqatni yeyishni tekshirish
      if (head.x === food.x && head.y === food.y) {
        let points = bonusEffect === 'double' ? 4 : 2;
        score += points;
        totalScore += points;
        localStorage.setItem('totalScore', totalScore);
        if (score % 10 === 0) {
          level++;
          generateWalls();
          const maxSnakeLength = Math.floor((tileCount * tileCount) / (level * 2));
          while (snake.length > maxSnakeLength) {
            snake.pop();
          }
        }
        if (score % 50 === 0 && score > 0) {
          speedLevel++;
          gameSpeed = baseGameSpeed * Math.pow(0.9, speedLevel - 1);
          clearInterval(gameLoop);
          gameLoop = setInterval(gameUpdate, gameSpeed);
        }
        generateFood();
      } else {
        snake.pop();
      }

      // Bonusni yeyishni tekshirish
      if (bonus && head.x === bonus.x && head.y === bonus.y) {
        const currentBonus = bonusTypes.find(b => b.type === bonus.type);
        score += currentBonus.points;
        totalScore += currentBonus.points;
        localStorage.setItem('totalScore', totalScore);
        currentBonus.effect();
        bonusActive = true;
        bonusStartTime = Date.now();
        snake.push({ x: snake[snake.length - 1].x - dx, y: snake[snake.length - 1].y - dy }); // Ilonni uzaytirish
        bonus = null;
        setTimeout(() => {
          bonusEffect = null;
          bonusActive = false;
          gameSpeed = baseGameSpeed * Math.pow(0.9, speedLevel - 1);
          clearInterval(gameLoop);
          gameLoop = setInterval(gameUpdate, gameSpeed);
        }, currentBonus.duration);
      }

      // Bonus vaqtini tekshirish
      if (bonusActive && Date.now() - bonusStartTime >= bonusDuration) {
        bonusActive = false;
      }

      // Agar bonus bo‘lmasa, yangisini generatsiya qilish
      if (!bonus) generateBonus();

      updateScoreDisplay();
      drawGame();
    }

    // Ovqatni generatsiya qilish: Yangi ovqatni tasodifiy joyda chiqarish
    function generateFood() {
      const maxX = Math.floor(canvas.width / gridSize) - 1;
      const maxY = Math.floor(canvas.height / gridSize) - 1;
      food.x = Math.floor(Math.random() * (maxX + 1));
      food.y = Math.floor(Math.random() * (maxY + 1));
      food.type = foodTypes[Math.floor(Math.random() * foodTypes.length)].type;
      for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
          generateFood();
          return;
        }
      }
      for (let i = 0; i < walls.length; i++) {
        if (food.x === walls[i].x && food.y === walls[i].y) {
          generateFood();
          return;
        }
      }
      if (bonus && food.x === bonus.x && food.y === bonus.y) {
        generateFood();
        return;
      }
    }

    // O‘yinni chizish: Canvasda ilon, ovqat, bonus va to‘siqlarni chizish
    function drawGame() {
      ctx.fillStyle = '#2d3748';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const maxX = Math.floor(canvas.width / gridSize) - 1;
      const maxY = Math.floor(canvas.height / gridSize) - 1;

      // Katakchalarni chizish
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= maxX; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i <= maxY; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      // O‘yin tugaganda natijalarni ko‘rsatish
      if (isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#34d399';
        ctx.font = `bold ${Math.min(canvas.width / 18, 40)}px Roboto`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const t = translations[currentLanguage];
        const lineHeight = Math.min(canvas.width / 15, 50);
        const centerX = canvas.width / 2;
        const startY = canvas.height / 2 - lineHeight * 1.5;

        ctx.fillText(`${t.gameOverScore}${score}`, centerX, startY);
        ctx.fillText(`${t.gameOverHighScore}${highScore}`, centerX, startY + lineHeight);
        ctx.fillText(`${t.gameOverLevel}${level}`, centerX, startY + lineHeight * 2);
        ctx.fillText(`${t.gameOverSpeed}${speedLevel}`, centerX, startY + lineHeight * 3);

        ctx.font = `bold ${Math.min(canvas.width / 25, 30)}px Roboto`;
        ctx.fillText(`${t.highScores}${highScores.join(', ')}`, centerX, startY + lineHeight * 4.5);

        return;
      }

      // Ilonni chizish
      const currentColor = snakeColors[colorIndex];
      snake.forEach((segment, index) => {
        const x = segment.x * gridSize;
        const y = segment.y * gridSize;

        if (index === 0) {
          ctx.save();
          ctx.translate(x + gridSize / 2, y + gridSize / 2);
          ctx.scale(snakeScale, snakeScale);
          if (dx === 1) ctx.rotate(0);
          else if (dx === -1) ctx.rotate(Math.PI);
          else if (dy === 1) ctx.rotate(Math.PI / 2);
          else if (dy === -1) ctx.rotate(-Math.PI / 2);

          const headGradient = ctx.createLinearGradient(-gridSize / 2, 0, gridSize / 2, 0);
          headGradient.addColorStop(0, currentColor.head[0]);
          headGradient.addColorStop(1, currentColor.head[1]);

          ctx.beginPath();
          ctx.moveTo(-gridSize / 2, -gridSize / 3);
          ctx.lineTo(gridSize / 2, 0);
          ctx.lineTo(-gridSize / 2, gridSize / 3);
          ctx.closePath();
          ctx.fillStyle = headGradient;
          ctx.fill();
          ctx.strokeStyle = currentColor.outline;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(-gridSize / 4, -gridSize / 6, gridSize / 12, 0, Math.PI * 2);
          ctx.arc(-gridSize / 4, gridSize / 6, gridSize / 12, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-gridSize / 4, -gridSize / 6, gridSize / 24, 0, Math.PI * 2);
          ctx.arc(-gridSize / 4, gridSize / 6, gridSize / 24, 0, Math.PI * 2);
          ctx.fillStyle = '#000000';
          ctx.fill();

          ctx.restore();
        } else {
          ctx.save();
          ctx.translate(x + gridSize / 2, y + gridSize / 2);
          ctx.scale(snakeScale, snakeScale);
          ctx.translate(-(x + gridSize / 2), -(y + gridSize / 2));

          const gradient = ctx.createLinearGradient(x, y, x + gridSize, y + gridSize);
          gradient.addColorStop(0, currentColor.body[0]);
          gradient.addColorStop(1, currentColor.body[1]);

          ctx.beginPath();
          ctx.rect(x + 2, y + 2, gridSize - 4, gridSize - 4);
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.strokeStyle = currentColor.outline;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x + gridSize / 4, y + gridSize / 2);
          ctx.lineTo(x + gridSize * 3 / 4, y + gridSize / 2);
          ctx.moveTo(x + gridSize / 2, y + gridSize / 4);
          ctx.lineTo(x + gridSize / 2, y + gridSize * 3 / 4);
          ctx.strokeStyle = currentColor.outline;
          ctx.stroke();

          ctx.restore();
        }
      });

      // Ovqatni chizish
      const foodX = food.x * gridSize;
      const foodY = food.y * gridSize;
      const currentFood = foodTypes.find(f => f.type === food.type);
      ctx.save();
      ctx.translate(foodX + gridSize / 2, foodY + gridSize / 2);

      const foodGradient = ctx.createRadialGradient(0, 0, gridSize / 8, 0, 0, gridSize / 2);
      foodGradient.addColorStop(0, currentFood.color[0]);
      foodGradient.addColorStop(1, currentFood.color[1]);

      if (food.type === 'apple') {
        ctx.beginPath();
        ctx.arc(0, 0, gridSize / 2 - 2, 0, Math.PI * 2);
        ctx.fillStyle = foodGradient;
        ctx.fill();
        ctx.strokeStyle = currentFood.outline;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, -gridSize / 2);
        ctx.quadraticCurveTo(gridSize / 8, -gridSize / 2 - 2, gridSize / 4, -gridSize / 2);
        ctx.quadraticCurveTo(gridSize / 8, -gridSize / 2 + 2, 0, -gridSize / 2);
        ctx.fillStyle = '#15803d';
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      } else if (food.type === 'berry') {
        ctx.beginPath();
        ctx.arc(-gridSize / 6, -gridSize / 6, gridSize / 4, 0, Math.PI * 2);
        ctx.arc(gridSize / 6, -gridSize / 6, gridSize / 4, 0, Math.PI * 2);
        ctx.arc(0, gridSize / 6, gridSize / 4, 0, Math.PI * 2);
        ctx.fillStyle = foodGradient;
        ctx.fill();
        ctx.strokeStyle = currentFood.outline;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      } else if (food.type === 'pear') {
        ctx.beginPath();
        ctx.ellipse(0, 0, gridSize / 3, gridSize / 2 - 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = foodGradient;
        ctx.fill();
        ctx.strokeStyle = currentFood.outline;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, -gridSize / 2);
        ctx.lineTo(0, -gridSize / 2 - gridSize / 4);
        ctx.strokeStyle = '#854d0e';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      ctx.restore();

      // Bonusni chizish
      if (bonus) {
        const bonusX = bonus.x * gridSize;
        const bonusY = bonus.y * gridSize;
        const currentBonus = bonusTypes.find(b => b.type === bonus.type);
        ctx.save();
        ctx.translate(bonusX + gridSize / 2, bonusY + gridSize / 2);

        ctx.beginPath();
        ctx.arc(0, 0, gridSize / 3, 0, Math.PI * 2);
        const bonusGradient = ctx.createRadialGradient(0, 0, gridSize / 8, 0, 0, gridSize / 3);
        bonusGradient.addColorStop(0, currentBonus.color);
        bonusGradient.addColorStop(1, '#ffffff');
        ctx.fillStyle = bonusGradient;
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      // To‘siqlarni chizish
      walls.forEach(wall => {
        const x = wall.x * gridSize;
        const y = wall.y * gridSize;
        const wallSize = gridSize * 2;

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const wallColor = `rgb(${r}, ${g}, ${b})`;

        const rockGradient = ctx.createRadialGradient(x + wallSize / 4, y + wallSize / 4, wallSize / 8, x + wallSize / 2, y + wallSize / 2, wallSize / 2);
        rockGradient.addColorStop(0, wallColor);
        rockGradient.addColorStop(1, '#4B5563');

        ctx.beginPath();
        ctx.moveTo(x + wallSize * 0.3, y + wallSize * 0.2);
        ctx.lineTo(x + wallSize * 0.8, y + wallSize * 0.3);
        ctx.lineTo(x + wallSize * 0.9, y + wallSize * 0.6);
        ctx.lineTo(x + wallSize * 0.7, y + wallSize * 0.9);
        ctx.lineTo(x + wallSize * 0.4, y + wallSize * 0.8);
        ctx.lineTo(x + wallSize * 0.2, y + wallSize * 0.5);
        ctx.closePath();
        ctx.fillStyle = rockGradient;
        ctx.fill();
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + wallSize * 0.3, y + wallSize * 0.2);
        ctx.lineTo(x + wallSize * 0.8, y + wallSize * 0.3);
        ctx.lineTo(x + wallSize * 0.9, y + wallSize * 0.6);
        ctx.lineTo(x + wallSize * 0.7, y + wallSize * 0.9);
        ctx.lineTo(x + wallSize * 0.4, y + wallSize * 0.8);
        ctx.lineTo(x + wallSize * 0.2, y + wallSize * 0.5);
        ctx.closePath();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      });
    }

    // O‘yinni tugatish: O‘yin tugaganda natijalarni saqlash va ko‘rsatish
    function gameOver() {
      clearInterval(gameLoop);
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
      }
      highScores.push(score);
      highScores.sort((a, b) => b - a);
      highScores = highScores.slice(0, 5);
      localStorage.setItem('highScores', JSON.stringify(highScores));
      totalLevels += level;
      localStorage.setItem('totalLevels', totalLevels);
      const gameTime = Math.floor((Date.now() - gameStartTime) / 1000);
      totalTime += gameTime;
      localStorage.setItem('totalTime', totalTime);
      updateStats();
      updateScoreDisplay();
      isGameOver = true;
      drawGame();
    }

    // Sensorli boshqaruv: Mobil qurilmalarda ilonni surish orqali boshqarish
    let touchStartX = 0;
    let touchStartY = 0;

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const threshold = 8;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
        if (diffX > 0 && dx !== -1) { dx = 1; dy = 0; }
        else if (diffX < 0 && dx !== 1) { dx = -1; dy = 0; }
      } else if (Math.abs(diffY) > threshold) {
        if (diffY > 0 && dy !== -1) { dx = 0; dy = 1; }
        else if (diffY < 0 && dy !== 1) { dx = 0; dy = -1; }
      }
    });

    // Klaviatura boshqaruvi: O‘q tugmalari orqali ilonni boshqarish
    document.addEventListener('keydown', (e) => {
      if (isPaused || isIntroAnimating) return;
      switch (e.key) {
        case 'ArrowUp':
          if (dy !== 1) { dx = 0; dy = -1; }
          break;
        case 'ArrowDown':
          if (dy !== -1) { dx = 0; dy = 1; }
          break;
        case 'ArrowRight':
          if (dx !== -1) { dx = 1; dy = 0; }
          break;
        case 'ArrowLeft':
          if (dx !== 1) { dx = -1; dy = 0; }
          break;
        case 'Enter':
          if (isGameOver) {
            startGame();
          }
          break;
      }
    });

    // Tugma hodisalari: Boshlash, pauza, qiyinchilik, til va to‘siqni boshqarish
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', pauseGame);
    difficultySelect.addEventListener('change', setDifficulty);
    languageSelect.addEventListener('change', updateLanguage);
    wallActionSelect.addEventListener('change', handleWallAction);

    // Sana va vaqtni yangilash: Footerda joriy sana va vaqtni ko‘rsatish
    function updateDateTime() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      currentDateElement.textContent = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);