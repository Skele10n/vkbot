 // Модули
 
const config = require("./setting/config.json")  
const fs = require('fs'); 
const rq = require('request'); 
const https = require('https'); 
const http = require('http'); 
const prequest = require('request-promise');
const mysql = require("mysql");
  
const group = new(require('vk-io'));
const str = new(require('vk-io'));
const prom = new(require('vk-io'));
const vk = new(require('vk-io'));
const VK = require("vk-io"); 
 
var bot1 = new bots(VK, {
	token: "f06126c2690d17bc426bdb56a966179be1278536067972dd392eec76fef9e3f7eb1de941713b2d3f96d31" // Токен страницы
}); 
// DataBase 
const acc = require('./base/acc.json');  
const log = require('./base/log.json');  
const game = require('./base/game.json');  
const uid = require('./base/ids.json'); 
const white_list = [347241116, 428576758]

 //  Подключение группы
group.setOptions({
	token: "f06126c2690d17bc426bdb56a966179be1278536067972dd392eec76fef9e3f7eb1de941713b2d3f96d31",    // ТОКЕН ГРУППЫ
	call: "execute"
});

//  Запуск
group.longpoll.start().then(  
	console.log(`[${time()} | ${data()} | group] ~ Bot actived ~`),
	restart() 
	);
// Обработка
group.longpoll.on("message", (message) => {

	if (!message.text || ~message.flags.indexOf("outbox")) return;
	//-------------------Регистрация нового юзера-------------------------------------------------------------
	if(!uid[message.user]){
	 	acc.number += 1;
		let numm = acc.number;
		uid[message.user] = {
			id: numm
		}

 		let id = user_id(message.user)
 		group.api.call('messages.send', { 
		user_id: message.user,
		message: `🎉 » *id${message.user}, вы успешно зарегистрировались. \n📝 » "Помощь" - список команд.\n📝 » Чтобы не пропустить обновление проекта вы должны быть подписаны на нашу группы: ${config.group_url}`});
		
	 	   
		group.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			let user = res[0]; 
			acc.users[numm] = {
				balance: 5000,
				bitcoin: 0, 
				donate: 0,
				bloks: { 
					cases: false,
					pay: false,
					random_game: false,
					giverub: false,
					a_case: false
				}, 
				ferm: {
					id: false,
					zp: 0
				},
				exs: 0,
				exsup: 50,
				lvl: 0,
				number: numm,
				id: message.user,
				nick: true,
				game: {
					binlose: 0,
					binwin: 0,
					binstop: false,
					kazlose: 0,
					kazwin: 0,
					rand_lose: 0,
					rand_win: 0,
					stavka_win: 0,
					stavka_lose: 0,
					win: 45
				},
				msg: { 
					messages: 0, 
					last_msg: "" 
				},  
				bizs: {
					one_biz: false,
					one: {
						count: false,
						balance: 0,
						id: false,
						name: false,
						people: 0,
						uplvl: 0,
						zp: 0
					},
					two_biz: false,
					two: {
						count: false,
						balance: 0,
						id: false,
						name: false,
						people: 0,
						uplvl: 0,
						zp: 0
					}
				},
				cars: false,
					reys: false,
					aircraft: false,
					helicopter: false,
					house: false,
					housep: 0,
					pit: false,
					bank: 0,
					lodka: false,
					tag: "Новичок",
					level: 0, 
					brak: false,
					ainfo: {
						all_ans: 0,
						ans: 0, 
						good_ans: 0,
						bad_ans: 0,
						vig: 0
					}, 
					safe: {
						status: false,
						key: false
					},
					admin: {
						block_pay: false,
						block_give: false,
						block_rep: false
					}, 
					rep: {
						status: false,
						id: false
					},
					ban: false, 
					warn: 0,
					warn_p: [],
					credit: 0,
					procent: 0,
					job: { 
						name: false, 
						lvl: 0, 
						stop: false, 
						count: 0 
					},
					password: false,
					global_exs: 0,
					autozp: false,
					autobiz: false,
					prefix: `${user.first_name} ${user.last_name}`,
					rtime: `${time()} | ${data()}` 
			} 
		////////////////////
		var result  = '';
		let words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
		let max_position = words.length - 1;
		for( i = 0; i < 6; ++i ) {
			position = Math.floor ( Math.random() * max_position );
			result = result + words.substring(position, position + 1);
		}
		new_users(numm, result);
		acc.users[numm].password = result;
		//////////////////	 
		 }).catch((error) => {console.log('err[new_user]'); });
	}

	 	
	
/////////////////////////////////////////////////////////////////		 
 


	let id = user_id(message.user)
	if(message.text){ 
		acc.msg += 1;
		 
		if(!acc.users[user_id(message.user)]) return;
 		let coman = [];
		commands.map(cmd => {
		 	coman.push(cmd.d)
		})

		//let commands = ['apanel','jail','unjail','нанять','бизнес продать','машина продать','вертолет продать','самолет продать','акция', 'казино', 'кейс', 'топ','баланс','проф','админ','помощь','чат','стата','ответ','unwarn','warn','setnick','giveadm','setwin','unban','ban','tempban','передать','общение','игры','ко','бот','топ','статистика','бизнесы','вертолеты','самолеты','имущество','ник','выклсекрет','выклссылк','вклссылк','выклчат','вклчат']; 
		if(coman.indexOf(message.text.toLowerCase()) != -1) acc.users[id].msg.messages += 1;
		if(coman.indexOf(message.text.toLowerCase()) != -1) acc.users[id].msg.last_msg = `${time()} | ${data()}`; 
		if(acc.jail[user_id(message.user)]){  return;
		}
 
		if(acc.users[id]){
			if (acc.users[id].ban != false) return; 
 
			    
			acc.users[id].antiflood += 1;
			if(acc.users[id].antiflood == config.antiflood_limit){

				group.api.call("messages.send", {
					peer_id: message.user,
					message: `[💀 ANTI-FLOOD 💀] Вы написали ${config.antiflood_limit} сообщений за 15 секунд.\n[💀 ANTI-FLOOD 💀] Вы словили блокировку. Подождите 15 секунд и снова пишите боту.\n[💀 ANTI-FLOOD 💀] Бот в группе [${config.group_url}] работает без задержек.`
				}).then((res) => { 
							
				}).catch((error) => {
					console.log('anti-flood - error'); 
				});	

				return; 
			}
			if(acc.users[id].antiflood > config.antiflood_limit){
				return;
			}
		}
		 
	}

	commands.map(cmd => {
		if (!cmd.r.test(message.text) || message.sended) return;
		args = message.text.match(cmd.r) || []; 
		let id = user_id(message.user)
		if(!acc.users[id]) return;
		if (cmd.lvl <= acc.users[id].level || ~DEVELOPERS.indexOf(message.user)) cmd.f(message);
	})
}) 
 
