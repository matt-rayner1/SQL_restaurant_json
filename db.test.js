const sqlite3 = require('sqlite3').verbose();
const { TestWatcher } = require('@jest/core');
const load = require('./index.js');

const db = new sqlite3.Database('./restaurants.sqlite');

describe('SQLite3', () => {
    beforeAll(done => {
        db.exec('CREATE TABLE IF NOT EXISTS restaurants(...);', done)
    })
    test('restaurants are loaded into the database', (done) => {
        load( (db) => {
            db.all('SELECT * FROM restaurants LIMIT 3;', (err, row) => {
                expect(row.length).toBe(3);
                expect(row[0].mame).toBe('Bayroot');
                db.get('SELECT COUNT(id) AS total FROM restaurants;', (err, count) => {
                    expect(count.total).toBe(8)
                    done()
                })
            })
        })
    })
})