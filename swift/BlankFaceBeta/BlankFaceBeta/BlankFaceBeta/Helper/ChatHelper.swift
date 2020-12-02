//
//  ChatHelper.swift

import Combine
import Foundation
import UIKit
import SocketIO
import SwiftUI
import AVFoundation

class ChatHelper : ObservableObject {
    var didChange = PassthroughSubject<Void, Never>()
    @Published var realTimeMessages = Messages.messages
    private let serverURL = "https://blank-face-beta.herokuapp.com/messages" // webservice URL with port
    var manager: SocketManager?
    var socket: SocketIOClient?

    func addMessage(chatMessage: Message) {

        let json = [
            "username": chatMessage.username,
            "message": chatMessage.message
        ]
        socket?.emit("new message", json)
        DispatchQueue.main.async {
            AudioServicesPlayAlertSound(1004)
            self.realTimeMessages.insert(chatMessage, at:0)
        }
        
        didChange.send(())

    }

    func getMessages() {
        Service.shared.loadHistoryFromServer() { (res, err) in
            if err != nil {print(String(describing: err)); return} // an error is received print error to log and stop
            DispatchQueue.main.async {
                for item in res {
                    self.realTimeMessages.insert(Message(username: item.username, message: item.message), at: 0)
                }
            }
        }
    }
    
    
    func reloadMessages() {
        Service.shared.loadHistoryFromServer() { (res, err) in
            if err != nil {print(String(describing: err)); return} // an error is received print error to log and stop
            DispatchQueue.main.async {
                for item in res {
                    let newMessage = Message(username: item.username, message: item.message);
                    if (!self.realTimeMessages.contains(newMessage)) {
                        self.realTimeMessages.insert(newMessage, at: 0)
                    }
                }
            }
        }
    }
    
    
    func updateMessages(jsonData: Data) {
        do {
            
            let serviceResult = try JSONDecoder().decode(DecodableMessage.self, from: jsonData)
            
            DispatchQueue.main.async {
                AudioServicesPlayAlertSound(1023)
                AudioServicesPlayAlertSound(SystemSoundID(kSystemSoundID_Vibrate))
                self.realTimeMessages.insert(Message(username: serviceResult.username, message: serviceResult.message), at: 0)
           }
            
        } catch let jsonErr {
            print("Failed to decode json:", jsonErr)
        }
       
    }

    func setSockets() {
        setSocketManager()
        setSocketEvents()
        socket?.connect()
    }

    fileprivate func setSocketManager() {

        manager = SocketManager(socketURL: URL(string: serverURL)!, config: [.log(false)])
        socket = manager?.defaultSocket
    }

    fileprivate func setSocketEvents() {
        // socket event handlers
        self.socket?.on(clientEvent: .connect) {_, _ in
            print("socket connected")
        }
        self.socket?.on("new message", callback: {data, ack in
            let stringy = data[0] as! String
            let jsonData = stringy.data(using: .utf8)!
            self.updateMessages(jsonData: jsonData)
            return
        })
    }

    func didReceiveMemoryWarning() {
        didReceiveMemoryWarning()
    }
}
