export interface Settings{
    bigBanner?: Boolean;
    from?:Date;
    to?:Date;
    timePicker: Boolean;
    format: string;
    defaultOpen?: Boolean;
    cal_days_labels: Array<string>;
    cal_full_days_lables: Array<string>;
    cal_months_labels: Array<string>;
    cal_months_labels_short: Array<string>;
    closeOnSelect?: boolean;
    rangepicker?: boolean;
}