import { HomeSelectors } from 'src/app/pages/Home/Home.selectors';
import { AssetsSelectors } from 'src/app/pages/Home/OtherComponents/Assets.selectors';

import { SHORT_TIMEOUT } from 'e2e/src/utils/timing.utils';

import { Page } from '../../classes/page.class';
import { createPageElement, findElement } from '../../utils/search.utils';

export class HomePage extends Page {
  ReceiveButton = createPageElement(HomeSelectors.receiveButton);
  BuyButton = createPageElement(HomeSelectors.buyButton);
  SendButton = createPageElement(HomeSelectors.sendButton);
  WithdrawButton = createPageElement(HomeSelectors.withdrawButton);
  SwapButton = createPageElement(HomeSelectors.swapButton);
  AssetsTab = createPageElement(HomeSelectors.assetsTab);
  ActivityTab = createPageElement(HomeSelectors.activityTab);
  CollectiblesTab = createPageElement(HomeSelectors.collectiblesTab);
  PublicAddressButton = createPageElement(HomeSelectors.publicAddressButton);
  accountNameText = createPageElement(HomeSelectors.accountNameText);

  async isVisible() {
    await this.ReceiveButton.waitForDisplayed();
    await this.BuyButton.waitForDisplayed();
    await this.SendButton.waitForDisplayed();
    await this.WithdrawButton.waitForDisplayed();
    await this.SwapButton.waitForDisplayed();
    await this.AssetsTab.waitForDisplayed();
    await this.ActivityTab.waitForDisplayed();
    await this.CollectiblesTab.waitForDisplayed();
    await this.PublicAddressButton.waitForDisplayed();
    await this.accountNameText.waitForDisplayed();
  }

  async isTokenDisplayed(name: string) {
    await findElement(
      AssetsSelectors.assetItemButton,
      { name },
      SHORT_TIMEOUT,
      `${name} token not found in the token list on the Home page`
    );
  }
}
