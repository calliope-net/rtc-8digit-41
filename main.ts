function Wochentag (dw: number) {
    pins.zeige7SegmentByte(2 ** dw, 7)
}
function Projekt () {
    pins.comment(pins.pins_text("calliope-net/rtc-8digit-41"))
    pins.comment(pins.pins_text("calliope-net/pins"))
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
