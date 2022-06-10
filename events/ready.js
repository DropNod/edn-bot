module.exports = (client) => {
    console.log('Launched !');
    client.user.setStatus('available');
    client.user.setActivity('v1.02');
}