const { expect, browser, $ } = require('@wdio/globals')

describe('My Login application', () => {

    it('should show projects after creation', async () => {
        await browser.url('http://localhost:3000/#/login')

        await $('input[name="email"]').setValue('admin@test.com')
        await $('input[name="password"]').setValue('password123')
        await $('button').click()

        await $('.card-title').waitForExist()

        await browser.url('http://localhost:3000/#/manage/projects')

        await $('#name').waitForExist()
        await $('#title').setValue('Project 2')
        await $('.btn-primary').click()

        await browser.url('http://localhost:3000/#/projects')

        const elements = await $$('.col-8 .list-group-item')
        expect(elements.length).toBe(2)
    });

    it('should show projects after login', async () => {
        await browser.url('http://localhost:3000/#/login')

        await $('input[name="email"]').setValue('admin@test.com')
        await $('input[name="password"]').setValue('password123')
        await $('button').click()

        await $('.card-title').waitForExist()

        const element = await $('.card-title')
        await expect(element).toHaveText('Projects')
    });

});
