import { uniqueId as _uniqueId } from 'lodash'
import { SelectOption } from 'globalTypes/form'
import { LOCALE_OPTIONS, Nav } from './types'

export const NAV_LEFT: Nav[] = [
  {
    label: 'buy',
    url: '/',
    key: _uniqueId('__navbar'),
    active: false,
    menus: [
      {
        title: 'homeForSale',
        menu: [
          {
            label: 'homeForSale',
            url: '/',
          },
          {
            label: 'forceClosures',
            url: '/',
          },
          {
            label: 'forSaleByOwner',
            url: '/',
          },
          {
            label: 'openHouse',
            url: '/',
          },
        ],
        subMenu: [
          {
            label: 'newConstruction',
            url: '/',
          },
          {
            label: 'comingSoon',
            url: '/',
          },
          {
            label: 'recentHomeSale',
            url: '/',
          },
          {
            label: 'allHome',
            url: '/',
          },
        ],
      },
      {
        title: 'bundleBuyingSelling',
        menu: [
          {
            label: 'buyAndSellWithVeela',
            url: '/',
          },
        ],
      },
      {
        title: 'resource',
        menu: [
          {
            label: 'buyerGuild',
            url: '/',
          },
          {
            label: 'forceClosures',
            url: '/',
          },
          {
            label: 'realEstateApp',
            url: '/',
          },
        ],
      },
    ],
  },
  {
    label: 'rent',
    url: '/',
    key: _uniqueId('__navbar'),
    active: false,
    menus: [
      {
        title: 'searchForRentals',
        menu: [
          {
            label: 'rentalBuildings',
            url: '/',
          },
          {
            label: 'apartmentsForRent',
            url: '/',
          },
          {
            label: 'housesForRent',
            url: '/',
          },
          {
            label: 'allRentalListings',
            url: '/',
          },
          {
            label: 'allRentalBuildings',
            url: '/',
          },
        ],
      },
      {
        title: 'renting',
        menu: [
          {
            label: 'favorites',
            url: '/',
          },
          {
            label: 'contactedRentals',
            url: '/',
          },
          {
            label: 'yourRental',
            url: '/',
          },
          {
            label: 'messages',
            url: '/',
          },
        ],
      },
      {
        title: 'resources',
        menu: [
          {
            label: 'affordabilityCalculator',
            url: '/',
          },
          {
            label: 'rentersGuide',
            url: '/',
          },
        ],
      },
    ],
  },
  {
    label: 'sell',
    url: '/',
    key: _uniqueId('__navbar'),
    active: false,
    menus: [
      {
        title: 'resources',
        menu: [
          {
            label: 'exploreYourOptions',
            url: '/',
          },
          {
            label: 'seeYourHomeEstimate',
            url: '/',
          },
          {
            label: 'homeValues',
            url: '/',
          },
          {
            label: 'sellerGuild',
            url: '/',
          },
        ],
      },
      {
        title: 'bundleBuyingSelling',
        menu: [
          {
            label: 'buyAndSellWithVeela',
            url: '/',
          },
        ],
      },
      {
        title: 'sellingOptions',
        menu: [
          {
            label: 'sellWithVeelaOffers',
            url: '/',
          },
          {
            label: 'findASellerAgent',
            url: '/',
          },
          {
            label: 'postForSaleByOwner',
            url: '/',
          },
        ],
      },
    ],
  },
  {
    label: 'homeLoans',
    url: '/',
    key: _uniqueId('__navbar'),
    active: false,
    menus: [
      {
        title: 'shopMortgages',
        menu: [
          {
            label: 'mortgageLenders',
            url: '/',
          },
          {
            label: 'helotLenders',
            url: '/',
          },
          {
            label: 'mortgageRates',
            url: '/',
          },
          {
            label: 'refinanceRates',
            url: '/',
          },
          {
            label: 'allMortgageRates',
            url: '/',
          },
        ],
      },
      {
        title: 'calculators',
        menu: [
          {
            label: 'mortgageCalculator',
            url: '/',
          },
          {
            label: 'refinanceCalculator',
            url: '/',
          },
          {
            label: 'affordabilityCalculator',
            url: '/',
          },
          {
            label: 'amortizationCalculator',
            url: '/',
          },
          {
            label: 'debtToIncomeCalculator',
            url: '/',
          },
        ],
      },
      {
        title: 'Resources',
        menu: [
          {
            label: 'lenderReviews',
            url: '/',
          },
          {
            label: 'mortgageLearningCenter',
            url: '/',
          },
          {
            label: 'mortgagesApp',
            url: '/',
          },
          {
            label: 'lenderResourceCenter',
            url: '/',
          },
        ],
      },
    ],
  },
  {
    label: 'agentFounder',
    url: '/',
    key: _uniqueId('__navbar'),
    active: false,
    menus: [
      {
        title: 'lookingForPros',
        menu: [
          {
            label: 'realEstateAgents',
            url: '/',
          },
          {
            label: 'propertyManagers',
            url: '/',
          },
          {
            label: 'homeInspectors',
            url: '/',
          },
          {
            label: 'otherPros',
            url: '/',
          },
        ],
        subMenu: [
          {
            label: 'homeImprovementPros',
            url: '/',
          },
          {
            label: 'homeBuilders',
            url: '/',
          },
          {
            label: 'realEstatePhotographers',
            url: '/',
          },
        ],
      },
      {
        title: 'imPro',
        menu: [
          {
            label: 'agentAdvertising',
            url: '/',
          },
          {
            label: 'agentResourceCenter',
            url: '/',
          },
          {
            label: 'createAFreeAgentAccount',
            url: '/',
          },
        ],
        subMenu: [
          {
            label: 'realEstateBusinessPlan',
            url: '/',
          },
          {
            label: 'realEstateAgentScripts',
            url: '/',
          },
          {
            label: 'listingFlyerTemplates',
            url: '/',
          },
        ],
      },
    ],
  },
]