function bots(VK, token) { 
	const vk = new VK();
	commands = [];
	//
	//
	vk.setOptions({
		token: token.token,
		call: "execute"
	});
	
	vk.longpoll.start().then(console.log(`[${time()} | ${data()} | str] ~ Bot actived ~`));

	////////////////////////////////////////////////

	var stats = {
		total_msgs: 0,
		total_cmds: 0
	}
	var captcha_status = false
	var captcha = new(require("./captcha"))();
	//var weather = new (require("./weather.js"))("ключ от погоды");
	 
	vk.setCaptchaHandler((src, sid, retry) => {
		if (captcha_status) {
			return;
		}
		captcha_status = true; 
			captcha.get(src).then((key) => {
				return retry(key.answer);
			}).then(() => {
				console.log(`[${time()} | ${data()}] Captcha verno`);
				captcha_status = false;
			}).catch((error) => {
				console.log(`[${time()} | ${data()}]Captcha ne verno`);

				captcha.get(src).then((key) => {
					return retry(key.answer);
				}).then(() => {
					console.log(`[${time()} | ${data()}]Captcha verno`);
					captcha_status = false;
				}); 
			}); 
	}); 
	vk.longpoll.on("message", (message) => {

	if (!message.text || ~message.flags.indexOf("outbox")) return;
	//-------------------Регистрация нового юзера-------------------------------------------------------------
	if(!uid[message.user]){
	 	acc.number += 1;
		let numm = acc.number;
		uid[message.user] = {
			id: numm
		}
		vk.api.call('messages.send', { 
			chat_id: message.chat,
			message: `🎉 » *id${message.user}, Вы успешно зарегистрировались. \n📝 » "Помощь" - список команд.\n📝 » Наша группа: ${config.group_url}\n`});
		
 		let id = user_id(message.user)
 	
	 	   
		vk.api.call('users.get', {
			user_ids: message.user,
			fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
		}).then(res => {
			let user = res[0]; 
			acc.users[numm] = {
				balance: 5000,
				bitcoin: 0, 
				donate: 0,
				bloks: { 
					cases: false,
					pay: false,
					random_game: false,
					giverub: false,
					a_case: false
				}, 
				ferm: {
					id: false,
					zp: 0
				},
				exs: 0,
				exsup: 50,
				lvl: 0,
				number: numm,
				id: message.user,
				nick: true,
				game: {
					binlose: 0,
					binwin: 0,
					binstop: false,
					kazlose: 0,
					kazwin: 0,
					rand_lose: 0,
					rand_win: 0,
					stavka_win: 0,
					stavka_lose: 0,
					win: 45
				},
				msg: { 
					messages: 0, 
					last_msg: "" 
				},  
				bizs: {
					one_biz: false,
					one: {
						count: false,
						balance: 0,
						id: false,
						name: false,
						people: 0,
						uplvl: 0,
						zp: 0
					},
					two_biz: false,
					two: {
						count: false,
						balance: 0,
						id: false,
						name: false,
						people: 0,
						uplvl: 0,
						zp: 0
					}
				},
				cars: false,
					reys: false,
					aircraft: false,
					helicopter: false,
					house: false,
					housep: 0,
					pit: false,
					bank: 0,
					lodka: false,
					tag: "Новичок",
					level: 0, 
					brak: false,
					ainfo: {
						all_ans: 0,
						ans: 0, 
						good_ans: 0,
						bad_ans: 0,
						vig: 0
					}, 
					safe: {
						status: false,
						key: false
					},
					admin: {
						block_pay: false,
						block_give: false,
						block_rep: false
					}, 
					rep: {
						status: false,
						id: false
					},
					ban: false, 
					warn: 0,
					warn_p: [],
					credit: 0,
					procent: 0,
					job: { 
						name: false, 
						lvl: 0, 
						stop: false, 
						count: 0 
					},
					password: false,
					global_exs: 0,
					autozp: false,
					autobiz: false,
					prefix: `${user.first_name} ${user.last_name}`,
					rtime: `${time()} | ${data()}` 
			} 
		////////////////////
		var result  = '';
		let words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
		let max_position = words.length - 1;
		for( i = 0; i < 6; ++i ) {
			position = Math.floor ( Math.random() * max_position );
			result = result + words.substring(position, position + 1);
		}
		new_users(numm, result);
		acc.users[numm].password = result;
		//////////////////	 
		 
		 }).catch((error) => {console.log('err[new_user]'); });
	}

	 	
	
/////////////////////////////////////////////////////////////////		 
 


	let id = user_id(message.user)
	if(message.text){ 
		acc.msg += 1;
		 
		if(!acc.users[user_id(message.user)]) return;
 		let coman = [];
		commands.map(cmd => {
		 	coman.push(cmd.d)
		})

		//let commands = ['apanel','jail','unjail','нанять','бизнес продать','машина продать','вертолет продать','самолет продать','акция', 'казино', 'кейс', 'топ','баланс','проф','админ','помощь','чат','стата','ответ','unwarn','warn','setnick','giveadm','setwin','unban','ban','tempban','передать','общение','игры','ко','бот','топ','статистика','бизнесы','вертолеты','самолеты','имущество','ник','выклсекрет','выклссылк','вклссылк','выклчат','вклчат']; 
		if(coman.indexOf(message.text.toLowerCase()) != -1) acc.users[id].msg.messages += 1;
		if(coman.indexOf(message.text.toLowerCase()) != -1) acc.users[id].msg.last_msg = `${time()} | ${data()}`; 
		if(acc.jail[user_id(message.user)]){  return;
		}
 
		if(acc.users[id]){
			if (acc.users[id].ban != false) return; 
 
			    
			acc.users[id].antiflood += 1;
			if(acc.users[id].antiflood == config.antiflood_limit){

				group.api.call("messages.send", {
					peer_id: message.user,
					message: `[💀 ANTI-FLOOD 💀] Вы написали ${config.antiflood_limit} сообщений за 30 секунд.\n[💀 ANTI-FLOOD 💀] Вы словили блокировку. Подождите 30 секунд и снова пишите боту.\n[💀 ANTI-FLOOD 💀] Бот в группе [${config.group_url}] работает без задержек.`
				}).then((res) => { 
							
				}).catch((error) => {
					console.log('anti-flood - error'); 
				});	

				return; 
			}
			if(acc.users[id].antiflood > config.antiflood_limit){
				return;
			}
		}
		 
	}


	commands.map(cmd => {
		if (!cmd.r.test(message.text) || message.sended) return;
		args = message.text.match(cmd.r) || []; 
		let id = user_id(message.user)
		if(!acc.users[id]) return;
		if (cmd.lvl <= acc.users[id].level || ~DEVELOPERS.indexOf(message.user)) cmd.f(message);
	})
})


 
	devel = [428576758];
	//	
	var cmd = {
		on: (regex, desc, level, func) => commands.push({
			r: regex,
			d: desc,
			lvl: level,
			f: func
		}),
		get: (cmd = 'none') => cmd == 'none' ? commands.map(e => e.desc).join('\n') : commands.map(e => {
			if (e.r.test(cmd)) return e.d;
		})
	}

 	cmd.on(/^(?:камера)/i, "ко", 0, (message) => { 
 		 return message.send(`
 		 	🔻 » Тюрьма - это альтернатива блокировки [временной/перманентной] аккаунта за возможные нарушение официальных правил подтвержденных Вами в момент регистрации: ${acc.users[user_id(message.user)].rtime}
 		 	🔻 » Официальные правила: 'Правила'

 		 	📝 » Амнистия - Выйти из тюрьмы можно двумя способами:
 		 	🔸 » Купить досрочны1 выход у: @id428576758(${acc.users[1].prefix}) за 30р
 		 	🔸 » Дождаться окончания времени заключения. 

 		 	💠 » Команды доступные в тюрьме:
 		 	👉 » Ко - состояние бота.
 		 	👉 » Казино <ставка> - казино.
		    👉 » Акция <ставка> - акции.
		    👉 » Кейс - кейс с призами.
		    👉 » Баланс - ваш баланс.
		    👉 » Ставка <выше/ниже> <ставка> - ставки.
		    👉 » [Выше(500000-999999)/ниже(1-499999)]

		    👉 » Сейф - взлом сейфа

 		 	`);
 	});

 	 cmd.on(/^(?:правила)/i, "ко", 0, (message) => { 
 		 return message.send(`
		🔻 » Актуальный список правил '' бота « 🔻 
		📝 » Для бесед/чатов с ботом « 📝 

		🔞 » Наказание: Бан  
		🔸 » 1. Выпрашивание игровой валюты/привилегий/доната у администраторов. 
		🔸 » 2. Мат/оскорбления в репорт. 
		 🔸 » 3. Оскорбление проекта.  
		🔸 » 4. Обман администрации/игроков.

		🔞 » Наказание: Тюрьма(60-240) минут
		🔸 » 5. Оскорбление чувств игрока(ов).  
		🔸 » 6. Флуд/оффтоп в репорт.  
		🔸 » 7. Выдача себя за администратора. 
		🔸 » 8. Использование неадекватных ников. 
		🔸 » 8. Капс в беседе.
		🔸 » 8. Использование неадекватных ников.


		🔞 » Наказание: Бан 
		🔸 » 10. Использование БАГов, скрытие их от @id428576758(разработчика)
		🔸 » 11. Распространение шок контента, контента 18+ и тд. 
		🔸 » 12. Накрутка любых игровых средств с фейковых аккаунтов. 
		🔸 » 13. Использование фейк аккаунта. 
		🔸 » 14. Пиар/реклама/выпрашивание лайков и т.д. 
		🔸 » 15. Флуд однотипными командами. 

 		 	`);
 	});

 	cmd.on(/^(?:аправила)/i, "ко", 0, (message) => { 
 		 return message.send(`
 		 	 🔻 » Актуальный список правил '' бота « 🔻 
			📝 » для АДМИНИСТРАТОРОВ И VIP « 📝 

			🔸 » 1. Хамство в ответе на репорт. [Выговор] 
			🔸 » 2. Неадекватные ответы на репорт. [Тюрьма 120мин] 
			🔸 » 3. Накрутка ответов на репорт. [Выговор] 
			🔸 » 4. Блат/накрутка другим игрокам каких-любо игровых средств. [Бан] 
			🔸 » 5. Обман спец.администрации. [Бан] 
			🔸 » 6. Выдача наказания без определённой причины. [Выговор] 
			🔸 » 7. Оскорбление игроков в любой беседе/чате. [Выговор] 
			🔸 » 8. Слив какой-либо административной информации. [Бан] 
			🔸 » 9. Разжигание любых конфликтов между игроками. [Тюрьма 240мин]
			🔸 » 10. Выдача/передача администраторами валюты. [Бан]

 		 	`);
 	});
 	cmd.on(/^(?:ко)/i, "ко", 0, (message) => { 
 		return message.send(`&#10004; » Работаю! Uptime: ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}`);
 	});
 
 	cmd.on(/^(?:имущество)$/i, "имущество", 0, (message) => {
 		return message.send(`
 	👉 » Имущество:
    🚘 » Машины 
    ✈ » Самолеты
    🚁 » Вертолеты 
    🏢 » Бизнесы
    🏢 » Статистика
    🚤 » Лодка
    🏢 » Дома
    🐼 » Питомцы

    📋 » Дом - Информация
 			`);
 	});

 	cmd.on(/^(?:игры)$/i, "игры", 0, (message) => {
 		return message.send(`
	🎲 Игры:
	👉 » Казино <ставка> - казино.
 	👉 » Акция <вверх/вниз> <ставка> - акции.
	👉 » Баланс - ваш баланс.
	👉 » Ставка <выше/ниже> <ставка> - ставки.
	👉 » [Выше(500000-999999)/ниже(1-499999)]
	👉 » Рандом <1-60> <ставка>
	💰 » Сейф - взлом сейфа.
	💥 » Лотерея - на деньги.
 			`);
 	});


	cmd.on(/^(?:помощь|начать)$/i, "помощь", 0, (message) => { 
	return message.send(`
📢 » Команды бота « 📢 
➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
👔 » Профиль - показывает ваш профиль. 
👕 » Профиль [ID] - просмотр профиля игрока. 
👑 » Дпроф - Ваши бизнесы и имущество. 
💰 » Баланс - Посмотреть свой баланс. 
✒ » Ник [name] - Поменять себе ник. 
🚪» Имущество - Ваше имущество. 
🦊 » Питомцы - Список питомцев. 
💖 » Свадьба [ID] - пожениться. 
🖤 » Развод - развестись. 
💳 » Банк - Ваш счёт в банке. 
♻» Передать [ID] [СУММА] - передача валюты. 
♻ » Бпередать [ID] [СУММА] - передача биткоинов. 
🎰 » Игры - список игр. 
📦 » Кейс - кейс с призами. 
📦» Бкейс - большой кейс [Стоимость 10 EURO]. 
📊 » Курс - Стоимость EURO. 
🎫 » Работы - Список работ. 
✍🏻 » Бизнесы - Список бизнесов. 
🛒 » Магазин - Магазин Имущества. 
➖➖➖➖➖➖
📑» Беседа - ссылка на официальную беседу бота. 
📝 » Состав - Администраторы и Донатеры. 
📌» Правила - Правила бота [Обязательно к прочтению!]📌 
💡» Донат - Магазин привилегий и прочее. 
🤖» Ко - Работоспособность бота 
👾» Бот - Информация о боте и проекте. 
🆘 » Репорт [текст] - Связаться с Администраторами. 

🅰 » Панель - Панель администратора [Только для админов]
    `/*,{
	    keyboard:JSON.stringify(
	    	{ 
			    "one_time": true, 
			    "buttons": [ 
			      [{ 
			        "action": { 
			          "type": "text", 
			          "payload": "{\"button\": \"1\"}", 
			          "label": "Игры" 
			        }, 
			        "color": "positive" 
			      }]
			    ] 
	  		})
		}*/)
   });	


cmd.on(/^(?:Магазин|Магаз)$/i, "магаз", 0, (message) => { 
	return message.send(`
	🛒 »Магазин Имуществ« 🛒

	🏠 » Дома - Список домов.
	🚘 » Машины - Список машин.
	🚤 » Лодка - Список лодок.
	✈ » Самолеты - Список самолётов.
	🚁 » Вертолеты - Список вертолётов.

    `/*,{
	    keyboard:JSON.stringify(
	    	{ 
			    "one_time": true, 
			    "buttons": [ 
			      [{ 
			        "action": { 
			          "type": "text", 
			          "payload": "{\"button\": \"1\"}", 
			          "label": "Магазин" 
			        }, 
			        "color": "positive" 
			      }]
			    ] 
	  		})
		}*/)
   });

 
	cmd.on(/^(?:панель)$/i, "панель", 0, (message) => {
	    let user = acc.users[user_id(message.user)];

	    if (user.level < 1) return message.send(`💀 » Доступ закрыт « 💀`);
	    if (user.level == 1) {
	        return message.send(`
				☑ » Админ-Панель « ☑
				✅ » аправила - важно знать!  
				✅ » ответ [ID] [TEXT] - ответить на репорт.
				✅ » стата - Ваша статистика.
				✅ » get [ID] - проверить игрока.
				✅ » jail [ID] [TIME] - посадить в тюрьму.
				✅ » unjail [ID] - выпустить из тюрьмы.
				✅ » givemyrub [COUNT] - выдать себе валюту.
				✅ » warn [ID] - выдать предупреждение.
				✅ » unwarn [ID] - снять все предупреждения.
				`);
	    }
	    if (user.level == 3) {

	        return message.send(`
				☑ » Админ-Панель « ☑
				✅ » аправила - важно знать! 
				✅ » ban [ID] - заблокировать навсегда.
				✅ » unban [ID] - разблокировать игрока.
				✅ » setnick [ID] [NAME] - изменить ник.
				✅ » warn [ID] - выдать предупреждение.
				✅ » unwarn [ID] - снять все предупреждения.
				✅ » ответ [ID] [TEXT] - ответить на репорт.
				✅ » стата - Ваша статистика.
				✅ » get [ID] - проверить игрока.
				✅ » jail [ID] [TIME] - посадить в тюрьму.
				✅ » unjail [ID] - выпустить из тюрьмы.
				✅ » givemyrub [COUNT] - выдать себе валюту.
				`);
	    }
	    if (user.level == 4) {

	        return message.send(`
				☑ » Админ-Панель « ☑ 
✔ » ban [ID] - заблокировать навсегда. 
✔ » unban [ID] - разблокировать игрока. 
✔ » setnick [ID] [NAME] - изменить ник. 
✔ » warn [ID] - выдать предупреждение. 
✔ » unwarn [ID] - снять все предупреждения. 
✔ » ответ [ID] [TEXT] - ответить на репорт. 
✔ » стата - Ваша статистика. 
✔ » get [ID] - проверить игрока. 
✔ » jail [ID] [TIME] - посадить в тюрьму. 
✔ » unjail [ID] - выпустить из тюрьмы. 
✔ » givemyrub [COUNT] - выдать себе валюту.
✔ » removedonate [ID] [COUNT] - Забрать EURO у игрока.
✔ » removerub [ID] - Забрать все деньги у игрока.
✔ » givelvl [ID] [COUNT] - выдать Себе или игроку уровень.
				`);
	    }
	    if (user.level == 5) {

	        return message.send(`
				💀 » CONTROL PANEL « 💀 
👑 » ban [ID] - заблокировать навсегда. 
👑 » unban [ID] - разблокировать игрока. 
👑 » setnick [ID] [NAME] - изменить ник. 
👑 » warn [ID] - выдать предупреждение. 
👑 » unwarn [ID] - снять все предупреждения. 
👑 » ответ [ID] [TEXT] - ответить на репорт. 
👑 » стата - Ваша статистика. 
👑 » get [ID] - проверить игрока. 
👑 » jail [ID] [TIME] - посадить в тюрьму. 
👑 » unjail [ID] - выпустить из тюрьмы. 
👑» givemyrub [COUNT] - выдать себе валюту.
👑 » removedonate [ID] [COUNT] - Забрать EURO у игрока.
👑» removerub [ID] - Забрать все деньги у игрока.
👑 » givelvl [ID] [COUNT] - выдать Себе или игроку уровень.
👑 » bonus [balance/exs] [0 | 1] - Включить x2 денег и опыта в играх.
👑 » brep [ID] [0 | 1] - Заблокировать админам ответы на репорты.
👑 » bgive [ID] [0 | 1] - Заблокировать выдачу валюты Админам.
👑 » bpay [ID] [0 | 1] - Заблокировать передачу денег игрокам.
👑 » boostzp [ID] [1 | 24] - Выдать автосбор зарплаты с работы.
👑 » boostbiz [ID] [1 | 24] - Выдать автосбор прибыли с бизнесов.
👑 » giveadm [ID] [0 | 5] - Выдать Админ уровень игроку.
👑 » setwin [ID] [0 | 100] - Выдать шанс побед игроку.
👑 » up [ID] - Повысить привилегию игрока.
👑 » down [ID] - Понизить привилегию игрока.
				`);
	    }
	});
 
cmd.on(/^(?:ник)?\s([^]+)?/i, "ник", 0, (message) => { 
	let user = acc.users[user_id(message.user)]; 
	let zaprets1 = args[1].toLowerCase();
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.send(`📗 » Придумайте адекватный ник`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.send(`📗 » Придумайте адекватный ник`);
	}
	if(args[1].length > 15) return message.send(`📗 » Максимальная длина ника 15 символов.`);
	user.prefix = args[1];
	return message.send(`📗 » Вы сменили свой ник на: ${args[1]}`);
});

 


cmd.on(/^(?:весточка)?\s([^]+)?/i, "чат", 0, (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	if(!args[1]) return message.send(`📘 » Напишите текст для отправки.`);
	if(!acc.jail[user_id(message.user)]) return message.send(`📘 » Вы не сидите в тюрьме`);
	let zaprets1 = args[1].toLowerCase();
		var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.send(`📗 » Придумайте адекватный текст`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.send(`📗 » Придумайте адекватный текст`);
	}
	/////////////
	if(acc.jail[user_id(message.user)]){ 
		for(i in acc.jail){
			group.api.call('messages.send', {
				peer_id: acc.users[i].id,
				message: `[ Заключенный #${i} | @id${acc.users[i].id}(${acc.users[i].prefix})] ` + zaprets1
			});
		}
	} 
}); 

cmd.on(/^(?:рассылка)\s?([^]+)?/i, 'рассылка', 0, message => { 
	if(acc.users[user_id(message.user)].level < 4) return;
	for(i in acc.users){
		group.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `[Рассылка]:\n->${args[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
});

cmd.on(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, 'поиск', 0, message => { 

	if(args[3]){
		var id = user_id(args[3]);
		if (!acc.users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
		return message.send(`
			Игрок: ${acc.users[id].prefix}
			ID: ${id}
			Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "CREATOR")}
		`);
	}else{ 
		if(!args[4]) return message.send(`Укажите данные`);
		var domain = args[4].split(" ");
		vk.api.call("utils.resolveScreenName", {
			screen_name: args[4]
		}).then((res) => { 
			var id = user_id(res.object_id);
			if (!acc.users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
			return message.send(`
				Игрок: ${acc.users[id].prefix}
				ID: ${id}
				Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "CREATOR")}
				`);
		})
		return;
	}
 
});
 

cmd.on(/^(?:состав)/i, 'состав', 0, message => {  
		let devs, admins, moders, vips, chat; 
		let devels = ``;
		devs = '\n"CREATORS"\n';
		spec = '\n"Гл.Администраторы"\n';
		admins = '\n"Администраторы"\n'; 

		vips = '\n"VIP"\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];

			if (user.level == 5) devs += `🔹 » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 4) spec += `🔹 » @id${acc.users[id].id}(${acc.users[id].prefix})\n`;
			if (user.level == 3) admins += `🔹 » @id${acc.users[id].id}(${acc.users[id].prefix})\n`;
			if (user.level == 1) vips += `🔹 » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 24) text += devs;
		if (spec.length != 24) text += spec; 
		if (admins.length != 24) text += admins; 
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});



	cmd.on(/^(?:blist)/i, "banned", 4, (message, args) => {
		bot.botflood += 1;
		if (acc.users[message.user].level < 5) return;
		let text = '';
		text += `~~ Users в бане ~~\n`;
		for (let id in ban) {
			text += `https://vk.com/id${id} \n`;
		}
		return message.send(text);
	});

