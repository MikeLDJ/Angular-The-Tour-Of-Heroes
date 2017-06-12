import { AngularTheTourOfHeroesPage } from './app.po';

describe('angular-the-tour-of-heroes App', () => {
  let page: AngularTheTourOfHeroesPage;

  beforeEach(() => {
    page = new AngularTheTourOfHeroesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
