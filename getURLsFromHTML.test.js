const { test, expect } = require('@jest/globals')
const { getURLsFromHTML } = require('./crawl.js')
test('checks that a URL is retrieved from an HTML body', () => {
    expect(getURLsFromHTML(`<html>
    <head><title>Sample Page</title></head>
    <body>
        <h1>Welcome to My Blog</h1>
        <p>Here are some links:</p>
        <ul>
            <li><a href="https://exampleblog.com/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="https://anotherexample.com/policy">Privacy Policy</a></li>
            <li><a href="/archive/2023">2023 Archive</a></li>
        </ul>
    </body>
    </html>
    `, "https://exampleblog.com")).toEqual([
        'https://exampleblog.com/about',
        'https://exampleblog.com/contact',
        'https://anotherexample.com/policy',
        'https://exampleblog.com/archive/2023'
      ] );
  });