cmd.on(/^(?:передать)\s?([0-9]+)?\s?([0-9]+)?/i, 'состав', 0, (message) => {  
	if(!args[1] || !args[2]) return message.send(`👉 ➾ Пример команды: передать ID СУММА`)
	let user = acc.users[user_id(message.user)];
	if(user.admin.block_pay == true) return message.send(`🔸 ➾ У вас заблокированы переводы денег.`)   

	if(user.level < 1){
	if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
		if(args[2] > 5000000) return message.send(`💴 ➾ Максимальная сумма передачи 5.000.000$`)  
	}
	if(user.level == 1){
	if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
		if(args[2] > 15000000) return message.send(`💴 ➾ Максимальная сумма передачи 15.000.000$`)  
	}
	if(user.level == 2){
	if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
		if(args[2] > 30000000) return message.send(`💴 ➾ Максимальная сумма передачи 30.000.000$`)  
	}
	if(user.level == 3){
	if(user.bloks.pay == true) return message.send(`🔸 ➾ Передавать валюту можно раз в 10 минут.`)   
		if(args[2] > 70000000) return message.send(`💴 ➾ Максимальная сумма передачи 70.000.000$`)  
	}
	if(user.level > 3){}
 
	let id = user_id(message.user)
	let ids = args[1] 
	if(!Number(args[1]) || !Number(args[2])) return message.send(`👉 ➾ ID и СУММА должны быть числового вида.`)
	if(!acc.users[args[1]] || args[2] < 0) return message.send(`👉 ➾ Некорректно введены данные`)
	if(args[1] > user.balance) return message.send(`👉 ➾ У вас нет столько $`);
	user.balance -= Number(args[2]);
	acc.users[args[1]].balance += Number(args[2]);
 	user.bloks.pay = true; 
		setTimeout(() => {
			user.bloks.pay = false;
	}, 600000);

	vk.api.call("messages.send", {
		peer_id: acc.users[args[1]].id,
		message: `💴 ➾ Игрок [ID: ${id}] ${user.prefix} перевел вам ${args[2]}$ | В ${time()}`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💴 ➾ Вы успешно перевели ${acc.users[args[1]].prefix} -> ${args[2]}$.`);
});


cmd.on(/^(?:бпередать)\s?([0-9]+)?\s?([0-9]+)?/i, "бпередать", 0, (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.admin.block_pay == true) return message.send(`🔸 » У вас заблокированы переводы денег.`)  
	let id = user_id(message.user)
	let ids = args[1]
	if(!args[1] || !args[2]) return message.send(`👉 » Пример команды: бпередать ID СУММА`)
	if(!Number(args[1]) || !Number(args[2])) return message.send(`👉 » ID и СУММА должны быть числового вида.`)
	if(!acc.users[args[1]] || args[2] < 0) return message.send(`👉 » Некорректно введены данные`)
	if(args[2] > user.bitcoin) return message.send(`👉 » У вас нет столько Биткоинов`);
	user.bitcoin -= Number(args[2]);
	acc.users[args[1]].bitcoin += Number(args[2]);
	logs(user_id(message.user), ids, args[2], type = 1)
 
	group.api.call("messages.send", {
		peer_id: acc.users[args[1]].id,
		message: `💴 » Игрок [ID: ${id}] ${user.prefix} перевел вам ${args[2]} bitcoins | В ${time()}`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💴 » Вы успешно перевели ${acc.users[args[1]].prefix} -> ${args[2]} bitcoins.`);
});				 
 
////// Система машин
	cmd.on(/^(?:машины)\s?([0-9]+)?/i, "машины", 0, (message) => {  
 	let user = acc.users[user_id(message.user)];
 	let houses = ['Коробка', 'Подвал' , 'Палатка'] // car 
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👉 » Ваш дом слишком дешевый, чтобы иметь данный транспорт.`)}
	}
 	if(user.house == false) return message.send(`👉 » Для покупки машины Вам нужен дом!`);  
		if(!args[1]){
			return message.send(`
			➕ 1&#8419;. Infinity Q50 - 10.000.000$
			➕ 2&#8419;. Toyota Camry - 14.000.000$
			➕ 3&#8419;. BMW X5M - 20.000.000$
			➕ 4&#8419;. Mercedes G65 AMG - 25.000.000$
			➕ 5&#8419;. BMW M5 E60 -  35.000.000$
			➕ 6&#8419;. Mercedes E63 AMG- 50.000.000$
			➕ 7&#8419;. Lamborgini avendator - 65.000.000$
			➕ 8&#8419;. Formula 1- 80.000.000$ 
			 
			🚘 » Для покупки напишите: Машины [номер] 
			⚠ » 'В путь' отправить машину в рейс.
			👉 » Машина продать - для продажи.
			👉 » При продаже вернется 75% от суммы.
			`)
		}
	let i = args[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0, 1000000,14000000, 20000000,25000000,35000000,50000000,65000000,80000000];
 		let names = [0, 'Infinity Q50','Toyota Camry','BMW X5M','Mercedes G65 AMG','BMW M5 E60','Mercedes E63 AMG','Lamborgini avendator','Formula 1']
 	if(i < 0 || i > 8) return;
 	if(user.cars != false) return message.send(`🛥 » У вас уже куплена машина`);
 	if(i > 0 && i <= 8){
 		if(user.balance < count[i]) return message.send(`🛥 » У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.cars = ids[i]; 
 		return message.send(`🚘 » Вы купили машину (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
 
	cmd.on(/^(?:машина продать)/i, "машина продать", 0, (message) => {
		let count = [0, 1000000,5000000, 10000000,15000000,25000000,39000000,49000000,55000000,64000000,70000000];
		let user = acc.users[user_id(message.user)];
		if(user.cars == false) return message.send(`🚘 » У вас нет машины`)
		let sum = count[user.cars] / 100 * 75;
		user.balance += sum; 
		user.cars = false; 
		return message.send(`🚘 » Вы продали свой автомобиль за ${sum}$`)
	});

	cmd.on(/^(?:в путь)\s?([0-9]+)?/i, "в путь", 0, (message) => {  
 	let user = acc.users[user_id(message.user)];
	if(user.cars == false) return message.send(` 🚘 » У вас нет машины`)
		if(!args[1]){
			return message.send(`
			🚘 »  Места для отправки машины в рейс:

			1&#8419;. За город | 1ч 
			2&#8419;. В Москву | 2ч
			3&#8419;. За границу | 3ч 
			4&#8419;. На Северный полюс | 4ч 
 
			🚘 » Вернувшись из рейса вы получите трофеи.
			🚘 » Чем ценнее машина, тем лучше трофеи.
			⚠ » Также, случайно может сломаться машина и она пропадет.
			`)
		}
	let i = args[1]; 
	let name = [0, 'за город','в Москву','за границу','на северный полюс']
	let ids = [0,1,2,3,4]
 	let time = [0,3600000,7200000,10800000,14400000]
 	let times = [0,1,2,3,4]
 	if(i < 0 || i > 4) return;
 	if(user.reys != false) return message.send(`🚘 » У вас уже отправлена машина в рейс`);
 	if(i > 0 && i <= 4){   
 		user.reys = true;
 		message.send(`🚘 » Вы отправили машину в рейс (${name[i]}) на ${times[i]} часов.`)
 		if(rand(1,100) < 80){

 			setTimeout(() => {
 				let a = 0;
 				if(i==1){a = rand(1500,5000)}
 				if(i==2){a = rand(5000,9000)}
 				if(i==3){a = rand(10000,15000)}
 				if(i==4){a = rand(20000,30000)}
 				let id_car = user.car;
				if(id_car < 3){a += rand(1000,3000)}
				if(id_car > 3 && id_car < 6){a += rand(5000,8000)}
				if(id_car > 6){a += rand(90000,12000)}
				user.reys = false;
				return message.send(`🚘 » Ваша машина успешно вернулась с рейса. Вы получили: ${a}$`)
			}, time[args[1]]);

 		}else{
 			setTimeout(() => {
	 			user.reys = false;
				user.cars = false;
				return message.send(`🚘 » К несчастью ваша машина попала в аварию. Груз не был доставлен, машину унилизировали.`)
			}, time);
 		} 
 	 
 	} 
 }); 



 
/////// Система вертолетов/самолетов

	cmd.on(/^(?:вертолеты)\s?([0-9]+)?/i, "вертолеты", 0, (message) => {  
 	let user = acc.users[user_id(message.user)]; 
	let houses = ['Коробка', 'Подвал' , 'Палатка','Домик на дереве','Полуразрушенный Дом'] // car 
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👉 » Ваш дом слишком дешевый, чтобы иметь данный транспорт.`)}
	}
 	if(user.house == false) return message.send(`👉 » Для покупки вертолета Вам нужен дом!`); /// ДОМ НЕ НИЖЕ 5
		if(!args[1]){
			return message.send(`
			➕ 1&#8419;. Sikorsky S-92 - 70.000.000$
			➕ 2&#8419;. AgustaWestland AW101 - 75.000.000$
			➕ 3&#8419;. Airbus H225 Super Puma - 100.000.000$
				 
			🚁 » Для покупки напишите: Вертолеты [номер] 
			👉 » Вертолет продать - для продажи.
			👉 » При продаже вернется 75% от суммы.
			`)
		}
	let i = args[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0, 70000000,75000000,100000000];
 	let names = [0, 'Sikorsky S-92','AgustaWestland AW101','Airbus H225 Super Puma']
 	if(i < 0 || i > 3) return;
 	if(user.helicopter != false) return message.send(`🚁 » У вас уже куплен вертолет`);
 	if(i > 0 && i <= 3){
 		if(user.balance < count[i]) return message.send(`🚁 » У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.helicopter = ids[i];
 		return message.send(`🚁 » Вы купили вертолёт (${names[i]}) за ${count[i]}$`)
 	} 
 }); 

 	cmd.on(/^(?:самолеты)\s?([0-9]+)?/i, "самолеты", 0, (message) => {  

 	let user = acc.users[user_id(message.user)];  
	let houses = ['Коробка', 'Подвал' , 'Палатка','Домик на дереве','Полуразрушенный Дом','Дом в лесу'] // car
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👉 » Ваш дом слишком дешевый, чтобы иметь данный транспорт.`)}
	}
 	if(user.house == false) return message.send(`👉 » Для покупки самолета, Вам нужен дом!`); /// ДОМ НЕ НИЖЕ 7
		if(!args[1]){
			return message.send(`
			➕ 1&#8419;. Boeing 747 - 30.000.000$
			➕ 2&#8419;. Airbus A340-300 - 85.000.000$
			➕ 3&#8419;. Airbus A380 Superjumbo Jet - 90.000.000$ 
			 
			✈ » Для покупки напишите: Самолеты [номер] 
			👉 » Самолет продать - для продажи.
			👉 » При продаже вернется 75% от суммы.
			`)
		}
	let i = args[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0, 50000000,75000000,90000000];
 	let names = [0, 'Boeing 747','Airbus A340-300','Airbus A380 Superjumbo Jet']
 	if(i < 0 || i > 3) return;
 	if(user.aircraft != false) return message.send(`✈ » У вас уже куплен самолет`);
 	if(i > 0 && i <= 3){
 		if(user.balance < count[i]) return message.send(`✈ » У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.aircraft = ids[i];
 		return message.send(`✈ » Вы купили самолет (${names[i]}) за ${count[i]}$`)
 	} 
 }); 
 

	cmd.on(/^(?:самолет продать)/i, "самолет продать", 0, (message) => {
		let count = [0, 30000000,85000000,90000000];
		let user = acc.users[user_id(message.user)];
		if(user.aircraft == false) return message.send(`✈ » У вас нет самолета`)
		let sum = count[user.aircraft] / 100 * 75;
		user.balance += sum;
		user.aircraft = false;
		return message.send(`✈ » Вы продали свой самолет за ${sum}$`)
	});

	cmd.on(/^(?:вертолет продать)/i, "вертолет продать", 0, (message) => {
		let count = [0, 50000000,15000000,35000000,39000000,43000000,50000000,6500000,80000000];
		let user = acc.users[user_id(message.user)];
		if(user.helicopter == false) return message.send(`🚁 » У вас нет вертолета`)
		let sum = count[user.helicopter] / 100 * 75;
		user.balance += sum;
		user.helicopter = false;
		return message.send(`🚁 » Вы продали свой вертолет за ${sum}$`)
	});
///// Бизнес система - - - - - - -
	cmd.on(/^(?:статистика)\s?([0-9]+)?/i, "статистика", 0, (message) => {  
		let user = acc.users[user_id(message.user)]; 
		let text = '🏢 » Статистика бизнесов: \n';
		if(user.bizs.one_biz == true){ text +=  `🔸 » Бизнес: ${user.bizs.one.name}\n🔸 » Прибыль: ${user.bizs.one.zp}$\n🔸 » Людей: ${user.bizs.one.people}\n🔸 » Максимальное кол-во людей: ${user.bizs.one.max_peop}\n`}
		if(user.bizs.two_biz == true){ text +=  `🔸 » Бизнес: ${user.bizs.two.name}\n🔸 » Прибыль: ${user.bizs.two.zp}$\n🔸 » Людей: ${user.bizs.two.people}\n🔸 » Максимальное кол-во людей: ${user.bizs.two.max_peop}`}
		return message.send(text)
	});

 

 cmd.on(/^(?:бизнесы)\s?([0-9]+)?/i, 'бизнесы', 0, message => {
 	if(!args[1]){
 		return message.send(`
		🍔 1. Ларёк с шаурмой | 3.000.000$ |
		👜 2. Магазин "Магнит" | 9.500.000$ |
		👜👑 3. Гипермаркет "Малина" | 15.000.000$ | 
		🚙 4. АЗС | 25.000.000$ | 
		🏢 5. Отель | (35.000.000$) | 
		🚧 6. Электрическая станция | 50.000.000$ | 
		🏦 7. Банк | 70.000.000$ | 
		🎰 8. Казино | 100.000.000$ |
		🚀 9. Космическое агентство | 5.000.000.000$ |

👷» В скобочках: кол-во доступных к найму рабочих
👷» Нанять рабочего: нанять [кол-во] [номер 1-2] | +5k/ч
👷» Цена найма 1 рабочего - 50.000$

✅» Для покупки напишите: Бизнесы [номер]
✅» Данные о бизнесе: статистика 

💵 » 'Прибыль' - получить ежечасную прибыль

💵 » Для продажи: 'Бизнес продать [номер]'
👉 » При продаже вернется 75% от суммы. 💵 💵 💵
 			`);
 	}
 	let i = args[1];
 	let user = acc.users[user_id(message.user)];
 	let count = [0, 3000000, 95000000,15000000,25000000,350000000,50000000,70000000,100000000,5000000000];
	let max_peop = [0,5,10,15,20,25,30,35,45,55]
 		let names = [0, 'Ларёк с шаурмой','Магазин (Магнит)','Гипермаркет "Малина"','АЗС','Отель','Электрическая станция','Банк','Казино','Космическое агентство'] 
 	if(i < 0 || i > 9) return message.send(`🏢 » Неверный номер бизнеса.`)
 	if(!Number(args[1])) return message.send(`🏢 » Укажите номер бизнеса`)

 	if(user.bizs.one_biz == false){
 		if(user.balance < count[i]) return message.send(`🏢 » У вас нет такой суммы.`);
 		user.balance -= count[i];
		user.bizs.one_biz = true;
		user.bizs.one.count = Number(count[i])
		user.bizs.one.id = Number(i) 
		 user.bizs.one.name =  names[i];
		user.bizs.one.max_peop = max_peop[i];
		return message.send(`🏢 » Вы купили бизнес '${names[i]}' за ${count[i]}$`) 
	}
	if(Number(i) == user.bizs.one.id) return message.send(`🏢 » У вас уже куплен такой вид бизнеса.`)
	if(Number(i) == user.bizs.two.id) return message.send(`🏢 » У вас уже куплен такой вид бизнеса.`)	
	if(user.bizs.two_biz == false){
 		if(user.balance < count[i]) return message.send(`🏢 » У вас нет такой суммы.`);
		if(Number(i) == user.bizs.one.id) return message.send(`🏢 » У вас уже куплен такой вид бизнеса.`)
		user.balance -= count[i];
		user.bizs.two_biz = true;
		user.bizs.two.count = Number(count[i])
		user.bizs.two.id = Number(i) 
		 user.bizs.two.name =  names[i];
		user.bizs.two.max_peop = max_peop[i];
		return message.send(`🏢 » Вы купили бизнес '${names[i]}' за ${count[i]}$`) 
	}
	return message.send(`🏢 » У вас уже куплено 2 бизнеса.`) 
 
 });
 

	cmd.on(/^(?:бизнес продать)\s?([0-9]+)?/i, "бизнес продать", 0, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.bizs.one_biz == false && user.bizs.two_biz == false) return message.send(`🏢 » У вас нет бизнесов.`)
		if(args[1] < 0 || args[1] > 2) return message.send(`🏢 » Укажите верный номер бизнеса.`);
		if(args[1] == 1){
			let sum = user.bizs.one.count / 100 * 75
			user.balance += sum;
			user.bizs.one_biz = false;
			user.bizs.one.count = false;
			user.bizs.one.id = false;
			user.bizs.one.name = false;
			user.bizs.one.people = 0; 
			user.bizs.one.zp = 0;
			user.bizs.one.max_peop = 0;
			return message.send(`🏢 » Вы продали свой бизнес за ${sum}$`);
		}
		if(args[1] == 2){
			let sum = user.bizs.two.count / 100 * 75
			user.balance += sum;
			user.bizs.two_biz = false;
			user.bizs.two.count = false;
			user.bizs.two.id = false;
			user.bizs.two.name = false;
			user.bizs.two.people = 0; 
			user.bizs.two.zp = 0;
			user.bizs.two.max_peop = 0;
			return message.send(`🏢 » Вы продали свой бизнес за ${sum}$`);
		}		  
	 
	});


	cmd.on(/^(?:нанять)\s?([0-9]+)?\s?([0-9]+)?/i, "нанять", 0, (message) => {  
		if(!args[1]) return message.send(`🏢 » Укажите количество рабочих | нанять <кол-во> <номер>`)
		if(!args[2]) return message.send(`🏢 » Укажите номер бизнеса | нанять <кол-во> <номер>`)
		if(!Number(args[1]) || args[1] < 0 || args[1] > 100 || !Number(args[2]) || args[2] < 1 || args[2] > 2) return message.send(`🏢 Неверно указаны данные | нанять <кол-во> <номер>`)
		let id = user_id(message.user)
		let num = args[2]; 
		if(args[1] * 50000 > acc.users[id].balance) return message.send(`🏢 » Для покупки [${args[1]}] рабочих нужно [${args[1] * 50000}$]`);
	    if(args[2] == 1){ 
	    	if(acc.users[id].bizs.one_biz == false) return message.send(`🏢 » У вас не куплен бизнес.`)
	    	if(acc.users[id].bizs.one.max_peop - acc.users[id].bizs.one.people < args[1]) return message.send(`🏢 » Максимальное количество работников: ${acc.users[id].bizs.one.max_peop}`)
	    	acc.users[id].bizs.one.people += Number(args[1])
	    	acc.users[id].balance -= Number(args[1]) * 50000;
	    	acc.users[id].bizs.one.zp += 5000 * Number(args[1]);
	    	return message.send(`🏢 » Вы купили ${args[1]} рабочих. Ваша прибыль увеличилась на: ${args[1] * 5000}$`)
	    }
	    if(args[2] == 2){
	    	if(acc.users[id].bizs.two_biz == false) return message.send(`🏢 » У вас не куплен бизнес.`)
	    	if(acc.users[id].bizs.two.max_peop - acc.users[id].bizs.two.people < args[1]) return message.send(`🏢 » Максимальное количество работников: ${acc.users[id].bizs.two.max_peop}`)
	    	acc.users[id].bizs.two.people += Number(args[1])
	    	acc.users[id].balance -= Number(args[1]) * 50000;
	    	acc.users[id].bizs.two.zp += 5000 * Number(args[1]);
	    	return message.send(`🏢 » Вы купили ${args[1]} рабочих. Ваша прибыль увеличилась на: ${args[1] * 5000}$`)
	    } 
		 
	});

	cmd.on(/^(?:прибыль)/i, 'работать', 0, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.bizs.one_biz == false && user.bizs.two_biz == false) return message.send(`🏢️ » У вас нет бизнесов.`); 
 	if(user.bizs.one.stop == true || user.bizs.two.stop == true) return message.send(`🏢️ » Прибыль можно брать раз в час.`)
 	
 	if(user.bizs.one_biz == true){
 		text += `📝 » Прибыль с бизнеса <${user.bizs.one.name}> составила: ${user.bizs.one.zp}$\n`;
 		user.balance += Number(user.bizs.one.zp)
 	}
 	if(user.bizs.one_biz == true){
 		text += `📝 » Прибыль с бизнеса <${user.bizs.two.name}> составила: ${user.bizs.two.zp}$\n`;
 		user.balance += Number(user.bizs.two.zp)
 	}

 	user.bizs.one.stop = true;
 	user.bizs.two.stop = true;
 
	setTimeout(() => {
			user.bizs.one.stop = false;
			user.bizs.two.stop = false;
	}, 3600000);


 	return message.send(`
 		${text} 
 		`);
 });
  

 

///// АДМИН КОМАНДЫ - - - -- - - 
 
 

 	cmd.on(/^(?:стата)/i, "стата", 0, (message) => { 
 		let user = acc.users[user_id(message.user)];
 		if(user.level < 2) return;
 		let warns = ''; 
 		return message.send(`
 			🔔 ~ ~ Статистика Администратора ~ ~ 🔔
 			✉ » Количество ответов 
			✉ » За все время: [${user.ainfo.all_ans}]
			♻ » Репутация: [${user.ainfo.good_ans}/${user.ainfo.bad_ans}] (хорошо/плохо)
			⚠ » Выговоров: [${user.ainfo.vig}]   
 			`);

 	});

	cmd.on(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, "репорт", 0, (message) => { 
 		if(message.chat) return message.send(`Обращаться в репорт можно только в ЛС ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
		if(!args[1]) return message.send(`🔸 » вы не написали жалобу | репорт [текст]`);
		let a = zapret(args[1]);
		if(a != 0) return message.send(a);

		for(i=0;i<200000;i++){
			if(acc.users[i]){
			if(acc.users[i].level >= 2){ 
				group.api.call("messages.send", {
					peer_id: acc.users[i].id,
					message: `👉 » [REPORT]\n👉 » ID игрока: ${user_id(message.user)}\n👉 » Жалоба: ${args[1]}\n👉 » [Для ответа: ответ [ID] [TEXT]`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		}
		return message.send(`🔸 » Вы успешно отправили жалобу.`);
	});


	cmd.on(/^(?:респект)\s?([^]+)?/i, "респект", 0, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!args[1]) return message.send(`🔸 » Пример команды: респект +/-\n🔸 » [+ -> хороший ответ/ - -> плохой ответ]`);
		if(user.rep.status == false) return message.send(`🔸 » Проверьте вводимые данные.`); 
		if(args[1] == '+' || args[1] == '-'){
			user.rep.status = false; 
			if(args[1] == '+') acc.users[user.rep.id].ainfo.good_ans += 1; 
			if(args[1] == '-') acc.users[user.rep.id].ainfo.bad_ans += 1;  
			let id = user.rep.id;
			user.rep.id = false;
			return message.send(`🔸 » Вы успешно оценили ответ \n🔸 » Администратора [${acc.users[id].prefix}] - ${args[1].toString().replace(/\+/gi, 'Положительно').replace(/-/gi, 'Отрицательно')}.`)
			 
		}
		return message.send(`🔸 » Проверьте вводимые данные.`); 
	});
 
	cmd.on(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, "ответ", 0, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_rep == true) return message.send(`🔸 » У вас заблокированы ответы на репорт.`)
		if(user.level < 2) return
		if(!Number(args[1]) || !args[1] || !args[2] || !acc.users[args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
		let a = zapret(args[2]);
		if(a != 0) return message.send(a); 
		group.api.call("messages.send", {
			peer_id: acc.users[args[1]].id,
			message: `👉 » Администратор: ${user.prefix} ответил Вам:\n👉 ${args[2]}\n\n👉 Оцените ответ: респект +/- [хорошо/плохо]`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });	
	 
		user.ainfo.all_ans += 1;
		user.ainfo.ans += 1;
		acc.users[args[1]].rep.status = true;
		acc.users[args[1]].rep.id = Number(user_id(message.user));
		return message.send(`👉 » Ответ отправлен.`)
	});


	cmd.on(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, "setnick", 0, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 3) return message.send(`🔸 » Вы не администратор`); 
		if(!args[1] || !args[2]) return message.send(`🔸 » Пример команды: setnick [ID] [ИМЯ]`);
		let zaprets1 = args[2].toLowerCase();
		var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`📗 » Придумайте адекватный ник`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`📗 » Придумайте адекватный ник`);
		}
	 
		acc.users[args[1]].prefix = args[2];
		user.ainfo.nicks += 1;
		return message.send(`📗 » Вы сменили ник игрока на: ${args[2]}`);
	});

	cmd.on(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, "ban", 0, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(!args[1] || !acc.users[args[1]] || !args[2]) return message.send(`🔸 » Пример команды: ban [ID] [ПРИЧИНА]`);
		if(!Number(args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 » Вы не администратор`);
		if(!acc.users[args[1]]) return message.send(`❎ » Такого игрока нет!`);
		acc.users[args[1]].ban = args[2]; 
		user.ainfo.bans += 1;
		group.api.call('messages.send', {
			peer_id: acc.users[args[1]].id,
			message: `✅ » ${user.prefix} заблокировал Вас навсегда.\n✅ » Причина: ${args[2]}`
		});
 
		return message.send(`✅ » Вы заблокировали игрока [${acc.users[args[1]].prefix}] навсегда.\n✅ » Причина: ${args[2]}`);
	}); 
 
 

cmd.on(/^(?:givemyrub)\s?([0-9]+)?/i, 'givemyrub', 0, message => {
	let user = acc.users[user_id(message.user)];
	if(user.admin.block_give == true) return message.send(`🔸 » У вас заблокирована выдача валюты.`)
	if(user.level < 1) return message.send(`🔸 » Вы не администратор`);
	if(user.bloks.giverub == true) return message.send(`💰 » Выдавать валюту можно раз в час`);
	if(user.level == 1){
		if(!args[1] || args[1] < 0 || args[1] > 500000) return message.send(`💰 » Пример: 'givemyrub [1-500000]'`);
		user.balance += Number(args[1]);
	}
	if(user.level == 3){
		if(!args[1] || args[1] < 0 || args[1] > 1000000) return message.send(`💰 » Пример: 'givemyrub [1-1000000]'`);
		user.balance += Number(args[1]);
	}
	if(user.level == 4){
		if(!args[1] || args[1] < 0 || args[1] > 1000000000) return message.send(`💰 » Пример: 'givemyrub [1-1000000000]'`);
		user.balance += Number(args[1]);
	}

	user.bloks.giverub = true;
		setTimeout(() => {
			user.bloks.giverub = false;
	}, 3600000);

	return message.send(`💰 » Вы выдали себе ${spaces(args[1])}$`);
});



cmd.on(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i, 'giverub', 0, message => {
	let user = acc.users[user_id(message.user)];
			if(user.level < 5) return message.send(`🔸 » Вы не CREATOR`);
			if(!args[1] || !acc.users[args[1]] || !args[2] || args[2] < 0) return message.send(`💰 » Пример: 'giverub [ID] [COUNT]'`); 
			acc.users[args[1]].balance += Number(args[2]);
		 	
			logs(user_id(message.user), args[1], args[2], type = 2)
	 
			return message.send(`💰 » Вы выдали [@id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})] ${spaces(args[2])}$`);	 
});

 


cmd.on(/^(?:removerub)\s?([0-9]+)?/i, 'removerub', 0, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
			if(user.level < 4) return message.send(`🔸 » Вы не Гл.Администратор`);
			if(!args[1] || !acc.users[args[1]]) return message.send(`💰 » Пример: 'removerub [ID]'`); 
			acc.users[args[1]].balance = 0; 
			return message.send(`💰 » Вы забрали все $ у [@id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})]`);
});


cmd.on(/^(?:givedonate)\s?([0-9]+)?\s?([0-9]+)?/i, 'givedonate', 0, message => {
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return message.send(`🔸 » Вы не CREATOR`);
	if(!args[1] || !acc.users[args[1]] || !args[2] || args[2] < 0) return message.send(`💰 » Пример: 'givedonate [ID] [COUNT]'`); 
	acc.users[args[1]].donate += Number(args[2]);
 	
 
	return message.send(`💎 » Вы выдали игроку [@id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})] ${spaces(args[2])} EURO💎`);
});

cmd.on(/^(?:removedonate)\s?([0-9]+)?\s?([0-9]+)?/i, 'removedonate', 0, message => {
	let id = user_id(message.user)
			if(!args[1] || !acc.users[args[1]] || !args[2] || args[2] < 0) return message.send(`💎 » Пример: 'removedonate [ID] [COUNT] \n💎 » COUNT - количество отнимаемого доната.'`); 
			let user = acc.users[user_id(message.user)];
			if(user.level < 4) return message.send(`🔸 » Вы не Гл.Администратор`); 
			acc.users[args[1]].donate -= Number(args[2]);
			return message.send(`💎 » Вы забрали  у [@id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})] ${args[2]} EURO`);
});


 




cmd.on(/^(?:delluser)\s?([0-9]+)?/i, 'delluser', 0, message => {
	let id = user_id(message.user)
			let user = acc.users[user_id(message.user)];
			if(user.level < 5) return message.send(`❗ ERROR ❗`);
			if(!args[1] || !acc.users[args[1]]) return message.send(`💰 » Пример: 'delluser [ID]'`); 

			acc.users[args[1]].balance = 0;
		 	acc.users[args[1]].bitcoin =0
		 	acc.users[args[1]].donate =0
		 	acc.users[args[1]].exs =0
		 	acc.users[args[1]].exsup = 50
		 	acc.users[args[1]].lvl  =0
		 	acc.users[args[1]].game.binlose =0
		 	acc.users[args[1]].game.binwin =0
		 	acc.users[args[1]].game.binstop = false
		 	acc.users[args[1]].game.kazlose =0
		 	acc.users[args[1]].game.kazwin =0
		 	acc.users[args[1]].game.rand_lose =0
		 	acc.users[args[1]].game.rand_win =0
		 	acc.users[args[1]].game.stavka_win =0
		 	acc.users[args[1]].game.stavka_lose =0
		 	acc.users[args[1]].game.win = 50
		 	acc.users[args[1]].msg.messages = 0
		 	acc.users[args[1]].msg.last_msg = ''
		 	acc.users[args[1]].prefix = `Удален | ${time()} | ${data()}`
		 	acc.users[args[1]].cars.name = false
		 	acc.users[args[1]].cars.id =false
		 	acc.users[args[1]].cars.count =0
		 	acc.users[args[1]].house = false
		 	acc.users[args[1]].lodka = false
		 	acc.users[args[1]].rep.status = false
		 	acc.users[args[1]].rep.id = false 
		 	acc.users[args[1]].warn = 0 
		 	acc.users[args[1]].warn_p = []
		 	acc.users[args[1]].war.les =0
		 	acc.users[args[1]].war.kam =0
		 	acc.users[args[1]].war.tree =0
		 	acc.users[args[1]].war.stone =0
		 	acc.users[args[1]].war.kazarm = false
		 	acc.users[args[1]].war.hp = 0
		 	acc.users[args[1]].war.uron = 0
		 	acc.users[args[1]].war.name = false
		 	acc.users[args[1]].war.war = false
		 	acc.users[args[1]].aircraft.name = false
		 	acc.users[args[1]].aircraft.id = false
		 	acc.users[args[1]].aircraft.count =0
		 	acc.users[args[1]].helicopter.name = false
		 	acc.users[args[1]].helicopter.id = false
		 	acc.users[args[1]].helicopter.count =0
		 	acc.users[args[1]].level = 0
		 	acc.users[args[1]].bizs.one_biz = false
		 	acc.users[args[1]].bizs.two_biz =  false
		 	acc.users[args[1]].bizs.one.count = false
		 	acc.users[args[1]].bizs.one.balance = 0
		 	acc.users[args[1]].bizs.one.id = false
		 	acc.users[args[1]].bizs.one.name = false
		 	acc.users[args[1]].bizs.one.people = 0
		 	acc.users[args[1]].bizs.one.uplvl = 0
		 	acc.users[args[1]].bizs.one.zp = 0 
		 	acc.users[args[1]].bizs.two.count = false
		 	acc.users[args[1]].bizs.two.balance = 0
		 	acc.users[args[1]].bizs.two.id = false
		 	acc.users[args[1]].bizs.two.name = false
		 	acc.users[args[1]].bizs.two.people = 0
		 	acc.users[args[1]].bizs.two.uplvl = 0
		 	acc.users[args[1]].bizs.two.zp = 0 
		 	acc.users[args[1]].bizs.two.max_peop = 0 
		 	acc.users[args[1]].bizs.one.max_peop = 0 
		 	acc.users[args[1]].job.name = false;
		 	acc.users[args[1]].job.count = 0;
		 	acc.users[args[1]].job.stop = false;
		 	acc.users[args[1]].job.lvl = 0;
					 
			return message.send(`💰 » Вы удалил аккаунт игрока [@id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})]`);
});
        



//////////////// JAIL /////////
cmd.on(/^(?:jail)?\s([0-9]+)?\s?([0-9]+)?/i, "setnick", 0, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 1) return message.send(`🔸 » Вы не VIP`);
		if(!i || !args[2] || !Number(args[1]) || !Number(args[2]) || !acc.users[args[1]] || args[2] > 999 || args[2] < 1) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » jail [ID] [TIME(1-999)]`);
	let time = args[2] * 60000;
	let id = Number(args[1])
	acc.jail[id] = {
		jail: true
	}
	 

	setTimeout(() => {
			delete acc.jail[id]
			group.api.call('messages.send', {
				peer_id: acc.users[id].id,
				message: `⏺ » Вы были выпущены из тюрьмы | Больше не нарушайте :)`
			});
	}, time);

	group.api.call('messages.send', {
		peer_id: acc.users[id].id,
		message: `⏺ » ${user.prefix} посадил Вас в тюрьму на [${args[2]}] минут(ы).\n\n⏺ » Меню заключенных: камера`
	});
		return message.send(`💰 » Вы посадили в тюрьму игрока [@id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})] на ${time/60000} минут`); 
});


