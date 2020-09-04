# playwright-redirect-detection
Project to reproduce issue with playwright redirect detection

Issue is related to new tab being opened with initial url `/foo` that is resolved with redirection to `/bar` url.
Playwright resolves `context.waitForEvent('page')` too late, and we can't verify initial `/foo` url.

# info
1. There is index.html that has single button. On click it opens new tab to `/foo`. Server responds with redirection response, status 307, to `/bar` location.
2. In playwright tests, we click on button. Tab is opened with `/foo`. We are awaiting for `context.waitForEvent('page')` to be resolved, unforunately it is resolved AFTER the redirection to `/bar` happens
