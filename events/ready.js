module.exports = (client) => {
    console.log('Launched !');

    //Status du bot
    client.user.setStatus('available');
    client.user.setActivity('sucer Drop');
}