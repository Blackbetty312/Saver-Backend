export enum Color {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}

export enum Sex {
  MALE,
  FEMALE,
}

export enum OperationType {
  IN = 1,
  OUT = -1,
}

export enum OperationDistinction {
  CYCLIC = 'cyclic',
  INSTALMENT = 'instalment',
  REGULAR = 'regular',
}

export enum IntoAccountType {
  YES = 1,
  NO = 0,
}

export enum NotificationType {
  ACHIEVEMENT_GET = 'achievement_get',
  LEVEL_UP = 'level_up',
  CATEGORY_LIMIT = 'category_limit',
  EVENT_REMINDER = 'event_reminder',
  MONEY_SAVE = 'money_save',
  INSTALMENT_DATE = 'instalment_date',
}

export enum EventDays {
  VALENTINES = '0 0 14 2 *',
  CHRISTMAS = '0 0 24 11 *',
  NEW_YEAR = '1 0 1 0 *',
}

export enum IconName {
  HOME = 'home',
  WALLET = 'wallet',
  AWARD = 'award',
  BALANCE_SCALE = 'balance-scale',
  BRIEFCASE = 'briefcase',
  CAMERA = 'camera',
  CLIPBOARD_LIST = 'clipboard-list',
  CLOUD = 'cloud',
  COINS = 'coins',
  GLOBE = 'globe',
  GIFT = 'gift',
  PHOTO_VIDEO = 'photo-video',
  PALETTE = 'palette',
  PAPER_PLANE = 'paper-plane',
  MONEY_BILL_WAVE = 'money-bill-wave',
  MICROSCOPE = 'microscope',
  MAP_MARKED_ALT = 'map-marked-alt',
  LANDMARK = 'landmark',
  LAPTOP = 'laptop',
  INDUSTRY = 'industry',
  HEART = 'heart',
  SCROLL = 'scroll',
  SHOPPING_CART = 'shopping-cart',
  STAR = 'star',
  STORE = 'store',
  THUMBS_UP = 'thumbs-up',
  TREE = 'tree',
  TROPHY = 'trophy',
  USER = 'user',
  UTENSILS = 'utensils',
  WRENCH = 'wrench',
  BELL = 'bell',
}

export enum PredefinedEvent {
  YES = 1,
  NO = 0,
}

export class TransformMoney {
  public static fromFrontToBack(value: number): number {
    return value * 100;
  }
  public static fromBackToFront(value: number): number {
    return value / 100;
  }
}
