const {calculateTip} = require('../playground/math');

test('Calculate Total with Tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
});

test('Calculate Total with defatul Tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});