export const NAV_RIGHT: Nav[] = [
  {
    label: 'manageRentals',
    url: '/',
    key: _uniqueId('__navbar'),
    active: false,
    menus: [
      {
        title: 'rentalManagementTools',
        menu: [
          {
            label: 'listARental',
            url: '/',
          },
          {
            label: 'myListings',
            url: '/',
          },
          {
            label: 'messages',
            url: '/',
          },
          {
            label: 'applications',
            url: '/',
          },
          {
            label: 'leases',
            url: '/',
          },
          {
            label: 'payments',
            url: '/',
          },
        ],
      },
      {
        title: 'learnMore',
        menu: [
          {
            label: 'zillowRentalManager',
            url: '/',
          },
          {
            label: 'priceMyRental',
            url: '/',
          },
          {
            label: 'resourceCenter',
            url: '/',
          },
          {
            label: 'helpCenter',
            url: '/',
          },
        ],
      },
    ],
  },
  {
    label: 'advertise',
    url: '/',
    key: _uniqueId('__navbar'),
  },
  {
    label: 'help',
    url: '/',
    key: _uniqueId('__navbar'),
  },
]

export const MENU_PROFILE: Nav[] = [
  {
    label: 'saveHomes',
    url: '/settings/saved-homes',
    key: _uniqueId('__navbar'),
  },
  {
    label: 'saveSearches',
    url: '/settings/saved-searches',
    key: _uniqueId('__navbar'),
  },
  {
    label: 'yourHome',
    url: '/',
    key: _uniqueId('__navbar'),
  },
  {
    label: 'offerClosings',
    url: '/',
    key: _uniqueId('__navbar'),
  },
  {
    label: 'renting',
    url: '/',
    key: _uniqueId('__navbar'),
  },
  {
    label: 'accountSettings',
    url: '/settings',
    key: _uniqueId('__navbar'),
  },
]

export const LOCALES: SelectOption<LOCALE_OPTIONS>[] = [
  {
    label: 'en',
    value: LOCALE_OPTIONS.EN,
  },
  {
    label: 'vi',
    value: LOCALE_OPTIONS.VI,
  },
]
