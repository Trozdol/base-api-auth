
// console.json(title, obj);
//
console.json = function (title, obj) {
    if (title) {
        title = title + ': ';
    } else {
        title = '';
    }
    return console.log('\n' + title + JSON.stringify(obj, null, 4) + '\n ');
};

// TEST `console.json(title, obj)`
//
// console.json(null, { name: 'log.js', message: 'test' });
// console.json('with_title', { name: 'log.js', message: 'test' });
// console.json('objArray', [{ name: 'one', message: 'test' }, {name: 'two', message: 'test 2' }]);

module.exports.json = (obj) => {
    console.log('\n JSON: ' + obj.constructor.name + ': ' + JSON.stringify(obj, null, 4));
};
