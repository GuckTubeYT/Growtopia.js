module.exports = function(main, packet, peerid, p) {
  let netID = packet.get('netid');
  let player = main.players.get(peerid);
  let dialog = main.Dialog.defaultColor()
    .addLabelWithIcon(`\`wHello ${player.tankIDName}`, '', 'small')
    .addQuickExit();

  if (netID && !isNaN(netID)) {
    netID = parseInt(netID);
    if (player.netID === netID) {
      // wrenched yourself
      p.create()
        .string('OnDialogRequest')
        .string(dialog.str())
        .end();

      main.Packet.sendPacket(peerid, p.return().data, p.return().len);
      p.reconstruct();
      dialog.reconstruct();
    }
  }
}