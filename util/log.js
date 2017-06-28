
module.exports.json = (obj) => {
    console.log('\n JSON: ' + obj.constructor.name + ': ' + JSON.stringify(obj, null, 4));
};
