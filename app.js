const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://www.datacamp.com/courses/all');

    const courseData = await page.evaluate(() => {
        const courseCards = document.querySelectorAll('div.js-course-bookmarking.course-block ')
        return [...courseCards].map(card => {
            return {
                tech: card.querySelector('div[class*=\'course-block__technology--\']').className.split('technology--')[1],
                title: card.querySelector('h4.course-block__title').textContent,
                description: card.querySelector('p.course-block__description').textContent.trim(),
                time: card.querySelector('span.course-block__length.dc-u-mh-12.dc-u-fx-center').textContent.trim().match(/\d/g)[0],
                author: card.querySelector('p.course-block__author-name').textContent.trim(),
                author_occupation: card.querySelector('p.course-block__author-occupation').textContent.trim()
            }
        })
    })

    console.log(courseData)
    await browser.close();

})();