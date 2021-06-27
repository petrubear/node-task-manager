const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../playground/math');

test('Calculate Total with Tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
});

test('Calculate Total with default Tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});


test('Should convert 32F to 0C', () => {
    const celsius = fahrenheitToCelsius(32);
    expect(celsius).toBe(0);
});

test('Should convert 0C to 32F', () => {
    const fahrenheit = celsiusToFahrenheit(0);
    expect((fahrenheit)).toBe(32);
});

test.skip('async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(2);
        done();
    }, 2000);
});

test('promise based async demo', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});

test('async await based async demo', async () => {
    const sum = await add(2, 3);
    expect(sum).toBe(5);
});

