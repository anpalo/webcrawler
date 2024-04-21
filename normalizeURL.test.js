const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')


test('checks that a "https" url WITH a final "/" is acceptable', () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});


test('checks that a "https" url WITHOUT a final "/" is acceptable', () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
  });


test('checks that a "http" url WITH a final "/" is acceptable', () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
  });


test('checks that a "http" url WITHOUT a final "/" is acceptable', () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
  });

test('checks that a "WWW." url WITHOUT a final "/" is acceptable', () => {
    expect(normalizeURL("http://www.blog.boot.dev/path")).toBe("blog.boot.dev/path");
  });