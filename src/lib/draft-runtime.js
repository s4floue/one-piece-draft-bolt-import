export function mountDraft(root) {
  const controller = new AbortController();
  const timeouts = new Set();
  const intervals = new Set();
  const setTimeout = (callback, delay) => {
    const id = window.setTimeout(() => { timeouts.delete(id); callback(); }, delay);
    timeouts.add(id);
    return id;
  };
  const clearTimeout = id => { window.clearTimeout(id); timeouts.delete(id); };
  const setInterval = (callback, delay) => { const id = window.setInterval(callback, delay); intervals.add(id); return id; };
  const clearInterval = id => { window.clearInterval(id); intervals.delete(id); };
  const document = {
    querySelector: selector => root.querySelector(selector),
    querySelectorAll: selector => root.querySelectorAll(selector),
    createElement: tag => window.document.createElement(tag),
    body: window.document.body,
    execCommand: (...args) => window.document.execCommand(...args),
    addEventListener: (type, handler) => window.document.addEventListener(type, handler, { signal: controller.signal }),
  };

  const listen = (target, type, handler) => target.addEventListener(type, handler, { signal: controller.signal });
      const groups = {
        legendary: ['Nika','Joy Boy','Saint Nerona Imu'],
        elite: ['Monkey D. Luffy','Gol D. Roger','Whitebeard','Rocks D. Xebec','Shanks','Dracule Mihawk','Monkey D. Dragon','Kaido','Big Mom','Blackbeard','Akainu','Aokiji','Kizaru','Garp','Sengoku','Silvers Rayleigh','Loki','Figarland Shamrock','Figarland Garling'],
        strong: ['Roronoa Zoro','Sanji','Trafalgar Law','Eustass Kid','Sabo','Yamato','Kozuki Oden','Boa Hancock','Bartholomew Kuma','Donquixote Doflamingo','Crocodile','Rob Lucci','Enel','Marco','King','Katakuri','Killer','Jewelry Bonney','Capone Bege','Basil Hawkins','X Drake','Urouge','Scratchmen Apoo','Admiral Fujitora','Ryokugyu','Koby','Smoker','Scopper Gaban','Manmayer Gunko','Shepherd Sommers','Rimoshifu Killingham'],
        known: ['Nami','Usopp','Tony Tony Chopper','Nico Robin','Franky','Brook','Jinbe','Portgas D. Ace','Edward Weevil','Buggy','Shiki','Douglas Bullet','Gekko Moria','Perona','Caesar Clown','Magellan','Emporio Ivankov','Inazuma','Benn Beckman','Yasopp','Lucky Roux','Vista','Jozu','Izo','Kikunojo','Denjiro','Kinemon','Raizo','Kanjuro','Kawamatsu','Ashura Doji','Okiku','Momonosuke','Hiyori','Orochi','Queen','Jack','Ulti','Page One','Who’s-Who','Black Maria','Hawkins','Apoo','Carrot','Pedro','Pekoms','Wanda','Nekomamushi','Inuarashi','Vergo','Monet','Sugar','Baby 5','Senor Pink','Pica','Trebol','Diamante','Corazon','Bellamy','Bartolomeo','Cavendish','Rebecca','Kyros','Vivi','Karoo','Mr. 1','Mr. 2 Bon Clay','Mr. 3','Miss Goldenweek','Alvida','Kuro','Don Krieg','Arlong','Hatchan','Genzo','Nojiko','Kaya','Zeff','Kureha','Wapol','Dalton','Nefertari Cobra','Pell','Chaka','Laboon','Crocus','Dorry','Brogy','Mont Blanc Cricket','Wyper','Gan Fall','Conis','Kaku','Kalifa','Blueno','Iceburg','Charlotte Pudding']
      };
      const draftGroups = {
        legendary: ['Nika','Joy Boy','Saint Nerona Imu'],
        elite: ['Rocks D. Xebec','Gol D. Roger','Edward Newgate — Prime Whitebeard','Monkey D. Garp — Prime','Shimotsuki Ryuma — Prime','King Harald — Prime','Shanks','Dracule Mihawk','Kaido','Monkey D. Dragon','Monkey D. Luffy','Charlotte Linlin — Prime Big Mom','Shiki — Prime','Sengoku — Prime','Silvers Rayleigh — Prime','Loki','Scopper Gaban — Prime','Saint Figarland Garling — Prime','Marshall D. Teach','Sakazuki / Akainu','Kuzan (Aokiji)','Figarland Shamrock','Saint Topman Warcury','Saint Ethanbaron V. Nusjuro','Saint Marcus Mars','Saint Shepherd Ju Peter','Saint Jaygarcia Saturn','Emeth'],
        superior: ['Kozuki Oden','Borsalino (Kizaru)','Benn Beckman','Issho (Fujitora)','Aramaki (Greenbull)','Kong — Prime','Sabo','Trafalgar D. Water Law','Yamato','Roronoa Zoro','Eustass Kid','Marco','Crocodile','Shiryu','Lucky Roux','Boa Hancock','King','Charlotte Katakuri','Tsuru — Prime','Yasopp','Portgas D. Ace','Sanji','Dorry','Brogy','Manmayer Gunko','Shepherd Sommers','Rimoshifu Killingham','Jarul — Prime','Jorul — Prime','Rob Lucci','Donquixote Doflamingo','Zunesha'],
        epic: ['Edward Weevil','S-Hawk','Koby','Magellan','Bartholomew Kuma (prime)','Vista','S-Snake','Queen','Charlotte Smoothie','S-Bear','S-Shark','Charlotte Cracker','Jinbe','Killer','Jewelry Bonney (Nika future)','Gecko Moria (prime)','Jesus Burgess','Avalo Pizarro','Emporio Ivankov','Jack','Van Augur','Catarina Devon','Sanjuan Wolf','Denjiro','Nekomamushi (Sulong)','Inuarashi (Sulong)','Ashura Doji','Oars','Stussy','Bepo (Sulong)','X Drake','Izo','Who\'s-Who','Charlotte Perospero','Fisher Tiger','Kozuki Momonosuke (adult dragon)','Enel','Oars Jr.','Shakuyaku — Prime','Jozu','Don Chinjao — Prime','Captain John — Prime','Karasu','Morley','Urouge','Kaku','Vasco Shot','Laffitte','Doc Q','Jaguar D. Saul','Mont Blanc Noland','Kalgara','Franky','Nico Robin','Vergo','Smoker','Kawamatsu','Charlotte Oven','Brook','Vinsmoke Judge'],
        rare: ['Momonga','Onigumo','Sentomaru','Hody Jones — Steroidli prime','Vinsmoke Ichiji','Vinsmoke Reiju','Vinsmoke Niji','Vinsmoke Yonji','Charlotte Daifuku','Jabra','Sasaki','Black Maria','Cavendish / Hakuba','Pica','Kyros','Kin\'emon','Kanjuro','Pedro','Capone Bege','Caesar Clown','Basil Hawkins','Scratchmen Apoo','Perona','Monet','T-Bone','Daz Bones','Hajrudin','Lindbergh','Charlotte Compote','Tamago','Pekoms','Hongo','Howling Gab','Limejuice','Bonk Punch','Building Snake','Monster','Rockstar','Blueno','Kalifa','Trebol','Diamante','Bartolomeo','Gerd','Carrot','Wanda','Raizo','Wyper','Fukaboshi','Pell','Leo','Ohm','Gan Fall — Prime','Galdino / Mr. 3','Baby 5','Senor Pink','Lao G','Bellamy','Bentham / Mr. 2','Shura','Gedatsu','Buffalo','Arlong','Tony Tony Chopper','Nami','Helmeppo','Mansherry','Laboon','Zeff (prime)','Buggy (individual combat only)','Don Krieg','Mont Blanc Cricket','Nefertari Vivi','Otama','Shirahoshi (without Sea Kings)','Nefertari D. Lily (power unknown)','Nefertari Cobra']
      };
      for (const character of ['Jarul','Jorul','Dorry','Brogy','Tsuru']) {
        const index = draftGroups.superior.findIndex(name => name.startsWith(character));
        const movedCharacter = index === -1 ? null : draftGroups.superior.splice(index, 1)[0];
        if (movedCharacter && !draftGroups.epic.includes(movedCharacter)) draftGroups.epic.push(movedCharacter);
      }
      {
        const index = draftGroups.elite.findIndex(name => name.startsWith('Shimotsuki Ryuma'));
        const movedCharacter = index === -1 ? null : draftGroups.elite.splice(index, 1)[0];
        if (movedCharacter && !draftGroups.legendary.includes(movedCharacter)) draftGroups.legendary.push(movedCharacter);
      }
      for (const character of ['Bartholomew Kuma','Magellan','Koby']) {
        const index = draftGroups.epic.findIndex(name => name.startsWith(character));
        const movedCharacter = index === -1 ? null : draftGroups.epic.splice(index, 1)[0];
        if (movedCharacter && !draftGroups.superior.includes(movedCharacter)) draftGroups.superior.push(movedCharacter);
      }
      const superiorPowerOrder = ['Kozuki Oden','Borsalino','Benn Beckman','Issho','Aramaki','Sabo','Trafalgar D. Water Law','Yamato','Roronoa Zoro','Shepherd Sommers','Eustass Kid','Manmayer Gunko','Rimoshifu Killingham','Sanji','Marco','Crocodile','Shiryu','Lucky Roux','King','Boa Hancock','Charlotte Katakuri','Yasopp','Rob Lucci','Bartholomew Kuma','Portgas D. Ace','Magellan','Koby','Donquixote Doflamingo','Zunesha','Kong'];
      draftGroups.superior.sort((left, right) => superiorPowerOrder.findIndex(name => left.startsWith(name)) - superiorPowerOrder.findIndex(name => right.startsWith(name)));
      const epicPowerOrder = ['Edward Weevil','S-Hawk','Dorry','Brogy','Tsuru','Shakuyaku','Jozu','Vista','Queen','Jinbe','S-Bear','S-Snake','S-Shark','Jarul','Jorul','Oars','Killer','Charlotte Smoothie','Gecko Moria','Captain John','Nekomamushi','Inuarashi','Jack','Charlotte Cracker','Jewelry Bonney','Jesus Burgess','Avalo Pizarro','Sanjuan Wolf','Van Augur','Catarina Devon','Emporio Ivankov','Urouge','Kaku','Stussy','Laffitte','Vasco Shot','Doc Q','Karasu','Morley','Don Chinjao','Fisher Tiger','X Drake','Bepo','Oars Jr.','Denjiro','Ashura Doji',"Who's-Who",'Charlotte Perospero','Mont Blanc Noland','Kalgara','Vinsmoke Judge','Charlotte Oven','Vergo','Smoker','Jaguar D. Saul','Enel','Kozuki Momonosuke','Franky','Nico Robin','Brook','Izo','Kawamatsu'];
      const epicSortKey = name => name.replace(/\s*\([^)]*\)/g, '').replace(/\s+.*prime.*$/i, '').trim();
      const epicRank = name => { const exactPrefixes = ['Oars Jr.','Shakuyaku','Tsuru','Don Chinjao','Captain John']; const special = exactPrefixes.find(label => name.startsWith(label)); if (special) return epicPowerOrder.indexOf(special); const key = epicSortKey(name); const rank = epicPowerOrder.findIndex(label => key === label || key.startsWith(`${label} `)); return rank === -1 ? epicPowerOrder.length : rank; };
      draftGroups.epic.sort((left, right) => epicRank(left) - epicRank(right));
      for (const character of ['Kalgara','Mont Blanc Noland','Izo','Charlotte Oven','Franky','Ashura Doji']) {
        const index = draftGroups.epic.findIndex(name => name.startsWith(character));
        const movedCharacter = index === -1 ? null : draftGroups.epic.splice(index, 1)[0];
        if (movedCharacter && !draftGroups.rare.includes(movedCharacter)) draftGroups.rare.push(movedCharacter);
      }
      const draftWeights = { legendary: 1, elite: 3, superior: 6, epic: 10, rare: 16 };
      const localPortraits ={"Aramaki (Greenbull)":"/assets/placeholder.svg","Avalo Pizarro":"/assets/placeholder.svg","Bartholomew Kuma":"/assets/placeholder.svg","Benn Beckman":"/assets/placeholder.svg","Bepo (Sulong)":"/assets/placeholder.svg","Boa Hancock":"/assets/placeholder.svg","Borsalino (Kizaru)":"/assets/placeholder.svg","Brogy":"/assets/placeholder.svg","Brook":"/assets/placeholder.svg","Captain John":"/assets/placeholder.svg","Catarina Devon":"/assets/placeholder.svg","Charlotte Cracker":"/assets/placeholder.svg","Charlotte Katakuri":"/assets/placeholder.svg","Charlotte Linlin — Prime Big Mom":"/assets/placeholder.svg","Charlotte Perospero":"/assets/placeholder.svg","Charlotte Smoothie":"/assets/placeholder.svg","Crocodile":"/assets/placeholder.svg","Denjiro":"/assets/placeholder.svg","Doc Q":"/assets/placeholder.svg","Don Chinjao":"/assets/placeholder.svg","Donquixote Doflamingo":"/assets/placeholder.svg","Dorry":"/assets/placeholder.svg","Dracule Mihawk":"/assets/placeholder.svg","Edward Newgate — Prime Whitebeard":"/assets/placeholder.svg","Edward Weevil":"/assets/placeholder.svg","Emeth":"/assets/placeholder.svg","Emporio Ivankov":"/assets/placeholder.svg","Enel":"/assets/placeholder.svg","Eustass Kid":"/assets/placeholder.svg","Figarland Shamrock":"/assets/placeholder.svg","Fisher Tiger":"/assets/placeholder.svg","Gecko Moria":"/assets/placeholder.svg","Gol D. Roger":"/assets/placeholder.svg","Inuarashi":"/assets/placeholder.svg","Issho (Fujitora)":"/assets/placeholder.svg","Jack":"/assets/placeholder.svg","Jaguar D. Saul":"/assets/placeholder.svg","Jarul — Prime":"/assets/placeholder.svg","Jesus Burgess":"/assets/placeholder.svg","Jewelry Bonney":"/assets/placeholder.svg","Jinbe":"/assets/placeholder.svg","Jorul — Prime":"/assets/placeholder.svg","Joy Boy":"/assets/placeholder.svg","Jozu":"/assets/placeholder.svg","Kaido":"/assets/placeholder.svg","Kaku":"/assets/placeholder.svg","Karasu":"/assets/placeholder.svg","Kawamatsu":"/assets/placeholder.svg","Killer":"/assets/placeholder.svg","King":"/assets/placeholder.svg","King Harald — Prime":"/assets/placeholder.svg","Koby":"/assets/placeholder.svg","Kong — Prime":"/assets/placeholder.svg","Kozuki Momonosuke":"/assets/placeholder.svg","Kozuki Oden":"/assets/placeholder.svg","Kuzan (Aokiji)":"/assets/placeholder.svg","Laffitte":"/assets/placeholder.svg","Loki":"/assets/placeholder.svg","Lucky Roux":"/assets/placeholder.svg","Magellan":"/assets/placeholder.svg","Manmayer Gunko":"/assets/placeholder.svg","Marco":"/assets/placeholder.svg","Marshall D. Teach":"/assets/placeholder.svg","Monkey D. Dragon":"/assets/placeholder.svg","Monkey D. Garp — Prime":"/assets/placeholder.svg","Monkey D. Luffy":"/assets/placeholder.svg","Morley":"/assets/placeholder.svg","Nekomamushi":"/assets/placeholder.svg","Nico Robin":"/assets/placeholder.svg","Nika":"/assets/placeholder.svg","Oars":"/assets/placeholder.svg","Oars Jr.":"/assets/placeholder.svg","Portgas D. Ace":"/assets/placeholder.svg","Queen":"/assets/placeholder.svg","Rimoshifu Killingham":"/assets/placeholder.svg","Rob Lucci":"/assets/placeholder.svg","Rocks D. Xebec":"/assets/placeholder.svg","Roronoa Zoro":"/assets/placeholder.svg","S-Bear":"/assets/placeholder.svg","S-Hawk":"/assets/placeholder.svg","S-Shark":"/assets/placeholder.svg","S-Snake":"/assets/placeholder.svg","Sabo":"/assets/placeholder.svg","Saint Ethanbaron V. Nusjuro":"/assets/placeholder.svg","Saint Figarland Garling — Prime":"/assets/placeholder.svg","Saint Jaygarcia Saturn":"/assets/placeholder.svg","Saint Marcus Mars":"/assets/placeholder.svg","Saint Nerona Imu":"/assets/placeholder.svg","Saint Shepherd Ju Peter":"/assets/placeholder.svg","Saint Topman Warcury":"/assets/placeholder.svg","Sakazuki / Akainu":"/assets/placeholder.svg","Sanji":"/assets/placeholder.svg","Sanjuan Wolf":"/assets/placeholder.svg","Scopper Gaban — Prime":"/assets/placeholder.svg","Sengoku — Prime":"/assets/placeholder.svg","Shakuyaku":"/assets/placeholder.svg","Shanks":"/assets/placeholder.svg","Shepherd Sommers":"/assets/placeholder.svg","Shiki — Prime":"/assets/placeholder.svg","Shimotsuki Ryuma — Prime":"/assets/placeholder.svg","Shiryu":"/assets/placeholder.svg","Silvers Rayleigh — Prime":"/assets/placeholder.svg","Smoker":"/assets/placeholder.svg","Stussy":"/assets/placeholder.svg","Trafalgar D. Water Law":"/assets/placeholder.svg","Tsuru — Prime":"/assets/placeholder.svg","Urouge":"/assets/placeholder.svg","Van Augur":"/assets/placeholder.svg","Vasco Shot":"/assets/placeholder.svg","Vergo":"/assets/placeholder.svg","Vinsmoke Judge":"/assets/placeholder.svg","Vista":"/assets/placeholder.svg","Who's-Who":"/assets/placeholder.svg","X Drake":"/assets/placeholder.svg","Yamato":"/assets/placeholder.svg","Yasopp":"/assets/placeholder.svg","Zunesha":"/assets/placeholder.svg"};
      const portraitByDisplayName = Object.fromEntries(Object.entries(localPortraits).map(([name, path]) => [displayName(name), path]));
      const portraitPreloads = Object.values(localPortraits).map(src => { const image = new Image(); image.decoding = 'async'; image.src = src; return image; });
      const draftTierNames = { legendary:'EFSANEVİ', elite:'SEÇKİN', superior:'DESTANSI', epic:'NADİR', rare:'SIRADAN' };
      const tierColors = { legendary:'#FFD700', elite:'#E53935', superior:'#9C27B0', epic:'#2979FF', rare:'#9E9E9E' };
      const categoryOdds = { legendary:1, elite:5, superior:15, epic:35, rare:70 };
      // Korsan Bağları: yalnızca net ve doğrulanmış bağlar. Yeni bağlar buraya eklenir.
      const relationshipRules = [
        ['Monkey D. Garp','Monkey D. Dragon', 5, 'Aile bağı'], ['Monkey D. Garp','Monkey D. Dragon', -1, 'Denizci / Devrim Ordusu çatışması'],
        ['Monkey D. Garp','Monkey D. Luffy', 5, 'Aile bağı'], ['Monkey D. Dragon','Monkey D. Luffy', 5, 'Aile bağı'], ['Monkey D. Dragon','Monkey D. Luffy', 2, 'Aynı bölge: East Blue'],
        ['Saint Figarland Garling','Shanks', 5, 'Baba-oğul'], ['Saint Figarland Garling','Shanks', -1, 'İdeolojik çatışma'],
        ['Saint Figarland Garling','Figarland Shamrock', 5, 'Baba-oğul'], ['Shanks','Figarland Shamrock', 5, 'Kardeş bağı'], ['Shanks','Figarland Shamrock', -1, 'İdeolojik çatışma'],
        ['Gol D. Roger','Monkey D. Garp', 1, 'God Valley ittifakı'], ['Gol D. Roger','Monkey D. Garp', -1, 'Uzun süreli rakiplik'],
        ['Rocks D. Xebec','Gol D. Roger', -1, 'Açık düşmanlık'], ['Rocks D. Xebec','Monkey D. Garp', -1, 'Açık düşmanlık'], ['Rocks D. Xebec','Saint Figarland Garling', -1, 'Açık düşmanlık'],
        ['Joy Boy','Saint Nerona Imu', -1, 'Açık düşmanlık'], ['Shanks','Monkey D. Luffy', 2, 'Mentor / öğrenci bağı'],
        ['Saint Nerona Imu','Saint Topman Warcury', 3, 'Dünya Hükümeti bağı'], ['Saint Nerona Imu','Saint Ethanbaron V. Nusjuro', 3, 'Dünya Hükümeti bağı'], ['Saint Nerona Imu','Saint Marcus Mars', 3, 'Dünya Hükümeti bağı'], ['Saint Nerona Imu','Saint Shepherd Ju Peter', 3, 'Dünya Hükümeti bağı'], ['Saint Nerona Imu','Saint Jaygarcia Saturn', 3, 'Dünya Hükümeti bağı'],
        ['Saint Figarland Garling','Saint Nerona Imu', 3, 'Dünya Hükümeti bağı'], ['Figarland Shamrock','Saint Nerona Imu', 3, 'Dünya Hükümeti bağı'],
        ['Saint Figarland Garling','Saint Topman Warcury', 3, 'Dünya Hükümeti bağı'], ['Saint Figarland Garling','Saint Ethanbaron V. Nusjuro', 3, 'Dünya Hükümeti bağı'], ['Saint Figarland Garling','Saint Marcus Mars', 3, 'Dünya Hükümeti bağı'], ['Saint Figarland Garling','Saint Shepherd Ju Peter', 3, 'Dünya Hükümeti bağı'], ['Saint Figarland Garling','Saint Jaygarcia Saturn', 3, 'Dünya Hükümeti bağı'],
        ['Figarland Shamrock','Saint Topman Warcury', 3, 'Dünya Hükümeti bağı'], ['Figarland Shamrock','Saint Ethanbaron V. Nusjuro', 3, 'Dünya Hükümeti bağı'], ['Figarland Shamrock','Saint Marcus Mars', 3, 'Dünya Hükümeti bağı'], ['Figarland Shamrock','Saint Shepherd Ju Peter', 3, 'Dünya Hükümeti bağı'], ['Figarland Shamrock','Saint Jaygarcia Saturn', 3, 'Dünya Hükümeti bağı'],
        ['Kaido','Charlotte Linlin', 1, 'Geçmiş ittifak']
      ];
      const relationshipGroups = [
        { members:['Gol D. Roger','Silvers Rayleigh','Scopper Gaban','Shanks'], score:3, reason:'Roger Korsanları' },
        { members:['Rocks D. Xebec','Edward Newgate','Kaido','Charlotte Linlin','Shiki'], score:1, reason:'Eski Rocks tayfası' },
        { members:['Saint Topman Warcury','Saint Ethanbaron V. Nusjuro','Saint Marcus Mars','Saint Shepherd Ju Peter','Saint Jaygarcia Saturn'], score:5, reason:'Gorosei bağı' }
      ];
      function matchingRules(first, second) {
        const direct = relationshipRules.filter(([a,b]) => (a === first && b === second) || (a === second && b === first)).map(([, , score, reason]) => ({score, reason}));
        relationshipGroups.forEach(group => { if (group.members.includes(first) && group.members.includes(second)) direct.push({score:group.score, reason:group.reason}); });
        return direct;
      }
      function chemistryFor(player, candidate) {
        if (gameMode.value !== 'bonds' || !player || !candidate) return null;
        const team = history.filter(item => item.player === player);
        const links = team.flatMap(member => matchingRules(member.name, candidate.name).map(rule => ({...rule, member:member.name})));
        const total = links.reduce((sum, link) => sum + link.score, 0);
        return {total, links};
      }
      function teamChemistry(player) {
        const team = history.filter(item => item.player === player);
        const links = [];
        for (let index = 0; index < team.length; index++) {
          for (let other = index + 1; other < team.length; other++) {
            matchingRules(team[index].name, team[other].name).forEach(rule => links.push({...rule, first:team[index].name, second:team[other].name}));
          }
        }
        return { total: links.reduce((sum, link) => sum + link.score, 0), links };
      }
      function renderChemistry() {
        const preview = document.querySelector('#chemistryPreview');
        const chemistry = chemistryFor(buyer.value, currentAuction);
        if (!chemistry) { preview.hidden = true; return; }
        const candidate = displayName(currentAuction.name);
        if (!chemistry.links.length) { preview.innerHTML = `<b>${escapeHtml(candidate)}</b> için seçili tayfada henüz puan getiren net bir bağ yok.`; preview.hidden = false; return; }
        const lines = chemistry.links.map(link => `<li class="${link.score > 0 ? 'positive' : 'negative'}">${link.score > 0 ? '+' : ''}${link.score} — ${link.reason}: ${escapeHtml(displayName(link.member))}</li>`).join('');
        preview.innerHTML = `<b>${escapeHtml(candidate)} → ${escapeHtml(buyer.value)}</b><ul>${lines}</ul><b>Toplam: ${chemistry.total > 0 ? '+' : ''}${chemistry.total} Kimya Puanı</b>`;
        preview.hidden = false;
      }
      function buildPool() {
        return Object.entries(draftGroups).flatMap(([tier, names]) => {
          const multipliers = tier === 'legendary' ? [0.5, 7 / 6, 7 / 6, 7 / 6] : names.map((_, index) => names.length === 1 ? 1 : 0.55 + (index / (names.length - 1)) * 0.9);
          const multiplierTotal = multipliers.reduce((sum, value) => sum + value, 0);
          return names.map((name, index) => ({ name: displayName(name), tier, weight: categoryOdds[tier] * multipliers[index] / multiplierTotal }));
        });
      }
      const weights = { legendary: 1, elite: 3, strong: 8, known: 20 };
      const tierNames = { legendary:'Efsanevi', elite:'Zirve', strong:'Güçlü', known:'Sıradan' };
      let pool = buildPool();
      let history = [];
      let activityLog = [];
      let players = [];
      let playerIdentityByName = {};
      let pendingLaunchConfig = null;
      let appliedLaunchId = null;
      let currentPlayer = 0;
      let offers = 0;
      let passesByPlayer = {};
      let activeFilter = null;
      let activeTeam = null;
      let balances = {};
      let currentAuction = null;
      let wheelSpinning = false;
      let lastSaleUndo = null;
      let lastPassUndo = null;
      let preservedNextAuction = null;
      let nextAuctionTimer = null;
      let settingsLocked = false;
      let gameStarted = false;
      let finishDismissed = false;
      let scoresSavedForRound = false;
      let summaryAcknowledged = false;
      let timerRemaining = 0;
      let timerInterval = null;
      let revealAudioContext = null;
      let autosaveReady = false;
      let pendingSavedRound = null;
      let roundArchiveId = null;
      let roundStartedAt = 0;
      let roundRankingSnapshot = null;
      let roundArchiveFingerprint = '';
      const activeRoundKey = 'onePieceDraftActiveRoundV1';
      const pastRoundsKey = 'onePieceDraftPastRoundsV1';
      const excludedCharacters = new Set();
      const result = document.querySelector('#result'), historyList = document.querySelector('#history'), draw = document.querySelector('#draw'), skip = document.querySelector('#skip');
      const playerInput = document.querySelector('#playerName'), addPlayer = document.querySelector('#addPlayer'), playersList = document.querySelector('#players'), turn = document.querySelector('#turn'), crewLimit = document.querySelector('#crewLimit'), passLimit = document.querySelector('#passLimit'), gameMode = { value:'classic', disabled:false };
      const registeredPlayers = document.querySelector('#registeredPlayers');
      const filterButtons = document.querySelectorAll('[data-filter]');
      const categoryPanel = document.querySelector('#categoryPanel'), categoryTitle = document.querySelector('#categoryTitle'), categoryHistory = document.querySelector('#categoryHistory');
      const budget = document.querySelector('#budget'), auction = document.querySelector('#auction'), buyer = document.querySelector('#buyer'), price = document.querySelector('#price'), sell = document.querySelector('#sell'), freeBuy = document.querySelector('#freeBuy'), summary = document.querySelector('#summary'), undo = document.querySelector('#undo'), undoPass = document.querySelector('#undoPass'), teamDetails = document.querySelector('#teamDetails'), teamList = document.querySelector('#teamList'), auctionError = document.querySelector('#auctionError'), confirmSettings = document.querySelector('#confirmSettings'), resetSettings = document.querySelector('#resetSettings'), mandatoryNext = document.querySelector('#mandatoryNext'), finishModal = document.querySelector('#finishModal'), finishTeams = document.querySelector('#finishTeams'), finishMessage = document.querySelector('#finishMessage'), closeFinish = document.querySelector('#closeFinish'), playAgain = document.querySelector('#playAgain'), backToMenu = document.querySelector('#backToMenu'), categoryToggles = [...document.querySelectorAll('#categoryOptions input')], characterPicker = document.querySelector('#characterPicker'), presetName = document.querySelector('#presetName'), savePreset = document.querySelector('#savePreset'), presetSelect = document.querySelector('#presetSelect'), loadPreset = document.querySelector('#loadPreset'), deletePreset = document.querySelector('#deletePreset'), settingsAlert = document.querySelector('#settingsAlert'), settingsAlertText = document.querySelector('#settingsAlertText'), settingsAlertOk = document.querySelector('#settingsAlertOk'), closeSettingsAlert = document.querySelector('#closeSettingsAlert'), categorySummary = document.querySelector('#categorySummary');
      const timerEnabled = document.querySelector('#timerEnabled'), timerSettings = document.querySelector('#timerSettings'), timerSeconds = document.querySelector('#timerSeconds'), auctionTimer = document.querySelector('#auctionTimer'), timerDisplay = document.querySelector('#timerDisplay'), shareResult = document.querySelector('#shareResult');
      const soundEnabled = document.querySelector('#soundEnabled'), soundSettings = document.querySelector('#soundSettings'), soundVolume = document.querySelector('#soundVolume'), soundVolumeValue = document.querySelector('#soundVolumeValue');
      const classicScoring = document.createElement('div');
      classicScoring.id = 'classicScoring';
      classicScoring.hidden = true;
      classicScoring.innerHTML = '<h3>Klasik Mod Puanları</h3><p>Tur sıralamasını seç. <span id="classicScoringHint"></span></p><div id="roundRanking" class="round-ranking"></div><p id="scoringError" class="empty"></p><button class="primary" id="saveRoundScores">Puanları Kaydet</button>';
      finishTeams.after(classicScoring);
      const battlePanel = document.createElement('section');
      battlePanel.id = 'battlePanel';
      battlePanel.className = 'battle-panel';
      battlePanel.innerHTML = '<button class="primary" id="simulateBattle">⚔ Savaşı Başlat</button><p>Takımların güç dengesi animasyonla gösterilir. ChatGPT bağlantısı eklendiğinde sonuç ve savaş gerekçesi güncel bilgilerle burada yazacak.</p><div class="battle-results" id="battleResults" hidden></div>';
      finishTeams.after(battlePanel);
      const simulateBattle = battlePanel.querySelector('#simulateBattle'), battleResults = battlePanel.querySelector('#battleResults');
      const openScoreboard = document.querySelector('#openScoreboard'), openPastResults = document.querySelector('#openPastResults'), openPlayerProfiles = document.querySelector('#openPlayerProfiles'), broadcastMode = document.querySelector('#broadcastMode'), scoreboardModal = document.querySelector('#scoreboardModal'), closeScoreboard = document.querySelector('#closeScoreboard'), scoreboardList = document.querySelector('#scoreboardList'), clearScoreboard = document.querySelector('#clearScoreboard'), pastResultsModal = document.querySelector('#pastResultsModal'), closePastResults = document.querySelector('#closePastResults'), pastResultsList = document.querySelector('#pastResultsList'), playerProfilesModal = document.querySelector('#playerProfilesModal'), closePlayerProfiles = document.querySelector('#closePlayerProfiles'), playerProfilesList = document.querySelector('#playerProfilesList'), classicScoringHint = classicScoring.querySelector('#classicScoringHint'), roundRanking = classicScoring.querySelector('#roundRanking'), scoringError = classicScoring.querySelector('#scoringError'), saveRoundScores = classicScoring.querySelector('#saveRoundScores'), copyTeams = document.querySelector('#copyTeams'), backupData = document.querySelector('#backupData'), restoreData = document.querySelector('#restoreData'), restoreDataFile = document.querySelector('#restoreDataFile'), backupStatus = document.querySelector('#backupStatus');
      const draftSummaryModal = document.querySelector('#draftSummaryModal'), draftSummary = document.querySelector('#draftSummary'), summaryStart = document.querySelector('#summaryStart'), summaryBack = document.querySelector('#summaryBack');
      const resumeModal = document.querySelector('#resumeModal'), resumeRound = document.querySelector('#resumeRound'), discardRound = document.querySelector('#discardRound');
      const resetConfirmModal = document.querySelector('#resetConfirmModal'), confirmResetRound = document.querySelector('#confirmResetRound'), cancelResetRound = document.querySelector('#cancelResetRound'), closeResetConfirm = document.querySelector('#closeResetConfirm');
      const forceWheelModal = document.querySelector('#forceWheelModal'), forceWheel = document.querySelector('#forceWheel'), forceWheelCharacter = document.querySelector('#forceWheelCharacter'), forceWheelNames = document.querySelector('#forceWheelNames'), spinForceWheel = document.querySelector('#spinForceWheel'), forceWheelResult = document.querySelector('#forceWheelResult');
      const fixedRegisteredPlayers = ['Samed','Efecan','Ertuğrul','Hasan','Kıraç'];
      document.querySelector('#reset').after(undo);
      undo.after(undoPass);
      freeBuy.classList.add('free-buy-button');
      auction.append(freeBuy);
      function prepareFreshRoundState() {
        forceWheelModal.hidden = true;
        wheelSpinning = false;
        cancelQueuedAuction();
        stopAuctionTimer(true);
        pool = selectedPool();
        history = [];
        activityLog = [];
        currentPlayer = 0;
        offers = 0;
        passesByPlayer = Object.fromEntries(players.map(name => [name, 0]));
        currentAuction = null;
        preservedNextAuction = null;
        lastSaleUndo = null;
        lastPassUndo = null;
        gameStarted = false;
        finishDismissed = false;
        scoresSavedForRound = false;
        summaryAcknowledged = false;
        timerRemaining = 0;
        activeFilter = null;
        activeTeam = null;
        resetRoundArchiveState();
        auction.hidden = true;
      }
      function applyLaunchConfig(config) {
        if (!config?.launchId) return false;
        if (config.launchId === appliedLaunchId) return false;
        if (settingsLocked || gameStarted) return false;
        const launchPlayers = Array.isArray(config.players)
          ? config.players.filter(player => player && typeof player.name === 'string' && player.name.trim())
          : [];
        if (!launchPlayers.length) return false;
        if (pendingSavedRound?.settingsLocked) {
          pendingLaunchConfig = config;
          return false;
        }
        const currentNames = new Set();
        const duplicateCurrentNames = new Set();
        launchPlayers.forEach(player => {
          const name = player.name.trim();
          if (currentNames.has(name)) duplicateCurrentNames.add(name);
          currentNames.add(name);
        });
        if (duplicateCurrentNames.size) return false;

        players = launchPlayers.map(player => player.name.trim());
        playerIdentityByName = {};
        launchPlayers.forEach(player => {
          if (player.id) playerIdentityByName[player.name.trim()] = player.id;
        });
        const legacyCandidates = new Map();
        launchPlayers.forEach(player => {
          const legacyName = String(player.legacyName || '').trim();
          if (!player.id || !legacyName || currentNames.has(legacyName)) return;
          const matches = legacyCandidates.get(legacyName) || [];
          matches.push(player.id);
          legacyCandidates.set(legacyName, matches);
        });
        legacyCandidates.forEach((ids, legacyName) => {
          if (ids.length === 1) playerIdentityByName[legacyName] = ids[0];
        });

        registerPlayers(players);
        crewLimit.value = String(config.crewLimit ?? crewLimit.value);
        passLimit.value = String(config.passLimit ?? passLimit.value);
        budget.value = String(config.budget ?? budget.value);
        timerEnabled.value = config.timerEnabled ? 'yes' : 'no';
        timerSeconds.value = String(config.timerSeconds ?? timerSeconds.value ?? 30);
        soundEnabled.value = config.soundEnabled === false ? 'no' : 'yes';
        soundVolume.value = String(config.soundVolume ?? soundVolume.value ?? 60);
        balances = Object.fromEntries(players.map(name => [name, Number(budget.value)]));
        prepareFreshRoundState();
        settingsLocked = false;
        syncTimerSettings();
        syncSoundSettings();
        renderRegisteredPlayers();
        renderPlayers();
        render();
        appliedLaunchId = config.launchId;
        pendingLaunchConfig = null;
        return true;
      }
      function getScoreboard() { try { return JSON.parse(localStorage.getItem('onePieceDraftScoreboard') || '{}'); } catch { return {}; } }
      function setBroadcastMode(enabled) {
        if (enabled && !settingsLocked) { turn.textContent = 'Yayın Modunu açmadan önce ayarları onaylamalısın.'; return; }
        document.body.classList.toggle('broadcast-mode', !!enabled);
        broadcastMode.textContent = enabled ? 'Yayın Modundan Çık' : 'Yayın Modu';
        broadcastMode.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      }
      function saveScoreboard(board) { localStorage.setItem('onePieceDraftScoreboard', JSON.stringify(board)); }
      function getCharacterSaleStats() { try { return JSON.parse(localStorage.getItem('onePieceDraftCharacterSaleStats') || '{}'); } catch { return {}; } }
      function saveCharacterSaleStats(stats) { localStorage.setItem('onePieceDraftCharacterSaleStats', JSON.stringify(stats)); }
      function draftStorageSnapshot() {
        const data = {};
        for (let index = 0; index < localStorage.length; index++) {
          const key = localStorage.key(index);
          if (key?.startsWith('onePieceDraft')) data[key] = localStorage.getItem(key);
        }
        return data;
      }
      function downloadDraftBackup() {
        saveActiveRound();
        const payload = { app:'Kıraç ve Abileri One Piece Draft', version:1, exportedAt:new Date().toISOString(), data:draftStorageSnapshot() };
        const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
        const url = URL.createObjectURL(blob), link = document.createElement('a'), date = new Date().toISOString().slice(0, 10);
        link.href = url; link.download = `one-piece-draft-yedek-${date}.json`; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
        backupStatus.textContent = 'Yedek dosyası indirildi.';
      }
      async function restoreDraftBackup(file) {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { backupStatus.textContent = 'Bu yedek dosyası çok büyük.'; return; }
        const previous = draftStorageSnapshot();
        try {
          const payload = JSON.parse(await file.text());
          if (payload?.app !== 'Kıraç ve Abileri One Piece Draft' || payload?.version !== 1 || !payload.data || typeof payload.data !== 'object' || Array.isArray(payload.data)) throw new Error('Geçersiz yedek');
          const entries = Object.entries(payload.data);
          if (!entries.length || entries.some(([key, value]) => !key.startsWith('onePieceDraft') || typeof value !== 'string')) throw new Error('Geçersiz veri');
          Object.keys(previous).forEach(key => localStorage.removeItem(key));
          entries.forEach(([key, value]) => localStorage.setItem(key, value));
          backupStatus.textContent = 'Yedek geri yüklendi. Sayfa yenileniyor…';
          setTimeout(() => location.reload(), 350);
        } catch {
          Object.keys(draftStorageSnapshot()).forEach(key => localStorage.removeItem(key));
          Object.entries(previous).forEach(([key, value]) => localStorage.setItem(key, value));
          backupStatus.textContent = 'Yedek yüklenemedi. Doğru dosyayı seçtiğinden emin ol.';
        } finally { restoreDataFile.value = ''; }
      }
      function updateCharacterSaleStats(characterName, playerName, amount, direction) {
        const stats = getCharacterSaleStats();
        const key = displayName(characterName);
        const entry = stats[key] || { total:0, count:0, buyers:{} };
        entry.buyers = entry.buyers || {};
        entry.total = Math.max(0, Number(entry.total || 0) + (Number(amount || 0) * direction));
        entry.count = Math.max(0, Number(entry.count || 0) + direction);
        entry.buyers[playerName] = Math.max(0, Number(entry.buyers[playerName] || 0) + direction);
        if (!entry.buyers[playerName]) delete entry.buyers[playerName];
        if (!entry.count) delete stats[key]; else stats[key] = entry;
        saveCharacterSaleStats(stats);
      }
      function characterSaleStatsHtml(characterName) {
        const entry = getCharacterSaleStats()[displayName(characterName)];
        if (!entry?.count) return '<div class="character-market-stats"><div class="character-market-stat"><span>Ortalama satış fiyatı</span><strong>Henüz veri yok</strong></div><div class="character-market-stat"><span>En çok alan</span><strong>Henüz veri yok</strong></div></div>';
        const average = (Number(entry.total || 0) / Number(entry.count)).toFixed(1).replace('.', ',');
        const buyers = Object.entries(entry.buyers || {});
        if (!buyers.length) return `<div class="character-market-stats"><div class="character-market-stat"><span>Ortalama satış fiyatı</span><strong>$${average} · ${escapeHtml(entry.count)} satış</strong></div><div class="character-market-stat"><span>En çok alan</span><strong>Henüz veri yok</strong></div></div>`;
        const mostPurchases = Math.max(...buyers.map(([, count]) => Number(count)));
        const leaders = buyers.filter(([, count]) => Number(count) === mostPurchases).map(([name]) => name).join(' ve ');
        return `<div class="character-market-stats"><div class="character-market-stat"><span>Ortalama satış fiyatı</span><strong>$${average} · ${escapeHtml(entry.count)} satış</strong></div><div class="character-market-stat"><span>En çok alan</span><strong>${escapeHtml(leaders)} · ${mostPurchases} kez</strong></div></div>`;
      }
      function getRegisteredPlayerNames() {
        let saved = [];
        try { saved = JSON.parse(localStorage.getItem('onePieceDraftRegisteredPlayers') || '[]'); } catch { saved = []; }
        const names = [...new Set([...fixedRegisteredPlayers, ...saved.map(name => String(name).trim()).filter(Boolean)])];
        localStorage.setItem('onePieceDraftRegisteredPlayers', JSON.stringify(names));
        return names;
      }
      function registerPlayers(names) {
        const registered = [...new Set([...getRegisteredPlayerNames(), ...names.map(name => String(name).trim()).filter(Boolean)])];
        localStorage.setItem('onePieceDraftRegisteredPlayers', JSON.stringify(registered));
        const board = getScoreboard();
        names.forEach(name => { if (!board[name]) board[name] = { points:0, games:0, wins:0 }; });
        saveScoreboard(board);
      }
      function renderScoreboard() { const board = getScoreboard(); const entries = Object.entries(board).sort((a,b) => b[1].points - a[1].points || b[1].wins - a[1].wins || a[0].localeCompare(b[0], 'tr')); scoreboardList.innerHTML = entries.length ? entries.map(([name, stat], index) => `<li class="scoreboard-entry"><b>${index + 1}. ${escapeHtml(name)}</b><span>${escapeHtml(stat.points)} puan · ${escapeHtml(stat.games)} tur · ${escapeHtml(stat.wins)} birincilik</span></li>`).join('') : '<li class="empty">Henüz kayıtlı oyuncu yok.</li>'; }
      function escapeHtml(value) { return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character])); }
      function normalizedTimerSeconds() { const seconds = Math.max(5, Math.min(300, Math.round(Number(timerSeconds.value) || 30))); timerSeconds.value = seconds; return seconds; }
      function timerIsEnabled() { return timerEnabled.value === 'yes'; }
      function stopAuctionTimer(hide = false) { if (timerInterval) clearInterval(timerInterval); timerInterval = null; if (hide) auctionTimer.hidden = true; }
      function paintAuctionTimer() { auctionTimer.hidden = !timerIsEnabled() || !currentAuction; auctionTimer.classList.toggle('expired', timerRemaining <= 0 && !!currentAuction); timerDisplay.textContent = Math.max(0, timerRemaining); }
      function startAuctionTimer(remaining = normalizedTimerSeconds()) { stopAuctionTimer(); if (!timerIsEnabled() || !currentAuction) { auctionTimer.hidden = true; return; } timerRemaining = Math.max(0, Number.isFinite(Number(remaining)) ? Math.round(Number(remaining)) : normalizedTimerSeconds()); paintAuctionTimer(); if (!timerRemaining) return; timerInterval = setInterval(() => { timerRemaining = Math.max(0, timerRemaining - 1); paintAuctionTimer(); saveActiveRound(); if (!timerRemaining) { stopAuctionTimer(); auctionError.textContent = 'Süre doldu. Satışı onaylayabilir veya pas geçebilirsin.'; } }, 1000); }
      function syncTimerSettings() { timerSettings.hidden = !timerIsEnabled(); if (!timerIsEnabled()) { stopAuctionTimer(true); timerRemaining = 0; } }
      function soundIsEnabled() { return soundEnabled.value === 'yes'; }
      function normalizedSoundVolume() { const volume = Math.max(0, Math.min(100, Math.round(Number(soundVolume.value) || 0))); soundVolume.value = volume; soundVolumeValue.textContent = `%${volume}`; return volume; }
      function saveSoundPreferences() { try { localStorage.setItem('onePieceDraftRevealSoundV1', JSON.stringify({ enabled:soundEnabled.value, volume:normalizedSoundVolume() })); } catch {} }
      function loadSoundPreferences() { try { const saved = JSON.parse(localStorage.getItem('onePieceDraftRevealSoundV1') || 'null'); if (saved) { soundEnabled.value = saved.enabled === 'no' ? 'no' : 'yes'; soundVolume.value = String(Number.isFinite(Number(saved.volume)) ? saved.volume : 60); } } catch {} }
      function syncSoundSettings() { soundSettings.hidden = !soundIsEnabled(); normalizedSoundVolume(); saveSoundPreferences(); }
      function playRevealSound(tier) {
        if (!soundIsEnabled() || tier === 'rare' || normalizedSoundVolume() <= 0) return;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        try {
          revealAudioContext ||= new AudioContextClass();
          if (revealAudioContext.state === 'suspended') revealAudioContext.resume().catch(() => {});
          const context = revealAudioContext;
          const now = context.currentTime + .015;
          const volume = normalizedSoundVolume() / 100;
          const master = context.createGain();
          master.gain.setValueAtTime(Math.max(.0001, volume * .24), now);
          master.gain.exponentialRampToValueAtTime(.0001, now + 1.15);
          master.connect(context.destination);
          const note = (frequency, offset, duration, type = 'sine', peak = .4, endFrequency = frequency) => {
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            const start = now + offset;
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, start);
            oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), start + duration);
            gain.gain.setValueAtTime(.0001, start);
            gain.gain.exponentialRampToValueAtTime(Math.max(.001, peak), start + .025);
            gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
            oscillator.connect(gain).connect(master);
            oscillator.start(start);
            oscillator.stop(start + duration + .03);
          };
          if (tier === 'legendary') {
            note(74, 0, .72, 'sine', .72, 42);
            note(196, .03, .55, 'triangle', .42, 392);
            note(392, .13, .58, 'triangle', .36, 784);
            note(659, .25, .72, 'sine', .3, 988);
          } else if (tier === 'elite') {
            note(165, 0, .34, 'square', .28, 220);
            note(440, .04, .42, 'triangle', .42, 660);
            note(880, .13, .45, 'sine', .27, 740);
          } else if (tier === 'superior') {
            note(174, 0, .42, 'triangle', .3, 261);
            note(261, .09, .45, 'triangle', .32, 392);
            note(523, .2, .5, 'sine', .25, 659);
          } else if (tier === 'epic') {
            note(294, 0, .3, 'sine', .28, 392);
            note(440, .09, .36, 'sine', .22, 523);
          }
        } catch {}
      }
      function readActiveRound() { try { const saved = JSON.parse(localStorage.getItem(activeRoundKey) || 'null'); return saved?.version === 1 ? saved : null; } catch { return null; } }
      function saveActiveRound() { if (!autosaveReady || !settingsLocked) return; const state = { version:1, savedAt:Date.now(), players:[...players], balances:{...balances}, passesByPlayer:{...passesByPlayer}, currentPlayer, offers, history:[...history], activityLog:[...activityLog], pool:[...pool], currentAuction:currentAuction ? {...currentAuction} : null, preservedNextAuction:preservedNextAuction ? {...preservedNextAuction} : null, lastSaleUndo, lastPassUndo, settingsLocked, gameStarted, finishDismissed, scoresSavedForRound, summaryAcknowledged, roundArchiveId, roundStartedAt, roundRankingSnapshot, excludedCharacters:[...excludedCharacters], crewLimit:crewLimit.value, passLimit:passLimit.value, budget:budget.value, enabledTiers:categoryToggles.filter(toggle => toggle.checked).map(toggle => toggle.value), timerEnabled:timerEnabled.value, timerSeconds:timerSeconds.value, timerRemaining, soundEnabled:soundEnabled.value, soundVolume:soundVolume.value, auctionBuyer:currentAuction ? buyer.value : '', auctionPrice:currentAuction ? price.value : 1 }; localStorage.setItem(activeRoundKey, JSON.stringify(state)); }
      function clearActiveRound() { localStorage.removeItem(activeRoundKey); }
      function restoreActiveRound(state) {
        stopAuctionTimer(true);
        autosaveReady = false;
        players = Array.isArray(state.players) ? [...state.players] : [];
        balances = state.balances && typeof state.balances === 'object' ? {...state.balances} : {};
        passesByPlayer = state.passesByPlayer && typeof state.passesByPlayer === 'object' ? {...state.passesByPlayer} : {};
        currentPlayer = Math.max(0, Number(state.currentPlayer) || 0);
        offers = Math.max(0, Number(state.offers) || 0);
        history = Array.isArray(state.history) ? [...state.history] : [];
        activityLog = Array.isArray(state.activityLog) ? [...state.activityLog] : history.map(item => ({...item, type:'sale'}));
        pool = Array.isArray(state.pool) ? [...state.pool] : selectedPool();
        currentAuction = state.currentAuction ? {...state.currentAuction} : null;
        preservedNextAuction = state.preservedNextAuction ? {...state.preservedNextAuction} : null;
        lastSaleUndo = state.lastSaleUndo || null;
        lastPassUndo = state.lastPassUndo || null;
        settingsLocked = !!state.settingsLocked;
        gameStarted = !!state.gameStarted;
        finishDismissed = !!state.finishDismissed;
        scoresSavedForRound = !!state.scoresSavedForRound;
        summaryAcknowledged = !!state.summaryAcknowledged;
        roundArchiveId = typeof state.roundArchiveId === 'string' ? state.roundArchiveId : null;
        roundStartedAt = Math.max(0, Number(state.roundStartedAt) || 0);
        roundRankingSnapshot = Array.isArray(state.roundRankingSnapshot) ? state.roundRankingSnapshot : null;
        roundArchiveFingerprint = '';
        crewLimit.value = String(state.crewLimit || '');
        passLimit.value = String(state.passLimit || '');
        budget.value = String(state.budget || '');
        timerEnabled.value = state.timerEnabled === 'yes' ? 'yes' : 'no';
        timerSeconds.value = String(state.timerSeconds || 30);
        timerRemaining = Math.max(0, Number(state.timerRemaining) || 0);
        soundEnabled.value = state.soundEnabled === 'no' ? 'no' : 'yes';
        soundVolume.value = String(Number.isFinite(Number(state.soundVolume)) ? state.soundVolume : soundVolume.value);
        excludedCharacters.clear();
        (state.excludedCharacters || []).forEach(name => excludedCharacters.add(name));
        const enabledTiers = Array.isArray(state.enabledTiers) ? state.enabledTiers : Object.keys(draftGroups);
        categoryToggles.forEach(toggle => toggle.checked = enabledTiers.includes(toggle.value));
        syncTimerSettings();
        syncSoundSettings();
        renderCharacterPicker();
        renderRegisteredPlayers();
        renderPlayers();
        draftSummaryModal.hidden = true;
        resumeModal.hidden = true;
        if (currentAuction) { presentAuction(currentAuction, state.auctionBuyer || '', Number(state.auctionPrice) || 1, timerRemaining); if (offers >= minimumOffers()) openForceWheel(); }
        else { auction.hidden = true; result.innerHTML = gameStarted ? '<div class="placeholder">Sıradaki karakter hazırlanıyor.</div>' : "<div class=\"placeholder\"><div class=\"empty-emblem\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><path d=\"M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M12 7v3m0 4v3M7 12h3m4 0h3\"/></svg></div><span class=\"empty-kicker\">DENİZLER SENİ BEKLİYOR</span><strong>İlk karakterin kim olacak?</strong><p>Oyuncularını ekle, ayarlarını onayla.<br>Tayfanın hikâyesi ilk çekilişle başlasın.</p><span class=\"empty-footnote\">Her karakter yalnızca bir kez gelir.</span></div>"; render(); }
        if (!gameStarted && !summaryAcknowledged) { renderDraftSummary(); draftSummaryModal.hidden = false; }
        autosaveReady = true;
        if (gameStarted && !currentAuction && (preservedNextAuction || pool.length) && !allTeamsFull()) openAuction();
        saveActiveRound();
      }
      function offerSavedRound() { pendingSavedRound = readActiveRound(); if (pendingSavedRound?.settingsLocked && Array.isArray(pendingSavedRound.players) && pendingSavedRound.players.length) resumeModal.hidden = false; else { clearActiveRound(); autosaveReady = true; } }
      function renderRegisteredPlayers() { const names = getRegisteredPlayerNames().sort((a,b) => a.localeCompare(b, 'tr')); registeredPlayers.innerHTML = names.length ? names.map(name => { const alreadyAdded = players.includes(name); return `<button type="button" class="registered-player" data-registered-player="${encodeURIComponent(name)}" ${alreadyAdded || settingsLocked ? 'disabled' : ''}>${alreadyAdded ? '✓' : '+'} ${name.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]))}</button>`; }).join('') : '<span class="empty">Henüz kayıtlı oyuncu yok. Bir isim eklediğinde burada kalıcı olarak görünecek.</span>'; }
      function renderDraftSummary() { const tiers = categoryToggles.filter(toggle => toggle.checked).map(toggle => draftTierNames[toggle.value]).join(' · '); const timerText = timerIsEnabled() ? `${normalizedTimerSeconds()} saniye` : 'Kapalı'; const soundText = soundIsEnabled() ? `Açık (%${normalizedSoundVolume()})` : 'Kapalı'; draftSummary.innerHTML = `<div class="finish-team"><b>Oyuncular</b><p>${escapeHtml(players.join(' · '))}</p></div><div class="finish-team"><b>Tur ayarları</b><p>Kişi başı ${crewLimit.value} karakter · ${passLimit.value} pas · $${budget.value} başlangıç bütçesi · Süre sayacı: ${timerText} · Açılış sesleri: ${soundText}</p></div><div class="finish-team"><b>Açık kategoriler</b><p>${tiers}</p></div>`; }
      function renderRoundSummary() {
        const tierRank = { legendary:0, elite:1, superior:2, epic:3, rare:4 };
        const tierPower = { legendary:100, elite:75, superior:52, epic:30, rare:14 };
        const playerStats = players.map(name => {
          const team = history.filter(item => item.player === name);
          const spent = team.reduce((total, item) => total + Number(item.price || 0), 0);
          const sortedByPrice = [...team].sort((a,b) => Number(b.price || 0) - Number(a.price || 0));
          return { name, team, spent, remaining:Number(balances[name] || 0), average:team.length ? spent / team.length : 0, passes:Number(passesByPlayer[name] || 0), mostExpensive:sortedByPrice[0], cheapest:sortedByPrice.at(-1) };
        });
        const maxValue = (key) => Math.max(...playerStats.map(item => item[key]));
        const tiedNames = (key) => playerStats.filter(item => item[key] === maxValue(key)).map(item => item.name).join(' ve ');
        const mostExpensiveSale = [...history].sort((a,b) => Number(b.price || 0) - Number(a.price || 0))[0];
        const bargain = [...history].sort((a,b) => ((tierPower[b.tier] || 0) / Math.max(Number(b.price || 0), .5)) - ((tierPower[a.tier] || 0) / Math.max(Number(a.price || 0), .5)))[0];
        const strongestTier = [...history].sort((a,b) => tierRank[a.tier] - tierRank[b.tier])[0]?.tier;
        const strongestCounts = playerStats.map(item => ({ name:item.name, count:item.team.filter(member => member.tier === strongestTier).length }));
        const strongestMax = Math.max(...strongestCounts.map(item => item.count));
        const strongestWinners = strongestCounts.filter(item => item.count === strongestMax).map(item => item.name).join(' ve ');
        const playerCards = playerStats.map(stat => {
          const roster = stat.team.map(item => `<li><span>${escapeHtml(displayName(item.name))}</span><small>$${Number(item.price || 0)} · ${escapeHtml(draftTierNames[item.tier])}</small></li>`).join('');
          const expensiveText = stat.mostExpensive ? `${escapeHtml(displayName(stat.mostExpensive.name))} · $${Number(stat.mostExpensive.price || 0)}` : '—';
          const cheapText = stat.cheapest ? `${escapeHtml(displayName(stat.cheapest.name))} · $${Number(stat.cheapest.price || 0)}` : '—';
          return `<div class="finish-team"><div class="finish-team-title"><b>${escapeHtml(stat.name)}</b><span>$${stat.remaining} kaldı</span></div><ul class="finish-roster">${roster}</ul><div class="finish-team-stats"><div class="finish-team-stat"><span>Toplam harcama</span><strong>$${stat.spent}</strong></div><div class="finish-team-stat"><span>Ortalama fiyat</span><strong>$${stat.average.toFixed(1).replace('.', ',')}</strong></div><div class="finish-team-stat"><span>Pas sayısı</span><strong>${stat.passes}</strong></div><div class="finish-team-stat"><span>En pahalı transfer</span><strong>${expensiveText}</strong></div><div class="finish-team-stat"><span>En ucuz transfer</span><strong>${cheapText}</strong></div><div class="finish-team-stat"><span>Kadro</span><strong>${stat.team.length} karakter</strong></div></div><button type="button" class="team-poster-button" data-team-poster="${encodeURIComponent(stat.name)}">Takım Posterini İndir</button></div>`;
        }).join('');
        const highlights = `<section class="round-highlights"><h3>Turun Öne Çıkanları</h3><div class="highlight-grid"><div class="highlight-card"><span>En pahalı karakter</span><strong>${mostExpensiveSale ? `${escapeHtml(displayName(mostExpensiveSale.name))} · ${escapeHtml(mostExpensiveSale.player)} · $${Number(mostExpensiveSale.price || 0)}` : '—'}</strong></div><div class="highlight-card"><span>En çok harcayan</span><strong>${escapeHtml(tiedNames('spent'))} · $${maxValue('spent')}</strong></div><div class="highlight-card"><span>En çok parası kalan</span><strong>${escapeHtml(tiedNames('remaining'))} · $${maxValue('remaining')}</strong></div><div class="highlight-card"><span>En çok pas yapan</span><strong>${maxValue('passes') ? `${escapeHtml(tiedNames('passes'))} · ${maxValue('passes')} pas` : 'Bu tur pas yok'}</strong></div><div class="highlight-card"><span>${strongestTier ? `${escapeHtml(draftTierNames[strongestTier])} avcısı` : 'En güçlü kategori'}</span><strong>${strongestMax ? `${escapeHtml(strongestWinners)} · ${strongestMax} karakter` : '—'}</strong></div><div class="highlight-card"><span>Fırsat transferi</span><strong>${bargain ? `${escapeHtml(displayName(bargain.name))} · ${escapeHtml(bargain.player)} · $${Number(bargain.price || 0)}` : '—'}</strong></div></div></section>`;
        return playerCards + highlights;
      }
      function teamsCopyText() {
        const teamBlocks = players.map(name => {
          const team = history.filter(item => item.player === name);
          const roster = team.length ? team.map((item, index) => `${index + 1}. ${displayName(item.name)}`).join('\n') : 'Henüz karakter yok.';
          return `${name} Takımı\n${roster}`;
        });
        return `ONE PIECE DRAFT TAKIMLARI\n\n${teamBlocks.join('\n\n')}`;
      }
      async function copyAllTeams() {
        const text = teamsCopyText();
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const area = document.createElement('textarea');
          area.value = text;
          area.setAttribute('readonly', '');
          area.style.position = 'fixed';
          area.style.opacity = '0';
          document.body.append(area);
          area.select();
          document.execCommand('copy');
          area.remove();
        }
        scoringError.textContent = 'Tüm takımlar kopyalandı.';
        copyTeams.textContent = 'Kopyalandı ✓';
        setTimeout(() => { copyTeams.textContent = 'Takımları Kopyala'; }, 1800);
      }
      function roundedCanvasRect(context, x, y, width, height, radius) { const r = Math.min(radius, width / 2, height / 2); context.beginPath(); context.moveTo(x + r, y); context.arcTo(x + width, y, x + width, y + height, r); context.arcTo(x + width, y + height, x, y + height, r); context.arcTo(x, y + height, x, y, r); context.arcTo(x, y, x + width, y, r); context.closePath(); }
      function fitCanvasText(context, value, maxWidth) { const text = String(value); if (context.measureText(text).width <= maxWidth) return text; let clipped = text; while (clipped.length > 1 && context.measureText(`${clipped}…`).width > maxWidth) clipped = clipped.slice(0, -1); return `${clipped}…`; }
      function createDraftResultCanvas() {
        const width = 1200;
        const columns = players.length > 1 ? 2 : 1;
        const gap = 28;
        const margin = 54;
        const cardWidth = (width - (margin * 2) - (gap * (columns - 1))) / columns;
        const maxTeamSize = Math.max(Number(crewLimit.value) || 1, ...players.map(name => history.filter(item => item.player === name).length));
        const cardHeight = 118 + (maxTeamSize * 31);
        const rows = Math.ceil(players.length / columns);
        const height = 235 + (rows * (cardHeight + gap)) + 170;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        const background = '#0b1d2c';
        context.fillStyle = background;
        context.fillRect(0, 0, width, height);
        context.fillStyle = '#f1c75b';
        context.font = '800 50px Georgia, serif';
        context.fillText('Kıraç ve Abileri', margin, 74);
        context.fillStyle = '#fff7df';
        context.font = '800 34px system-ui, sans-serif';
        context.fillText('One Piece Draft Sonucu', margin, 121);
        context.fillStyle = '#b8c4cd';
        context.font = '20px system-ui, sans-serif';
        context.fillText(`${new Date().toLocaleDateString('tr-TR')} · ${players.length} oyuncu · Kişi başı ${crewLimit.value} karakter`, margin, 160);
        players.forEach((name, index) => {
          const row = Math.floor(index / columns);
          const column = index % columns;
          const x = margin + (column * (cardWidth + gap));
          const y = 195 + (row * (cardHeight + gap));
          const team = history.filter(item => item.player === name);
          const spent = team.reduce((total, item) => total + Number(item.price || 0), 0);
          roundedCanvasRect(context, x, y, cardWidth, cardHeight, 18);
          context.fillStyle = '#0c2b49';
          context.fill();
          context.strokeStyle = '#2c5b7d';
          context.lineWidth = 2;
          context.stroke();
          context.fillStyle = '#f1c75b';
          context.font = '800 27px system-ui, sans-serif';
          context.fillText(fitCanvasText(context, name, cardWidth - 190), x + 22, y + 39);
          context.fillStyle = '#b8c4cd';
          context.font = '18px system-ui, sans-serif';
          context.textAlign = 'right';
          context.fillText(`$${spent} harcandı · $${Number(balances[name] || 0)} kaldı`, x + cardWidth - 22, y + 38);
          context.textAlign = 'left';
          team.forEach((item, teamIndex) => {
            const lineY = y + 82 + (teamIndex * 31);
            context.beginPath();
            context.arc(x + 27, lineY - 6, 7, 0, Math.PI * 2);
            context.fillStyle = tierColors[item.tier] || '#9E9E9E';
            context.fill();
            context.fillStyle = '#fff7df';
            context.font = '18px system-ui, sans-serif';
            context.fillText(fitCanvasText(context, displayName(item.name), cardWidth - 165), x + 44, lineY);
            context.fillStyle = '#b8c4cd';
            context.textAlign = 'right';
            context.fillText(`$${Number(item.price || 0)}`, x + cardWidth - 22, lineY);
            context.textAlign = 'left';
          });
        });
        const highlightY = 220 + (rows * (cardHeight + gap));
        const mostExpensive = [...history].sort((a,b) => Number(b.price || 0) - Number(a.price || 0))[0];
        const mostPasses = Math.max(0, ...players.map(name => Number(passesByPlayer[name] || 0)));
        const passLeaders = players.filter(name => Number(passesByPlayer[name] || 0) === mostPasses).join(' ve ');
        roundedCanvasRect(context, margin, highlightY, width - (margin * 2), 115, 18);
        context.fillStyle = '#071f36';
        context.fill();
        context.strokeStyle = '#f1c75b';
        context.stroke();
        context.fillStyle = '#f1c75b';
        context.font = '800 22px system-ui, sans-serif';
        context.fillText('TURUN ÖNE ÇIKANLARI', margin + 22, highlightY + 34);
        context.fillStyle = '#fff7df';
        context.font = '19px system-ui, sans-serif';
        const expensiveText = mostExpensive ? `En pahalı: ${displayName(mostExpensive.name)} · ${mostExpensive.player} · $${Number(mostExpensive.price || 0)}` : 'En pahalı: —';
        context.fillText(fitCanvasText(context, expensiveText, 520), margin + 22, highlightY + 76);
        context.fillText(fitCanvasText(context, mostPasses ? `En çok pas: ${passLeaders} · ${mostPasses}` : 'Bu tur pas kullanılmadı', 480), margin + 590, highlightY + 76);
        return canvas;
      }
      function downloadDraftImage(blob) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'one-piece-draft-sonucu.png'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
      function shareDraftImage() { const canvas = createDraftResultCanvas(); canvas.toBlob(async blob => { if (!blob) return; const file = new File([blob], 'one-piece-draft-sonucu.png', {type:'image/png'}); if (navigator.share && navigator.canShare?.({files:[file]})) { try { await navigator.share({files:[file], title:'Kıraç ve Abileri One Piece Draft Sonucu'}); return; } catch (error) { if (error?.name === 'AbortError') return; } } downloadDraftImage(blob); }, 'image/png'); }
      function createTeamPosterCanvas(playerName) {
        const team = history.filter(item => item.player === playerName);
        const width = 1080, height = 1350, canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const context = canvas.getContext('2d');
        const background = '#0b1d2c';
        context.fillStyle = background; context.fillRect(0, 0, width, height);
        context.globalAlpha = .14; context.fillStyle = '#f1c75b'; context.beginPath(); context.arc(900, 125, 270, 0, Math.PI * 2); context.fill(); context.globalAlpha = 1;
        context.fillStyle = '#f1c75b'; context.font = '800 36px Georgia, serif'; context.fillText('KIRAÇ VE ABİLERİ', 70, 80);
        context.fillStyle = '#fff7df'; context.font = '900 72px system-ui, sans-serif'; context.fillText(fitCanvasText(context, `${playerName} Takımı`, 940), 70, 175);
        context.fillStyle = '#b8c4cd'; context.font = '26px system-ui, sans-serif'; context.fillText(`${new Date().toLocaleDateString('tr-TR')} · ${team.length} karakter`, 72, 225);
        roundedCanvasRect(context, 60, 285, 960, 900, 28); context.fillStyle = '#071f36'; context.fill(); context.strokeStyle = '#2c5b7d'; context.lineWidth = 3; context.stroke();
        const rowHeight = Math.min(92, Math.floor(820 / Math.max(team.length, 1)));
        team.forEach((item, index) => {
          const y = 350 + (index * rowHeight);
          context.beginPath(); context.arc(105, y - 9, 14, 0, Math.PI * 2); context.fillStyle = tierColors[item.tier] || '#9E9E9E'; context.fill();
          context.fillStyle = '#fff7df'; context.font = '800 31px system-ui, sans-serif'; context.fillText(fitCanvasText(context, `${index + 1}. ${displayName(item.name)}`, 650), 140, y);
          context.fillStyle = tierColors[item.tier] || '#b8c4cd'; context.font = '700 23px system-ui, sans-serif'; context.textAlign = 'right'; context.fillText(draftTierNames[item.tier] || 'Kategori', 950, y); context.textAlign = 'left';
          if (index < team.length - 1) { context.strokeStyle = '#173b58'; context.lineWidth = 1; context.beginPath(); context.moveTo(90, y + 30); context.lineTo(960, y + 30); context.stroke(); }
        });
        context.fillStyle = '#f1c75b'; context.font = '800 28px system-ui, sans-serif'; context.fillText('ONE PIECE DRAFT', 70, 1260);
        context.fillStyle = '#b8c4cd'; context.font = '22px system-ui, sans-serif'; context.textAlign = 'right'; context.fillText('Tayfan hazır. Denizler seni bekliyor.', 1010, 1260); context.textAlign = 'left';
        return canvas;
      }
      function downloadTeamPoster(playerName) {
        const canvas = createTeamPosterCanvas(playerName);
        canvas.toBlob(blob => { if (!blob) return; const url = URL.createObjectURL(blob); const link = document.createElement('a'); const safeName = playerName.toLocaleLowerCase('tr-TR').replace(/[^a-z0-9çğıöşü]+/gi, '-').replace(/^-|-$/g, '') || 'oyuncu'; link.href = url; link.download = `${safeName}-takim-posteri.png`; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }, 'image/png');
      }
      function createRoundArchiveId() { return globalThis.crypto?.randomUUID?.() || `round-${Date.now()}-${Math.random().toString(36).slice(2)}`; }
      function resetRoundArchiveState() { roundArchiveId = null; roundStartedAt = 0; roundRankingSnapshot = null; roundArchiveFingerprint = ''; }
      function readPastRounds() { try { const saved = JSON.parse(localStorage.getItem(pastRoundsKey) || '[]'); return Array.isArray(saved) ? saved : []; } catch { return []; } }
      function savePastRounds(rounds) { localStorage.setItem(pastRoundsKey, JSON.stringify(rounds.slice(0, 100))); }
      function currentRoundArchive() {
        const teams = players.map(name => {
          const characters = history.filter(item => item.player === name).map(item => ({ name:displayName(item.name), tier:item.tier, price:Number(item.price || 0) }));
          const spent = characters.reduce((total, item) => total + item.price, 0);
          return { name, playerId:playerIdentityByName[name], remaining:Number(balances[name] || 0), spent, passes:Number(passesByPlayer[name] || 0), characters };
        });
        const allSales = teams.flatMap(team => team.characters.map(character => ({...character, player:team.name})));
        const mostExpensive = [...allSales].sort((a,b) => b.price - a.price)[0] || null;
        const mostSpent = [...teams].sort((a,b) => b.spent - a.spent)[0] || null;
        const mostPasses = [...teams].sort((a,b) => b.passes - a.passes)[0] || null;
        return {
          id:roundArchiveId,
          playedAt:roundStartedAt || Date.now(),
          settings:{ crewLimit:Number(crewLimit.value), passLimit:Number(passLimit.value), budget:Number(budget.value), timer:timerIsEnabled() ? normalizedTimerSeconds() : 0, tiers:categoryToggles.filter(toggle => toggle.checked).map(toggle => draftTierNames[toggle.value]) },
          teams,
          ranking:Array.isArray(roundRankingSnapshot) ? roundRankingSnapshot.map(item => ({...item, playerId:playerIdentityByName[item.name]})) : [],
          highlights:{ mostExpensive, mostSpent:mostSpent ? {name:mostSpent.name, amount:mostSpent.spent} : null, mostPasses:mostPasses ? {name:mostPasses.name, amount:mostPasses.passes} : null }
        };
      }
      function archiveCompletedRound() {
        if (!gameStarted || !allTeamsFull() || currentAuction) return;
        roundArchiveId ||= createRoundArchiveId();
        roundStartedAt ||= Date.now();
        const payload = currentRoundArchive();
        const fingerprint = JSON.stringify(payload);
        if (fingerprint === roundArchiveFingerprint) return;
        roundArchiveFingerprint = fingerprint;
        try { savePastRounds([payload, ...readPastRounds().filter(round => round?.id !== roundArchiveId)]); }
        catch { roundArchiveFingerprint = ''; }
      }
      function removeArchivedCurrentRound() {
        if (!roundArchiveId) return;
        roundArchiveFingerprint = '';
        try { savePastRounds(readPastRounds().filter(round => round?.id !== roundArchiveId)); } catch {}
      }
      function formatRoundDate(value) {
        const date = new Date(Number(value));
        return Number.isNaN(date.getTime()) ? 'Tarih bilinmiyor' : new Intl.DateTimeFormat('tr-TR', {dateStyle:'medium', timeStyle:'short'}).format(date);
      }
      function renderPastRound(round, index) {
        const teams = Array.isArray(round.teams) ? round.teams : [];
        const ranking = Array.isArray(round.ranking) ? round.ranking : [];
        const winner = ranking.find(item => Number(item.rank) === 1)?.name;
        const settings = round.settings && typeof round.settings === 'object' ? round.settings : {};
        const names = teams.map(team => escapeHtml(String(team.name || 'Oyuncu'))).join(' · ');
        const timerText = Number(settings.timer) > 0 ? `${Number(settings.timer)} sn` : 'kapalı';
        const tierText = Array.isArray(settings.tiers) ? settings.tiers.map(item => escapeHtml(String(item))).join(' · ') : '—';
        const teamCards = teams.map(team => {
          const characters = Array.isArray(team.characters) ? team.characters : [];
          const roster = characters.length ? characters.map(character => { const tier = draftTierNames[character.tier] || 'Kategori'; const color = tierColors[character.tier] || '#9E9E9E'; return `<li><span>${escapeHtml(String(character.name || 'Karakter'))}</span><small style="color:${color}">${escapeHtml(tier)} · $${Number(character.price || 0)}</small></li>`; }).join('') : '<li class="empty">Karakter kaydı yok.</li>';
          return `<article class="finish-team"><div class="finish-team-title"><b>${escapeHtml(String(team.name || 'Oyuncu'))}</b><span>$${Number(team.remaining || 0)} kaldı</span></div><ul class="finish-roster">${roster}</ul><div class="finish-team-stats"><div class="finish-team-stat"><span>Toplam harcama</span><strong>$${Number(team.spent || 0)}</strong></div><div class="finish-team-stat"><span>Pas sayısı</span><strong>${Number(team.passes || 0)}</strong></div><div class="finish-team-stat"><span>Kadro</span><strong>${characters.length} karakter</strong></div><div class="finish-team-stat"><span>Tur sırası</span><strong>${ranking.find(item => item.name === team.name)?.rank ? `${Number(ranking.find(item => item.name === team.name).rank)}.` : 'Kaydedilmedi'}</strong></div></div></article>`;
        }).join('');
        const resultText = winner ? `Kazanan: ${escapeHtml(String(winner))}` : 'Sıralama kaydedilmedi';
        const deleteButton = round.id ? `<div class="past-round-actions"><button type="button" data-delete-round="${encodeURIComponent(String(round.id))}">Bu Kaydı Sil</button></div>` : '';
        return `<details class="past-round"><summary><div class="past-round-title"><strong>${formatRoundDate(round.playedAt)}</strong><span>${names || 'Oyuncu bilgisi yok'}</span></div><div class="past-round-meta">${resultText}<br>${teams.length} oyuncu</div></summary><div class="past-round-body"><p class="past-round-settings">Kişi başı ${Number(settings.crewLimit || 0)} karakter · ${Number(settings.passLimit || 0)} pas · $${Number(settings.budget || 0)} bütçe · Süre: ${timerText}<br>Kategoriler: ${tierText}</p><div class="past-round-teams">${teamCards}</div>${deleteButton}</div></details>`;
      }
      function loadPastResults() {
        const rounds = readPastRounds().sort((a,b) => Number(b?.playedAt || 0) - Number(a?.playedAt || 0));
        pastResultsList.innerHTML = rounds.length ? rounds.map(renderPastRound).join('') : '<p class="empty">Bu cihazda henüz tamamlanmış tur yok.</p>';
      }
      function buildPlayerProfiles() {
        const rounds = readPastRounds();
        const board = getScoreboard();
        const names = new Set([...getRegisteredPlayerNames(), ...Object.keys(board)]);
        rounds.forEach(round => (Array.isArray(round?.teams) ? round.teams : []).forEach(team => { if (team?.name) names.add(String(team.name)); }));
        return [...names].map(name => {
          const playedRounds = rounds.filter(round => (Array.isArray(round?.teams) ? round.teams : []).some(team => team?.name === name));
          const teams = playedRounds.map(round => round.teams.find(team => team?.name === name)).filter(Boolean);
          const characters = teams.flatMap(team => Array.isArray(team.characters) ? team.characters : []);
          const archivedWins = playedRounds.filter(round => (Array.isArray(round?.ranking) ? round.ranking : []).some(item => item?.name === name && Number(item.rank) === 1)).length;
          const official = board[name] || {};
          const games = Math.max(playedRounds.length, Number(official.games || 0));
          const wins = Math.max(archivedWins, Number(official.wins || 0));
          const points = Number(official.points || 0);
          const averageSpend = teams.length ? teams.reduce((total, team) => total + Number(team.spent || 0), 0) / teams.length : 0;
          const highestTransfer = [...characters].sort((a,b) => Number(b?.price || 0) - Number(a?.price || 0))[0] || null;
          const tierCounts = characters.reduce((counts, character) => { const tier = character?.tier || 'unknown'; counts[tier] = Number(counts[tier] || 0) + 1; return counts; }, {});
          const favoriteTierKey = Object.entries(tierCounts).sort((a,b) => b[1] - a[1])[0]?.[0];
          const characterCounts = characters.reduce((counts, character) => { const key = String(character?.name || ''); if (key) counts[key] = Number(counts[key] || 0) + 1; return counts; }, {});
          const favoriteCharacter = Object.entries(characterCounts).sort((a,b) => b[1] - a[1])[0] || null;
           const badges = [];
           if (wins >= 1) badges.push('🏆 İlk Zafer');
           if (wins >= 3) badges.push('👑 Seri Şampiyon');
           if (games >= 5) badges.push('⚓ Draft Müdavimi');
           if (points >= 10) badges.push('⭐ Puan Ustası');
           if (Number(tierCounts.legendary || 0) >= 1) badges.push('✨ Efsanevi Avcısı');
           if (characters.length >= 25) badges.push('📚 Koleksiyoncu');
           if (favoriteCharacter && Number(favoriteCharacter[1]) >= 3) badges.push('🎯 Sadık Seçim');
           return { name, games, wins, points, averageSpend, highestTransfer, favoriteTier:favoriteTierKey ? (draftTierNames[favoriteTierKey] || favoriteTierKey) : 'Henüz yok', favoriteCharacter, characterCount:characters.length, badges };
        }).sort((a,b) => b.points - a.points || b.wins - a.wins || b.games - a.games || a.name.localeCompare(b.name, 'tr'));
      }
      function renderPlayerProfiles() {
        const profiles = buildPlayerProfiles();
        playerProfilesList.innerHTML = profiles.length ? profiles.map(profile => {
          const highestText = profile.highestTransfer ? `${escapeHtml(String(profile.highestTransfer.name))} · $${Number(profile.highestTransfer.price || 0)}` : 'Henüz yok';
          const favoriteCharacterText = profile.favoriteCharacter ? `${escapeHtml(profile.favoriteCharacter[0])} · ${Number(profile.favoriteCharacter[1])} kez` : 'Henüz yok';
          const badges = profile.badges.length ? profile.badges.map(badge => `<span class="profile-badge">${escapeHtml(badge)}</span>`).join('') : '<span class="empty">Henüz başarı rozeti kazanılmadı.</span>';
          return `<details class="player-profile"><summary><div class="player-profile-heading"><strong>${escapeHtml(profile.name)}</strong><span>${profile.games} oyun · ${profile.wins} galibiyet · ${profile.badges.length} rozet</span></div><span class="player-profile-points">${profile.points} puan</span></summary><div class="player-profile-body"><div class="profile-badges">${badges}</div><div class="player-profile-stats"><div class="finish-team-stat"><span>Toplam oyun</span><strong>${profile.games}</strong></div><div class="finish-team-stat"><span>Galibiyet</span><strong>${profile.wins}</strong></div><div class="finish-team-stat"><span>Toplam puan</span><strong>${profile.points}</strong></div><div class="finish-team-stat"><span>Ortalama harcama</span><strong>$${profile.averageSpend.toFixed(1).replace('.', ',')}</strong></div><div class="finish-team-stat"><span>Favori kategori</span><strong>${escapeHtml(profile.favoriteTier)}</strong></div><div class="finish-team-stat"><span>En pahalı transfer</span><strong>${highestText}</strong></div><div class="finish-team-stat"><span>En sık aldığı karakter</span><strong>${favoriteCharacterText}</strong></div><div class="finish-team-stat"><span>Arşivdeki karakterler</span><strong>${profile.characterCount}</strong></div></div></div></details>`;
        }).join('') : '<p class="empty">Henüz oyuncu istatistiği yok.</p>';
      }
      function renderClassicScoring(draftFinished) {
        const show = draftFinished && gameMode.value === 'classic';
        classicScoring.hidden = !show;
        if (!show) return;
        classicScoringHint.textContent = `${players.length} kişi: ${players.length - 1} / ${players.length - 2} / ... / 0 puan.`;
        if (scoresSavedForRound) { roundRanking.innerHTML = '<p class="empty">Bu turun puanları kaydedildi.</p>'; scoringError.textContent = ''; saveRoundScores.disabled = true; return; }
        saveRoundScores.disabled = false;
        roundRanking.innerHTML = players.map((name, index) => `<label><b>${escapeHtml(name)}</b><select data-rank-player="${escapeHtml(name)}" aria-label="${escapeHtml(name)} sırası">${players.map((_, rank) => `<option value="${rank + 1}" ${rank === index ? 'selected' : ''}>${rank + 1}. sıra (+${players.length - rank - 1})</option>`).join('')}</select></label>`).join('');
      }
      function startBattlePreview() { const tierPower = { legendary:100, elite:75, superior:52, epic:30, rare:14 }; const teams = players.map(name => { const members = history.filter(item => item.player === name); return { name, score:members.reduce((total, item) => total + (tierPower[item.tier] || 0) + Number(item.price || 0), 0) }; }); const totalScore = teams.reduce((total, team) => total + team.score, 0) || 1; let assigned = 0; const results = teams.map((team, index) => { const chance = index === teams.length - 1 ? 100 - assigned : Math.round((team.score / totalScore) * 100); assigned += chance; return { ...team, chance }; }).sort((a,b) => b.chance - a.chance); battleResults.hidden = false; battleResults.innerHTML = results.map((team, index) => `<div class="battle-team"><div class="battle-team-header"><span>${index + 1}. ${escapeHtml(team.name)}</span><strong>%${team.chance}</strong></div><div class="battle-meter"><span data-battle-meter="${team.chance}"></span></div></div>`).join('') + '<p class="battle-note">Bu ekran güç dengesi önizlemesidir. ChatGPT bağlantısı kurulduğunda kadrolara göre ayrıntılı savaş anlatımı ve gerekçeli kazanan kararı burada gösterilecek.</p>'; requestAnimationFrame(() => battleResults.querySelectorAll('[data-battle-meter]').forEach(bar => { bar.style.width = `${bar.dataset.battleMeter}%`; })); }
      function pick() { let total=pool.reduce((n,x)=>n+x.weight,0), roll=Math.random()*total; return pool.find(x => (roll -= x.weight) <= 0); }
      function displayName(name) { const clean = name.replace(/\s*\([^)]*\)/g, '').replace(/\s*(?:â€”|—)\s*/g, ' ').replace(/\bprime\b/gi, '').replace(/\s{2,}/g, ' ').trim(); const aliases = { 'Borsalino':'Borsalino (Kizaru)', 'Kuzan':'Kuzan (Aokiji)', 'Issho':'Issho (Fujitora)', 'Aramaki':'Aramaki (Greenbull)', 'Sakazuki':'Sakazuki (Akainu)', 'Bepo':'Bepo (Sulong)' }; return aliases[clean] || clean; }
      function minimumOffers() { return Number(passLimit.value); }
      function selectedPool() { const enabledTiers = categoryToggles.filter(toggle => toggle.checked).map(toggle => toggle.value); return buildPool().filter(item => enabledTiers.includes(item.tier) && !excludedCharacters.has(item.name)); }
      function renderCharacterPicker() { const openTiers = [...characterPicker.querySelectorAll('details')].map((detail, index) => detail.open ? Object.keys(draftGroups)[index] : null).filter(Boolean); characterPicker.innerHTML = Object.entries(draftGroups).map(([tier, names]) => `<details ${openTiers.includes(tier) ? 'open' : ''}><summary style="color:${tierColors[tier]}">${draftTierNames[tier]} <span>(${names.filter(name => !excludedCharacters.has(displayName(name))).length}/${names.length} karakter)</span></summary><div class="character-list">${names.map(name => { const clean = displayName(name); return `<label><input type="checkbox" data-character="${clean}" ${excludedCharacters.has(clean) ? '' : 'checked'} ${settingsLocked ? 'disabled' : ''}> ${clean}</label>`; }).join('')}</div></details>`).join(''); }
      function playerPickCount(name) { return history.filter(item => item.player === name).length; }
      function tierLimit(tier) { if (gameMode.value !== 'captain') return Infinity; if (tier === 'legendary' || tier === 'elite') return 1; return tier === 'superior' ? (Number(crewLimit.value) <= 4 ? 1 : Number(crewLimit.value) <= 7 ? 2 : 3) : Infinity; }
      function allTeamsFull() { return players.length > 0 && players.every(name => playerPickCount(name) >= Number(crewLimit.value)); }
      function updateSettingsControls() {
        [playerInput, addPlayer, crewLimit, gameMode, passLimit, budget, timerEnabled, timerSeconds, soundEnabled, soundVolume, presetName, savePreset, presetSelect, loadPreset, deletePreset, ...categoryToggles].forEach(control => control.disabled = settingsLocked);
        characterPicker.querySelectorAll('input').forEach(control => control.disabled = settingsLocked);
        confirmSettings.disabled = settingsLocked;
        confirmSettings.textContent = settingsLocked ? 'Ayarlar Onaylandı' : 'Ayarları Onayla';
        broadcastMode.disabled = !settingsLocked;
      }
      function updateCategoryCounts() { categoryToggles.forEach(toggle => { const names = draftGroups[toggle.value] || []; const selected = names.filter(name => !excludedCharacters.has(displayName(name))).length; const label = toggle.closest('label')?.querySelector('[data-category-count]'); if (label) label.textContent = `${draftTierNames[toggle.value]} (${selected}/${names.length})`; }); }
      function updateCategorySummary() { updateCategoryCounts(); const total = selectedPool().length; if (!crewLimit.value) { categorySummary.textContent = `Açık kategorilerde ${total} karakter var. Önce tayfa limitini seç.`; return; } const needed = players.length * Number(crewLimit.value); const maxPlayers = Math.floor(total / Number(crewLimit.value)); categorySummary.textContent = players.length ? `Açık kategoriler: ${total} karakter. Gerekli minimum: ${needed}. Maksimum oyuncu: ${maxPlayers}. ${total >= needed ? 'Bu ayar geçerli.' : 'Yeterli karakter yok.'}` : `Açık kategorilerde ${total} karakter var.`; }
      function getPresets() { try { return JSON.parse(localStorage.getItem('onePieceDraftPresets') || '[]'); } catch { return []; } }
      function renderPresets() { const presets = getPresets(); presetSelect.innerHTML = '<option value="">— Kayıtlı ayar seç —</option>' + presets.map((preset, index) => `<option value="${index}">${escapeHtml(preset.name)}</option>`).join(''); }
      function applyPreset(preset) { crewLimit.value = preset.crewLimit; passLimit.value = preset.passLimit; budget.value = preset.budget; timerEnabled.value = preset.timerEnabled === 'yes' ? 'yes' : 'no'; timerSeconds.value = String(preset.timerSeconds || 30); soundEnabled.value = preset.soundEnabled === 'no' ? 'no' : 'yes'; soundVolume.value = String(Number.isFinite(Number(preset.soundVolume)) ? preset.soundVolume : soundVolume.value); syncTimerSettings(); syncSoundSettings(); gameMode.value = preset.gameMode; players = [...preset.players]; registerPlayers(players); balances = Object.fromEntries(players.map(name => [name, Number(budget.value)])); passesByPlayer = Object.fromEntries(players.map(name => [name, 0])); excludedCharacters.clear(); (preset.excludedCharacters || []).forEach(name => excludedCharacters.add(name)); categoryToggles.forEach(toggle => toggle.checked = preset.enabledTiers.includes(toggle.value)); renderCharacterPicker(); renderRegisteredPlayers(); renderPlayers(); render(); }
      function advanceToAvailablePlayer() { for (let i = 0; i < players.length; i++) { if (playerPickCount(players[currentPlayer]) < Number(crewLimit.value)) return; currentPlayer = (currentPlayer + 1) % players.length; } }
      function renderPlayers() {
        if (players.length) advanceToAvailablePlayer();
        playersList.innerHTML = players.length ? players.map((name, index) => `<span class="player-chip">${index + 1}. ${escapeHtml(name)} - $${escapeHtml(balances[name] ?? (budget.value || '—'))} (${playerPickCount(name)}/${crewLimit.value || '—'})<button type="button" data-remove-player="${escapeHtml(name)}" aria-label="${escapeHtml(name)} oyuncusunu kaldır" ${settingsLocked ? 'disabled' : ''}>×</button></span>`).join('') : '<span class="empty">Oyuncu ekleyerek başla.</span>';
        turn.textContent = !settingsLocked ? 'Ayarları onaylayarak başla.' : players.length ? `Pas: ${offers < minimumOffers() ? 'açık' : 'kapalı'} (${Math.min(offers, minimumOffers())}/${minimumOffers()})` : 'Önce oyuncu ekle.';
      }
      function render() {
        updateSettingsControls();
        updateCategorySummary();
        const remainingByTier = Object.fromEntries(Object.keys(draftTierNames).map(tier => [tier, pool.filter(item => item.tier === tier).length]));
        document.querySelector('#remaining').innerHTML = `<b>${pool.length} karakter kaldı</b>${Object.entries(draftTierNames).map(([tier, label]) => `<span class="remaining-tier" style="color:${tierColors[tier]}">${label}: ${remainingByTier[tier]}</span>`).join('')}`;
        document.querySelector('#count').textContent = `${activityLog.length} işlem`;
        draw.disabled = !settingsLocked || !summaryAcknowledged || gameStarted || pool.length === 0 || players.length === 0 || allTeamsFull();
        draw.hidden = gameStarted;
        skip.disabled = pool.length === 0 || players.length === 0 || allTeamsFull() || offers >= minimumOffers() || !currentAuction;
        skip.hidden = offers >= minimumOffers();
        mandatoryNext.hidden = !(gameStarted && offers >= minimumOffers() && !!currentAuction);
        const draftFinished = gameStarted && allTeamsFull() && !currentAuction;
        if (draftFinished) archiveCompletedRound();
        finishModal.hidden = !draftFinished || finishDismissed;
        renderClassicScoring(draftFinished);
        if (draftFinished) {
          if (gameMode.value === 'bonds') {
            const standings = players.map(name => ({name, team:history.filter(item => item.player === name), chemistry:teamChemistry(name)})).sort((a,b) => b.chemistry.total - a.chemistry.total);
            const best = standings[0]?.chemistry.total ?? 0;
            const winners = standings.filter(item => item.chemistry.total === best).map(item => item.name).join(' ve ');
            finishMessage.textContent = `${winners} en yüksek Kimya Puanı ile kazandı: ${best > 0 ? '+' : ''}${best}.`;
            finishTeams.innerHTML = standings.map((entry, index) => { const reasons = entry.chemistry.links.length ? `<ul>${entry.chemistry.links.map(link => `<li class="${link.score > 0 ? 'positive' : 'negative'}">${link.score > 0 ? '+' : ''}${link.score} ${link.reason}: ${escapeHtml(displayName(link.first))} + ${escapeHtml(displayName(link.second))}</li>`).join('')}</ul>` : '<p>Net kimya bağı oluşmadı.</p>'; return `<div class="finish-team"><b>${index + 1}. ${escapeHtml(entry.name)}</b><p class="chemistry-total">Kimya Puanı: ${entry.chemistry.total > 0 ? '+' : ''}${entry.chemistry.total}</p><p>${escapeHtml(entry.team.map(item => displayName(item.name)).join(' • '))}</p>${reasons}</div>`; }).join('');
          } else {
            finishMessage.textContent = 'Takımlarınız hazır. Turun tüm istatistikleri aşağıda.';
            finishTeams.innerHTML = renderRoundSummary();
          }
        }
        if (!activityLog.length) historyList.innerHTML='<li class="empty">Çekilen karakterler burada görünecek.</li>';
        else historyList.innerHTML=activityLog.map((x,i)=>`<li><b>${i+1}. ${escapeHtml(displayName(x.name))}</b><span style="color:${tierColors[x.tier]}">${x.type === 'pass' ? 'PAS' : x.type === 'wheel' ? `ÇARK: ${escapeHtml(x.player)} - Ücretsiz - ${draftTierNames[x.tier]}` : `${escapeHtml(x.player)} - $${escapeHtml(x.price)} - ${draftTierNames[x.tier]}`}</span></li>`).reverse().join('');
        summary.innerHTML = players.length ? players.map(name => { const team = history.filter(item => item.player === name); const items = team.length ? team.map(item => `<li><b>${escapeHtml(item.name)}</b><span style="color:${tierColors[item.tier]}">$${escapeHtml(item.price)} - ${draftTierNames[item.tier]}</span></li>`).reverse().join('') : '<li class="empty">Henüz karakter yok.</li>'; return `<li><button class="team-name" data-team="${escapeHtml(name)}"><b>${escapeHtml(name)}</b><span>$${escapeHtml(balances[name] ?? budget.value)} - ${playerPickCount(name)} karakter</span></button><div class="team-details ${activeTeam === name ? 'open' : ''}"><ol>${items}</ol></div></li>`; }).join('') : '<li class="empty">Oyuncu ekleyin.</li>';
        undo.disabled = !lastSaleUndo;
        undoPass.disabled = !lastPassUndo;
        categoryPanel.hidden = !activeFilter;
        if (activeFilter) {
          const categoryItems = history.filter(item => item.tier === activeFilter);
          categoryTitle.textContent = `${draftTierNames[activeFilter]} çekilenler`;
          categoryTitle.style.color = tierColors[activeFilter];
          categoryHistory.innerHTML = categoryItems.length ? categoryItems.map(item => `<li><b>${escapeHtml(displayName(item.name))}</b><span class="category-owner" style="color:${tierColors[item.tier]}">${escapeHtml(item.player)}</span></li>`).reverse().join('') : '<li class="empty">Bu kategoride henüz karakter yok.</li>';
        }
        saveActiveRound();
      }
      function showCharacter(selected) {
        const portrait = portraitByDisplayName[selected.name];
        result.innerHTML=`<div class="character-card">${portrait ? `<img class="portrait" src="${portrait}" alt="${escapeHtml(selected.name)} portresi">` : ''}<div class="name">${escapeHtml(selected.name)}</div><div class="tier" style="color:${tierColors[selected.tier]}">${draftTierNames[selected.tier]}</div>${characterSaleStatsHtml(selected.name)}</div>`;
        result.classList.remove('reveal', 'reveal-legendary', 'reveal-elite', 'reveal-superior', 'reveal-epic');
        void result.offsetWidth;
        if (selected.tier !== 'rare') {
          result.classList.add('reveal', `reveal-${selected.tier}`);
          playRevealSound(selected.tier);
        }
      }
      function addNewPlayer() {
        const name = playerInput.value.trim();
        if (!name || players.includes(name)) return;
        players.push(name); registerPlayers([name]); balances[name] = Number(budget.value); passesByPlayer[name] = Number(passesByPlayer[name] || 0); playerInput.value = ''; renderRegisteredPlayers(); renderPlayers(); render();
      }
      listen(addPlayer, 'click', addNewPlayer);
      listen(playerInput, 'keydown', event => { if (event.key === 'Enter') addNewPlayer(); });
      listen(registeredPlayers, 'click', event => { const button = event.target.closest('[data-registered-player]'); if (!button || settingsLocked) return; playerInput.value = decodeURIComponent(button.dataset.registeredPlayer); addNewPlayer(); });
      listen(confirmSettings, 'click', () => { const enabledTiers = categoryToggles.filter(toggle => toggle.checked).map(toggle => toggle.value); if (!players.length) { turn.textContent = 'Önce en az bir oyuncu ekle.'; return; } if (!crewLimit.value || !passLimit.value || !budget.value) { turn.textContent = 'Tayfa limiti, pas limiti ve başlangıç bütçesini seçmelisin.'; return; } if (!enabledTiers.length) { turn.textContent = 'En az bir kategori açık olmalı.'; return; } const selected = selectedPool(); const neededCharacters = players.length * Number(crewLimit.value); if (selected.length < neededCharacters) { settingsAlertText.textContent = `${selected.length} karakter seçtin; bu tur için en az ${neededCharacters} karakter gerekiyor.`; settingsAlert.hidden = false; return; } pool = selected; settingsLocked = true; renderPlayers(); render(); });
      listen(confirmSettings, 'click', () => { if (!settingsLocked || gameStarted) return; summaryAcknowledged = false; renderDraftSummary(); draftSummaryModal.hidden = false; render(); });
      listen(summaryStart, 'click', () => { summaryAcknowledged = true; draftSummaryModal.hidden = true; render(); });
      listen(summaryBack, 'click', () => { settingsLocked = false; summaryAcknowledged = false; draftSummaryModal.hidden = true; clearActiveRound(); renderPlayers(); render(); });
      listen(settingsAlertOk, 'click', () => settingsAlert.hidden = true); listen(closeSettingsAlert, 'click', () => settingsAlert.hidden = true);
      listen(closeFinish, 'click', () => { finishDismissed = true; finishModal.hidden = true; saveActiveRound(); });
      listen(simulateBattle, 'click', startBattlePreview);
      listen(shareResult, 'click', shareDraftImage);
      listen(copyTeams, 'click', copyAllTeams);
      listen(finishTeams, 'click', event => { const button = event.target.closest('[data-team-poster]'); if (!button) return; downloadTeamPoster(decodeURIComponent(button.dataset.teamPoster || '')); });
      listen(backupData, 'click', downloadDraftBackup);
      listen(restoreData, 'click', () => restoreDataFile.click());
      listen(restoreDataFile, 'change', () => restoreDraftBackup(restoreDataFile.files?.[0]));
      listen(resumeRound, 'click', () => { pendingLaunchConfig = null; appliedLaunchId = null; if (pendingSavedRound) restoreActiveRound(pendingSavedRound); });
      listen(discardRound, 'click', () => { clearActiveRound(); pendingSavedRound = null; resumeModal.hidden = true; autosaveReady = true; const config = pendingLaunchConfig; pendingLaunchConfig = null; if (config) applyLaunchConfig(config); });
      listen(openScoreboard, 'click', () => { renderScoreboard(); scoreboardModal.hidden = false; });
      listen(openPastResults, 'click', () => { pastResultsModal.hidden = false; loadPastResults(); });
      listen(openPlayerProfiles, 'click', () => { playerProfilesModal.hidden = false; renderPlayerProfiles(); });
      listen(pastResultsList, 'click', event => { const button = event.target.closest('[data-delete-round]'); if (!button) return; const id = decodeURIComponent(button.dataset.deleteRound || ''); if (!id || !confirm('Bu geçmiş oyun kaydı silinsin mi?')) return; savePastRounds(readPastRounds().filter(round => round?.id !== id)); if (roundArchiveId === id) roundArchiveFingerprint = ''; loadPastResults(); });
      listen(broadcastMode, 'click', () => setBroadcastMode(!document.body.classList.contains('broadcast-mode')));
      listen(document, 'keydown', event => { if (event.key !== 'Escape') return; if (!resetConfirmModal.hidden) resetConfirmModal.hidden = true; else if (!playerProfilesModal.hidden) playerProfilesModal.hidden = true; else if (!pastResultsModal.hidden) pastResultsModal.hidden = true; else if (!scoreboardModal.hidden) scoreboardModal.hidden = true; else if (document.body.classList.contains('broadcast-mode')) setBroadcastMode(false); });
      listen(closeScoreboard, 'click', () => scoreboardModal.hidden = true);
      listen(closePastResults, 'click', () => pastResultsModal.hidden = true);
      listen(closePlayerProfiles, 'click', () => playerProfilesModal.hidden = true);
      listen(clearScoreboard, 'click', () => { localStorage.removeItem('onePieceDraftScoreboard'); localStorage.removeItem('onePieceDraftCharacterSaleStats'); renderScoreboard(); if (currentAuction) showCharacter(currentAuction); });
      listen(saveRoundScores, 'click', () => {
        const ranks = [...roundRanking.querySelectorAll('[data-rank-player]')].map(select => ({ name:select.dataset.rankPlayer, rank:Number(select.value) }));
        if (ranks.length !== players.length || new Set(ranks.map(item => item.rank)).size !== players.length) { scoringError.textContent = 'Her oyuncu için farklı bir sıra seçmelisin.'; return; }
        const board = getScoreboard();
        registerPlayers(players);
        ranks.forEach(({name, rank}) => { const stat = board[name] || { points:0, games:0, wins:0 }; stat.points += players.length - rank; stat.games += 1; if (rank === 1) stat.wins += 1; board[name] = stat; });
        saveScoreboard(board); scoresSavedForRound = true; roundRankingSnapshot = ranks.map(({name, rank}) => ({name, rank})); roundArchiveFingerprint = ''; scoringError.textContent = ''; renderScoreboard(); render();
      });
      listen(playAgain, 'click', () => document.querySelector('#reset').click());
      listen(backToMenu, 'click', () => resetSettings.click());
      listen(resetSettings, 'click', () => { stopAuctionTimer(true); clearActiveRound(); setBroadcastMode(false); settingsLocked = false; players = []; balances = {}; passesByPlayer = {}; excludedCharacters.clear(); pool = buildPool(); history = []; activityLog = []; currentPlayer = 0; offers = 0; currentAuction = null; preservedNextAuction = null; lastSaleUndo = null; lastPassUndo = null; gameStarted = false; finishDismissed = false; resetRoundArchiveState(); auction.hidden = true; crewLimit.value = ''; gameMode.value = 'classic'; passLimit.value = ''; budget.value = ''; timerEnabled.value = 'no'; timerSeconds.value = '30'; timerRemaining = 0; soundEnabled.value = 'yes'; soundVolume.value = '60'; syncTimerSettings(); syncSoundSettings(); categoryToggles.forEach(toggle => toggle.checked = true); renderCharacterPicker(); result.className = 'result'; result.innerHTML = "<div class=\"placeholder\"><div class=\"empty-emblem\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><path d=\"M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M12 7v3m0 4v3M7 12h3m4 0h3\"/></svg></div><span class=\"empty-kicker\">DENİZLER SENİ BEKLİYOR</span><strong>İlk karakterin kim olacak?</strong><p>Oyuncularını ekle, ayarlarını onayla.<br>Tayfanın hikâyesi ilk çekilişle başlasın.</p><span class=\"empty-footnote\">Her karakter yalnızca bir kez gelir.</span></div>"; renderPlayers(); render(); });
      listen(resetSettings, 'click', () => { summaryAcknowledged = false; draftSummaryModal.hidden = true; renderRegisteredPlayers(); });
      listen(playersList, 'click', event => { const button = event.target.closest('[data-remove-player]'); if (!button) return; const name = button.dataset.removePlayer; players = players.filter(item => item !== name); delete balances[name]; delete passesByPlayer[name]; currentPlayer = 0; renderRegisteredPlayers(); renderPlayers(); render(); });
      listen(summary, 'click', event => { const button = event.target.closest('[data-team]'); if (!button) return; activeTeam = activeTeam === button.dataset.team ? null : button.dataset.team; render(); });
      listen(budget, 'change', () => { budget.value = Math.max(1, Math.min(1000, Number(budget.value) || 1)); if (!history.length) players.forEach(name => balances[name] = Number(budget.value)); renderPlayers(); render(); });
      listen(crewLimit, 'change', () => { renderPlayers(); render(); });
      listen(passLimit, 'change', () => { passLimit.value = Math.max(5, Math.min(50, Number(passLimit.value) || 5)); renderPlayers(); render(); });
      listen(savePreset, 'click', () => { const name = presetName.value.trim(); if (!name) { presetName.focus(); return; } const presets = getPresets().filter(preset => preset.name !== name); presets.push({name, crewLimit:crewLimit.value, passLimit:passLimit.value, budget:budget.value, timerEnabled:timerEnabled.value, timerSeconds:timerSeconds.value, soundEnabled:soundEnabled.value, soundVolume:soundVolume.value, gameMode:gameMode.value, players:[...players], enabledTiers:categoryToggles.filter(toggle => toggle.checked).map(toggle => toggle.value), excludedCharacters:[...excludedCharacters]}); localStorage.setItem('onePieceDraftPresets', JSON.stringify(presets)); presetName.value = ''; renderPresets(); presetSelect.value = String(presets.length - 1); });
      listen(loadPreset, 'click', () => { if (presetSelect.value === '') return; const preset = getPresets()[Number(presetSelect.value)]; if (preset) applyPreset(preset); });
      listen(deletePreset, 'click', () => { const index = Number(presetSelect.value); if (!Number.isInteger(index) || presetSelect.value === '') return; const presets = getPresets(); presets.splice(index, 1); localStorage.setItem('onePieceDraftPresets', JSON.stringify(presets)); renderPresets(); });
      listen(timerEnabled, 'change', () => { syncTimerSettings(); render(); });
      listen(timerSeconds, 'change', () => { normalizedTimerSeconds(); render(); });
      listen(soundEnabled, 'change', () => { syncSoundSettings(); render(); });
      listen(soundVolume, 'input', () => { normalizedSoundVolume(); saveSoundPreferences(); });
      categoryToggles.forEach(toggle => listen(toggle, 'change', () => { updateCategorySummary(); }));
      listen(characterPicker, 'change', event => { const checkbox = event.target.closest('[data-character]'); if (!checkbox) return; if (checkbox.checked) excludedCharacters.delete(checkbox.dataset.character); else excludedCharacters.add(checkbox.dataset.character); renderCharacterPicker(); updateCategorySummary(); });
      filterButtons.forEach(button => listen(button, 'click', () => { activeFilter = activeFilter === button.dataset.filter ? null : button.dataset.filter; filterButtons.forEach(item => { const selected = item.dataset.filter === activeFilter; item.setAttribute('aria-pressed', String(selected)); item.style.background = selected ? tierColors[item.dataset.filter] : 'transparent'; item.style.color = selected ? '#171717' : tierColors[item.dataset.filter]; }); render(); }));
      function updateFreeBuy() { const selectedPlayer = buyer.value; const someoneEligible = players.some(name => balances[name] === 0 && playerPickCount(name) < Number(crewLimit.value)); freeBuy.hidden = !someoneEligible; freeBuy.disabled = !!selectedPlayer && !(balances[selectedPlayer] === 0 && playerPickCount(selectedPlayer) < Number(crewLimit.value)); }
      function cancelQueuedAuction() { if (nextAuctionTimer) { clearTimeout(nextAuctionTimer); nextAuctionTimer = null; } }
      function queueNextAuction() { cancelQueuedAuction(); nextAuctionTimer = setTimeout(() => { nextAuctionTimer = null; openAuction(); }, 250); }
      function presentAuction(selected, selectedBuyer = '', selectedPrice = 1, selectedTimerRemaining = null) { currentAuction = selected; buyer.innerHTML = '<option value="" selected disabled>— Oyuncu seç —</option>' + players.map(name => `<option value="${escapeHtml(name)}" ${playerPickCount(name) >= Number(crewLimit.value) ? 'disabled' : ''}>${escapeHtml(name)} ($${escapeHtml(balances[name])})</option>`).join(''); buyer.value = selectedBuyer; price.value = selectedPrice; auctionError.textContent = ''; auction.hidden = false; showCharacter(currentAuction); updateFreeBuy(); renderChemistry(); startAuctionTimer(selectedTimerRemaining ?? normalizedTimerSeconds()); render(); }
      function openAuction() { if (currentAuction || allTeamsFull()) return; const selected = preservedNextAuction || (pool.length ? pick() : null); if (!selected) return; if (preservedNextAuction) preservedNextAuction = null; else pool = pool.filter(item => item !== selected); presentAuction(selected); }
      function eligibleWheelPlayers() { return players.filter(name => playerPickCount(name) < Number(crewLimit.value)); }
      function openForceWheel() {
        if (!currentAuction || offers < minimumOffers()) return;
        const eligible = eligibleWheelPlayers();
        if (!eligible.length) return;
        stopAuctionTimer(true);
        wheelSpinning = false;
        forceWheelCharacter.textContent = displayName(currentAuction.name);
        forceWheelNames.innerHTML = eligible.map(name => `<span class="wheel-name">${escapeHtml(name)}</span>`).join('');
        const colors = ['#d53636','#f3ad32','#2773d4','#7d4fc5','#1e9b70','#d35a9d','#3399a9','#9c6d23'];
        const slice = 360 / eligible.length;
        forceWheel.style.background = `conic-gradient(${eligible.map((_, index) => `${colors[index % colors.length]} ${index * slice}deg ${(index + 1) * slice}deg`).join(', ')})`;
        forceWheel.style.transform = 'rotate(0deg)';
        spinForceWheel.disabled = false;
        forceWheelResult.textContent = '';
        forceWheelModal.hidden = false;
      }
      function completeWheelSale(winningPlayer) {
        if (!currentAuction || playerPickCount(winningPlayer) >= Number(crewLimit.value)) return;
        const sold = currentAuction, timerRemainingBefore = timerRemaining;
        stopAuctionTimer(true);
        lastPassUndo = null;
        lastSaleUndo = { sold, player:winningPlayer, price:0, offersBefore:offers, currentPlayerBefore:currentPlayer, timerRemainingBefore, forcedWheel:true };
        history.push({...sold, player:winningPlayer, price:0});
        activityLog.push({...sold, type:'wheel', player:winningPlayer, price:0});
        currentPlayer = (currentPlayer + 1) % players.length;
        currentAuction = null;
        auction.hidden = true;
        forceWheelModal.hidden = true;
        wheelSpinning = false;
        renderPlayers(); render();
        if ((preservedNextAuction || pool.length) && !allTeamsFull()) queueNextAuction();
      }
      listen(spinForceWheel, 'click', () => {
        if (wheelSpinning || !currentAuction) return;
        const eligible = eligibleWheelPlayers();
        if (!eligible.length) return;
        wheelSpinning = true;
        spinForceWheel.disabled = true;
        const winnerIndex = Math.floor(Math.random() * eligible.length);
        const slice = 360 / eligible.length;
        const rotation = 1440 + (360 - ((winnerIndex + .5) * slice));
        forceWheel.style.transform = `rotate(${rotation}deg)`;
        setTimeout(() => {
          const winner = eligible[winnerIndex];
          forceWheelResult.textContent = `${winner} seçildi! ${displayName(currentAuction?.name || '')} ücretsiz kadroya gidiyor.`;
          setTimeout(() => completeWheelSale(winner), 900);
        }, 3150);
      });
      listen(buyer, 'change', () => { updateFreeBuy(); renderChemistry(); saveActiveRound(); });
      listen(price, 'input', saveActiveRound);
      listen(draw, 'click', () => { if (gameStarted) return; scoresSavedForRound = false; roundRankingSnapshot = null; roundArchiveId ||= createRoundArchiveId(); roundStartedAt ||= Date.now(); roundArchiveFingerprint = ''; gameStarted = true; openAuction(); });
      function completeSale(amount, isFree = false) { const winningPlayer = buyer.value; if (!currentAuction) return; if (!winningPlayer) { auctionError.textContent = isFree ? 'Ücretsiz almak için bakiyesi 0$ olan oyuncuyu seçmelisin.' : 'Önce oyuncu seçmelisin.'; return; } if (playerPickCount(winningPlayer) >= Number(crewLimit.value)) { auctionError.textContent = 'Tayfan doldu. Daha fazla karakter alamazsın.'; return; } if (history.filter(item => item.player === winningPlayer && item.tier === currentAuction.tier).length >= tierLimit(currentAuction.tier)) { auctionError.textContent = 'Kaptan Kuralı: Bu nadirlikten daha fazla karakter alamazsın.'; return; } if (isFree && balances[winningPlayer] !== 0) { auctionError.textContent = 'Ücretsiz Al yalnızca parası biten oyuncular için kullanılabilir.'; return; } if (!isFree && (amount < 1 || amount > balances[winningPlayer])) { auctionError.textContent = 'Yeterli bütçen yok.'; return; } const sold = currentAuction; const timerRemainingBefore = timerRemaining; stopAuctionTimer(true); lastPassUndo = null; lastSaleUndo = { sold, player:winningPlayer, price:amount, offersBefore:offers, currentPlayerBefore:currentPlayer, timerRemainingBefore }; balances[winningPlayer] -= amount; history.push({...sold, player:winningPlayer, price:amount}); activityLog.push({...sold, type:'sale', player:winningPlayer, price:amount}); updateCharacterSaleStats(sold.name, winningPlayer, amount, 1); currentPlayer=(currentPlayer+1)%players.length; currentAuction = null; auction.hidden = true; renderPlayers(); render(); if ((preservedNextAuction || pool.length) && !allTeamsFull()) queueNextAuction(); }
      listen(sell, 'click', () => completeSale(Number(price.value)));
      listen(freeBuy, 'click', () => completeSale(0, true));
      listen(skip, 'click', () => { if (!currentAuction) return; const timerRemainingBefore = timerRemaining; stopAuctionTimer(true); lastSaleUndo = null; const passingPlayer = players[currentPlayer]; lastPassUndo = { skipped:currentAuction, player:passingPlayer, offersBefore:offers, currentPlayerBefore:currentPlayer, timerRemainingBefore }; activityLog.push({...currentAuction, type:'pass'}); if (passingPlayer) passesByPlayer[passingPlayer] = Number(passesByPlayer[passingPlayer] || 0) + 1; offers++; currentPlayer = (currentPlayer + 1) % players.length; if (offers >= minimumOffers()) { auctionError.textContent = 'Pas limiti doldu. Çarkla ücretsiz olarak bir oyuncuya gidecek.'; renderPlayers(); render(); openForceWheel(); return; } currentAuction = null; auction.hidden = true; renderPlayers(); render(); if ((preservedNextAuction || pool.length) && !allTeamsFull()) openAuction(); });
      listen(undo, 'click', () => { if (!lastSaleUndo) return; const wasComplete = allTeamsFull(); cancelQueuedAuction(); stopAuctionTimer(true); const undone = lastSaleUndo; if (currentAuction && currentAuction !== undone.sold) preservedNextAuction = currentAuction; history.pop(); if (['sale','wheel'].includes(activityLog.at(-1)?.type) && activityLog.at(-1)?.name === undone.sold.name) activityLog.pop(); balances[undone.player] += undone.price; if (!undone.forcedWheel) updateCharacterSaleStats(undone.sold.name, undone.player, undone.price, -1); offers = undone.offersBefore; currentPlayer = undone.currentPlayerBefore; lastSaleUndo = null; lastPassUndo = null; roundRankingSnapshot = null; if (wasComplete) removeArchivedCurrentRound(); presentAuction(undone.sold, undone.player, undone.price, undone.timerRemainingBefore); renderPlayers(); if (undone.forcedWheel) openForceWheel(); });
      listen(undoPass, 'click', () => { if (!lastPassUndo) return; forceWheelModal.hidden = true; wheelSpinning = false; cancelQueuedAuction(); stopAuctionTimer(true); const undone = lastPassUndo; if (currentAuction && currentAuction !== undone.skipped) preservedNextAuction = currentAuction; if (activityLog.at(-1)?.type === 'pass' && activityLog.at(-1)?.name === undone.skipped.name) activityLog.pop(); offers = undone.offersBefore; if (undone.player) passesByPlayer[undone.player] = Math.max(0, Number(passesByPlayer[undone.player] || 0) - 1); currentPlayer = undone.currentPlayerBefore; lastPassUndo = null; lastSaleUndo = null; presentAuction(undone.skipped, '', 1, undone.timerRemainingBefore); renderPlayers(); });
      function resetCurrentRound() { prepareFreshRoundState(); players.forEach(name => balances[name]=Number(budget.value)); result.className='result'; result.innerHTML="<div class=\"placeholder\"><div class=\"empty-emblem\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"7\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><path d=\"M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M12 7v3m0 4v3M7 12h3m4 0h3\"/></svg></div><span class=\"empty-kicker\">DENİZLER SENİ BEKLİYOR</span><strong>İlk karakterin kim olacak?</strong><p>Oyuncularını ekle, ayarlarını onayla.<br>Tayfanın hikâyesi ilk çekilişle başlasın.</p><span class=\"empty-footnote\">Her karakter yalnızca bir kez gelir.</span></div>"; renderPlayers(); render(); }
      listen(document.querySelector('#reset'), 'click', () => { resetConfirmModal.hidden = false; });
      listen(confirmResetRound, 'click', () => { resetConfirmModal.hidden = true; resetCurrentRound(); });
      listen(cancelResetRound, 'click', () => { resetConfirmModal.hidden = true; });
      listen(closeResetConfirm, 'click', () => { resetConfirmModal.hidden = true; });
      renderCharacterPicker();
      renderPresets();
      renderRegisteredPlayers();
      syncTimerSettings();
      loadSoundPreferences();
      syncSoundSettings();
      render();
      renderPlayers();
      offerSavedRound();
    
  const dispose = () => {
    controller.abort();
    classicScoring.remove();
    battlePanel.remove();
    timeouts.forEach(id => window.clearTimeout(id));
    intervals.forEach(id => window.clearInterval(id));
    revealAudioContext?.close().catch(() => {});
    window.document.body.classList.remove('broadcast-mode');
  };
  return { applyLaunchConfig, dispose };
}