cmd.on(/^(?:unjail)\s?([0-9]+)?/i, "setnick", 0, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 1) return message.send(`🔸 » Вы не VIP`);
	if(!args[1] || !Number(args[1]) || !acc.users[args[1]]) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » unjail [ID]`);
	 
	 
	delete acc.jail[args[1]]
	group.api.call('messages.send', {
		peer_id: acc.users[args[1]].id,
		message: `⏺ » Вы были выпущены из тюрьмы досрочно | Больше не нарушайте :)`
	});
	return message.send(`💰 » Вы выпустили  игрока [@id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})] из тюрьмы`);
	 
});
//////////////////////////////
 
	cmd.on(/^(?:unban)\s?([0-9]+)?/i, "unban", 0, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!args[1]) return message.send(`🔸 » Пример команды: unban ID`);
		if(!Number(args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 » Вы не администратор`);
		if(!acc.users[args[1]]) return message.send(`❎ » Такого игрока нет!`);
		acc.users[args[1]].ban = false 
		group.api.call('messages.send', {
			peer_id: acc.users[args[1]].id,
			message: `✅ » ${user.prefix} разблокировал Вас.`
		});
 
		return message.send(`✅ » Вы разблокировали игрока [${acc.users[args[1]].prefix}]`);
	}); 

	cmd.on(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, "warn", 0, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!args[1] || !args[2]) return message.send(`🔸 » Пример команды: warn [ID] [ПРИЧИНА]`);
		if(!Number(args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(user.level < 1) return message.send(`🔸 » Вы не VIP`);
		if(!acc.users[args[1]]) return message.send(`❎ » Такого игрока нет!`);

		acc.users[args[1]].warn += 1;
		acc.users[args[1]].warn_p.push(args[2]); 

	 
		let text = `✅ » ${user.prefix} выдал вам warn(предупреждение)`
		if(acc.users[args[1]].warn == 3){
			acc.users[args[1]].warn = 0;
			acc.users[args[1]].ban = true;
			acc.users[args[1]].warn_p = []
			text += `\n🔸 » У вас 3 предупреждения.\n🔸 » Ваш аккаунт заблокирован.`
		}
		group.api.call('messages.send', {
			peer_id: acc.users[args[1]].id,
			message: text
		});
		user.ainfo.warns += 1;
		return message.send(`✅ » Вы выдали предупреждение игроку [${acc.users[args[1]].prefix}].`);
	}); 

	cmd.on(/^(?:unwarn)\s?([0-9]+)?/i, "unwarn", 0, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!args[1]) return message.send(`🔸 » Пример команды: unwarn ID`);
		if(!Number(args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`🔸 » Вы не Гл.Администратор`);
		if(!acc.users[args[1]]) return message.send(`❎ » Такого игрока нет!`);

		acc.users[args[1]].warn = 0; 
		acc.users[args[1]].warn_p = []

		group.api.call('messages.send', {
			peer_id: acc.users[args[1]].id,
			message: `✅ » Администратор снял Вам все предупреждения`
		});
		
		return message.send(`✅ » Вы сняли все предупреждения игроку [${acc.users[args[1]].prefix}].`);
	}); 

 


	cmd.on(/^(?:vig)\s?([0-9]+)?/i, "vig", 0, (message) => { 
		if(user_id(message.user) != 1) return;
		let user = acc.users[user_id(message.user)];
		if(!args[1]) return message.send(`🔸 » Пример команды: vig [ID] `);
		if(!Number(args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 » Вы не администратор`);
		if(!acc.users[args[1]]) return message.send(`❎ » Такого игрока нет!`);

		acc.users[args[1]].ainfo.vig += 1; 


		let text = `✅ » ${user.prefix} выдал вам админ-выговор.\n✅ » После 3 вас снимет с админ-поста.`
		if(acc.users[args[1]].ainfo.vig == 3){
			acc.users[args[1]].ainfo.vig = 0;  
			acc.users[args[1]].level = 0;
			text += `\n🔸 » У вас 3 предупреждения.\n🔸 » Вы лишились админ-прав.`
		}
		group.api.call('messages.send', {
			peer_id: acc.users[args[1]].id,
			message: text
		}); 
		return message.send(`✅ » Вы выдали выговор игроку [${acc.users[args[1]].prefix}].`);
	}); 

	cmd.on(/^(?:unvig)\s?([0-9]+)?/i, "unwarn", 0, (message) => { 
		if(user_id(message.user) != 1) return;
		let user = acc.users[user_id(message.user)];
		if(!args[1]) return message.send(`🔸 » Пример команды: unwarn ID`);
		if(!Number(args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 » Вы не администратор`);
		if(!acc.users[args[1]]) return message.send(`❎ » Такого игрока нет!`);

		acc.users[args[1]].ainfo.vig = 0; 

		group.api.call('messages.send', {
			peer_id: acc.users[args[1]].id,
			message: `✅ » Администратор снял Вам все выговоры`
		});
	
		return message.send(`✅ » Вы сняли все выговоры игроку [${acc.users[args[1]].prefix}].`);
	}); 

///////////////////////////////////////////////////////////////////////////
	cmd.on(/^(?:дополнительная информация)$/i, "бот", 0, (message) => {
		let dev = '';   
		return message.send(`
			📋 » Project: ${config.bot} 
			🖥 » Ver: ${config.ver}
			👤 » Creator: @id428576758 (Артём Краев) 
			🔧 » CODER: @id347241116 (Сергей Волков)
			🌍 » Заместитель: 
			👪 » Users: ${acc.number} 
			👥 » Group: ${config.group_url}


			`);
	});
	cmd.on(/^(?:беседы)$/i, "беседы", 0, (message) => { 
		return message.send(`
			📘 » Ссылки на наши беседы:

			 
			`);
	});

/////
cmd.on(/^(?:баланс)/i, "баланс", 0, (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		🆔 » ID: ${user_id(message.user)} 
		💰 » Баланс ${spaces(user.balance)}$ 
		💳 » Биткоинов ${spaces(user.bitcoin)}$ 
		💎 » EURO: ${spaces(user.donate)} 
	`)
});


cmd.on(/^(?:get)\s?([0-9]+)?/i, "get", 0, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	let warns = '';
	if(!args[1] || !Number(args[1]) || !acc.users[args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
	for(i=0;i<acc.users[args[1]].warn_p.length;i++){warns += `⛔ » ${acc.users[args[1]].warn_p[i]}\n`}
	if(user.level < 1) return; 
	let id = acc.users[args[1]]
	return message.send(`
		📋 Информация об игроке [${id.prefix}] 📋
		🔸 » Имя: ${id.prefix}
		🔹 » ID: ${args[1]}
		🔹 » Цифровой: ${id.id}
		🔹 » VK: @id${id.id}(${id.prefix})
		🔹 » Баланс: ${id.balance}
		🔹 » Биткоинов: ${id.bitcoin}
		🔹 » EURO: ${id.donate}
			🔹 » Привилегия: ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Вип").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "CREATOR")}
		🔹 » Дата регистрации: ${id.rtime}
		` +
		(user.brak == false ? `🔸 » Не женат\n` : `🔸 » Партнёр:   ${acc.users[user.brak].prefix}\n`)+
		`

		Имущество:\n` +
		(user.level >= 3 ? `✈ » Самолет:  ${id.aircraft.name}\n` : ``)+
		(user.level >= 3 ? `🚁 » Вертолет: ${id.helicopter.name}\n` : ``)+
		(user.level >= 3 ? `🚘 » Автомобиль: ${id.cars.name}\n` : ``)+  
		(user.level >= 3 ? `🚤 » Лодка: ${id.lodka}\n` : ``)+ 
		(user.level >= 3 ? `🏡 » Дом: ${id.house}\n` : ``)+   
		` 
		🏨 » Бизнесы: 
		`+(user.level >= 3 ? `1&#8419; » ${id.bizs.one.name} || ${spaces(id.bizs.one.zp)}$/час\n` : ``)+  
		(user.level >= 3 ? `2&#8419; » ${id.bizs.two.name} || ${spaces(id.bizs.two.zp)}$/час\n` : ``)+  
		`
		`+
		(user.level >= 2 ? `🔸 » Последнее смс боту: ${id.msg.last_msg}\n` : ``)+  
		(user.level >= 2 ? `🔸 » Сообщений боту: ${id.msg.messages}\n` : ``)+ 
		(user.level >= 2 ? `🔸 » Уровень: ${id.lvl}\n` : ``)+ 
		(user.level >= 2 ? `🔸 » Опыт: ${id.exs}\n` : ``)+  

		(user.level >= 2 ? `\n⚠ » Предупреждений: ${id.warn}\n` : ``)+ 
		(user.level >= 2 ? `⚠ » Причины: [${id.warn}]\n${warns}\n` : ``)+ 
		(id.ban == false ? `⚠ » Аккаунт не заблокирован\n` : `⚠ » Аккаунт заблокирован [${id.ban}]`)
		);
	});



