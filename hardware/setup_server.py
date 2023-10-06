import network
import socket
import time

def GetHTML(saved):
    if(saved == True):
        saved = 'Information has been saved!'
    else:
        saved = ''
    
    sid = ''
    wlan = ''
    password = ''
    
    try:
        f = open("crd.txt", "r")
        lines = f.readlines()
        sid = lines[0]
        wlan = lines[1]
        password = lines[2]
        f.close()
    except:
        print("crd doesn't exist")    
    
    html = f"""<!DOCTYPE html>
    <html>
        <head><title>MorteSense</title></head>
        <body>
            <h1>Setup MorteSense Device</h1>
            <form action="/setup">
              <label for="sid">SID:</label><br>
              <input type="text" id="sid" name="sid" value="{sid}"><br>
              <label for="wlan">WLAN:</label><br>
              <input type="text" id="wlan" name="wlan" value="{wlan}"><br>
              <label for="password">PASSWORD:</label><br>
              <input type="text" id="password" name="password" value="{password}"><br><br>
              <input type="submit" value="Save">
            </form>
            <h2>{saved}</h2>
        </body>
    </html>
    """
    return html

def RunServer():
    ssid = 'MorteSense'
    password = ''
    
    ap = network.WLAN(network.AP_IF)
    ap.config(essid=ssid, password=password, security=0)
    ap.active(True)

    while ap.active() == False:
      pass

    print('Setup server successful')
    print(ap.ifconfig())

    addr = socket.getaddrinfo('0.0.0.0', 80)[0][-1]
    s = socket.socket()
    s.bind(addr)
    s.listen(1)

    print('listening on', addr)

    # Listen for connections
    while True:
        try:
            cl, addr = s.accept()
            print('\nClient connected from: ', addr)
            request = cl.recv(1024)
            request = str(request)
            
            saved = False
            req_setup = request.find('/setup')
            req_sid = request.find('sid=') + 4
            req_wlan = request.find('wlan=') + 5
            req_password = request.find('password=') + 9
            if(req_setup == 6):
                end = request.find('&', req_sid)
                sid = request[req_sid:end]
                
                end = request.find('&', req_wlan)
                wlan = request[req_wlan:end]
                
                end = request.find(' ', req_password)
                password = request[req_password:end]
                
                try:
                    f = open("crd.txt", "w")
                    f.write(sid + '\n')
                    f.write(wlan + '\n')
                    f.write(password)
                    saved = True
                    f.close()
                except:
                    print("couldn't write crd")    

            cl.send('HTTP/1.0 200 OK\r\nContent-type: text/html\r\n\r\n')
            cl.send(GetHTML(saved))
            cl.close()

        except OSError as e:
            cl.close()
            print('Connection closed')

