function GitHub () {
    pins.comment(pins.pins_text("calliope-net/rtc-8digit-41"))
    pins.comment(pins.pins_text("2 4-Digit-Displays; 2 I2C: RTC, Keypad"))
    pins.comment(pins.pins_text("1 Erweiterung: calliope-net/pins"))
    pins.comment(pins.pins_text("Uhr stellen am Keypad 5 Zeichen *rdd#"))
    pins.comment(pins.pins_text("0 Sekunde 00-59; 1 Minute 00-59; 2 Stunde 00-23; 3 Tag 01-31; 4 Wochentag 00-06; 5 Monat 01-12; 6 Jahr 00-99"))
}
function Wochentag (dw: number) {
    pins.comment(pins.pins_text("je Wochentag 1 Segment: A=So .. G=Sa"))
    pins.zeige7SegmentByte(2 ** dw, 7)
}
pins.addDisplay(pins.pins_DigitalPin(DigitalPin.C16), pins.pins_DigitalPin(DigitalPin.C17))
pins.addDisplay(pins.pins_DigitalPin(DigitalPin.P0), pins.pins_DigitalPin(DigitalPin.P1))
pins.clearDisplays()
loops.everyInterval(1000, function () {
    if (pins.keypadConnected()) {
        basic.showString(pins.rtc_set_key(pins.keypad_read()))
    }
    pins.rtc_read()
    pins.zeigeText(pins.rtc_get_string(pins.rtc_eFormat.hhmss), 0)
    Wochentag(pins.rtc_get_int(pins.pins_rtc_eRegister(pins.rtc_eRegister.Wochentag)))
})
