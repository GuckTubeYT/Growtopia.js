const PlayerInventory = require('./PlayerInventory');
const Constants = require('./Constants');

class PlayerInfo {
	#main;
	constructor(main) {
		this.#main = main;
		this.netID = 0;
		this.tankIDName = "";
		this.tankIDPass = "";
		this.requestedName = "";
		this.displayName = "";
		this.rawName = "";
		this.properName = "";
		this.country = "";
		this.email = "";
		this.currentWorld = "EXIT";
		this.x = 0;
		this.y = 0;
		this.x1 = 0;
		this.y1 = 0;
		this.ip = "";
		this.mac = "";
		this.inventory = new PlayerInventory();
		this.platformID = 0;
		this.player_age = "";
		this.game_version = "";
		this.isGuest = false;
		this.permissions = 0;
		this.roles = [];
		this.temp = {
			peerid: "",
			MovementCount: 0
		};

		this.clothes = {
			hair: 0,
			shirt: 0,
			pants: 0,
			feet: 0,
			hand: 0,
			back: 0,
			mask: 0,
			necklace: 0
		};

		this.skinColor = 0x8295C3FF;
		this.hasClothesUpdated = false;

		this.states = [];
		this.punchEffect = 0x808000;
	}

	addState(state) {
		if (!this.states.includes(state))
			this.states.push(state);

		this.#main.players.set(this.temp.peerid, this)
	}

	getState() {
		let state = 0;

		state |= this.states.includes('canWalkInBlocks') << 0;
		state |= this.states.includes('canDoubleJump') << 1;
		state |= this.states.includes('isInvis') << 2;

		return state;
	}

	removeState(state) {
		this.states = this.states.filter(s => s !== state);
		this.#main.players.set(this.temp.peerid, this);
	}

	addRole(role) {
		role = role.toLowerCase();

		if (!Constants.Permissions[role])
			return 1; // err no role exists
		else if (this.roles.includes(role))
			return 2; // user has role
		else {
			this.permissions |= Constants.Permission[role];
			//this.roles = this.roles.filter(r => r.toLowerCase() === role);
			this.roles.push(role);

			this.#main.players.set(this.temp.peerid, this);
			return 3; // success
		}
	}
};

module.exports = PlayerInfo;
