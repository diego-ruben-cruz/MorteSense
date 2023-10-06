from machine import Pin
from machine import Pin, Timer, UART
import urequests
import time
import network
import setup_server
import ujson

#LED
power = Pin("LED", Pin.OUT)
power.on()

wifi = Pin(14, Pin.OUT)
wifi.off()

#Mode
Pin(19, Pin.OUT, value=1)
setup_mode = Pin(20, Pin.IN, Pin.PULL_DOWN);
connect_mode = Pin(18, Pin.IN, Pin.PULL_DOWN);

#LED
led = Pin(15, Pin.OUT)
led.off()

#Sensor
sensor = Pin(28, Pin.IN)
sid = ''
ssid = ''
password = ''

backend = "http://192.168.170.146:5000/send-sms"
post_data = ""

def Detected(pin):
    if(sensor.value() == 1):
        print("MotionDetected")
        #response = urequests.post(backend, headers = {'content-type': 'application/json'}, data = post_data).json()
        response = urequests.get("http://192.168.170.146:5000/test")
        print(response.content)
        response.close()
        led.on()
    else:
        led.off()


#Setup
def Setup(pin):
    print("Setup Mode")
    if(pin.value() != 1):
        return
    
    wifi.off()
    setup_server.RunServer()
    
def Connect(pin):
    print("Connect Mode")
    if(pin.value() != 1):
        return
    
    wifi.off()
    try:
        f = open("crd.txt", "r")
        lines = f.readlines()
        sid = lines[0]
        ssid = lines[1]
        ssid = ssid.strip()
        password = lines[2]
        f.close()
    except:
        print("crd doesn't exist")
    
    print("Connecting to wifi");
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    
    # Waiting for connection
    max_wait = 10
    while max_wait > 0:
        if wlan.status() < 0 or wlan.status() >= 3:
                break
        max_wait -= 1
        print('waiting for connection...')
        time.sleep(1)
        
    # Manage connection errors
    if wlan.status() != 3:
        raise RuntimeError('Network Connection has failed', wlan.status())
    else:
        wifi.on()
        print('connected')
        
    print("Starting Detecting Motion")
    post_data = ujson.dumps({ 'device_id': sid })
    
    #Event
    sensor.irq(trigger=Pin.IRQ_RISING | Pin.IRQ_FALLING, handler=Detected)
        
#Events
setup_mode.irq(trigger=Pin.IRQ_RISING, handler=Setup)
connect_mode.irq(trigger=Pin.IRQ_RISING, handler=Connect)
if(setup_mode.value() == 1):
    Setup(setup_mode)
else:
    Connect(connect_mode)
