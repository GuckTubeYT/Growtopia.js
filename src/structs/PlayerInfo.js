const PlayerInventory = require('./PlayerInventory');
const Constants = require('./Constants');
const PacketCreator = require('../PacketCreator');
let p = new PacketCreator();

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
		else if (this.isGuest)
			return 3;
		else {
			this.permissions = Constants.Permissions[role];
			this.roles.push(role);

			let dialog = this.#main.Dialog.defaultColor()
				.addLabelWithIcon("WARNING", '', 'small')
				.addTextBox("`wPLEASE LEAVE AND ENTER. THANKS.")
				.addQuickExit();

			p.create()
					.string('OnDialogRequest')
					.string(dialog.str())
					.end();

			this.#main.Packet.sendPacket(this.temp.peerid, p.return().data, p.return().len);
		  p.reconstruct();
			dialog.reconstruct();

			this.#main.players.set(this.temp.peerid, this);
			return 4; // success
		}
	}

		resetRole() {
      if (!this.isGuest) {

			  this.permissions = 1;
				this.roles = ['user'];

				let dialog = this.#main.Dialog.defaultColor()
					.addLabelWithIcon("WARNING", '', 'small')
					.addTextBox("`wPLEASE LEAVE AND ENTER. THANKS.")
					.addQuickExit();

				p.create()
						.string('OnDialogRequest')
						.string(dialog.str())
						.end();

				this.#main.Packet.sendPacket(this.temp.peerid, p.return().data, p.return().len);
				p.reconstruct();
				dialog.reconstruct();

				this.#main.players.set(this.temp.peerid, this);
				return true;
			}
	}
};

module.exports = PlayerInfo;