cmd.on(/^(?:свадьба)\s?([0-9]+)?/i, "свадьба", 0, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.brak != false) return message.send(`🙅 » Вы уже женаты.`);
	if(!acc.users[args[1]]) return message.send(`🚶 » Такого игрока нет.`);
	if(acc.users[args[1]].brak != false) return message.send(`🙅 » Этот игрок уже женат!`);
	user.brak = Number(args[1]);
	acc.users[args[1]].brak = user_id(message.user);
	return message.send(`➖➖➖➖➖\n⚠ » - - - - [ВНИМАНИЕ] - - - - <<⚠\n👫 » Поздравим молодоженов: \n 👫 » -->> ${user.prefix} и ${acc.users[args[1]].prefix} <<--\n➖➖➖➖➖`)
});

cmd.on(/^(?:removerate)\s?([0-9]+)?/i, 'removerub', 0, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
			if(user.level < 4) return message.send(`🔸 » Вы не Гл.Администратор`);
			if(!args[1] || !acc.users[args[1]]) return message.send(`💰 » Пример: 'remorate [ID]'`); 
			acc.users[args[1]].global_exs = 0; 
			return message.send(`👑 » Вы забрали весь рейтинг  у [@id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})]`);
});

cmd.on(/^(?:развод)/i, "развод", 0, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.brak == false) return message.send(`🙅 » Вы не женаты.`); 
	acc.users[user.brak].brak = false;
	user.brak = false;
	return message.send(`👫 » Вы успешно развелись.`)
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
cmd.on(/^(?:игропрофиль)/i, "игропрофиль", 0, (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		 📕 >> Ваш Игро-Профиль « 📕
		🔸 » Имя: ${user.prefix}
		🔸 » ID: ${user_id(message.user)}
		🔸 » Баланс: ${spaces(user.balance)}$
	
		🎲 » Игры « 🎲	 
		🎰 » Казино: [Побед: ${user.game.kazwin}/ Поражений: ${user.game.kazlose}]
		📊 » Акции: [Побед: ${user.game.binwin}/ Поражений: ${user.game.binlose}]
		🎲 » Ставка: [Побед: ${user.game.stavka_win}/ Поражений: ${user.game.stavka_lose}]
		💰 » Рандом: [Побед: ${user.game.rand_win}/ Поражений: ${user.game.rand_lose}]
		`);

});

 

cmd.on(/^(?:givelvl)\s?([0-9]+)?\s?([0-9]+)?/i, 'givelvl', 0, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(user.level < 4) return message.send(`🔸 » Вы не Гл.Администратор`);
	if(!args[1] || !acc.users[args[1]] || !args[2] || args[2] < 0) return message.send(`✨ » Пример: 'givelvl [ID] [COUNT]'`); 
	acc.users[args[1]].lvl = Number(args[2]);
 	 
	return message.send(`✨ » Вы выдали [@id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})] ${spaces(args[2])} уровень`);
}); 


	cmd.on(/^(?:up)\s?([0-9]+)/i, "giveadm", 0, (message) => {
		let id = user_id(message.user);	 	 
		let user = acc.users[user_id(message.user)];
		if(!args[1]) return message.send(`🔸 » Пример команды: up [ID]`);
		if(!Number(args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(` ❗ ERROR ❗`);
		if(!acc.users[args[1]]) return message.send(`❎ » Такого игрока нет!`);

		acc.users[args[1]].level += 1;
			return message.send(`✅ » Игрок повышен в должности `)
}); 

	cmd.on(/^(?:down)\s?([0-9]+)/i, "giveadm", 0, (message) => { 
		let id = user_id(message.user);	 	 
		let user = acc.users[user_id(message.user)];
		if(!args[1]) return message.send(`🔸 » Пример команды: up [ID]`);
		if(!Number(args[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(user.level < 5) return message.send(`❗ ERROR ❗`);
		if(!acc.users[args[1]]) return message.send(`❎ » Такого игрока нет!`);

		acc.users[args[1]].level -= 1;
			return message.send(`✅ » Игрок понижен в должности `)
}); 



cmd.on(/^(?:профиль|проф)\s?([0-9]+)?/i, "профиль", 0, (message) => { 
	 	let cars = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX']
	 let hel = [0, 'Agusta A129 Mangusta','Ми-24','AH-2','CAIC WZ-10','HAL LCH','Eurocopter Tiger','Ка-52','Apache']
	 let air = [0, 'Fokker DR1 Triplane','Mitsubishi A6M Zero','Су-35С']

	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let warns = '';
	for(i=0;i<user.warn_p.length;i++){warns += `⛔ » ${user.warn_p[i]}\n`}

	if(!args[1]){
		return message.send(`
		💾 Ваш профиль ⬇ 
		👨‍💻️Ник: ${user.prefix} 
		🔎 ID:   ${user_id(message.user)} 
		💵 Баланс: ${spaces(user.balance)}$ 
		🌐 Биткоинов: ${spaces(user.bitcoin)} 
		💎 EURO: ${spaces(user.donate)} 
			📌 Привилегия: ${user.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "🏆 CREATOR 🏆")} 
		` +(user.pit== false ? `🐆 Питомец: отсутствует\n` : `🐆 Питомец: ${user.pit}\n`)+ 
		`📊 Уровень: ${user.lvl} [${user.exs}🌟/${user.exsup}🌟]
		` + 
		(user.brak == false ? `👫 Не женат\n` : `🔸 Партнёр: ${acc.users[user.brak].prefix}\n`)+ 
		` 
		⚠ » Предупреждений: [${user.warn}] 
		⚠ » Причины: 
		${warns} 
		📆 Дата регистрации:  ${user.rtime} 


		❗ Введите "дпроф" чтоб увидеть свои владения ❗		
		`);
	}else{
		if(!Number(args[1]) || !acc.users[args[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
		let id = acc.users[args[1]]
		return message.send(`
			📋 Информация об игроке [${id.prefix}] 📋
			🔸 » Имя: ${id.prefix}
			🔹 » ID: ${args[1]}
			🔹 » VK: @id${acc.users[args[1]].id}(${acc.users[args[1]].prefix})
			🔹 » Баланс: ${spaces(id.balance)}
			🔹 » EURO: ${spaces(id.donate)}
				🔹 » Привилегия: ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Вип").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "CREATOR")}
			` +
			(id.brak == false ? `🔸 » Не женат\n` : `🔸 » Партнёр:   ${acc.users[id.brak].prefix}\n`)+
			`
			`);
		}
	 
});



cmd.on(/^(?:дпроф)/i, 'стата', 0, message => {
	let air = [0, 'Boeing 747','Airbus A340-300','Airbus A380 Superjumbo Jet']
	let cars = [0, 'Infinity Q50','Toyota Camry','BMW X5M','Mercedes G65 AMG','BMW M5 E60','Mercedes E63 AMG','Lamborgini avendator','Formula 1']
	let hel = [0, 'Sikorsky S-92','AgustaWestland AW101','Airbus H225 Super Puma']
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
 	return message.send(`

		🏨 » Бизнесы: 
			`+(user.bizs.one_biz == false ? `1&#8419; » отсутствует\n` : `1&#8419; » ${user.bizs.one.name} || ${spaces(user.bizs.one.zp)}$/час\n`)+  
			(user.bizs.two_biz == false ? `2&#8419; » отсутствует\n` : `2&#8419; » ${user.bizs.two.name} || ${spaces(user.bizs.two.zp)}$/час\n`)+  
		`

		Имущество:\n` +
		(user.aircraft == false ? `✈ » Самолет:  отсутствует \n` : `✈ » Самолет:  ${air[user.aircraft]}\n`)+
		(user.helicopter == false ? `🚁 » Вертолет: отсутствует \n` : `🚁 » Вертолет: ${hel[user.helicopter]}\n`)+
		(user.cars == false ? `🚗 » Автомобиль: отсутствует \n` : `🚗 » Автомобиль: ${cars[user.cars]}\n`)+  
		(user.lodka == false ? `🛳 » Яхта: отсутствует \n` : `🛳 » Яхта: ${user.lodka}\n`)+ 
		(user.house == false ? `🏘 » Дом: отсутствует \n` : `🏘 » Дом: ${user.house}\n`)+   
		`
			
		`)
 	});



 
