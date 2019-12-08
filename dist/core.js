parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"efjR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Input=void 0;var e=function(){function e(){}return e.init=function(e){var t=this,n=e.getBoundingClientRect();e.addEventListener("mousemove",function(e){t.mouse.x=e.clientX-n.left,t.mouse.y=e.clientY-n.top}),e.addEventListener("click",function(e){t.handleClicks()})},e.handleClicks=function(){for(var e=0,t=this.ClickEvents;e<t.length;e++){var n=t[e];this.mouse.x>n.s.x&&this.mouse.y>n.s.y&&this.mouse.x<n.e.x&&this.mouse.y<n.e.y&&n.callback()}},e.mouse={x:0,y:0},e.ClickEvents=[],e}();exports.Input=e;
},{}],"b7LN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Renderer=void 0;var t=require("./input.js");function e(t){return document.getElementById(t)}var s=function(){function s(){}return s.draw=function(t,e,s,i){i&&i.opacity&&(this.ctx.globalAlpha=i.opacity),i&&i.rotation?(this.ctx.save(),this.ctx.translate(e+t.w/2,s+t.h/2),this.ctx.rotate(i.rotation*Math.PI/180),this.ctx.translate(-e-t.w/2,-s-t.h/2),this.ctx.drawImage(t.img,e,s),this.ctx.restore()):this.ctx.drawImage(t.img,e,s),this.ctx.globalAlpha=1},s.drawText=function(t,e,s,i){this.ctx.font=s+"px Kelly Slab",this.ctx.fillStyle=i,this.ctx.textAlign="center",this.ctx.fillText(t,e.x,e.y)},s.drawTextures=function(){for(var e=0,s=this.textures;e<s.length;e++){var i=s[e];if(i.condition){if(i.condition()){this.draw(i.pic,i.pos.x,i.pos.y,i.mod?i.mod:void 0);continue}}else i.hover?t.Input.mouse.x>i.pos.x&&t.Input.mouse.y>i.pos.y&&t.Input.mouse.x<i.pos.x+i.pic.w&&t.Input.mouse.y<i.pos.y+i.pic.h&&this.draw(i.pic,i.pos.x,i.pos.y):this.draw(i.pic,i.pos.x,i.pos.y)}},s.drawRect=function(t,e,s,i){this.ctx.fillStyle=i,this.ctx.fillRect(t.x,t.y,e,s)},s.drawRects=function(){for(var t=0,e=this.shapes;t<e.length;t++){var s=e[t];this.drawRect(s.pos,s.w(),s.h,s.color)}},s.drawTexts=function(){for(var t=0,e=this.texts;t<e.length;t++){var s=e[t];if(s.multiline)for(var i=s.text.split("\n"),o=Object.assign({},s.pos),r=0,n=i.length;r<n;r++)this.drawText(i[r],o,s.size,s.color),o.y+=s.size;else s.ctext?this.drawText(s.ctext(),s.pos,s.size,s.color):this.drawText(s.text,s.pos,s.size,s.color)}},s.drawLoop=function(){s.drawTextures(),s.drawRects(),s.drawTexts(),requestAnimationFrame(s.drawLoop)},s.ctx=e("cvs").getContext("2d"),s.textures=[],s.texts=[],s.shapes=[],s}();exports.Renderer=s,t.Input.init(e("cvs"));
},{"./input.js":"efjR"}],"FOZT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Utils=void 0;var t=function(){function t(){}return t.rng=function(t,r){return Math.floor(Math.random()*(r-t+1)+t)},t.calcPixels=function(t,r,e){return Math.floor(100*t/r*e/100)},t}();exports.Utils=t;
},{}],"O7Ru":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Heroes=void 0;var e=require("./view.js"),i=require("./utils.js"),o=function(){function o(){}return o.init=function(){this.list.FROG={name:e.locale.HEROES.FROG.NAME,power:e.locale.HEROES.FROG.POWER,special:function(e){},pic:e.View.pics.hero1},this.list.DOG={name:e.locale.HEROES.DOG.NAME,power:e.locale.HEROES.DOG.POWER,special:function(e){},pic:e.View.pics.hero2},this.list.CAT={name:e.locale.HEROES.CAT.NAME,power:e.locale.HEROES.CAT.POWER,special:function(e){},pic:e.View.pics.hero3},this.list.CHICK={name:e.locale.HEROES.CHICK.NAME,power:e.locale.HEROES.CHICK.POWER,special:function(e){},pic:e.View.pics.hero4},this.list.FISH={name:e.locale.HEROES.FISH.NAME,power:e.locale.HEROES.FISH.POWER,special:function(e){},pic:e.View.pics.hero5},this.list.MONKEY={name:e.locale.HEROES.MONKEY.NAME,power:e.locale.HEROES.MONKEY.POWER,special:function(e){},pic:e.View.pics.hero6}},o.getRandomHero=function(){var e=["FROG","DOG","CAT","CHICK","FISH","MONKEY"],o=e[i.Utils.rng(0,e.length-1)];return this.list[o]},o.list={},o}();exports.Heroes=o;
},{"./view.js":"hDRN","./utils.js":"FOZT"}],"Ze5K":[function(require,module,exports) {
"use strict";var e,t,a;Object.defineProperty(exports,"__esModule",{value:!0}),exports.turn=exports.gameType=exports.menuState=void 0,exports.menuState=e,function(e){e[e.MainMenu=0]="MainMenu",e[e.SinglePlayerGame=1]="SinglePlayerGame",e[e.MPLobby=2]="MPLobby",e[e.PlayerSelect=3]="PlayerSelect",e[e.MPGame=4]="MPGame",e[e.GameEnd=5]="GameEnd",e[e.Rules=6]="Rules"}(e||(exports.menuState=e={})),exports.gameType=t,function(e){e[e.SinglePlayer=0]="SinglePlayer",e[e.MultiPlyaer=1]="MultiPlyaer"}(t||(exports.gameType=t={})),exports.turn=a,function(e){e[e.Upgrade=0]="Upgrade",e[e.Battle=1]="Battle"}(a||(exports.turn=a={}));
},{}],"NZ5N":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GameState=void 0;var e=function(){return function(){}}();exports.GameState=e;
},{}],"qbJK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Player=void 0;var t=function(){function t(t){this.HP=2e3,this.maxHP=2e3,this.animHP=0,this.maxMana=10,this.mana=10,this.animMana=0,this.hero=t,this.attack=100,this.defense=100,this.isAttacking=!1,this.isDefending=!1}return t.prototype.isDead=function(){return this.HP<=0},t}();exports.Player=t;
},{}],"dmzp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Animator=void 0;var t=function(){function t(){}return t.animateBar=function(t,o,a,n){for(var i=0,r=this.barAnimations;i<r.length;i++){var e=r[i];a==e[1]&&n==e[2]&&(clearInterval(e[0]),t=a[n],this.barAnimations.splice(this.barAnimations.indexOf(e),1))}var s=t>o?-1:1,m=Math.abs(t-o),d=s*(m/100),c=setInterval(function(){if(a[n]===o||1==s&&o<a[n]||-1==s&&o>a[n])return a[n]=o,void clearInterval(c);a[n]=a[n]+d},s>0?3:1);this.barAnimations.push([c,a,n])},t.appear=function(t,o){var a=setInterval(function(){t.mod&&t.mod.opacity&&(t.mod.opacity+=o,t.mod.opacity>=1&&(t.mod.opacity=1,clearInterval(a)))},10)},t.animatePlayerSwordAttack=function(t,o,a){var n=t.pos.x,i=t.pos.y,r=t.mod&&t.mod.rotation?t.mod.rotation:0,e=.1,s=.001,m=0,d=setInterval(function(){if(++m<60)return s+=.02,void(t.mod&&(t.mod.opacity=s));m<75-a?(t.pos.y-=20*(1+Math.sin(e))*o,t.pos.x-=20*Math.sin(e)*o):(e>2.5&&(e=.4),t.mod&&t.mod.targetRotation&&void 0!==t.mod.rotation&&t.mod.rotation<t.mod.targetRotation&&(t.mod.rotation+=6*(1+Math.sin(e)),t.pos.x+=10*(1+Math.sin(e))*o),t.mod&&((s-=.1)<0&&(s=.001,clearInterval(d),t.pos.y=i,t.pos.x=n,t.mod.rotation=r),t.mod.opacity=s)),e+=.01},10)},t.barAnimations=[],t}();exports.Animator=t;
},{}],"QcRT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Game=void 0;var e=require("./renderer.js"),t=require("./view.js"),a=require("./enums.js"),n=require("./gamestate.js"),r=require("./heroes.js"),i=require("./player.js"),m=require("./animator.js"),o=require("./utils.js"),p=function(){function p(){}return p.start=function(){t.View.changeState(a.menuState.MainMenu),e.Renderer.drawLoop()},p.startMatch=function(e){n.GameState.player=new i.Player(e),n.GameState.matchtype==a.gameType.SinglePlayer&&(n.GameState.opponent=new i.Player(r.Heroes.getRandomHero())),t.View.changeState(a.menuState.SinglePlayerGame),n.GameState.running=!0,m.Animator.animateBar(0,n.GameState.player.maxHP,n.GameState.player,"animHP"),m.Animator.animateBar(0,n.GameState.player.maxMana,n.GameState.player,"animMana"),m.Animator.animateBar(0,n.GameState.opponent.maxHP,n.GameState.opponent,"animHP")},p.AIMove=function(){1==o.Utils.rng(0,1)?(this.atkBuff(n.GameState.opponent),n.GameState.opponent.isAttacking=!0):(this.defBuff(n.GameState.opponent),n.GameState.opponent.isDefending=!0),1==o.Utils.rng(0,1)?this.atkBuff(n.GameState.opponent):1==o.Utils.rng(0,1)?this.defBuff(n.GameState.opponent):this.atkdefBuff(n.GameState.opponent)},p.startBattle=function(){var e=this;if(n.GameState.matchtype==a.gameType.SinglePlayer&&this.AIMove(),n.GameState.matchturn=a.turn.Battle,n.GameState.player.isDefending&&m.Animator.appear(t.View.MTextures.PlayerShield,.05),n.GameState.opponent.isDefending&&m.Animator.appear(t.View.MTextures.OpponentShield,.05),n.GameState.player.isAttacking&&!n.GameState.opponent.isDefending&&(m.Animator.animatePlayerSwordAttack(t.View.MTextures.PlayerSword,1,0),this.removeHP(n.GameState.opponent,n.GameState.player.attack)),n.GameState.player.isAttacking&&n.GameState.opponent.isDefending){m.Animator.animatePlayerSwordAttack(t.View.MTextures.PlayerSword,1,4);var r=n.GameState.player.attack-n.GameState.opponent.defense;this.removeHP(n.GameState.opponent,r>0?r:0)}if(n.GameState.opponent.isAttacking&&!n.GameState.player.isDefending&&(m.Animator.animatePlayerSwordAttack(t.View.MTextures.OpponentSword,-1,0),this.removeHP(n.GameState.player,n.GameState.opponent.attack)),n.GameState.opponent.isAttacking&&n.GameState.player.isDefending){m.Animator.animatePlayerSwordAttack(t.View.MTextures.OpponentSword,-1,4);r=n.GameState.opponent.attack-n.GameState.player.defense;this.removeHP(n.GameState.player,r>0?r:0)}setTimeout(function(){return e.endBattle()},3300)},p.endBattle=function(){n.GameState.matchturn=a.turn.Upgrade,n.GameState.player.isDead()&&n.GameState.opponent.isDead()?n.GameState.result=t.locale.TIE:(n.GameState.player.isDead()&&(n.GameState.result=t.locale.LOSS),n.GameState.opponent.isDead()&&(n.GameState.result=t.locale.WIN)),(n.GameState.player.isDead()||n.GameState.opponent.isDead())&&(n.GameState.running=!1,t.View.changeState(a.menuState.GameEnd)),n.GameState.player.isDefending=!1,n.GameState.player.isAttacking=!1,n.GameState.opponent.isAttacking=!1,n.GameState.opponent.isDefending=!1,this.removeMana(n.GameState.player,-1*(10-n.GameState.player.mana)),n.GameState.opponent.mana=10},p.atkBuff=function(e){e.mana>=5&&n.GameState.matchturn!=a.turn.Battle&&(this.removeMana(e,5),e.attack=Math.round(1.2*e.attack))},p.defBuff=function(e){e.mana>=5&&n.GameState.matchturn!=a.turn.Battle&&(this.removeMana(e,5),e.defense=Math.round(1.2*e.defense))},p.atkdefBuff=function(e){e.mana>=5&&n.GameState.matchturn!=a.turn.Battle&&(this.removeMana(e,5),e.attack=Math.round(1.1*e.attack),e.defense=Math.round(1.1*e.defense))},p.special=function(e){e.hero.special(e)},p.attack=function(e){e.isAttacking||e.isDefending||(e.isAttacking=!0),n.GameState.matchtype==a.gameType.SinglePlayer&&n.GameState.matchturn!=a.turn.Battle&&this.startBattle()},p.defend=function(e){e.isDefending||e.isAttacking||(e.isDefending=!0),n.GameState.matchtype==a.gameType.SinglePlayer&&n.GameState.matchturn!=a.turn.Battle&&this.startBattle()},p.removeMana=function(e,t){m.Animator.animateBar(e.mana,e.mana-t,e,"animMana"),e.mana-=t},p.removeHP=function(e,t){var a=e.HP,n=a-t;setTimeout(function(){return m.Animator.animateBar(a,n>=0?n:0,e,"animHP")},1700),e.HP-=t},p}();exports.Game=p;
},{"./renderer.js":"b7LN","./view.js":"hDRN","./enums.js":"Ze5K","./gamestate.js":"NZ5N","./heroes.js":"O7Ru","./player.js":"qbJK","./animator.js":"dmzp","./utils.js":"FOZT"}],"nKWc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ENlocale=exports.RUlocale=void 0;var E={_lang:"RU",SP:"Одниочная игра",MP:"Сетевая игра",RULES:"Правила",RULESTEXT:"Тут огромный и длинный текст правил\n на несколько строк",BACK:"Назад в меню",CREATEROOM:"Создать комнату",SELECT:"ВЫБЕРЕТЕ",HERO:"ПЕРСОНАЖА",HEROES:{FROG:{NAME:"Лягух",POWER:"Сила лягуха"},DOG:{NAME:"Пёс",POWER:"Сила пса"},CAT:{NAME:"Кот",POWER:"Сила кота"},CHICK:{NAME:"Цыпа",POWER:"Сила цыпы"},FISH:{NAME:"Рыба",POWER:"Сила рыбы"},MONKEY:{NAME:"Макака",POWER:"Сила макаки"}},WIN:"Победа!\nУра! Вы победили.",LOSS:"Поражение\nЧто поделать, в другой раз всё получится!",TIE:"Ничья!\nВозможно стоит сменить тактику?"};exports.RUlocale=E;var e={_lang:"EN",SP:"Singleplayer",MP:"Multiplayer",RULES:"Rules",RULESTEXT:"This is a really long text \n with multiple lines",BACK:"Back to menu",CREATEROOM:"Create new room",SELECT:"SELECT",HERO:"CHARACTER",HEROES:{FROG:{NAME:"Frog",POWER:"Frog power"},DOG:{NAME:"Dog",POWER:"Dog power"},CAT:{NAME:"Cat",POWER:"Cat power"},CHICK:{NAME:"Chick",POWER:"Chick power"},FISH:{NAME:"Fish",POWER:"Fish power"},MONKEY:{NAME:"Monkey",POWER:"Monkey power"}},WIN:"Congratulations!\nYou won!",LOSS:"Defeat!\n This is a lost round, but you can to better in another one",TIE:"A tie!\n Maybe you should use another strategy to win?"};exports.ENlocale=e;
},{}],"hDRN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.View=exports.locale=void 0;var e=require("./renderer.js"),t=require("./input.js"),n=require("./heroes.js"),o=require("./game.js"),a=require("./gamestate.js"),r=require("./utils.js"),i=require("./enums.js"),s=p(require("./locale.js"));function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}function p(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=c();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var r=o?Object.getOwnPropertyDescriptor(e,a):null;r&&(r.get||r.set)?Object.defineProperty(n,a,r):n[a]=e[a]}return n.default=e,t&&t.set(e,n),n}var u=function(e,t,n,o){return new(n||(n=Promise))(function(a,r){function i(e){try{c(o.next(e))}catch(t){r(t)}}function s(e){try{c(o.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(i,s)}c((o=o.apply(e,t||[])).next())})},l=function(e,t){var n,o,a,r,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(r){return function(s){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(a=2&r[0]?o.return:r[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,r[1])).done)return a;switch(o=0,a&&(r=[2&r[0],a.value]),r[0]){case 0:case 1:a=r;break;case 4:return i.label++,{value:r[1],done:!1};case 5:i.label++,o=r[1],r=[0];continue;case 7:r=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===r[0]||2===r[0])){i=0;continue}if(3===r[0]&&(!a||r[1]>a[0]&&r[1]<a[3])){i.label=r[1];break}if(6===r[0]&&i.label<a[1]){i.label=a[1],a=r;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(r);break}a[2]&&i.ops.pop(),i.trys.pop();continue}r=t.call(e,i)}catch(s){r=[6,s],o=0}finally{n=a=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,s])}}},x=window.navigator.languages.includes("ru")||window.navigator.languages.includes("ru-RU")?s.RUlocale:s.ENlocale;exports.locale=x;var y=function(){function s(){}return s.loadPics=function(e){return u(this,void 0,void 0,function(){var t,o,a,r,i,s;return l(this,function(c){for(t=[],o=function(e){var n=new Image(e.w,e.h);t.push(new Promise(function(e,t){n.onload=function(t){return e()}})),n.src=e.url,a.pics[e.name]={url:e.url,w:e.w,h:e.h,name:e.name,img:n}},a=this,r=0,i=e;r<i.length;r++)s=i[r],o(s);return n.Heroes.init(),this.initMTextures(),[2,Promise.all(t)]})})},s.initMTextures=function(){this.MTextures={PlayerSword:{pic:this.pics.sword_small_up,pos:{x:610,y:485},condition:function(){return a.GameState.player.isAttacking},mod:{targetRotation:100,rotation:0,opacity:.001}},PlayerShield:{pic:this.pics.shield_small,pos:{x:620,y:490},condition:function(){return a.GameState.player.isDefending},mod:{opacity:.001}},OpponentSword:{pic:this.pics.sword_small_up,pos:{x:610,y:215},condition:function(){return a.GameState.opponent.isAttacking},mod:{rotation:180,targetRotation:270,opacity:.001}},OpponentShield:{pic:this.pics.shield_small,pos:{x:620,y:215},condition:function(){return a.GameState.opponent.isDefending},mod:{opacity:.001}}}},s.validateMenuStateChange=function(e,t){switch(e){case i.menuState.MainMenu:return[i.menuState.MPLobby,i.menuState.PlayerSelect,i.menuState.MainMenu,i.menuState.Rules].includes(t);case i.menuState.Rules:return[i.menuState.MainMenu].includes(t);case i.menuState.PlayerSelect:return[i.menuState.SinglePlayerGame,i.menuState.MPGame].includes(t);case i.menuState.SinglePlayerGame:return[i.menuState.GameEnd,i.menuState.MainMenu].includes(t);case i.menuState.MPLobby:return[i.menuState.MainMenu,i.menuState.MPGame].includes(t);case i.menuState.MPGame:return[i.menuState.GameEnd,i.menuState.MainMenu].includes(t);case i.menuState.GameEnd:return[i.menuState.MainMenu].includes(t)}return!1},s.changeState=function(c){var p=this;if(this.validateMenuStateChange(this.currentState,c)){switch(c){case i.menuState.MainMenu:e.Renderer.textures=[{pic:s.pics.tbab_main_menu,pos:{x:0,y:0}},{pic:s.pics.button_main,pos:{x:380,y:200}},{pic:s.pics.button_main_hover,pos:{x:380,y:200},hover:!0},{pic:s.pics.button_main,pos:{x:380,y:320}},{pic:s.pics.button_main_hover,pos:{x:380,y:320},hover:!0},{pic:s.pics.button_main,pos:{x:380,y:440}},{pic:s.pics.button_main_hover,pos:{x:380,y:440},hover:!0}],e.Renderer.texts=[{text:x.SP,pos:{x:640,y:252},size:30,color:"#5f220a"},{text:x.MP,pos:{x:640,y:372},size:30,color:"#5f220a"},{text:x.RULES,pos:{x:640,y:492},size:30,color:"#5f220a"}],t.Input.ClickEvents=[{s:{x:380,y:200},e:{x:897,y:282},callback:function(){p.changeState(i.menuState.PlayerSelect),a.GameState.matchtype=i.gameType.SinglePlayer}},{s:{x:380,y:320},e:{x:897,y:402},callback:function(){p.changeState(i.menuState.MPLobby),a.GameState.matchtype=i.gameType.MultiPlyaer}},{s:{x:380,y:440},e:{x:897,y:522},callback:function(){p.changeState(i.menuState.Rules)}}],e.Renderer.shapes=[];break;case i.menuState.Rules:e.Renderer.textures=[{pic:s.pics.mp_menu,pos:{x:0,y:0}},{pic:s.pics.button_main,pos:{x:30,y:10}},{pic:s.pics.button_main_hover,pos:{x:30,y:10},hover:!0}],e.Renderer.texts=[{text:x.BACK,pos:{x:293,y:62},size:30,color:"#000"},{text:x.RULESTEXT,pos:{x:640,y:200},size:30,color:"#000",multiline:!0}],t.Input.ClickEvents=[{s:{x:30,y:10},e:{x:547,y:92},callback:function(){p.changeState(i.menuState.MainMenu)}}];break;case i.menuState.GameEnd:e.Renderer.textures=[{pic:s.pics.mp_menu,pos:{x:0,y:0}},{pic:s.pics.button_main,pos:{x:30,y:10}},{pic:s.pics.button_main_hover,pos:{x:30,y:10},hover:!0}],e.Renderer.texts=[{text:x.BACK,pos:{x:293,y:62},size:30,color:"#000"},{text:a.GameState.result,pos:{x:640,y:200},size:30,color:"#000",multiline:!0}],t.Input.ClickEvents=[{s:{x:30,y:10},e:{x:547,y:92},callback:function(){p.changeState(i.menuState.MainMenu)}}],e.Renderer.shapes=[];break;case i.menuState.MPLobby:e.Renderer.textures=[{pic:s.pics.mp_menu,pos:{x:0,y:0}},{pic:s.pics.button_main,pos:{x:30,y:10}},{pic:s.pics.button_main_hover,pos:{x:30,y:10},hover:!0},{pic:s.pics.button_main,pos:{x:730,y:10}},{pic:s.pics.button_main_hover,pos:{x:730,y:10},hover:!0}];for(var u=0;u<10;u++)e.Renderer.textures.push({pic:s.pics.select_server_hover,pos:{x:180,y:150+45*u},hover:!0});e.Renderer.texts=[{text:x.BACK,pos:{x:293,y:62},size:30,color:"#000"},{text:x.CREATEROOM,pos:{x:988,y:62},size:30,color:"#000"}],t.Input.ClickEvents=[{s:{x:30,y:10},e:{x:547,y:92},callback:function(){p.changeState(i.menuState.MainMenu)}}];break;case i.menuState.PlayerSelect:e.Renderer.textures=[{pic:s.pics.player_select_BLURRED,pos:{x:0,y:0}},{pic:s.pics.hero_select_hover,pos:{x:156,y:23},hover:!0},{pic:s.pics.hero_select_hover,pos:{x:560,y:23},hover:!0},{pic:s.pics.hero_select_hover,pos:{x:964,y:23},hover:!0},{pic:s.pics.hero_select_hover,pos:{x:156,y:540},hover:!0},{pic:s.pics.hero_select_hover,pos:{x:560,y:540},hover:!0},{pic:s.pics.hero_select_hover,pos:{x:964,y:540},hover:!0}];var l=60,y={text:""+l,pos:{x:640,y:385},size:70,color:"#000"};e.Renderer.texts=[y,{text:x.SELECT,pos:{x:380,y:372},size:40,color:"#000"},{text:x.HERO,pos:{x:900,y:372},size:40,color:"#000"},{text:x.HEROES.FROG.NAME,pos:{x:240,y:210},size:26,color:"#000"},{text:x.HEROES.FROG.POWER,pos:{x:240,y:240},size:18,color:"#000"},{text:x.HEROES.DOG.NAME,pos:{x:640,y:210},size:26,color:"#000"},{text:x.HEROES.DOG.POWER,pos:{x:640,y:240},size:18,color:"#000"},{text:x.HEROES.CAT.NAME,pos:{x:1040,y:210},size:26,color:"#000"},{text:x.HEROES.CAT.POWER,pos:{x:1040,y:240},size:18,color:"#000"},{text:x.HEROES.CHICK.NAME,pos:{x:240,y:520},size:26,color:"#000"},{text:x.HEROES.CHICK.POWER,pos:{x:240,y:490},size:18,color:"#000"},{text:x.HEROES.FISH.NAME,pos:{x:640,y:520},size:26,color:"#000"},{text:x.HEROES.FISH.POWER,pos:{x:640,y:490},size:18,color:"#000"},{text:x.HEROES.MONKEY.NAME,pos:{x:1040,y:520},size:26,color:"#000"},{text:x.HEROES.MONKEY.POWER,pos:{x:1040,y:490},size:18,color:"#000"}];var m=setInterval(function(){if(l>0)l--,y.text=""+l;else{if(a.GameState.running)return void clearInterval(m);o.Game.startMatch(n.Heroes.getRandomHero())}},1e3);t.Input.ClickEvents=[{s:{x:140,y:25},e:{x:340,y:245},callback:function(){o.Game.startMatch(n.Heroes.list.FROG)}},{s:{x:540,y:25},e:{x:740,y:245},callback:function(){o.Game.startMatch(n.Heroes.list.DOG)}},{s:{x:940,y:25},e:{x:1140,y:245},callback:function(){o.Game.startMatch(n.Heroes.list.CAT)}},{s:{x:140,y:540},e:{x:340,y:690},callback:function(){o.Game.startMatch(n.Heroes.list.CHICK)}},{s:{x:540,y:540},e:{x:740,y:690},callback:function(){o.Game.startMatch(n.Heroes.list.FISH)}},{s:{x:940,y:540},e:{x:1140,y:690},callback:function(){o.Game.startMatch(n.Heroes.list.MONKEY)}}];break;case i.menuState.SinglePlayerGame:e.Renderer.textures=[{pic:s.pics.blurred_bg,pos:{x:0,y:0}},{pic:s.pics.battle_top,pos:{x:0,y:0}},{pic:a.GameState.player.hero.pic,pos:{x:562,y:540}},{pic:a.GameState.opponent.hero.pic,pos:{x:562,y:55}},{pic:s.pics.hero_hover_up,pos:{x:560,y:495},hover:!0},{pic:s.pics.hero_hover_down,pos:{x:560,y:150},hover:!0},{pic:s.pics.atk_btn_hover,pos:{x:5,y:530},hover:!0},{pic:s.pics.def_btn_hover,pos:{x:5,y:625},hover:!0},{pic:s.pics.upg_btn_hover,pos:{x:215,y:540},hover:!0},{pic:s.pics.upg_btn_hover,pos:{x:215,y:635},hover:!0},{pic:s.pics.upg_btn_hover,pos:{x:385,y:540},hover:!0},{pic:s.pics.upg_btn_hover,pos:{x:385,y:635},hover:!0},this.MTextures.PlayerShield,this.MTextures.OpponentShield,this.MTextures.PlayerSword,this.MTextures.OpponentSword],e.Renderer.texts=[{text:"",pos:{x:1240,y:592},size:20,color:"#5f220a",ctext:function(){return""+Math.ceil(a.GameState.player.animHP)}},{text:"",pos:{x:720,y:32},size:14,color:"#5f220a",ctext:function(){return""+Math.ceil(a.GameState.opponent.animHP)}},{text:"",pos:{x:1240,y:675},size:20,color:"#5f220a",ctext:function(){return""+Math.ceil(a.GameState.player.animMana)}},{text:"",pos:{x:130,y:590},size:26,color:"#fff",ctext:function(){return""+a.GameState.player.attack}},{text:"",pos:{x:130,y:685},size:26,color:"#fff",ctext:function(){return""+a.GameState.player.defense}},{text:"ATK +2%",pos:{x:275,y:590},size:22,color:"#fff"},{text:"5M",pos:{x:350,y:587},size:14,color:"#2196F3"},{text:"DEF +2%",pos:{x:275,y:684},size:22,color:"#fff"},{text:"5M",pos:{x:350,y:681},size:14,color:"#2196F3"},{text:"ATK +1%\nDEF +1%",pos:{x:442,y:580},size:22,color:"#fff",multiline:!0},{text:"5M",pos:{x:520,y:587},size:14,color:"#2196F3"},{text:"SPECIAL",pos:{x:442,y:684},size:22,color:"#fff"},{text:"5M",pos:{x:520,y:681},size:14,color:"#2196F3"}],t.Input.ClickEvents=[{s:{x:220,y:550},e:{x:370,y:615},callback:function(){o.Game.atkBuff(a.GameState.player)}},{s:{x:220,y:640},e:{x:370,y:710},callback:function(){o.Game.defBuff(a.GameState.player)}},{s:{x:390,y:550},e:{x:540,y:615},callback:function(){o.Game.atkdefBuff(a.GameState.player)}},{s:{x:390,y:640},e:{x:540,y:710},callback:function(){o.Game.special(a.GameState.player)}},{s:{x:20,y:540},e:{x:90,y:615},callback:function(){o.Game.attack(a.GameState.player)}},{s:{x:20,y:640},e:{x:90,y:710},callback:function(){o.Game.defend(a.GameState.player)}}],e.Renderer.shapes=[{pos:{x:745,y:555},w:function(){return r.Utils.calcPixels(a.GameState.player.animHP,a.GameState.player.maxHP,530)},h:58,color:"#b71c1c"},{pos:{x:538,y:18},w:function(){return r.Utils.calcPixels(a.GameState.opponent.animHP,a.GameState.opponent.maxHP,204)},h:18,color:"#b71c1c"},{pos:{x:745,y:638},w:function(){return r.Utils.calcPixels(a.GameState.player.animMana,a.GameState.player.maxMana,530)},h:58,color:"#2196F3"}]}this.currentState=c}},s.pics={},s.MTextures={},s.currentState=i.menuState.MainMenu,s}();exports.View=y;
},{"./renderer.js":"b7LN","./input.js":"efjR","./heroes.js":"O7Ru","./game.js":"QcRT","./gamestate.js":"NZ5N","./utils.js":"FOZT","./enums.js":"Ze5K","./locale.js":"nKWc"}],"cGmI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Loader=void 0;var e=require("./view.js"),t=function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function u(e){try{c(r.next(e))}catch(t){i(t)}}function a(e){try{c(r.throw(e))}catch(t){i(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(u,a)}c((r=r.apply(e,t||[])).next())})},n=function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},r=function(){function r(){}return r.init=function(){return t(this,void 0,void 0,function(){return n(this,function(e){return[2,Promise.all([this.loadTextures()])]})})},r.loadTextures=function(){return t(this,void 0,void 0,function(){var t;return n(this,function(n){switch(n.label){case 0:return[4,fetch("./meta/textures.json").then(function(e){return e.json()}).then(function(e){return e})];case 1:return t=n.sent(),[2,e.View.loadPics(t)]}})})},r}();exports.Loader=r;
},{"./view.js":"hDRN"}],"BK5V":[function(require,module,exports) {
"use strict";var e=require("./loader.js"),r=require("./game.js");e.Loader.init().then(function(e){r.Game.start()});
},{"./loader.js":"cGmI","./game.js":"QcRT"}]},{},["BK5V"], null)
