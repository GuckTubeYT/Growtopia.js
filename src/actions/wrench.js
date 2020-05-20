module.exports = function(main, packet, peerid, p) {
  let netID = packet.get('netid');
  netID = parseInt(netID);
  let player = [];

  for (let [i, p] of main.players) {
    if (p.netID === netID)
      player.push(p);
  }

  player = player[0];

  let playerRole = player.roles[player.roles.length - 1];
  playerRole[0] = playerRole[0].toUpperCase();

  let dialog = main.Dialog.defaultColor()
    .addLabelWithIcon(player.tankIDName ? player.tankIDName : player.requestedName, '', 'small')
    .addTextBox(`This user is a ${playerRole}.`)
    .addQuickExit();

  if (netID && !isNaN(netID)) {
    p.create()
      .string('OnDialogRequest')
      .string(dialog.str())
      .end();

    main.Packet.sendPacket(peerid, p.return().data, p.return().len);
    p.reconstruct();
    dialog.reconstruct();
  }
}