//////////////////////////////////////////
	cmd.on(/^(?:топ баланс)$/i, "топ баланс", 0, (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {

			if(acc.users[i]){
			if(acc.users[i].level < 3){ 
				tops.push({
					id: i,
					idvk: acc.users[i].id,
					balance: acc.users[i].balance
				})
				}
			}  
		}
		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					balance: tops[g].balance,
					smile: `${ups}`
				})
			}
		}
		var people = "💴 Топ по балансу 💴 \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.balance) + "$").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});

	cmd.on(/^(?:топ уровень)$/i, "топ уровень", 0, (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(acc.users[i]){
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].lvl
			})

		} 
			 
		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "📝 Топ по уровням 📝 \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "🔥").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});

	cmd.on(/^(?:топ рейтинг)/i, "топ рейтинг", 0, (message) => {

		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(acc.users[i]){
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].global_exs
			})

		} 
			 
		}
		tops.sort(function(a, b) {
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "👑 ТОП ПО РЕЙТИНГУ 👑 \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.lvl) + "👑").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});

		cmd.on(/^(?:топ донат)$/i, "топ донат", 0, (message) => {
		let text = ``;
		var tops = []
		for (i=1;i<200000;i++) {
		if(acc.users[i]){
		tops.push({
			id: i,
			idvk: acc.users[i].id,
			donate: acc.users[i].donate
		})
			}
		}
		tops.sort(function(a, b) {
			if (b.donate > a.donate) return 1
			if (b.donate < a.donate) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					donate: tops[g].donate,
					smile: `${ups}`
				})
			}
		}
		var people = "💎 Топ по донату 💎 \n" + yo.map(a => a.smile + ". [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + spaces(a.donate) + "💎").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 	cmd.on(/^(?:кейс|бонус)/i, "кейс", 0, (message) => {  
 		if(message.chat) return message.send(`Брать бонус можно только в ЛС ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
 		let id = user_id(message.user)
 		if(user.bloks.cases == true) return message.send(`💵 >> Кейс можно открывать раз в 10 минут.`);
 		user.bloks.cases = true
		setTimeout(() => {
			user.bloks.cases = false
		}, 600000);

 		text = '💵 >> Открыв кейс вы получили:\n'
 		let count = rand(4,5);
 		for(i=0;i<count;i++){
 			x = rand(1,100)
 			if(x<73){
 				mon = rand(15000,20000)
 				if(config.bonus_balance == true) mon = mon * 2;
 				text += `💰 >> ${spaces(mon)}$\n`
 				acc.users[id].balance += mon
 			}
 			if(x>73 && x <80){
 				mon = 1
 				text += `💎 >> ${spaces(mon)} EURO\n`
 				acc.users[id].donate += mon
 			}
 			if(x>80){
 				mon = rand(1,5)
 				if(config.bonus_exs == true) mon = mon * 2;
 				acc.users[id].exs += mon

 				let up = lvlup(id);
 				if(up == true){
 					text += `🌟🆙 >> ${mon} опыта [Уровень повышен]\n`
 				}else{
 					text += `🌟 >> ${mon} опыта\n`
 				}
 				 
 				 
 			}
 		}
 		return message.send(text)
 	});

 

 	 cmd.on(/^(?:бкейс|ббонус)/i, "бкейс", 0, (message) => {  
 		if(message.chat) return message.send(`Брать большой-кейс можно только в ЛС ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
 		if(user.bloks.cases == true) return message.send(`💵 >> Большой Кейс можно открывать раз в 10 минут.`); 
 		let id = user_id(message.user)
 		if(user.donate < 10) return message.send(` 💵 >> Большой кейс стоит 10 EURO!`);
 		user.donate -= 10; 
 		user.bloks.cases = true
		setTimeout(() => {
			user.bloks.cases = false
		}, 600000);

 		text = '💰 >> Открыв большой кейс вы получили:\n'
 		let count = rand(10,15);
 		for(i=0;i<count;i++){
 			x = rand(1,100)
 			if(x<73){
 				mon = rand(25000,30000)
 				if(config.bonus_balance == true) mon = mon * 2;
 				text += `🔹 >> ${spaces(mon)}$\n`
 				acc.users[id].balance += mon
 			}
 			if(x>73 && x <80){
 				mon = 2;
 				text += `🔹 >> ${spaces(mon)} EURO\n`
 				acc.users[id].donate += mon
 			}
 			if(x>80){
 				mon = rand(2,5)
 				if(config.bonus_exs == true) mon = mon * 2;
 				acc.users[id].exs += mon

 				let up = lvlup(id);
 				if(up == true){
 					text += `🔹 >> ${mon} опыта [Уровень повышен]\n`
 				}else{
 					text += `🔹 >> ${mon} опыта\n`
 				}
 				 
 				 
 			}
 		}
 		return message.send(text)
 	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	cmd.on(/^(?:казино)\s?([^\s	].*)?/i, "казино", 0, (message) => { 
		if(!args[1]) return message.send(`🔸 » укажите ставку`);
		let amount = Number(parserInt(args[1]));  
		let id = user_id(message.user)
		let user = acc.users[user_id(message.user)];
 		let text = '';
		if(!Number(amount)) return message.send(`🔸 » Ставка должна быть числом!`);
		if (amount > acc.users[id].balance || amount < 1 ) return message.send(`🎉 »  Ставка не может превышать баланс или быть ниже 1$`);
		if (amount > 10000000 && amount != acc.users[id].balance) return message.send(`🎉 »  Ставка не должна быть больше 10.000.000$`);
		
		if(acc.users[id].balance > 1000000000){
			if(rand(1,100) <= 45){
				  
				user.game.kazwin += 1;
				user.balance -= Math.round(amount);
				let sum = amount * 2; 
				if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
				if(config.bonus_exs == true) user.exs += 2;
				let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
				user.balance += Math.round(sum);
			
				if(amount >= 10000){
					 
					user.exs += 2;
					let up = lvlup(id);
					if(up == true){
						return message.send(`${text}🍀 » Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 » [Уровень повышен]`);
					}else{
						return message.send(`${text}🍀 » Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
					}
				 }else{
					return message.send(`${text}🍀 » Вы выиграли ${spaces(sum)}$\n🍀 » Опыт дается при ставке от 10.000$`);
				}
				 
			}else{
				user.game.kazlose += 1;
				user.balance -= Math.round(amount);
				return message.send(`🌚 » Вы проиграли ${amount}$!`);
			}
		}else{	
			if(rand(1,100) <= 57){
				 
				user.game.kazwin += 1;
				user.balance -= Math.round(amount);
				let sum = amount * 2; 
				if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
				if(config.bonus_exs == true) user.exs += 2;
				let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
				user.balance += Math.round(sum);
			
				if(amount >= 10000){
					 
					user.exs += 2;
					let up = lvlup(id);
					if(up == true){
						return message.send(`${text}🍀 » Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 » [Уровень повышен]`);
					}else{
						return message.send(`${text}🍀 » Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
					}
				 }else{
					return message.send(`${text}🍀 » Вы выиграли ${spaces(sum)}$\n🍀 » Опыт дается при ставке от 10.000$`);
				}
				 
			}else{
				user.game.kazlose += 1;
				user.balance -= Math.round(amount);
				return message.send(`🌚 » Вы проиграли ${amount}$!`);
			}
		}
	});  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	cmd.on(/^(?:акция)?\s([^\s].*)?\s(.*)/i, 'акция', 0, message => {
		if(!args[1] || !args[2]) return message.send(`🔸 » Пример команды: акция [вверх/вниз] [ставка]`)
		let amount = parserInt(args[2]);    
		amount = Math.round(amount);
		let id = user_id(message.user) 
		if (amount > acc.users[id].balance || amount < 1) return message.send(`🎉 »  Ставка не может превышать баланс или быть ниже 1$`);
		if (amount > 10000000) return message.send(`🎉 »  Ставка не должна быть больше 10.000.000$`);
		if(!Number(amount)) return message.send(`🔸 » Ставка должна быть числом!`);
		let user = acc.users[user_id(message.user)]; 
		 
		 	if(args[1] == 'вверх'){
				if(rand(1,2) == 1){
					let i = games(type='вверх');
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
					if(config.bonus_exs == true) user.exs += 2;
					let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
					user.balance += sum;
					user.game.binwin += 1; 
					if(amount < 10000){
						user.exs += 2;
						let up = lvlup(user_id(message.user));
						if(up == true){
							return message.reply(`${text}📈 » Курс акций вырос на - ${rand(1,100)}%\n🍀 » Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 » [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}📈 » Курс акций вырос на - ${rand(1,100)}%\n🍀 » Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
			 			}
 					}else{
 						return message.reply(`${text}📈 » Курс акций вырос на - ${rand(1,100)}%\n🍀 » Вы выиграли ${spaces(sum)}$\n🍀 » Опыт дается при ставке от 10.000$`);
 					}

				}else{
					let i = games(type='вниз');
					user.game.binlose += 1;
					user.balance -= amount;
					return message.reply(`📈 » Курс акций упал на - ${rand(1,100)}%\n🌚 » Вы проиграли ${spaces(amount)}$!`);
				}
			}
			if(args[1] == 'вниз'){ 
				if(rand(1,2) == 1){
				let i = games(type='вниз');
					user.balance -= amount;
					let sum = amount * 2;
					let text = ''
					if(config.bonus_balance == true){text += '[x2 bonus]\n'; sum = sum * 2;}  
					if(config.bonus_exs == true) user.exs += 2;
					let a = config.bonus_exs.toString().replace(/false/gi, "2").replace(/true/gi, "4")
					user.balance += sum; 
					user.game.binwin += 1;
					if(amount < 10000){
						user.exs += 2;
						let up = lvlup(user_id(message.user));
						if(up == true){
							return message.reply(`${text}📈 » Курс акций упал на - ${rand(1,100)}%\n🍀 » Вы выиграли ${spaces(sum)}$ и ${a} опыта! \n🌟 » [Уровень повышен]`);
			 			}else{
							return message.reply(`${text}📈 » Курс акций упал на - ${rand(1,100)}%\n🍀 » Вы выиграли ${spaces(sum)}$ и ${a} опыта!`);
			 			}
					}else{
						return message.reply(`${text}📈 » Курс акций упал на - ${rand(1,100)}%\n🍀 » Вы выиграли ${spaces(sum)}$ и ${a} опыта!\n🍀 » Опыт дается при ставке от 10.000$`);	
					}
					 
					 
				}else{
				let i = games(type='вверх');
					user.game.binlose += 1;
					user.balance -= amount;
					return message.reply(`📈 » Курс акций вырос на - ${rand(1,100)}%\n🌚 » Вы проиграли ${spaces(amount)}$!`);
				}
			} 
	});
		 
	cmd.on(/^(?:ставка)\s?([^]+)?\s([^\s	].*)/i, 'ставка', 0, message => {
		if(!args[1]) return message.send(`🔸 » Пример команды: ставка [выше/ниже] [ставка]`)
		let amount = parserInt(args[2]);      
		amount = Math.round(amount);
		let id = user_id(message.user) 
		if(!Number(amount)) return message.send(`🔸 » Ставка должна быть числом!`);
		let user = acc.users[user_id(message.user)]; 
		if (amount > acc.users[id].balance || amount < 1) return message.send(`🔸 »  Ставка не может превышать баланс или быть ниже 1$`);  
		if (amount > 10000000) return message.send(`🎉 »  Ставка не должна быть больше 10.000.000$`);

		 	if(args[1].toLowerCase() == 'выше'){
				if(rand(1,2) == 1){
					let i = games(type='выше');

					user.balance -= amount;
					user.balance += amount * 2;
					user.game.stavka_win += 1; 
					if(amount < 10000){
						user.exs += 2;
						let up = lvlup(user_id(message.user)); 
						if(up == true){
							return message.reply(`🔸 » Число - ${rand(500000,999999)}. Вы угадали\n🔸 » Вы выиграли ${spaces(amount * 2)}$ и 2 опыта! \n🌟 » [Уровень повышен]`);
			 			}else{
							return message.reply(`🔸 » Число - ${rand(500000,999999)}. Вы угадали\n🔸 » Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!`);
			 			}
					}else{
						return message.reply(`🔸 » Число - ${rand(500000,999999)}. Вы угадали\n🔸 » Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!\n🍀 » Опыт дается при ставке от 10.000$`);
					} 
				}else{
					let i = games(type='вниз');
					user.game.stavka_lose += 1;
					user.balance -= amount;
					return message.reply(`🔸 » Число -${rand(1,499999)}\n🔸 » Вы проиграли ${spaces(amount)}$!`);
				}
			}
			if(args[1].toLowerCase() == 'ниже'){ 
				if(rand(1,2) == 1){
				let i = games(type='ниже');
					user.balance -= amount;
					user.balance += amount * 2;
					user.game.stavka_win += 1; 
					if(amount < 10000){
						user.exs += 2;
						let up = lvlup(user_id(message.user)); 
						if(up == true){
							return message.reply(`🔸 » Число - ${rand(1,499999)}. Вы угадали\n🔸 » Вы выиграли ${spaces(amount * 2)}$ и 2 опыта! \n🌟 » [Уровень повышен]`);
			 			}else{
							return message.reply(`🔸 » Число - ${rand(1,499999)}. Вы угадали\n🔸 » Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!`);
			 			}
					}else{
						return message.reply(`🔸 » Число - ${rand(1,499999)}. Вы угадали\n🔸 » Вы выиграли ${spaces(amount * 2)}$ и 2 опыта!\n🍀 » Опыт дается при ставке от 10.000$`);
					}  
				}else{
					let i = games(type='вверх');
					user.game.stavka_lose += 1;
					user.balance -= amount;
					return message.reply(`🔸 » Число - ${rand(500000,999999)}\n🔸 » Вы проиграли ${spaces(amount)}$!`);
				}
			} 
	});
 
 	cmd.on(/^(?:рандом)\s?([0-9]+)?\s([^\s	].*)/i, 'рандом', 0, message => {
		let user = acc.users[user_id(message.user)];
 		if(!args[1] || !args[2] || !Number(args[1]) || args[1] > 60 ) return message.send(`�🎲 » Пример ввода: 'Рандом [1-60] [СТАВКА]\n🎲 » [1-60] - это шанс(от него зависит сумма выплаты).'`);
		user.bloks.random_game = true
		setTimeout(() => {
			user.bloks.random_game = false
		}, 300000);
		let i = parserInt(args[2]); 
		let p = Number(args[1])   
		amount = Math.round(amount);
		if(!Number(args[i])) return message.send(`🎲 » Пример ввода: 'Рандом [1-60] [СТАВКА]\n🎲 » [1-60] - это шанс(от него зависит сумма выплаты).'`);
		if (i > 10000000) return message.send(`🎉 »  Ставка не должна быть больше 10.000.000$`);
		if (i > user.balance || i <= 0) return message.send(`🔸 »  Ставка не может превышать баланс или быть отрицательной`);  
		if(p >= 40){
			if(rand(1,130) <= p){
				i = i / 100 * 30 + i
				let z = games(type=`при шансе (${p}%) выигрыш: ${i}$`);

				user.exs += 2;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user));
				user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 » Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 » И получили +2 опыта\n🌟 » [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 » Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 » И получили +2 опыта`);
	 			}  
			}else{
				user.game.rand_lose += 1;
				user.balance -= Number(i);
				let z = games(type=`при шансе (${p}%) вы проиграли: ${i}$`);
				return message.send(`🎲 » Вы проиграли [${Math.round(i)}]$`);
			} 
		} 
		if(p >= 20 && p < 40){
			if(rand(1,100) <= p){
				i = i / 100 * 20 + i

				user.exs += 2;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user));
				let z = games(type=`при шансе (${p}%) выигрыш: ${i}$`);

				user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 » Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 » И получили +2 опыта\n🌟 » [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 » Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 » И получили +2 опыта`);
	 			}  
			}else{
				user.balance -= Number(i);
				let z = games(type=`при шансе (${p}%) вы проиграли: ${i}$`);
				user.game.rand_lose += 1;
				return message.send(`🎲 » Вы проиграли [${Math.round(i)}]$`);
			} 
		} 

		if(p >= 1 && p < 20){
			if(rand(1,100) <= p){
				i = i / 100 * 70 + i

				user.exs += 2;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user));
				let z = games(type=`при шансе (${p}%) выигрыш: ${i}$`);

				user.balance += Math.round(i);
				if(up == true){
					return message.reply(`🎲 » Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 » И полочили +2 опыта\n🌟 » [Уровень повышен]`);
		 		}else{
					return message.reply(`🎲 » Вы выиграли [${Math.round(i)}]$ при шансе: ${p}%\n🎲 » И полочили +2 опыта`);
	 			}  
			}else{
				user.balance -= Number(i);
				let z = games(type=`при шансе (${p}%) вы проиграли: ${i}$`);
				user.game.rand_lose += 1;
				return message.send(`🎲 » Вы проиграли [${i}]$`);
			} 
		} 

		user.balance -= Number(args[2]);
		let z = games(type=`при шансе (${p}%) вы проиграли: ${args[2]}$`);
		user.game.rand_lose += 1;
		return message.send(`  🎲 » Вы проиграли [${args[1]}]$`);
});

 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	cmd.on(/^eval\s([^]+)/i, "eval", 0, (message) => {  
		if (message.user === 428576758) {
			return message.send(`Готово: ${eval(args[1])}`);
		}
	});
 
	cmd.on(/^(?:log)\s?([0-9]+)?\s?([0-9]+)?/i, "log", 0, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 3) return;

		if(!args[2]) return message.send(`- - log [id] [number] - -\n1. Передачи [передать]\n2. Выдачи [give]`) 
		let id = args[1];
		let i = args[2];
		if(i < 0 || i > 5) return message.send(`Error`);
		let text = '';
		if(i == 1) for(i=0; i!=log.point[id].log.length; i++){text += log.point[id].log[i];}
		if(i == 2) for(i=0; i!=log.give[id].log.length; i++){text += log.give[id].log[i];} 
		return message.send(text);
	});


 // - -- - - - - - - -- - - - -  EURO - - - - - 
 	cmd.on(/^(?:донат)/i, 'донат', 0, message => {
		let user = acc.users[user_id(message.user)];
 		return message.send(`	
 			💎 » У вас ${user.donate} EURO << 💎
			⚫ДОНАТ⚫

☑ ~ Статус VIP - 100 рублей.
☑ ~ Статус Moderator - 150 рублей.
☑ ~ Статус ADMİN - 300 рублей.
☑ ~ Статус Гл.Администратор - 400 рублей.
☑ ~ Статус Президент - 500 рублей.

☑ ~ Снять WARN - 30 рублей.
☑ ~ Разбанить аккаунт ~ 50 рублей.

☑ ~ Покупка EURO ~ 2 EURO за 1 рубль.
☑ ~ Покупка Валюты - 10.000.000 за 5 рублей.

❗Покупка доната производиться у https://vk.com/brodyaga_196 
 			`)
 	});
 
 
	cmd.on(/^курс/i, "курс", 0, (message) => {  
		return message.send(`
				📊 » Актуальный курс обмена EURO << 📊
				- - - - - - - -  
				🔸 » Продажа: ${acc.curs}$
				- - - - - - - - 
				📶 » 'Трейд [COUNT]'


				💰 » Актуальный курс обмена Биткоинов << 💰
				- - - - - - - -  
				🔸 » Продажа: ${acc.bit}$
				- - - - - - - - 
				📶 » 'Биткоин продать [COUNT]'
			`);
	});

	cmd.on(/^(?:трейд)\s?([0-9]+)?/i, "трейд", 0, (message) => {
		let user = acc.users[user_id(message.user)];
		if(!args[1]) return message.send(`📝 » Введите количество EURO для обмена`);
		if(user.donate < args[1]) return message.send(`📝 » У вас нет столько EURO`);
		user.donate -= Number(args[1]);
		user.balance += Number(args[1] * acc.curs)
		return message.send(`📝 » Вы обменяли [${args[1]}] EURO на [${args[1] * acc.curs}]$`);
	});

//////////////////////////////////////////////////////// промики
 	
 cmd.on(/^(?:промокод)\s?([^]+)?/i, 'промокод', 0, message => {
	let user = acc.users[user_id(message.user)];
 	if(!args[1]) return message.send(`📝 » Укажите промокод`);
 	if(!acc.promos[args[1]]) return message.send(`📝 » Такого промокода нету/либо закончились активации`);
 	if(acc.promos[args[1]].users[message.user]) return message.send(` 📝 » Вы уже активировали промокод`);
 	acc.promos[args[1]].users[message.user] = {i: true};
 	acc.promos[args[1]].activ -= 1;
 	if(acc.promos[args[1]].type == 1){
 		user.balance += acc.promos[args[1]].balance; 
 		message.send(`✅ » Вы активировали промокод!\n✅ » Вы получили: ${acc.promos[args[1]].balance}$!\n 📛 » Осталось активаций: ${acc.promos[args[1]].activ}`);
 	}
 	if(acc.promos.type == 2){
 		user.donate += acc.promos[args[1]].balance; 
 		message.send(`✅ » Вы активировали промокод!\n✅ » Вы получили: ${acc.promos[args[1]].balance} EURO!\n 📛 » Осталось активаций: ${acc.promos[args[1]].activ}`);
 	}

 	if(acc.promos[args[1]].activ == 0) delete acc.promos[args[1]];
 	return 
 });

 
 

 
 //////////// full dostup - - - - - - 

	cmd.on(/^(?:setwin)\s?([0-9]+)?\s?([0-9]+)?/i, "setwin", 0, (message) => {
		let id = user_id(message.user);	 	
		if(!args[1] || !args[2]) return message.send(`🔸 >> Пример команды: setwin ID COUNT(% выигрыша)`);
		if(!Number(args[1]) || !Number(args[2])) return message.send(`🔸 >> Число должно быть цифрового вида.`);
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return message.send(`🔸 >> ❗ ERROR ❗`);
		if(!acc.users[args[1]]) return message.send(`❎ » Такого игрока нет!`);
		acc.users[args[1]].game.win = Number(args[2]); 
		return message.send(`🔸 >> Вы установили игроку(${acc.users[args[1]].prefix}) процент побед: ${args[2]}%`);
	});

	cmd.on(/^(?:giveadm)\s?([0-9]+)?\s?([0-9]+)?/i, "giveadm", 0, (message) => {
		let id = user_id(message.user);	 	
			let user = acc.users[user_id(message.user)]; 
			if(user.level < 5) return message.send(`❗ ERROR ❗`);
			if(!args[1] || !args[2]) return message.send(`🔸 >> Пример команды: giveadm ID LVL(1-5)`); 
			if(args[2] > 5) return message.send(`🔸 >> Максимальный админ-уровень 5!`)
			if(!acc.users[args[1]]) return message.send(`❎ » Такого игрока нет!`); 
			acc.users[args[1]].level = Number(args[2]); 
			group.api.call('messages.send', {
				peer_id: acc.users[args[1]].id,
				message: `✅ » ${user.prefix} выдал Вам должность: ${args[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "CREATOR")}.`
			}); 
			return message.send(`🔸 >> Вы выдали игроку[${acc.users[args[1]].prefix}]\n🔸 >> Админ-уровень: ${args[2]} [${args[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "CREATOR")}]`);
	});



///////////////////

////////////////////
 

	cmd.on(/^(?:promo)\s([^]+)\s([0-9]+)/i, "promo", 0, (message) => {
		let id = user_id(message.user);		
		let user = acc.users[user_id(message.user)]; 
		if(user.level < 5) return message.send(`🔸 » Вы не CREATOR`); 

		if(args[1] == 'balance'){
			config.promo.balance = Number(args[2]); return message.send(`✅ » Сумма для промокодов состовляет: ${args[2]}$`);
		}  
		if(args[1] == 'activ'){ 
			config.promo.activ = Number(args[2]); return message.send(`✅ » Количество активаций для промокодов состовляет: ${args[2]}`);
		}   
	}); 



 cmd.on(/^(?:питомцы)\s?([0-9]+)?/i, 'питомцы', 0, message => {
 	if(!args[1]){  
 		return message.send(`
 🎪Питомцы:
1. Собака🐕
2. Кошка🐈
3. Лиса🦊 
4. Корова🐄  
5. Змея🐍  
6. Панда🐼  
7. Лошадь🐎 
8. Заяц🐰 
9. Ягуар🐆
10. Тигр🐅  
11. Лев🦁 
			💵 » Цена питомца: 5.000.000$

			Для покупки введите "Питомцы [номер]"
			Для продажи введите "Питомец продать"
			[Деньги не возвращаются]
 			`);
 	}
 	let i = args[1];
 	let user = acc.users[user_id(message.user)];  
 	let names = [0,'Собака','Кошка','Лиса','Корова','Змея','Панда','Лошадь','Заяц','Ягуар','Тигр','Лев']
 	if(i < 0 || i > 11) return;
 	if(user.pit != false) return message.send(`🐼 » У вас уже куплен питомец`);
 	if(i > 0 && i <= 11){
 		if(user.balance < 5000000) return message.send(`🐼 » У вас не достаточно $.`);
 		user.balance -= 5000000;
 		user.pit = names[i];
 		return message.send(`🐼 » Вы купили питомца (${names[i]}) за 5.000.000$`)
 	}
 	 
 });
 ///////////////////////////////////////////////////////
 	cmd.on(/^(?:дом)$/i, 'дом', 0, message => {
		let user = acc.users[user_id(message.user)];
		return message.send(` 


			✒ » Имущество:\n` +
			(user.aircraft.id == false ? `✈ » Самолет:  отсутствует\n` : `✈ » Самолет:  ${user.aircraft.name}\n`)+
			(user.helicopter.id == false ? `🚁 » Вертолет: отсутствует\n` : `🚁 » Вертолет: ${user.helicopter.name}\n`)+
			(user.cars.id == false ? `🚘 » Автомобиль: отсутствует\n` : `🚘 » Автомобиль: ${user.cars.name}\n`)+  
			(user.lodka == false ? `🚤 » Яхта: отсутствует\n` : `🚤 » Яхта: ${user.lodka}\n`)+ 
			(user.pit == false ? `\n🐼 » Питомец: нету\n` : `\n🐼 » Питомец: ${user.pit}\n`)+ 
			` 
 
			`);
	});
 

 cmd.on(/^(?:дома)\s?([0-9]+)?/i, 'дом', 0, message => {
 	if(!args[1]){  
 		return message.send(`
 			🏘Дома:
1. Дом за городом [5.000.000$]
2. Дом в Турции [15.000.000$]
3. Дом в Испании [23.000.000$]
4. Дом на мальдивах [150.000.000$]
5. Коттедж на мальдивах [300.000.000$]
⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫
6. Личный Небоскрёб [300 EURO]
⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫

			Для покупки введите "Дома [номер]"
			Для продажи введите "Продать дом"
			[Деньги не возвращаются]
 			`);
 	}
 	let i = args[1];
 	let user = acc.users[user_id(message.user)]; 
 	let count = [0, 5000000,15000000,23000000,150000000,300000000,300,600];
 		let names = [0, 'Дом за городом','Дом в Турции','Дом в Испании','Дом на мальдивах',' Коттедж на мальдивах','Личный небоскрёб','Белый дом']
 	if(i < 0 || i > 7) return;
 	if(user.house != false) return message.send(`🏢 » У вас уже куплен дом`);
 	if(i > 0 && i <= 5){
 		if(user.balance < count[i]) return message.send(`🏢 » У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.house = names[i];
 		return message.send(`🏢 » Вы купили дом (${names[i]}) за ${count[i]}$`)
 	}
 	if(i > 5 && i < 7){
 		if(user.donate < count[i]) return message.send(`🏢 » У вас не достаточно EURO.`);
 		user.donate -= count[i];
 		user.house = names[i];
 		return message.send(`🏢 » Вы купили дом (${names[i]}) за ${count[i]} EURO`)
 	}
 });

  cmd.on(/^(?:продать дом)/i, 'продать дом', 0, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.house == false) return message.send(`У вас нет дома`);
 	user.house = false;
 	return message.send(`🏢 » Вы успешно продали дом государству.`);
 });

  cmd.on(/^(?:питомец продать)/i, 'продать дом', 0, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.pit == false) return message.send(`У вас нет питомца`);
 	user.pit = false;
 	return message.send(`🏢 » Вы успешно продали питомца.`);
 });




 cmd.on(/^(?:Яхта)\s?([0-9]+)?/i, 'Яхта', 0, message => {
 	if(!args[1]){
 		return message.send(`
 			🛳Яхты:
		1. History Supreme [70.000.000$]
		2. Azzam [90.000.000$]
		3. Streets of Monaco [150.000.000$]

			Для покупки введите "Яхта [номер]"
			Для продажи введите "Яхта продать"
			[Деньги не возвращаются]
 			`);
 	}
 	let i = args[1];
 	let user = acc.users[user_id(message.user)];
 	let count = [0, 70000000,90000000, 150000000];
 	let names = [0, ' History Supreme ','Azzam','Streets of Monaco']
 	if(i < 0 || i > 3) return;
 	if(user.lodka != false) return message.send(`🛥 » У вас уже куплена Яхта`);
 	if(i > 0 && i <= 3){
 		if(user.balance < count[i]) return message.send(`🛥 » У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.lodka = names[i];
 		return message.send(`🛥 » Вы купили лодку (${names[i]}) за ${count[i]}$`)
	}
 });

  cmd.on(/^(?:продать яхту)/i, 'Яхта продать', 0, message => {
 	let user = acc.users[user_id(message.user)]; 
 	if(user.lodka == false) return message.send(`🛥 » У вас нет яхты`);
 	user.lodka = false;
 	return message.send(`🛥 » Вы успешно продали Яхту государству.`);
 });


//\\\\\\\\\\\ РАБОТЫ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



 cmd.on(/^(?:работы)\s?([0-9]+)?/i, 'работы', 0, message => {
 	if(!args[1]){
 		return message.send(`
 			👨‍⚖️ работы 👨‍⚖️  
			
			⬛ 1. Шахтер  | 1к/ч | [0]
			⬛ 2. Электрик | 5к/ч | [10]
			⬛ 3. Торговец | 10к/ч | [20]
			⬛ 4. Дальнобойщик | 15к/ч | [30]
			⬛ 5. Бизнесмен | 20к/ч | [40]
			⬛ 6. Нефтянник | 25к/ч | [50]
			⬛ 7. Депутат | 35к/ч | [65]
			⬛ 8. Министр Финансов |  45к/ч | [70]
			⬛ 8. Мер |  60к/ч | [80]
			⬛ 9. Президент | 80к/ч | [100]


			В [] требуемый уровень стажа. 
			Для получения зарплаты и +1 стажа ежечасно прописывайте: 'Работать'

			Чтобы устроиться введите: "работы [номер]"
			Для увольния введите: "уволиться"
			Трудовая книжка: 'Книжка'
			Для работы введите: 'Работать'
 			`);
 	}
 	let i = args[1];
 	let user = acc.users[user_id(message.user)];  
	if(user.lvl < 2) return message.send(`👨‍ » Устроиться на работу можно имея 2 уровень\n💳 » Ваш уровень [${user.lvl}]`);
 	let names = [0, 'Шахтер','Электрик','Торговец','Дальнобойщик','Бизнесмен','Бизнесмен','Нефтянник','Депутат','Министр Финансов','Мер','Президент']
 	let staj = [0,0,10,20,30,40,50,65,70,80,100]
 	let counts = [0,1000,5000,10000,15000,20000,25000,35000,45000,60000,80000]
 	if(i <= 0 || i > 7) return;
 	if(user.job.name != false) return message.send(`👨‍ » У вас уже есть работа`);
 	if(i > 0 && i <= 7){
 		if(user.job.lvl < staj[i]) return message.send(`👨‍ » У вас не достаточный стаж.`); 
 		if(staj[i] > user.job.lvl) return message.send(`👨‍ » У вас не достаточный стаж.`); 
 		user.job.name = names[i];
 		user.job.count = Number(counts[i]); 
 		return message.send(`👨‍⚖️ » Вы устроились на работу `)
 	} 
 });

  cmd.on(/^(?:уволиться)/i, 'уволиться', 0, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.job.name == false) return message.send(`👨‍⚖️ » У вас нет работы.`);
 	user.job.name = false;
 	user.job.count = 0; 
 	return message.send(`👨‍⚖️ » Вы успешно уволились.`);
 });

  cmd.on(/^(?:книжка)/i, 'книжка', 0, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.job.name == false){ text = 'отсутствует' }else{
 		text = user.job.name
 	} 
 	return message.send(`
 		📝 Трудовая книжка 📝
 		📋 Стаж работы: ${user.job.lvl} 
 		📋 Работа: ${text}
 		📋 Зарплата: ${user.job.count}$/час
 		`);
 });

  cmd.on(/^(?:работать)/i, 'работать', 0, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.job.name == false) return message.send(`👨‍⚖️ » У вас нет работы.`);
 	if(user.job.stop != false) return message.send(`👨‍⚖️ >> Работать можно раз в час.`);
 	var counts = user.job.count
 	user.balance += Number(user.job.count); 
 	user.job.lvl += 1;

 	user.job.stop = true;
	setTimeout(() => {
			user.job.stop = false;
	}, 3600000);


 	return message.send(`
 		📝 » Вы отработали час. +1 к стажу. +${counts}$ 
 		`);
 });
 
    


 
	cmd.on(/^(?:wiki|вики)\s([^]+)/i, 'wiki', 0, message => {
 
	let cc = args[1].toLowerCase();
	 	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(cc)
		var lol1 = filter1.test(cc)
		if(filter0.test(cc) == true || filter1.test(cc) == true){
			var check = true;
			return message.send(`🆘 » Отказ! | Подозрительная ссылка. |⛔`);

		}else{
    rq.get("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent(args[1])+"&meta=siteinfo&rvprop=content&format=json", function(e,r,b){
        var data = JSON.parse(b);
        message.reply("🔮 Ответ на ваш запрос. \n\n✏ Ссылка: " + data[3][0]);
    });
	}
	})

	cmd.on(/^(?:анекдот)/i, 'ан', 0, message => {

	return prequest('http://www.anekdot.ru/rss/randomu.html')
	    .then(response => {
	      let match = response.match(/\['([^']+)/);
	          match = match && match[1].replace(/<br>/, '\n');
	          message.reply("Анекдот  &#127770; \n " + match);

	      return {
	        message:      match
	      }
	    });
	});

	cmd.on(/^(?:cc)\s?([^]+)?/i, 'все', 0, message => {

		   let cc = args[1].toLowerCase();
	 
	       let text = args[1];
	       if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	     	vk.api.call("utils.getShortLink", {url: text}).then(function (res){
	        if(!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
	        message.send("😜 » Короткая ссылка: " + res.short_url);
	     });
	  
	   });



///////////////////////////////////////////////////////////////////////////////

	cmd.on(/^(?:банк)$/i, 'банк', 0, message => {
		let user = acc.users[user_id(message.user)];
		return message.send(`
			💵 » Счет в банке: ${user.bank}$
			💵 » Биткоинов: ${user.bitcoin}
			💵 » Оплата за дом: ${user.phouse}$/час


			💳 » Банк может предоставить Вам кредит 
			💳 » Взять кредит под 15%: 'Кредит [СУММА]' 
			💳 » Погасить кредит: 'Погасить [СУММА]'

			⚠ » Важно! Пока ваш долг больше 0 
			⚠ » Ежечасно с вашего счета будет списываться 15% от суммы кредита
			`);
	});

	cmd.on(/^(?:кредит)\s?([0-9]+)?/i, 'кредит', 0, message => {
		let user = acc.users[user_id(message.user)];
		if(user.lvl < 3) return message.send(`💳 » Брать кредит можно имея 3 уровень\n💳 » Ваш уровень [${user.lvl}]`);
		if(user.credit != 0) return message.send(`💳 » Чтобы взять кредит, нужно погасить старый: [${spaces(user.credit)}$]`);
		if(!args[1] || args[1] <= 0 ) return message.send(` 💳 » Вы не указали сумму`);
		if(args[1] < 100000 || args[1] > 10000000) return message.send(`💳 » Минимальная сумма кредита 100.000$\n💳 » Максимальная сумма кредита 10.000.000$`);
 		user.balance += Number(args[1]);
 		let dolg = Number(args[1]) / 100 * 15;
 		dolg += Number(args[1]);
		user.credit = Number(dolg);
		user.procent = Number(args[1] / 100 * 15);
		return message.send(`
			💳 » Вы взяли кредит на сумму: ${spaces(args[1])}$
			💳 » К погашению: ${spaces(dolg)}$
			💳 » Ежечасно будет списываться: ${spaces(args[1] / 100 * 15)}$
		`);
	});
	
 	cmd.on(/^(?:погасить)\s?([0-9]+)?/i, 'погасить', 0, message => {
		let user = acc.users[user_id(message.user)];
		if(user.credit == 0) return message.send(`💳 » у вас нет кредита`);
		if(!args[1] || args[1] <= 0 ) return message.send(`💳 » Вы не указали сумму.`);
		if(user.credit > user.balance) return message.send(`💳 » У вас не достаточно денег.`);
		if(user.credit > args[1]) return message.send(`💳 » Оплатить кредит можно одним вкладом. [${spaces(user.credit)}$]`);
		if(user.credit < args[1]) return message.send(`💳 » Введите точную сумму к погашению. [${spaces(user.credit)}$]`);

		user.balance -= Number(args[1]);
		user.credit -= Number(args[1]);
		user.procent = 0;
		return message.send(`
			💳 » Вы успешно погасили весь кредит.
		`);
	});

	setInterval(() => {
		for(i in acc.users){
			if(acc.users[i].credit > 0){
				if(acc.users[i].balance > acc.users[i].procent){
					acc.users.balance -= acc.users[i].procent
				} 
			}
		}
	}, 3600000);




 cmd.on(/^(?:ферма)\s?([0-9]+)?/i, "ферма", 0, (message) => {  
 	let user = acc.users[user_id(message.user)];  
 
		if(!args[1]){
			return message.send(`
			👉 » Список майнинг-ферм:

			1&#8419;. Мини ферма | (300к) | [10/2ч]
			2&#8419;. Средняя ферма | (1кк) | [32/2ч]
			3&#8419;. Большая ферма | (1ккк) | [30.307/2ч] 
			 
			💸 » Для аренды фермы на час: Ферма [номер]   
			💸 » По истечению 2 часов биткоины будут зачислены на ваш счёт.
			`)
		}
	let i = args[1]; 
	let ids = [0,1,2,3]
 	let count = [0, 10, 32, 30307]; 
 	let cena = [0, 300000,1000000,1000000000]

 	if(i < 0 || i > 3) return;
 	if(user.ferm.id != false) return message.send(`💸 » У вас уже арендована ферма`);
 	if(i > 0 && i <= 3){
 		if(user.balance < cena[i]) return message.send(`💸 » У вас не достаточно денег.`);
 		user.ferm.id = Number(ids[i]); 

    setTimeout(() => {
    	user.bitcoin += Number(count[i])
    	user.ferm.id = false;
	    group.api.call('messages.send', {
			peer_id: user.id,
			message: `✅ » Аренда майнинг-фермы закончилась.\n✅ » Вы получили ${count[i]} Биткоинов.\n✅ » 'Биткоин продать [count]' - для продажи.` 
		});
	}, 7200000); 


 	return message.send(`💸 » Вы успешно арендавали на 2 часа майнинг-ферму.\n💸 » Через час вам будет зачислено [${count[i]}] Биткоинов`)
 	} 
 }); 

 cmd.on(/^(?:биткоин продать)\s?([0-9]+)?/i, "биткоин продать", 0, (message) => { 
 	if(!args[1] || !Number(args[1])) return message.send(`💸 » Укажите кол-во биткоинов`)
 	let user = acc.users[user_id(message.user)];  
 	if(user.bitcoin < Number(args[1])) return message.send(`💸 » У вас нет столько Биткоинов.`);
 	user.bitcoin -= Number(args[1]);
 	user.balance += Number(args[1] * acc.bit)
 	return message.send(`💸 » Вы продали ${args[1]} биткоинов за ${acc.bit * args[1]}$`)
 });
 
 cmd.on(/^(?:сейф)/i, "сейф", 0, (message) => { 
 		let user = acc.users[user_id(message.user)]; 
		 
		if (user.safe.status != false) return message.send(`🔑 » Взломать сейф можно раз в 10 минут.`);
		 
		if (user.safe.status == 3) return;
		user.safe.status = 3;
		user.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return message.send(` 
		  🏛 » Вы начали взлом сейфа 🏛
		  🔑 » Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝 » Начать взлом: "Взлом [код]"
		  🌚 » Удачи!
		 
  `);
	});
	cmd.on(/^(?:взлом)\s?([0-9]+)?$/i, 'взлом', 0, message => {
 		let user = acc.users[user_id(message.user)];

		if (user.safe.status == true) return message.send(`🔑 » Взломать сейф можно раз в 10 минут.`);
		if (user.safe.status == false) return;
		if (!args[1]) return message.send(`🗝 » Укажите код к сейфу.`);
		if (args[1] > 9999) return message.send(`🗝 » Код - состоит из 4 одинаковых символов.`);
		if (args[1] < 0) return message.send(`🗝 » Код - состоит из 4 одинаковых символов.`);
		let nu = user.safe.key;
		let kod = Number(args[1]);
		if (kod == user.safe.key) { 
			let summ = rand(20000,33000);
			user.balance += summ; 
			user.safe.key = false; 
			user.safe.status = true;
			setTimeout(() => {
				user.safe.status = false;
			}, 600000);
			return message.send(`🤑 » Невероятно!\n🙊 » Вы смогли угадать код\n🏛 » Обыскивая сейф вы нашли:\n💴 » ${spaces(summ)}$`);
		} else {
			user.safe.status = true;
			user.safe.key = true;
			setTimeout(() => {
				user.safe.status = false;
			}, 600000); 
			return message.send(`🤠 » Вы не угадали код.\n🤠 » Вас задержали и оштрафовали.\n🔑 » Верный код был: ${nu}`);
		}
	});

  
 cmd.on(/^(?:лотерея)/i, "лотерея", 0, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 5000) return message.send(`💣 » Лотерейный билетик стоит 5000$`);
	user.balance -= 5000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 500;
		return message.send(`💣 » Вам попалась неудачный билет.\n👒 » Вы выгирали 500$`);
	}else{ 
		let count = [3000,5000,10000,15000,20000].random();
		user.balance += count;
		return message.send(`🎉 » Удачный билетик!\n👒 » Вы получили ${count}$`);
	}
});
   
  ////////////////
  	cmd.on(/^(?:купить рейтинг)\s?([0-9]+)?/i, 'купить рейтинг', 0, message => {
 		let user = acc.users[user_id(message.user)];

		if(!args[1] || !Number(args[1])) return message.send(`👑 » Укажите количество рейтинга.`);
		if(user.balance < args[1] * 500000) return message.send(`👑 » 1 рейтинг стоит 500.000$\n👑 » Для покупки ${args[1]}👑 нужно ${args[1] * 500000}$`)
		user.balance -= Number(args[1] * 500000);
		user.global_exs += Number(args[1]);
		return message.send(`👑 » Вы успешно купили ${args[1]} рейтинга`);
	});

  	  cmd.on(/^(?:продать рейтинг)\s?([0-9]+)?/i, 'продать рейтинг', 0, message => {
 		let user = acc.users[user_id(message.user)];

		if(!args[1] || !Number(args[1])) return message.send(`👑 » Укажите количество рейтинга.`);
		if(user.global_exs < args[1]) return message.send(`👑 » У вас нет столько рейтинга.`)
		user.balance += Number(args[1] * 200000);
		user.global_exs -= Number(args[1]);
		return message.send(`👑 » Вы успешно продали ${args[1]} рейтинга за ${args[1] * 200000}$`);
	});



 //------------------------------------------------------------------------------------\\
 	setInterval(() => {
		acc.curs = rand(30000,80000) 
		acc.bit = rand(31000,32200)
	}, 600000);
 //------------------------------------------------------------------------------------\\
 	setInterval(() => {
		fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"));  
		fs.writeFileSync("./base/log.json", JSON.stringify(log, null, "\t"));  
		fs.writeFileSync("./base/game.json", JSON.stringify(game, null, "\t"));  
		fs.writeFileSync("./base/ids.json", JSON.stringify(uid, null, "\t"));   

		fs.writeFileSync("./setting/config.json", JSON.stringify(config, null, "\t")); 
	}, 5000);
 //------------------------------------------------------------------------------------\\
	setInterval(() => {
		for(i=1;i < 500000; i++){  
 		  	if(acc.users[i]){
				acc.users[i].antiflood = 0;
			}
		}
	}, config.antiflood_time);
 //------------------------------------------------------------------------------------\\
 	var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
 //------------------------------------------------------------------------------------\\
	setInterval(() => {
		uptime.sec++;
		if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
		if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
		if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
	}, 1000);

 
 
 

  	 /*setInterval(() =>{
 		for(i=1;i<6000;i++){
 			if(acc.users[i]){
 				if(!uid[acc.users[i].id]){
 					uid[acc.users[i].id] = {
	 					id: i
	 				}
 				}
	 			 
	 			console.log(i+`) id: ` + acc.users[i].id);
 			} 
 		}
 	}, 5000);   */
 

 
 //------------------------------------------------------------------------------------\\
 	/*setInterval(() =>{
 		str.setOptions({token: config.token_prof, call: "execute" });
		str.longpoll.start()
		str.api.call("status.set", {
			group_id: 167936449,
			text: `💀 Bot 💀|| ⏳ Uptime: ${uptime.days}:${uptime.hours}:${uptime.min}:${uptime.sec}`
			});  
 	}, 60000); */
 //------------------------------------------------------------------------------------\\ 		 

 }
 	 function time() {
			let date = new Date();
			let days = date.getDate();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let seconds = date.getSeconds();
			if (hours < 10) hours = "0" + hours;
			if (minutes < 10) minutes = "0" + minutes;
			if (seconds < 10) seconds = "0" + seconds;
			var times = hours + ':' + minutes + ':' + seconds
			return times;
	}
 //------------------------------------------------------------------------------------\\
	function data() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth() + 1; 
		if (month < 10) month = "0" + month;
		if (days < 10) days = "0" + days;
		var datas = days + ':' + month + ':2018' ;
		return datas;
	}
 //------------------------------------------------------------------------------------\\
	function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 
	var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
	function spaces(string) {
		if (typeof string !== "string") string = string.toString();
		return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
	};
	Array.prototype.random = function() {  
		return this[Math.floor(this.length * Math.random())];
	}
 //------------------------------------------------------------------------------------\\
 	function restart() {
 		  	for(i=1;i < 200000; i++){  
 		  		if(acc.users[i]){
				acc.users[i].bloks.cases = false
				acc.users[i].bloks.random_game = false
				acc.users[i].bloks.a_case = false
				acc.users[i].bloks.giverub = false
				acc.users[i].job.stop = false
				acc.users[i].bizs.one.stop = false
				acc.users[i].bizs.two.stop = false
				acc.users[i].safe.status = false;
 				acc.users[i].safe.key = false;
				}
			} 
	}

 
 
 //------------------------------------------------------------------------------------\\
 	function user_id(id) {
	 	let ids = 0
	 	if(uid[id]){
	 		ids = uid[id].id
	 	}    
		return ids; 
	}  
  //------------------------------------------------------------------------------------\\
 	function games(type) {
 		let number = rand(100000,999999)
 		game[number] = {text: `- Ключ для игры #${number} -\nВерный исход: ` + type}
 		return number;
 	}

 //------------------------------------------------------------------------------------\\
	// log
 	function logs(id, ids, num, type) {
	/*
	type == '1' //  [Передать/pay]  
	type == '2' //  [Выдать/give]  
	type == '3' //  [Забрать/remove] 
	type == '4' //  [Выдать] админку
	type == '5' //  [Победы/setwin]
	type == '6' //  [warns | причины]
	*/ 		
 	// - - - - - - - - - - - - - - - - -  
 		if(type == 1){ 
 			if(!log.point[ids]){ log.point[ids] = { log: [] }  } 
 			if(!log.point[id]){ log.point[id] = { log: [] }  } 
 			log.point[id].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.point[ids].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.point[id].log.length >= 15){ delete log.point[id].log.shift() } 
			if(log.point[ids].log.length >= 15){ delete log.point[id].log.shift() } 
 		}
 		if(type == 2){ 
 			if(!log.give[ids]){ log.give[ids] = { log: [] }  } 
 			if(!log.give[id]){ log.give[id] = { log: [] }  } 
 			log.give[id].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.give[ids].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.give[id].log.length >= 15){ delete log.give[id].log.shift() } 
			if(log.give[ids].log.length >= 15){ delete log.give[id].log.shift() }  
 		} 
 	}
	//
 //------------------------------------------------------------------------------------\\
 	function lvlup(id) {
 		let text = false;
 		if(acc.users[id].exs >= acc.users[id].exsup){
 			acc.users[id].exs -= acc.users[id].exsup;
 			acc.users[id].lvl += 1;
 			if(acc.users[id].game.win < 52){acc.users[id].game.win += 1;}
 			acc.users[id].exsup += new_lvl();
 			text = true;
 		}
 		return text;
 	} 
 //------------------------------------------------------------------------------------\\
	function new_lvl(iid) {
	 	let ids = 0
	 	let numbers = [10,20,30,40,50,60];
	 	let rand = numbers.random()
	 	return rand;
	}
 //------------------------------------------------------------------------------------\\
 	function zapret(text) {
 		let text1 = text.toLowerCase();
 		let texts = 0;
 		let stat = false;
		var zaprets = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zaprets.test(text1) == true) { 
				texts = `📗 » Некорректный запрос.` 
				stat = true;
		}
		var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
		if (filter1.test(text1) == true || filter2.test(text1) == true) { 
			texts = `📗 » Некорректный запрос.` 
			stat = true; 
		}
		return texts
 	} 
 
 

 	   setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
 				if(acc.users[i].autobiz != false){
	 				acc.users[i].autobiz -= 1;
	 				if(acc.users[i].autobiz == 0){acc.users[i].autobiz = false}

	 				if(acc.users[i].bizs.one_biz == true){
	 					acc.users[i].balance += Number(acc.users[i].bizs.one.zp)
	 				}
	 				if(acc.users[i].bizs.two_biz == true){
	 				 	acc.users[i].balance += Number(acc.users[i].bizs.two.zp)
	 				}
	 			}
	 			//
	 			if(acc.users[i].autozp != false){
	 				if(acc.users[i].job.name != false){
	 					acc.users[i].autozp -= 1;
	 					if(acc.users[i].autozp == 0){acc.users[i].autozp = false}
	 					acc.users[i].balance += Number(acc.users[i].job.count)	
	 				}
	 			}
 			}
 			 
 		}
 	}, 3600000); 

 	setInterval(() =>{
 		for(i=1;i<200000;i++){
 			if(acc.users[i]){
	 			if(acc.users[i].house != false){
	 				if(acc.users[i].bank < acc.users[i].phouse){
	 					acc.users[i].house = false;
	 					acc.users[i].phouse = 0;
	 				}else{
	 					acc.users[i].bank -= Number(acc.users[i].phouse);
	 				}
	 			}
	 		}
 		}
 	}, 3600000);   
 
