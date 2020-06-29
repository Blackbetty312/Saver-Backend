'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
  constructor() {
    super();
    this.isNormalMode = this.getAttribute('mode') === 'normal';
  }

  connectedCallback() {
    this.render(this.isNormalMode);
  }

  render(isNormalMode) {
    let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-saver documentation</a>
                </li>

                <li class="divider"></li>
                ${isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : ''}
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${isNormalMode ?
      'data-target="#modules-links"' : 'data-target="#xs-modules-links"'}>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'}>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link">AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#controllers-links-module-AccountModule-577be563501778123dd6fe31419a3e75"' : 'data-target="#xs-controllers-links-module-AccountModule-577be563501778123dd6fe31419a3e75"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-AccountModule-577be563501778123dd6fe31419a3e75"' :
      'id="xs-controllers-links-module-AccountModule-577be563501778123dd6fe31419a3e75"'}>
                                            <li class="link">
                                                <a href="controllers/AccountController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-AccountModule-577be563501778123dd6fe31419a3e75"' : 'data-target="#xs-injectables-links-module-AccountModule-577be563501778123dd6fe31419a3e75"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-AccountModule-577be563501778123dd6fe31419a3e75"' :
      'id="xs-injectables-links-module-AccountModule-577be563501778123dd6fe31419a3e75"'}>
                                        <li class="link">
                                            <a href="injectables/AccountService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AccountService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#controllers-links-module-AppModule-1d6ab3b5926bc776ba72d0727f993d16"' : 'data-target="#xs-controllers-links-module-AppModule-1d6ab3b5926bc776ba72d0727f993d16"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-AppModule-1d6ab3b5926bc776ba72d0727f993d16"' :
      'id="xs-controllers-links-module-AppModule-1d6ab3b5926bc776ba72d0727f993d16"'}>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-AppModule-1d6ab3b5926bc776ba72d0727f993d16"' : 'data-target="#xs-injectables-links-module-AppModule-1d6ab3b5926bc776ba72d0727f993d16"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-AppModule-1d6ab3b5926bc776ba72d0727f993d16"' :
      'id="xs-injectables-links-module-AppModule-1d6ab3b5926bc776ba72d0727f993d16"'}>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#controllers-links-module-AuthModule-acfe37cdcb9c6cfc69b953cf15573ce9"' : 'data-target="#xs-controllers-links-module-AuthModule-acfe37cdcb9c6cfc69b953cf15573ce9"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-AuthModule-acfe37cdcb9c6cfc69b953cf15573ce9"' :
      'id="xs-controllers-links-module-AuthModule-acfe37cdcb9c6cfc69b953cf15573ce9"'}>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-AuthModule-acfe37cdcb9c6cfc69b953cf15573ce9"' : 'data-target="#xs-injectables-links-module-AuthModule-acfe37cdcb9c6cfc69b953cf15573ce9"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-AuthModule-acfe37cdcb9c6cfc69b953cf15573ce9"' :
      'id="xs-injectables-links-module-AuthModule-acfe37cdcb9c6cfc69b953cf15573ce9"'}>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link">CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#controllers-links-module-CategoryModule-74f25517a88b48f9b51f92bcaa8d883f"' : 'data-target="#xs-controllers-links-module-CategoryModule-74f25517a88b48f9b51f92bcaa8d883f"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-CategoryModule-74f25517a88b48f9b51f92bcaa8d883f"' :
      'id="xs-controllers-links-module-CategoryModule-74f25517a88b48f9b51f92bcaa8d883f"'}>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-CategoryModule-74f25517a88b48f9b51f92bcaa8d883f"' : 'data-target="#xs-injectables-links-module-CategoryModule-74f25517a88b48f9b51f92bcaa8d883f"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-CategoryModule-74f25517a88b48f9b51f92bcaa8d883f"' :
      'id="xs-injectables-links-module-CategoryModule-74f25517a88b48f9b51f92bcaa8d883f"'}>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CurrencyModule.html" data-type="entity-link">CurrencyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#controllers-links-module-CurrencyModule-932cb598586bb6d00a580acc52c882c4"' : 'data-target="#xs-controllers-links-module-CurrencyModule-932cb598586bb6d00a580acc52c882c4"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-CurrencyModule-932cb598586bb6d00a580acc52c882c4"' :
      'id="xs-controllers-links-module-CurrencyModule-932cb598586bb6d00a580acc52c882c4"'}>
                                            <li class="link">
                                                <a href="controllers/CurrencyController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CurrencyController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-CurrencyModule-932cb598586bb6d00a580acc52c882c4"' : 'data-target="#xs-injectables-links-module-CurrencyModule-932cb598586bb6d00a580acc52c882c4"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-CurrencyModule-932cb598586bb6d00a580acc52c882c4"' :
      'id="xs-injectables-links-module-CurrencyModule-932cb598586bb6d00a580acc52c882c4"'}>
                                        <li class="link">
                                            <a href="injectables/CurrencyService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CurrencyService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OperationModule.html" data-type="entity-link">OperationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#controllers-links-module-OperationModule-ab7f64431352fee9d63254235cbe832f"' : 'data-target="#xs-controllers-links-module-OperationModule-ab7f64431352fee9d63254235cbe832f"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-OperationModule-ab7f64431352fee9d63254235cbe832f"' :
      'id="xs-controllers-links-module-OperationModule-ab7f64431352fee9d63254235cbe832f"'}>
                                            <li class="link">
                                                <a href="controllers/OperationController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OperationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-OperationModule-ab7f64431352fee9d63254235cbe832f"' : 'data-target="#xs-injectables-links-module-OperationModule-ab7f64431352fee9d63254235cbe832f"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-OperationModule-ab7f64431352fee9d63254235cbe832f"' :
      'id="xs-injectables-links-module-OperationModule-ab7f64431352fee9d63254235cbe832f"'}>
                                        <li class="link">
                                            <a href="injectables/OperationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OperationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingModule.html" data-type="entity-link">SettingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#controllers-links-module-SettingModule-2ad3abb7890fd2ae99d7b55591563e1c"' : 'data-target="#xs-controllers-links-module-SettingModule-2ad3abb7890fd2ae99d7b55591563e1c"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-SettingModule-2ad3abb7890fd2ae99d7b55591563e1c"' :
      'id="xs-controllers-links-module-SettingModule-2ad3abb7890fd2ae99d7b55591563e1c"'}>
                                            <li class="link">
                                                <a href="controllers/SettingController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-SettingModule-2ad3abb7890fd2ae99d7b55591563e1c"' : 'data-target="#xs-injectables-links-module-SettingModule-2ad3abb7890fd2ae99d7b55591563e1c"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-SettingModule-2ad3abb7890fd2ae99d7b55591563e1c"' :
      'id="xs-injectables-links-module-SettingModule-2ad3abb7890fd2ae99d7b55591563e1c"'}>
                                        <li class="link">
                                            <a href="injectables/SettingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SettingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-SharedModule-22a195c42869adf1ea73f2d1d87878f7"' : 'data-target="#xs-injectables-links-module-SharedModule-22a195c42869adf1ea73f2d1d87878f7"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-SharedModule-22a195c42869adf1ea73f2d1d87878f7"' :
      'id="xs-injectables-links-module-SharedModule-22a195c42869adf1ea73f2d1d87878f7"'}>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#controllers-links-module-UserModule-38a95a8c40180d88c679130dcb92b111"' : 'data-target="#xs-controllers-links-module-UserModule-38a95a8c40180d88c679130dcb92b111"'}>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${isNormalMode ? 'id="controllers-links-module-UserModule-38a95a8c40180d88c679130dcb92b111"' :
      'id="xs-controllers-links-module-UserModule-38a95a8c40180d88c679130dcb92b111"'}>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ?
      'data-target="#injectables-links-module-UserModule-38a95a8c40180d88c679130dcb92b111"' : 'data-target="#xs-injectables-links-module-UserModule-38a95a8c40180d88c679130dcb92b111"'}>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${isNormalMode ? 'id="injectables-links-module-UserModule-38a95a8c40180d88c679130dcb92b111"' :
      'id="xs-injectables-links-module-UserModule-38a95a8c40180d88c679130dcb92b111"'}>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#controllers-links"' :
      'data-target="#xs-controllers-links"'}>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"'}>
                                <li class="link">
                                    <a href="controllers/AccountController.html" data-type="entity-link">AccountController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link">AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoryController.html" data-type="entity-link">CategoryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CurrencyController.html" data-type="entity-link">CurrencyController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OperationController.html" data-type="entity-link">OperationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SettingController.html" data-type="entity-link">SettingController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link">UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#classes-links"' :
      'data-target="#xs-classes-links"'}>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"'}>
                            <li class="link">
                                <a href="classes/Account.html" data-type="entity-link">Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountDto.html" data-type="entity-link">AccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountModel.html" data-type="entity-link">AccountModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Achievement.html" data-type="entity-link">Achievement</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Currency.html" data-type="entity-link">Currency</a>
                            </li>
                            <li class="link">
                                <a href="classes/CurrencyModel.html" data-type="entity-link">CurrencyModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cyclic.html" data-type="entity-link">Cyclic</a>
                            </li>
                            <li class="link">
                                <a href="classes/Event.html" data-type="entity-link">Event</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpErrorFilter.html" data-type="entity-link">HttpErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Instalment.html" data-type="entity-link">Instalment</a>
                            </li>
                            <li class="link">
                                <a href="classes/InstalmentDate.html" data-type="entity-link">InstalmentDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginRegisterDTO.html" data-type="entity-link">LoginRegisterDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/Notification.html" data-type="entity-link">Notification</a>
                            </li>
                            <li class="link">
                                <a href="classes/Operation.html" data-type="entity-link">Operation</a>
                            </li>
                            <li class="link">
                                <a href="classes/Report.html" data-type="entity-link">Report</a>
                            </li>
                            <li class="link">
                                <a href="classes/Setting.html" data-type="entity-link">Setting</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subcategory.html" data-type="entity-link">Subcategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link">Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/Template.html" data-type="entity-link">Template</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link">UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link">UserModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Userstasks.html" data-type="entity-link">Userstasks</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#injectables-links"' :
      'data-target="#xs-injectables-links"'}>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"'}>
                                <li class="link">
                                    <a href="injectables/AccountService.html" data-type="entity-link">AccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link">CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrencyService.html" data-type="entity-link">CurrencyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link">JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OperationService.html" data-type="entity-link">OperationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SettingService.html" data-type="entity-link">SettingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidationPipe.html" data-type="entity-link">ValidationPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#interfaces-links"' :
      'data-target="#xs-interfaces-links"'}>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"'}>
                            <li class="link">
                                <a href="interfaces/CategoryDTO.html" data-type="entity-link">CategoryDTO</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${isNormalMode ? 'data-target="#miscellaneous-links"'
      : 'data-target="#xs-miscellaneous-links"'}>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"'}>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
    this.innerHTML = tp.strings;
  }
});
