declare class WidgetCheckout {

    constructor(options: any);

    open(callback: (result: any) => void): void;

}

interface Window {

    WidgetCheckout: typeof WidgetCheckout;

}